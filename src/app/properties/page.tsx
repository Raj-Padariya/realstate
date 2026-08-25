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
import { Building2, Home, Key, Store, Landmark, Sparkles } from 'lucide-react';

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

  const { properties } = useProperties();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterTab, setFilterTab] = useState<'basic' | 'premium'>('basic');
  const [searchTag, setSearchTag] = useState(listingData.searchTag);
  const [searchInput, setSearchInput] = useState(urlQuery || rentQuery || '');

  const urlType = searchParams ? searchParams.get('type') : null;
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Buy' | 'Rent' | 'Commercial' | 'Plot'>('All');

  React.useEffect(() => {
    if (urlQuery !== null) {
      setSearchInput(urlQuery);
    } else if (rentQuery !== null) {
      setSearchInput(rentQuery);
      setCategoryFilter('Rent');
    }
    if (urlType !== null) {
      const lower = urlType.toLowerCase();
      if (lower === 'rent') setCategoryFilter('Rent');
      else if (lower === 'resale' || lower === 'buy') setCategoryFilter('Buy');
      else if (lower === 'commercial') setCategoryFilter('Commercial');
      else if (lower === 'land' || lower === 'plot') setCategoryFilter('Plot');
    }
  }, [urlQuery, rentQuery, urlType]);

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
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          {(() => {
            const currentSearch = searchInput || searchTag;
            const loc = extractLocationParts(currentSearch, filteredListings[0]?.address);
            return (
              <>
                <Link href="/">Home</Link> ›{' '}
                {currentSearch ? (
                  <>
                    <Link href={`/properties?q=${encodeURIComponent(loc.state)}`}>{loc.state}</Link> ›{' '}
                    <Link href={`/properties?q=${encodeURIComponent(loc.city)}`}>{loc.city}</Link>
                    {loc.locality && loc.locality.toLowerCase() !== loc.city.toLowerCase() && (
                      <>
                        {' › '}<span>{loc.locality}</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Link href="/properties">India</Link> › <span>All Properties</span>
                  </>
                )}
              </>
            );
          })()}
        </nav>
      </div>

      {/* STICKY SEARCH + FILTERS */}
      <div className="filterbar">
        <div className="wrap" style={{ paddingBottom: 0 }}>
          {/* CATEGORY SELECTOR TABS */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'All', label: 'All Listings', icon: <Building2 className="w-3.5 h-3.5" /> },
              { id: 'Buy', label: 'Buy / Resale', icon: <Home className="w-3.5 h-3.5" /> },
              { id: 'Rent', label: 'For Rent', icon: <Key className="w-3.5 h-3.5" /> },
              { id: 'Commercial', label: 'Commercial', icon: <Store className="w-3.5 h-3.5" /> },
              { id: 'Plot', label: 'Plots / Land', icon: <Landmark className="w-3.5 h-3.5" /> },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id as any)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '99px',
                  border: categoryFilter === cat.id ? '2px solid #522ab0' : '1px solid var(--line)',
                  background: categoryFilter === cat.id ? '#522ab0' : '#fff',
                  color: categoryFilter === cat.id ? '#fff' : 'var(--ink)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: categoryFilter === cat.id ? '0 2px 8px rgba(82,42,176,0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="wrap fbrow">
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

          <button className="savesearch" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z" />
            </svg>
            Save <span>search</span>
          </button>

          <span className="grow" />

          <div className="segview" role="group" aria-label="View">
            <button
              className={`seg ${viewMode === 'list' ? 'on' : ''}`}
              id="vlist"
              type="button"
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>List</span>
            </button>
            <button
              className={`seg ${viewMode === 'map' ? 'on' : ''}`}
              id="vmap"
              type="button"
              onClick={() => setViewMode('map')}
              aria-pressed={viewMode === 'map'}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6z" />
                <path d="M9 3v15M15 6v15" />
              </svg>
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
            <b>Filters</b>
            <button
              className="sbclose"
              type="button"
              aria-label="Close filters"
              onClick={() => setIsFilterOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="rcardbox">
            <div className="mapbox">
              <svg viewBox="0 0 276 190" aria-hidden="true">
                <rect width="276" height="190" fill="#EFE9FB" />
                <g stroke="#D6C9F2" strokeWidth="12" fill="none">
                  <path d="M-10 66h300M-10 136h300M78 -10v210M190 -10v210" />
                </g>
                <g fill="#C9B9EE">
                  <rect x="14" y="14" width="50" height="38" rx="4" />
                  <rect x="96" y="12" width="76" height="40" rx="4" />
                  <rect x="206" y="16" width="56" height="36" rx="4" />
                  <rect x="16" y="82" width="46" height="42" rx="4" />
                  <rect x="98" y="80" width="72" height="44" rx="4" />
                  <rect x="204" y="84" width="58" height="40" rx="4" />
                </g>
                <g fill="#522AB0">
                  <circle cx="126" cy="96" r="13" />
                  <circle cx="52" cy="52" r="10" />
                  <circle cx="222" cy="112" r="10" />
                </g>
              </svg>
              <button
                className="btn sm mapbtn"
                type="button"
                onClick={() => setViewMode('map')}
              >
                View {filteredListings.length} on map
              </button>
            </div>
          </div>

          <div className="fcard">
            <div className="ftabs" role="tablist">
              <button
                className={`ftab ${filterTab === 'basic' ? 'on' : ''}`}
                role="tab"
                aria-selected={filterTab === 'basic'}
                type="button"
                onClick={() => setFilterTab('basic')}
              >
                Filters
              </button>
              <button
                className={`ftab ${filterTab === 'premium' ? 'on' : ''}`}
                role="tab"
                aria-selected={filterTab === 'premium'}
                type="button"
                onClick={() => setFilterTab('premium')}
              >
                Premium <span className="newpill">New</span>
              </button>
            </div>

            {filterTab === 'basic' ? (
              <div className="fbody" id="tab-basic">
                <div className="frow">
                  <button
                    className="freset"
                    type="button"
                    onClick={resetFilters}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M4 5v6h6" />
                      <path d="M4.5 11a8 8 0 1 1 1.6 6" />
                    </svg>
                    Reset
                  </button>
                </div>

                <div className="fgrp">
                  <h5>BHK type</h5>
                  <div className="opts">
                    {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map(
                      (bhk) => (
                        <button
                          key={bhk}
                          className={`opt ${selectedBhks.includes(bhk) ? 'sel' : ''}`}
                          type="button"
                          onClick={() => toggleBhk(bhk)}
                        >
                          {bhk}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="fgrp">
                  <h5>Price range</h5>
                  <div className="rngval" id="rngval">
                    ₹0 – ₹{maxPriceLakhs >= 100 ? (maxPriceLakhs / 100).toFixed(2) + ' Cr' : maxPriceLakhs + ' L'}
                  </div>
                  <div className="rng">
                    <div className="rngtrack">
                      <div
                        className="rngfill"
                        id="rngfill"
                        style={{ left: '0%', width: `${Math.min(100, (maxPriceLakhs / 300) * 100)}%` }}
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
                    />
                  </div>
                  <div className="rngends">
                    <span>₹0</span>
                    <span>₹3 Cr+</span>
                  </div>
                </div>

                <div className="fgrp">
                  <h5>Property status</h5>
                  <div className="inline">
                    <label className="chk">
                      <input
                        type="radio"
                        name="pstatus"
                        checked={statusFilter === 'All'}
                        onChange={() => setStatusFilter('All')}
                      />{' '}
                      All
                    </label>
                    <label className="chk">
                      <input
                        type="radio"
                        name="pstatus"
                        checked={statusFilter === 'Ready to move'}
                        onChange={() => setStatusFilter('Ready to move')}
                      />{' '}
                      Ready to move
                    </label>
                    <label className="chk">
                      <input
                        type="radio"
                        name="pstatus"
                        checked={statusFilter === 'Under construction'}
                        onChange={() => setStatusFilter('Under construction')}
                      />{' '}
                      Under construction
                    </label>
                  </div>
                </div>

                <div className="fgrp">
                  <h5>Furnishing</h5>
                  <div className="inline">
                    {['Full', 'Semi-furnished', 'Unfurnished'].map((f) => (
                      <label key={f} className="chk">
                        <input
                          type="checkbox"
                          checked={furnishingFilter.includes(f)}
                          onChange={() => toggleFurnishing(f)}
                        />{' '}
                        {f}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="fgrp">
                  <h5>Property type</h5>
                  {listingData.propertyTypes.map((pt, idx) => {
                    const dynamicCount = getPropTypeCount(pt.name);
                    return (
                      <label key={idx} className="chk">
                        <input
                          type="checkbox"
                          checked={selectedPropTypes.includes(pt.name)}
                          onChange={() => togglePropType(pt.name)}
                        />{' '}
                        {pt.name} <span className="cnt">{dynamicCount}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="fgrp">
                  <h5>Listed by</h5>
                  <div className="inline">
                    <label className="chk">
                      <input
                        type="checkbox"
                        checked={listedByFilter.includes('Owner')}
                        onChange={() => toggleListedBy('Owner')}
                      />{' '}
                      Owner
                    </label>
                    <label className="chk">
                      <input
                        type="checkbox"
                        checked={listedByFilter.includes('Builder')}
                        onChange={() => toggleListedBy('Builder')}
                      />{' '}
                      Builder
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="fbody" id="tab-premium">
                <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: 'var(--muted)', lineHeight: '1.55' }}>
                  Narrow down to the listings that usually close fastest.
                </p>
                <div className="fgrp">
                  <h5>Trust</h5>
                  <label className="chk"><input type="checkbox" defaultChecked /> Owner verified only</label>
                  <label className="chk"><input type="checkbox" /> Title &amp; 7/12 checked</label>
                  <label className="chk"><input type="checkbox" /> RERA registered</label>
                </div>
              </div>
            )}

            <button
              className="btn applybtn"
              type="button"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply filters
            </button>
          </div>
        </aside>

        {/* RESULTS LIST & CENTER COLUMN */}
        <div>
          <div className="rhead">
            <div>
              <h1>
                {categoryFilter === 'Rent'
                  ? 'Properties for rent'
                  : categoryFilter === 'Commercial'
                  ? 'Commercial properties'
                  : categoryFilter === 'Plot'
                  ? 'Plots & Land for sale'
                  : 'Properties & Flats for sale'}
                {searchInput ? ` in ${searchInput}` : ' in Baner, Pune'}
              </h1>
              <div className="rsub">
                <b id="rcount">{filteredListings.length}</b> {listingData.resultsSubTitle}
              </div>
            </div>
            <div className="rtools">
              <button
                className="fbtnmob"
                type="button"
                onClick={() => setIsFilterOpen(true)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6h18M6 12h12M10 18h4" />
                </svg>
                Filters{' '}
                <span className="n">
                  {selectedBhks.length +
                    (maxPriceLakhs < 300 ? 1 : 0) +
                    (statusFilter !== 'All' ? 1 : 0) +
                    furnishingFilter.length +
                    selectedPropTypes.length +
                    (categoryFilter !== 'All' ? 1 : 0)}
                </span>
              </button>
              <select
                aria-label="Sort results"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Relevance</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="rlist" id="rlist">
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

                  {/* INLINE PROMOS */}
                  {i === 2 && (
                    <div className="inlinepromo">
                      <div>
                        <b>Get these results by email</b>
                        <p>New matching owner listings in Baner, sent the day they go live. No broker spam.</p>
                      </div>
                      <button className="btn" type="button">Create alert</button>
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', background: '#fff', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <h3>No properties found matching your filters</h3>
                <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Try resetting or broadening your search criteria.</p>
                <button className="btn line" type="button" style={{ marginTop: '16px' }} onClick={resetFilters}>
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          <div className="pager">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 250, behavior: 'smooth' });
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
                  window.scrollTo({ top: 250, behavior: 'smooth' });
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
                window.scrollTo({ top: 250, behavior: 'smooth' });
              }}
            >
              Next →
            </button>
          </div>
        </div>

        {/* MAP WRAP (MAP MODE) */}
        <div className="mapwrap" id="mapwrap" style={{ position: 'relative', overflow: 'hidden', minHeight: '520px', borderRadius: '16px', border: '1px solid var(--line)' }}>
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
        <aside className="qrail" aria-label="Quick links">
          {listingData.quickLinkCards.map((card, cIdx) => (
            <div key={cIdx} className="qcard">
              <h3 className="qtitle">{card.title}</h3>
              {card.sections.map((sec, sIdx) => (
                <div key={sIdx} className="qsec">
                  <h4>{sec.title}</h4>
                  <ul>
                    {sec.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link href={link.href}>{link.label}</Link>
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
