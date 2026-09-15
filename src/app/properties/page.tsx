'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import cmsDataRaw from '@/shared/data/mockCmsData.json';
import { CmsData, PropertyListingItem } from '@/shared/types/cms';
import PropertyCard from '@/shared/ui/property-card';
import PropertyListCard from '@/shared/ui/property-list-card';
import { useProperties } from '@/shared/context/PropertyContext';
import LocationSearchInput from '@/components/common/LocationSearchInput';
import PropertyMap from '@/components/common/PropertyMap';
import PropertyInteractiveMap from '@/components/common/PropertyInteractiveMap';
import { extractLocationParts } from '@/shared/utils/locationUtils';
import { Building2, Home, Key, Store, Landmark, Sparkles, Map, List } from 'lucide-react';

const cmsData = cmsDataRaw as unknown as CmsData;

const MAPPOS = [
  [58, 30],
  [34, 46],
  [71, 58],
  [46, 66],
  [22, 72],
  [63, 80],
  [80, 40],
  [38, 22],
];

// Helper to convert price string to lakhs for numeric filtering & sorting
function parsePriceToLakhs(priceStr: string): number {
  if (!priceStr) return 0;
  const lower = priceStr.toLowerCase();
  if (lower.includes('/mo') || lower.includes('month') || lower.includes('rent')) {
    // For rent properties (e.g. ₹20,000/mo), 20k = 0.2 Lakhs
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    return num / 100000;
  }
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  if (priceStr.includes('Cr') || priceStr.includes('cr')) return num * 100;
  return num;
}

import { useSearchParams } from 'next/navigation';

function PropertiesContent() {
  const listingData = cmsData.listingPage;
  const searchParams = useSearchParams();
  const urlQuery = searchParams ? searchParams.get('q') : null;
  const rentQuery = searchParams ? searchParams.get('rent') : null;
  const urlCity = searchParams ? searchParams.get('city') : null;
  const urlState = searchParams ? searchParams.get('state') : null;
  const urlSearch = searchParams ? searchParams.get('search') : null;
  const urlDeal = searchParams ? searchParams.get('deal') : null;
  const urlType = searchParams ? searchParams.get('type') : null;
  const urlCategory = searchParams ? searchParams.get('category') : null;

  const initialSearch = urlQuery || urlSearch || (urlCity ? urlCity.charAt(0).toUpperCase() + urlCity.slice(1).replace('-', ' ') : '') || (urlState ? urlState.charAt(0).toUpperCase() + urlState.slice(1).replace('-', ' ') : '') || rentQuery || '';

  const { properties } = useProperties();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterTab, setFilterTab] = useState<'basic' | 'premium'>('basic');
  const [searchTag, setSearchTag] = useState(listingData.searchTag || '');
  const [searchInput, setSearchInput] = useState(initialSearch);

  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Buy' | 'Rent' | 'Commercial' | 'Plot'>('All');

  React.useEffect(() => {
    const activeSearch = urlQuery || urlSearch || (urlCity ? urlCity.charAt(0).toUpperCase() + urlCity.slice(1).replace('-', ' ') : '') || (urlState ? urlState.charAt(0).toUpperCase() + urlState.slice(1).replace('-', ' ') : '') || rentQuery || '';
    if (activeSearch) {
      setSearchInput(activeSearch);
    }
    
    if (rentQuery !== null || urlDeal === 'rent' || urlType === 'rent') {
      setCategoryFilter('Rent');
    } else if (urlDeal === 'sale' || urlType === 'buy' || urlType === 'resale') {
      setCategoryFilter('Buy');
    } else if (urlDeal === 'commercial' || urlType === 'commercial' || urlCategory === 'commercial') {
      setCategoryFilter('Commercial');
    } else if (urlDeal === 'plot' || urlType === 'plot' || urlType === 'land' || urlCategory === 'plots') {
      setCategoryFilter('Plot');
    }
  }, [urlQuery, urlSearch, urlCity, urlState, rentQuery, urlDeal, urlType, urlCategory]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activePin, setActivePin] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Interactive Filter States
  const [selectedBhks, setSelectedBhks] = useState<string[]>([]);
  const [maxPriceLakhs, setMaxPriceLakhs] = useState<number>(300); // Up to 3 Cr
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [furnishingFilter, setFurnishingFilter] = useState<string[]>([]);
  const [selectedPropTypes, setSelectedPropTypes] = useState<string[]>([]);
  const [listedByFilter, setListedByFilter] = useState<string[]>(['Owner', 'Builder']);
  const [sortBy, setSortBy] = useState<string>('Relevance');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleBhk = (bhk: string) => {
    setSelectedBhks((prev) =>
      prev.includes(bhk) ? prev.filter((b) => b !== bhk) : [...prev, bhk]
    );
  };

  const toggleFurnishing = (furn: string) => {
    setFurnishingFilter((prev) =>
      prev.includes(furn) ? prev.filter((f) => f !== furn) : [...prev, furn]
    );
  };

  const togglePropType = (pt: string) => {
    setSelectedPropTypes((prev) =>
      prev.includes(pt) ? prev.filter((p) => p !== pt) : [...prev, pt]
    );
  };

  const toggleListedBy = (role: string) => {
    setListedByFilter((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const resetFilters = () => {
    setSelectedBhks([]);
    setMaxPriceLakhs(300);
    setStatusFilter('All');
    setFurnishingFilter([]);
    setSelectedPropTypes([]);
    setListedByFilter(['Owner', 'Builder']);
    setCategoryFilter('All');
    setSearchInput('');
  };

  // Filter & Sort listings dynamically
  const filteredListings = useMemo(() => {
    let result = properties.filter((item) => {
      // Category Filter (Rent vs Buy/Resale vs Commercial vs Plot)
      if (categoryFilter !== 'All') {
        const itemCat = item.listingCategory;
        const isRent = itemCat === 'Rent' || item.price.includes('/mo') || item.title.toLowerCase().includes('rent') || item.badgeText?.toLowerCase().includes('rent');
        const isPlot = itemCat === 'Plot' || item.title.toLowerCase().includes('plot') || item.title.toLowerCase().includes('land');
        const isComm = itemCat === 'Commercial' || item.title.toLowerCase().includes('office') || item.title.toLowerCase().includes('shop');
        
        if (categoryFilter === 'Rent' && !isRent) return false;
        if (categoryFilter === 'Buy' && (isRent || isPlot || isComm)) return false;
        if (categoryFilter === 'Commercial' && !isComm) return false;
        if (categoryFilter === 'Plot' && !isPlot) return false;
      }

      // Search Input
      if (searchInput.trim()) {
        const q = searchInput.toLowerCase();
        // Extract search keywords (e.g., "Ahmedabad, Gujarat" -> ["ahmedabad", "gujarat"])
        const searchTerms = q.split(/[,;\s]+/).filter((t) => t.length > 1);

        const titleLower = item.title.toLowerCase();
        const addrLower = item.address.toLowerCase();
        const societyLower = ((item as any).societyName || (item as any).buildingName || '').toLowerCase();

        // Exact match check first
        const matchesExact = titleLower.includes(q) || addrLower.includes(q) || societyLower.includes(q);

        // Term-by-term match (at least one valid location keyword must match)
        const matchesTerms = searchTerms.some(
          (term) => titleLower.includes(term) || addrLower.includes(term) || societyLower.includes(term)
        );

        if (!matchesExact && !matchesTerms) return false;
      }

      // BHK Filter
      if (selectedBhks.length > 0) {
        const itemBhk = (item.bhk || '').toUpperCase();
        const itemTitle = item.title.toUpperCase();
        const match = selectedBhks.some((b) => {
          if (b === '1 RK') return itemBhk.includes('1 RK') || itemTitle.includes('1 RK');
          if (b === '1 BHK') return itemBhk.includes('1 BHK') || itemTitle.includes('1 BHK');
          if (b === '2 BHK') return itemBhk.includes('2 BHK') || itemTitle.includes('2 BHK');
          if (b === '3 BHK') return itemBhk.includes('3 BHK') || itemTitle.includes('3 BHK');
          if (b === '4 BHK') return itemBhk.includes('4 BHK') || itemTitle.includes('4 BHK');
          if (b === '4+ BHK') return itemBhk.includes('4') || itemBhk.includes('5') || itemBhk.includes('6') || itemTitle.includes('4 BHK') || itemTitle.includes('5 BHK');
          return false;
        });
        if (!match) return false;
      }

      // Price Range Filter (Only apply Lakhs filter to Buy/Resale properties when max slider < 300)
      const isRentItem = item.listingCategory === 'Rent' || item.price.includes('/mo');
      if (!isRentItem && maxPriceLakhs < 300) {
        const priceLakhs = parsePriceToLakhs(item.price);
        if (priceLakhs > maxPriceLakhs) return false;
      }

      // Status Filter
      if (statusFilter !== 'All') {
        const isReady = item.badgeText?.toLowerCase().includes('ready') || 
                        item.chips?.some(c => c.toLowerCase().includes('ready')) ||
                        (item as any).possessionStatus?.toLowerCase().includes('ready');
        const isUnderConst = item.badgeText?.toLowerCase().includes('under') || 
                             item.chips?.some(c => c.toLowerCase().includes('under')) ||
                             (item as any).possessionStatus?.toLowerCase().includes('under');
        
        if (statusFilter === 'Ready to move' && isUnderConst && !isReady) return false;
        if (statusFilter === 'Under construction' && !isUnderConst) return false;
      }

      // Furnishing Filter
      if (furnishingFilter.length > 0) {
        const hasFurn = furnishingFilter.some((f) => {
          const fLower = f.toLowerCase();
          const chipMatch = item.chips?.some((c) => c.toLowerCase().includes(fLower));
          const furnPropMatch = (item as any).furnishing?.toLowerCase().includes(fLower);
          return chipMatch || furnPropMatch;
        });
        if (!hasFurn) return false;
      }

      // Property Type Filter
      if (selectedPropTypes.length > 0) {
        const match = selectedPropTypes.some((pt) => {
          const ptLower = pt.toLowerCase();
          const titleLower = item.title.toLowerCase();
          const catLower = (item.listingCategory || '').toLowerCase();
          
          if (ptLower.includes('flat') || ptLower.includes('apartment')) {
            return titleLower.includes('flat') || titleLower.includes('apartment') || catLower === 'buy' || catLower === 'rent';
          }
          if (ptLower.includes('house') || ptLower.includes('villa')) {
            return titleLower.includes('house') || titleLower.includes('villa') || titleLower.includes('bungalow');
          }
          if (ptLower.includes('plot') || ptLower.includes('land')) {
            return titleLower.includes('plot') || titleLower.includes('land') || catLower === 'plot';
          }
          if (ptLower.includes('commercial') || ptLower.includes('office') || ptLower.includes('shop')) {
            return titleLower.includes('commercial') || titleLower.includes('office') || titleLower.includes('shop') || catLower === 'commercial';
          }
          return titleLower.includes(ptLower);
        });
        if (!match) return false;
      }

      // Listed By Filter
      if (listedByFilter.length > 0 && listedByFilter.length < 2) {
        const role = ((item as any).ownerRole || item.badgeText || '').toLowerCase();
        const isOwner = role.includes('owner');
        const isBuilder = role.includes('builder');
        if (listedByFilter.includes('Owner') && !listedByFilter.includes('Builder') && !isOwner) return false;
        if (listedByFilter.includes('Builder') && !listedByFilter.includes('Owner') && !isBuilder) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'Price: low to high') {
      result.sort((a, b) => parsePriceToLakhs(a.price) - parsePriceToLakhs(b.price));
    } else if (sortBy === 'Price: high to low') {
      result.sort((a, b) => parsePriceToLakhs(b.price) - parsePriceToLakhs(a.price));
    }

    return result;
  }, [properties, searchInput, categoryFilter, selectedBhks, maxPriceLakhs, statusFilter, furnishingFilter, selectedPropTypes, listedByFilter, sortBy]);

  // Dynamically calculate property counts for each Property Type in sidebar
  const getPropTypeCount = useMemo(() => {
    return (typeName: string) => {
      const nameLower = typeName.toLowerCase();
      const targetPool = searchInput.trim()
        ? properties.filter((item) => {
            const q = searchInput.toLowerCase();
            const searchTerms = q.split(/[,;\s]+/).filter((t) => t.length > 1);
            const titleLower = item.title.toLowerCase();
            const addrLower = item.address.toLowerCase();
            const societyLower = ((item as any).societyName || (item as any).buildingName || '').toLowerCase();
            return (
              titleLower.includes(q) ||
              addrLower.includes(q) ||
              societyLower.includes(q) ||
              searchTerms.some((term) => titleLower.includes(term) || addrLower.includes(term) || societyLower.includes(term))
            );
          })
        : properties;

      return targetPool.filter((item) => {
        const titleLower = item.title.toLowerCase();
        const catLower = (item.listingCategory || '').toLowerCase();

        if (nameLower.includes('apartment') || nameLower.includes('flat')) {
          return titleLower.includes('flat') || titleLower.includes('apartment') || catLower === 'buy' || catLower === 'rent';
        }
        if (nameLower.includes('gated community villa')) {
          return titleLower.includes('gated') && (titleLower.includes('villa') || titleLower.includes('rowhouse'));
        }
        if (nameLower.includes('independent house') || nameLower.includes('villa')) {
          return titleLower.includes('house') || titleLower.includes('villa') || titleLower.includes('rowhouse') || titleLower.includes('bungalow');
        }
        if (nameLower.includes('builder floor')) {
          return titleLower.includes('floor') || titleLower.includes('builder');
        }
        if (nameLower.includes('plot') || nameLower.includes('land')) {
          return titleLower.includes('plot') || titleLower.includes('land') || catLower === 'plot';
        }
        return false;
      }).length;
    };
  }, [properties, searchInput]);

  const ITEMS_PER_PAGE = 6;

  // Auto reset to Page 1 whenever active filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, categoryFilter, selectedBhks, maxPriceLakhs, statusFilter, furnishingFilter, selectedPropTypes, listedByFilter, sortBy]);

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE) || 1;

  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredListings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredListings, currentPage]);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="wrap" style={{ paddingTop: '16px', paddingBottom: '8px' }}>
        <nav
          className="crumbs"
          aria-label="Breadcrumb"
          style={{
            fontSize: '13px',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {(() => {
            const currentSearch = searchInput.trim();
            const loc = currentSearch ? extractLocationParts(currentSearch, filteredListings[0]?.address) : null;
            return (
              <>
                <Link href="/" style={{ color: '#522AB0', fontWeight: 600, textDecoration: 'none' }}>Home</Link>
                <span style={{ color: '#CBD5E1' }}>/</span>
                {loc && (loc.city || loc.state) ? (
                  <>
                    {loc.state && (
                      <>
                        <Link href={`/properties?q=${encodeURIComponent(loc.state)}`} style={{ color: '#522AB0', fontWeight: 600, textDecoration: 'none' }}>{loc.state}</Link>
                        <span style={{ color: '#CBD5E1' }}>/</span>
                      </>
                    )}
                    {loc.city && (
                      <>
                        <Link href={`/properties?q=${encodeURIComponent(loc.city)}`} style={{ color: '#522AB0', fontWeight: 600, textDecoration: 'none' }}>{loc.city}</Link>
                      </>
                    )}
                    {loc.locality && loc.locality.toLowerCase() !== loc.city.toLowerCase() && (
                      <>
                        <span style={{ color: '#CBD5E1' }}>/</span>
                        <span style={{ color: '#1E293B', fontWeight: 700 }}>{loc.locality}</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Link href="/properties" style={{ color: '#522AB0', fontWeight: 600, textDecoration: 'none' }}>India</Link>
                    <span style={{ color: '#CBD5E1' }}>/</span>
                    <span style={{ color: '#1E293B', fontWeight: 700 }}>All Properties</span>
                  </>
                )}
              </>
            );
          })()}
        </nav>
      </div>

      {/* STICKY SEARCH + FILTERS BAR */}
      <div
        className="filterbar"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          padding: '14px 0',
        }}
      >
        <div className="wrap" style={{ paddingBottom: 0 }}>
          {/* CATEGORY SELECTOR TABS */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '12px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none',
            }}
          >
            {[
              { id: 'All', label: 'All Listings', icon: <Building2 className="w-3.5 h-3.5" /> },
              { id: 'Buy', label: 'Buy / Resale', icon: <Home className="w-3.5 h-3.5" /> },
              { id: 'Rent', label: 'For Rent', icon: <Key className="w-3.5 h-3.5" /> },
              { id: 'Commercial', label: 'Commercial', icon: <Store className="w-3.5 h-3.5" /> },
              { id: 'Plot', label: 'Plots / Land', icon: <Landmark className="w-3.5 h-3.5" /> },
            ].map((cat) => {
              const active = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id as any)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: active ? '1.5px solid #522AB0' : '1.5px solid #E2E8F0',
                    background: active
                      ? 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)'
                      : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#475569',
                    fontWeight: active ? 800 : 650,
                    fontSize: '13px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: active ? '0 4px 12px rgba(82, 42, 176, 0.25)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = '#C4B5FD';
                      e.currentTarget.style.color = '#522AB0';
                      e.currentTarget.style.background = '#FAF9FD';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.background = '#FFFFFF';
                    }
                  }}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="wrap fbrow" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <LocationSearchInput
              value={searchInput}
              onChange={(val) => setSearchInput(val)}
              onSelectLocation={(selectedLoc) => {
                setSearchTag(selectedLoc);
                setSearchInput(selectedLoc);
              }}
              placeholder="Type city, locality, village or landmark across All India…"
              searchTag={searchTag}
              onRemoveTag={() => setSearchTag('')}
            />
          </div>

          <button
            className="savesearch"
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1.5px solid #E2D9F3',
              background: '#FAF9FD',
              color: '#522AB0',
              fontWeight: 750,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F1ECFB';
              e.currentTarget.style.borderColor = '#522AB0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FAF9FD';
              e.currentTarget.style.borderColor = '#E2D9F3';
            }}
          >
            <Sparkles style={{ width: 15, height: 15, color: '#522AB0' }} />
            <span>Save Search</span>
          </button>

          {/* Segmented List/Map Toggle */}
          <div
            style={{
              display: 'inline-flex',
              background: '#F1F5F9',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('list')}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'list' ? '#522AB0' : '#64748B',
                fontWeight: viewMode === 'list' ? 800 : 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <List style={{ width: 15, height: 15 }} />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'map' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'map' ? '#522AB0' : '#64748B',
                fontWeight: viewMode === 'map' ? 800 : 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: viewMode === 'map' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Map style={{ width: 15, height: 15 }} />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* RESULTS MAIN CONTAINER */}
      <div
        className={`fscrim ${isFilterOpen ? 'open' : ''}`}
        id="fscrim"
        onClick={() => setIsFilterOpen(false)}
      />

      <div className={`wrap results ${viewMode === 'map' ? 'mapmode' : ''}`}>
        {/* SIDEBAR FILTERS */}
        <aside
          className={`sidebar ${isFilterOpen ? 'open' : ''}`}
          id="sidebar"
          aria-label="Filters"
        >
          <div className="sbhead">
            <b style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Filters</b>
            <button
              className="sbclose"
              type="button"
              aria-label="Close filters"
              onClick={() => setIsFilterOpen(false)}
            >
              &times;
            </button>
          </div>

          {(() => {
            const rawQuery = (searchInput || searchTag || filteredListings[0]?.address || 'Ahmedabad').toLowerCase();
            let lat = 23.0225;
            let lng = 72.5714;
            let cityName = 'Ahmedabad';

            if (rawQuery.includes('pune') || rawQuery.includes('baner') || rawQuery.includes('wakad') || rawQuery.includes('hinjewadi')) {
              lat = 18.5204;
              lng = 73.8567;
              cityName = 'Pune';
            } else if (rawQuery.includes('mumbai') || rawQuery.includes('bandra') || rawQuery.includes('andheri')) {
              lat = 19.0760;
              lng = 72.8777;
              cityName = 'Mumbai';
            } else if (rawQuery.includes('dholera')) {
              lat = 22.2510;
              lng = 72.1930;
              cityName = 'Dholera SIR';
            } else if (rawQuery.includes('surat')) {
              lat = 21.1702;
              lng = 72.8311;
              cityName = 'Surat';
            } else if (rawQuery.includes('vadodara')) {
              lat = 22.3072;
              lng = 73.1812;
              cityName = 'Vadodara';
            } else if (rawQuery.includes('rajkot')) {
              lat = 22.3039;
              lng = 70.8022;
              cityName = 'Rajkot';
            } else if (rawQuery.includes('bengaluru') || rawQuery.includes('bangalore')) {
              lat = 12.9716;
              lng = 77.5946;
              cityName = 'Bengaluru';
            } else if (rawQuery.includes('hyderabad')) {
              lat = 17.3850;
              lng = 78.4867;
              cityName = 'Hyderabad';
            } else if (rawQuery.includes('delhi') || rawQuery.includes('noida') || rawQuery.includes('gurugram')) {
              lat = 28.6139;
              lng = 77.2090;
              cityName = 'Delhi NCR';
            }

            const bbox = `${(lng - 0.05).toFixed(4)}%2C${(lat - 0.035).toFixed(4)}%2C${(lng + 0.05).toFixed(4)}%2C${(lat + 0.035).toFixed(4)}`;
            const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

            return (
              <div
                className="rcardbox"
                style={{
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="mapbox"
                  style={{
                    position: 'relative',
                    height: '210px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#e5e3df',
                  }}
                  onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                >
                  <iframe
                    src={iframeSrc}
                    title="Live City Map Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      pointerEvents: 'none',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      color: '#0F172A',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    📍 <span>{cityName}</span>
                  </div>
                  <button
                    type="button"
                    className="btn sm mapbtn"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
                      color: '#fff',
                      fontWeight: 750,
                      fontSize: '12.5px',
                      padding: '9px 18px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 14px rgba(82, 42, 176, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 5,
                      whiteSpace: 'nowrap',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMode(viewMode === 'map' ? 'list' : 'map');
                    }}
                  >
                    <Map style={{ width: 14, height: 14 }} />
                    {viewMode === 'map' ? 'Switch to list view' : `View ${filteredListings.length} on map`}
                  </button>
                </div>
              </div>
            );
          })()}

          <div
            className="fcard"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: '20px',
              padding: '22px',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              className="ftabs"
              role="tablist"
              style={{
                display: 'flex',
                borderBottom: '1px solid #EEF2F6',
                marginBottom: '18px',
                gap: '8px',
              }}
            >
              <button
                className={`ftab ${filterTab === 'basic' ? 'on' : ''}`}
                role="tab"
                aria-selected={filterTab === 'basic'}
                type="button"
                onClick={() => setFilterTab('basic')}
                style={{
                  padding: '8px 14px',
                  border: 'none',
                  background: filterTab === 'basic' ? '#EDE9FE' : 'transparent',
                  color: filterTab === 'basic' ? '#522AB0' : '#64748B',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Filters
              </button>
              <button
                className={`ftab ${filterTab === 'premium' ? 'on' : ''}`}
                role="tab"
                aria-selected={filterTab === 'premium'}
                type="button"
                onClick={() => setFilterTab('premium')}
                style={{
                  padding: '8px 14px',
                  border: 'none',
                  background: filterTab === 'premium' ? '#EDE9FE' : 'transparent',
                  color: filterTab === 'premium' ? '#522AB0' : '#64748B',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>Premium</span>
                <span
                  style={{
                    background: '#FEDC00',
                    color: '#1C0A3F',
                    fontSize: '9.5px',
                    fontWeight: 900,
                    padding: '1px 6px',
                    borderRadius: '999px',
                  }}
                >
                  NEW
                </span>
              </button>
            </div>

            {filterTab === 'basic' ? (
              <div className="fbody" id="tab-basic">
                <div className="frow" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
                  <button
                    className="freset"
                    type="button"
                    onClick={resetFilters}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#522AB0',
                      fontSize: '12.5px',
                      fontWeight: 750,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: 'none', stroke: 'currentColor', strokeWidth: 2.2 }}>
                      <path d="M4 5v6h6" />
                      <path d="M4.5 11a8 8 0 1 1 1.6 6" />
                    </svg>
                    Reset Filters
                  </button>
                </div>

                {/* BHK TYPE */}
                <div className="fgrp" style={{ marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '18px' }}>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', letterSpacing: '0.05em' }}>
                    BHK Configuration
                  </h5>
                  <div className="opts" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                    {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map(
                      (bhk) => {
                        const sel = selectedBhks.includes(bhk);
                        return (
                          <button
                            key={bhk}
                            className={`opt ${sel ? 'sel' : ''}`}
                            type="button"
                            onClick={() => toggleBhk(bhk)}
                            style={{
                              padding: '8px 4px',
                              borderRadius: '10px',
                              border: sel ? '1.5px solid #522AB0' : '1px solid #E2E8F0',
                              background: sel ? '#522AB0' : '#F8FAFC',
                              color: sel ? '#FFFFFF' : '#334155',
                              fontWeight: sel ? 800 : 650,
                              fontSize: '12.5px',
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'all 0.15s ease',
                              boxShadow: sel ? '0 2px 8px rgba(82, 42, 176, 0.25)' : 'none',
                            }}
                          >
                            {bhk}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* PRICE RANGE */}
                <div className="fgrp" style={{ marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', letterSpacing: '0.05em' }}>
                      Price Range
                    </h5>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                      ₹0 – ₹{maxPriceLakhs >= 100 ? (maxPriceLakhs / 100).toFixed(2) + ' Cr' : maxPriceLakhs + ' L'}
                    </span>
                  </div>
                  <div className="rng" style={{ marginTop: '10px', marginBottom: '8px' }}>
                    <div className="rngtrack" style={{ height: '6px', background: '#E2E8F0', borderRadius: '999px', position: 'relative' }}>
                      <div
                        className="rngfill"
                        id="rngfill"
                        style={{
                          position: 'absolute',
                          left: '0%',
                          width: `${Math.min(100, (maxPriceLakhs / 300) * 100)}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #522AB0, #7C3AED)',
                          borderRadius: '999px',
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="300"
                      step="10"
                      value={maxPriceLakhs}
                      onChange={(e) => setMaxPriceLakhs(Number(e.target.value))}
                      aria-label="Maximum price"
                      style={{ width: '100%', marginTop: '8px', cursor: 'pointer', accentColor: '#522AB0' }}
                    />
                  </div>
                  <div className="rngends" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#94A3B8', fontWeight: 650 }}>
                    <span>₹0</span>
                    <span>₹3 Cr+</span>
                  </div>
                </div>

                {/* PROPERTY STATUS */}
                <div className="fgrp" style={{ marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '18px' }}>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', letterSpacing: '0.05em' }}>
                    Possession Status
                  </h5>
                  <div className="inline" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { id: 'All', label: 'All Statuses' },
                      { id: 'Ready to move', label: 'Ready to Move In' },
                      { id: 'Under construction', label: 'Under Construction' },
                    ].map((st) => (
                      <label key={st.id} className="chk" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="pstatus"
                          checked={statusFilter === st.id}
                          onChange={() => setStatusFilter(st.id)}
                          style={{ accentColor: '#522AB0', width: '15px', height: '15px' }}
                        />
                        <span>{st.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* FURNISHING */}
                <div className="fgrp" style={{ marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '18px' }}>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', letterSpacing: '0.05em' }}>
                    Furnishing
                  </h5>
                  <div className="inline" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['Full', 'Semi-furnished', 'Unfurnished'].map((f) => (
                      <label key={f} className="chk" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={furnishingFilter.includes(f)}
                          onChange={() => toggleFurnishing(f)}
                          style={{ accentColor: '#522AB0', width: '15px', height: '15px' }}
                        />
                        <span>{f === 'Full' ? 'Fully Furnished' : f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* PROPERTY TYPE */}
                <div className="fgrp" style={{ marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '18px' }}>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', letterSpacing: '0.05em' }}>
                    Property Type
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {listingData.propertyTypes.map((pt, idx) => {
                      const dynamicCount = getPropTypeCount(pt.name);
                      return (
                        <label key={idx} className="chk" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={selectedPropTypes.includes(pt.name)}
                              onChange={() => togglePropType(pt.name)}
                              style={{ accentColor: '#522AB0', width: '15px', height: '15px' }}
                            />
                            <span>{pt.name}</span>
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 750, color: '#64748B', background: '#F1F5F9', padding: '2px 7px', borderRadius: '999px' }}>
                            {dynamicCount}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* LISTED BY */}
                <div className="fgrp" style={{ marginBottom: '10px' }}>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', letterSpacing: '0.05em' }}>
                    Listed By
                  </h5>
                  <div className="inline" style={{ display: 'flex', gap: '14px' }}>
                    <label className="chk" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={listedByFilter.includes('Owner')}
                        onChange={() => toggleListedBy('Owner')}
                        style={{ accentColor: '#522AB0', width: '15px', height: '15px' }}
                      />
                      <span>Owner (0% Brokerage)</span>
                    </label>
                    <label className="chk" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={listedByFilter.includes('Builder')}
                        onChange={() => toggleListedBy('Builder')}
                        style={{ accentColor: '#522AB0', width: '15px', height: '15px' }}
                      />
                      <span>Builder</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="fbody" id="tab-premium">
                <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#64748B', lineHeight: '1.55' }}>
                  Filter only the highest quality verified zero-brokerage listings.
                </p>
                <div className="fgrp" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label className="chk" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#522AB0', width: '15px', height: '15px' }} />
                    <span>100% Direct Owner Verified</span>
                  </label>
                  <label className="chk" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#522AB0', width: '15px', height: '15px' }} />
                    <span>Clear 7/12 Title &amp; NA NOC Checked</span>
                  </label>
                  <label className="chk" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 650, color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ accentColor: '#522AB0', width: '15px', height: '15px' }} />
                    <span>RERA Approved Projects</span>
                  </label>
                </div>
              </div>
            )}

            <button
              className="btn applybtn"
              type="button"
              onClick={() => setIsFilterOpen(false)}
              style={{
                width: '100%',
                marginTop: '16px',
                background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
                color: '#FFFFFF',
                padding: '11px',
                borderRadius: '12px',
                fontWeight: 750,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(82, 42, 176, 0.25)',
              }}
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* RESULTS LIST & CENTER COLUMN */}
        <div>
          {/* RESULTS HEADER */}
          <div
            className="rhead"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '20px',
              background: '#FFFFFF',
              padding: '18px 22px',
              borderRadius: '16px',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <h1 style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 850, color: '#0F172A', margin: 0, letterSpacing: '-0.3px' }}>
                {categoryFilter === 'Rent'
                  ? 'Properties for Rent'
                  : categoryFilter === 'Commercial'
                  ? 'Commercial Properties'
                  : categoryFilter === 'Plot'
                  ? 'Plots & Land for Sale'
                  : 'Properties & Flats for Sale'}
                {searchInput ? ` in ${searchInput}` : ' in Baner, Pune'}
              </h1>
              <div className="rsub" style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#059669', fontWeight: 800, background: '#ECFDF5', padding: '2px 8px', borderRadius: '6px', fontSize: '12px' }}>
                  {filteredListings.length} Verified Properties
                </span>
                <span>• Within 5 km • Updated today</span>
              </div>
            </div>

            <div className="rtools" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="fbtnmob"
                type="button"
                onClick={() => setIsFilterOpen(true)}
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #522AB0',
                  background: '#F5F3FF',
                  color: '#522AB0',
                  fontWeight: 750,
                  fontSize: '13px',
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                  <path d="M3 6h18M6 12h12M10 18h4" />
                </svg>
                <span>Filters</span>
                <span style={{ background: '#522AB0', color: '#fff', borderRadius: '999px', padding: '1px 6px', fontSize: '11px' }}>
                  {selectedBhks.length +
                    (maxPriceLakhs < 300 ? 1 : 0) +
                    (statusFilter !== 'All' ? 1 : 0) +
                    furnishingFilter.length +
                    selectedPropTypes.length +
                    (categoryFilter !== 'All' ? 1 : 0)}
                </span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 650 }}>Sort by:</span>
                <select
                  aria-label="Sort results"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    background: '#FAF9FD',
                    color: '#1E293B',
                    fontSize: '13px',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option>Relevance</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                </select>
              </div>
            </div>
          </div>

          {/* LISTINGS STREAM */}
          <div className="rlist" id="rlist" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {paginatedListings.length > 0 ? (
              paginatedListings.map((item: PropertyListingItem, i: number) => (
                <React.Fragment key={item.id}>
                  <div
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onMouseLeave={() => setHighlightedIndex(null)}
                    className={highlightedIndex === i ? 'rcard-wrap hi' : 'rcard-wrap'}
                  >
                    <PropertyListCard listing={item} />
                  </div>

                  {/* MODERN INLINE ALERT PROMO BANNER */}
                  {i === 2 && (
                    <div
                      className="inlinepromo"
                      style={{
                        background: 'linear-gradient(135deg, #1C0A3F 0%, #311166 100%)',
                        color: '#FFFFFF',
                        padding: '24px 28px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '18px',
                        flexWrap: 'wrap',
                        boxShadow: '0 10px 30px rgba(49, 17, 102, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#FEDC00', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                          <Sparkles style={{ width: 13, height: 13 }} /> INSTANT OWNER ALERTS
                        </span>
                        <b style={{ fontSize: '18px', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          Get New Verified Owner Listings in Your Inbox
                        </b>
                        <p style={{ margin: 0, fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.82)', maxWidth: '500px' }}>
                          Be the first to inspect genuine direct owner properties before other buyers. Zero broker spam.
                        </p>
                      </div>
                      <button
                        className="btn"
                        type="button"
                        style={{
                          background: '#FEDC00',
                          color: '#1C0A3F',
                          fontWeight: 800,
                          fontSize: '13.5px',
                          padding: '11px 22px',
                          borderRadius: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(254, 220, 0, 0.4)',
                          whiteSpace: 'nowrap',
                          transition: 'transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        Create Instant Alert
                      </button>
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div
                style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F1ECFB', color: '#522AB0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Building2 style={{ width: 30, height: 30 }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                  No Properties Found Matching Your Filters
                </h3>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 auto 20px', maxWidth: '420px' }}>
                  Try adjusting your BHK selection, price range, or category filter to discover more verified owner properties.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    background: '#522AB0',
                    color: '#FFFFFF',
                    padding: '10px 22px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 750,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(82, 42, 176, 0.25)',
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          <div
            className="pager"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '36px',
            }}
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1.5px solid #E2E8F0',
                background: '#FFFFFF',
                color: currentPage === 1 ? '#CBD5E1' : '#334155',
                fontSize: '13px',
                fontWeight: 750,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={currentPage === pageNum ? 'on' : ''}
                type="button"
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  border: currentPage === pageNum ? '1.5px solid #522AB0' : '1.5px solid #E2E8F0',
                  background: currentPage === pageNum ? '#522AB0' : '#FFFFFF',
                  color: currentPage === pageNum ? '#FFFFFF' : '#334155',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: currentPage === pageNum ? '0 4px 12px rgba(82, 42, 176, 0.25)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {pageNum}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1.5px solid #E2E8F0',
                background: '#FFFFFF',
                color: currentPage === totalPages ? '#CBD5E1' : '#334155',
                fontSize: '13px',
                fontWeight: 750,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next →
            </button>
          </div>
        </div>

        {/* MAP WRAP (MAP MODE) */}
        <div className="mapwrap" id="mapwrap" style={{ position: 'relative', overflow: 'hidden', minHeight: '520px', borderRadius: '20px', border: '1.5px solid #E2E8F0' }}>
          <PropertyInteractiveMap
            listings={filteredListings}
            address={searchInput || searchTag || filteredListings[0]?.address || 'Baner, Pune'}
            height="100%"
            activePinIndex={activePin}
            onPinClick={(index) => {
              setActivePin(index);
              const cardWrap = document.querySelectorAll('.rcard-wrap');
              if (cardWrap[index]) {
                cardWrap[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          />
        </div>

        {/* QUICK LINKS RAIL */}
        <aside className="qrail" aria-label="Quick links" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {listingData.quickLinkCards.map((card, cIdx) => (
            <div
              key={cIdx}
              className="qcard"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '18px',
                padding: '20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <h3 className="qtitle" style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                {card.title}
              </h3>
              {card.sections.map((sec, sIdx) => (
                <div key={sIdx} className="qsec" style={{ marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '12.5px', fontWeight: 750, color: '#522AB0', margin: '0 0 8px 0' }}>
                    {sec.title}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {sec.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          href={link.href}
                          style={{
                            fontSize: '13px',
                            color: '#475569',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#522AB0';
                            e.currentTarget.style.transform = 'translateX(3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#475569';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span style={{ color: '#522AB0', fontSize: '10px' }}>▪</span>
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '40px 20px', textAlign: 'center', fontWeight: '700' }}>Loading properties...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
