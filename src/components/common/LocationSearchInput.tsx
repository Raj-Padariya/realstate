'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface LocationSuggestion {
  name: string;
  subtext: string;
  fullLocation: string;
  type?: string;
}

const PRESET_INDIAN_LOCATIONS: LocationSuggestion[] = [
  { name: 'Ahmedabad', subtext: 'Gujarat, India', fullLocation: 'Ahmedabad, Gujarat' },
  { name: 'Prahlad Nagar', subtext: 'Ahmedabad, Gujarat', fullLocation: 'Prahlad Nagar, Ahmedabad' },
  { name: 'SG Highway', subtext: 'Ahmedabad, Gujarat', fullLocation: 'SG Highway, Ahmedabad' },
  { name: 'Satellite', subtext: 'Ahmedabad, Gujarat', fullLocation: 'Satellite, Ahmedabad' },
  { name: 'Bodakdev', subtext: 'Ahmedabad, Gujarat', fullLocation: 'Bodakdev, Ahmedabad' },
  { name: 'Bopal', subtext: 'Ahmedabad, Gujarat', fullLocation: 'Bopal, Ahmedabad' },
  { name: 'Vastrapur', subtext: 'Ahmedabad, Gujarat', fullLocation: 'Vastrapur, Ahmedabad' },
  { name: 'Gota', subtext: 'Ahmedabad, Gujarat', fullLocation: 'Gota, Ahmedabad' },
  { name: 'Surat', subtext: 'Gujarat, India', fullLocation: 'Surat, Gujarat' },
  { name: 'Vesu', subtext: 'Surat, Gujarat', fullLocation: 'Vesu, Surat' },
  { name: 'Adajan', subtext: 'Surat, Gujarat', fullLocation: 'Adajan, Surat' },
  { name: 'VIP Road', subtext: 'Surat, Gujarat', fullLocation: 'VIP Road, Surat' },
  { name: 'Vadodara', subtext: 'Gujarat, India', fullLocation: 'Vadodara, Gujarat' },
  { name: 'Alkapuri', subtext: 'Vadodara, Gujarat', fullLocation: 'Alkapuri, Vadodara' },
  { name: 'Gotri', subtext: 'Vadodara, Gujarat', fullLocation: 'Gotri, Vadodara' },
  { name: 'Rajkot', subtext: 'Gujarat, India', fullLocation: 'Rajkot, Gujarat' },
  { name: 'Kalawad Road', subtext: 'Rajkot, Gujarat', fullLocation: 'Kalawad Road, Rajkot' },
  { name: 'Dholera SIR', subtext: 'Gujarat, India', fullLocation: 'Dholera SIR, Gujarat' },
  { name: 'Mumbai', subtext: 'Maharashtra, India', fullLocation: 'Mumbai, Maharashtra' },
  { name: 'Bandra West', subtext: 'Mumbai, Maharashtra', fullLocation: 'Bandra West, Mumbai' },
  { name: 'Andheri West', subtext: 'Mumbai, Maharashtra', fullLocation: 'Andheri West, Mumbai' },
  { name: 'Powai', subtext: 'Mumbai, Maharashtra', fullLocation: 'Powai, Mumbai' },
  { name: 'Pune', subtext: 'Maharashtra, India', fullLocation: 'Pune, Maharashtra' },
  { name: 'Baner', subtext: 'Pune, Maharashtra', fullLocation: 'Baner, Pune' },
  { name: 'Wakad', subtext: 'Pune, Maharashtra', fullLocation: 'Wakad, Pune' },
  { name: 'Hinjewadi', subtext: 'Pune, Maharashtra', fullLocation: 'Hinjewadi, Pune' },
  { name: 'Bengaluru', subtext: 'Karnataka, India', fullLocation: 'Bengaluru, Karnataka' },
  { name: 'Whitefield', subtext: 'Bengaluru, Karnataka', fullLocation: 'Whitefield, Bengaluru' },
  { name: 'Hyderabad', subtext: 'Telangana, India', fullLocation: 'Hyderabad, Telangana' },
  { name: 'HITECH City', subtext: 'Hyderabad, Telangana', fullLocation: 'HITECH City, Hyderabad' },
  { name: 'Delhi NCR', subtext: 'Delhi, India', fullLocation: 'Delhi NCR, India' },
];

interface LocationSearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onSelectLocation?: (locationName: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  searchTag?: string;
  onRemoveTag?: () => void;
  className?: string;
}

export default function LocationSearchInput({
  value,
  onChange,
  onSelectLocation,
  onSearch,
  placeholder = 'Search by locality, city or landmark…',
  searchTag,
  onRemoveTag,
  className = '',
}: LocationSearchInputProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced API fetch for OpenStreetMap India geocoding
  useEffect(() => {
    const q = value.trim();

    if (!q || q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // 1. Immediate local preset filtering
    const localMatches = PRESET_INDIAN_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q.toLowerCase()) ||
        loc.fullLocation.toLowerCase().includes(q.toLowerCase())
    );

    setSuggestions(localMatches);
    setIsOpen(true);
    setHighlightedIdx(-1);

    // 2. Debounced fetch to OpenStreetMap Nominatim Free India API
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            q
          )}&countrycodes=in&addressdetails=1&limit=8`,
          {
            headers: {
              'Accept-Language': 'en',
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const apiSuggestions: LocationSuggestion[] = data.map((item: any) => {
              const name = item.name || item.display_name.split(',')[0];
              const addr = item.address || {};
              const cityState = [
                addr.suburb || addr.neighbourhood || addr.city_district,
                addr.city || addr.town || addr.village || addr.county,
                addr.state,
              ]
                .filter(Boolean)
                .join(', ');

              return {
                name: name,
                subtext: cityState || 'India',
                fullLocation: `${name}${cityState ? `, ${cityState}` : ''}`,
                type: item.type,
              };
            });

            // Merge local preset matches with API results, avoiding exact duplicates
            const combined = [...localMatches];
            apiSuggestions.forEach((apiItem) => {
              if (
                !combined.some(
                  (existing) =>
                    existing.name.toLowerCase() === apiItem.name.toLowerCase()
                )
              ) {
                combined.push(apiItem);
              }
            });

            setSuggestions(combined.slice(0, 8));
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.warn('Location API search error:', err);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [value]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc: LocationSuggestion) => {
    const chosenName = loc.fullLocation || loc.name;
    onChange(chosenName);
    if (onSelectLocation) {
      onSelectLocation(chosenName);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIdx((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIdx((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIdx >= 0 && suggestions[highlightedIdx]) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIdx]);
      } else if (onSearch) {
        onSearch();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fsearch ${className}`}
      style={{ position: 'relative', flex: 1, width: '100%' }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20l-4.5-4.5" />
      </svg>

      {searchTag && (
        <span className="ftag" title={searchTag}>
          <span
            style={{
              maxWidth: '210px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          >
            {searchTag}
          </span>
          <button
            type="button"
            aria-label="Remove filter tag"
            onClick={() => onRemoveTag && onRemoveTag()}
            style={{ flexShrink: 0 }}
          >
            &times;
          </button>
        </span>
      )}

      <input
        type="text"
        placeholder={searchTag ? 'Add locality…' : placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        style={{ flex: 1, minWidth: '60px' }}
      />

      {onSearch && (
        <button className="searchbtn" type="button" onClick={onSearch}>
          Search
        </button>
      )}

      {/* AUTOCOMPLETE DROPDOWN MENU */}
      {isOpen && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 100,
            background: '#ffffff',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(82, 42, 176, 0.15)',
            overflow: 'hidden',
            maxHeight: '340px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              padding: '8px 14px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: '#8b8e99',
              background: '#faf9fd',
              borderBottom: '1px solid #f0ecf9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>📍 Location Suggestions</span>
            {loading && <span style={{ color: '#522ab0' }}>Searching India map…</span>}
          </div>

          {suggestions.map((loc, idx) => {
            const isSelected = idx === highlightedIdx;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(loc)}
                onMouseEnter={() => setHighlightedIdx(idx)}
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  background: isSelected ? '#f3eefc' : '#ffffff',
                  borderBottom:
                    idx < suggestions.length - 1 ? '1px solid #f5f5f7' : 'none',
                  transition: 'background 0.12s ease',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isSelected ? '#522ab0' : '#f0ecf9',
                    color: isSelected ? '#ffffff' : '#522ab0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{ width: '14px', height: '14px', fill: 'currentColor' }}
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: isSelected ? '#522ab0' : '#1c1f23',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {loc.name}
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: '#6c757d',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {loc.subtext}
                  </div>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: '14px',
                    height: '14px',
                    fill: 'none',
                    stroke: '#8b8e99',
                    strokeWidth: 2,
                    opacity: isSelected ? 1 : 0.4,
                  }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
