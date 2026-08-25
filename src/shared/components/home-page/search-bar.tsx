'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBarData, StateItem } from '@/shared/types/cms';
import LocationSearchInput from '@/components/common/LocationSearchInput';
import { Search, MapPin, Building, Coins, Home, Key, Building2, Landmark, Sparkles } from 'lucide-react';

export interface SearchBarProps {
  searchBarData: SearchBarData;
  states: StateItem[];
}

export function SearchBar({ searchBarData, states }: SearchBarProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(searchBarData.tabs[0]?.id || 'buy');
  const [selectedState, setSelectedState] = useState(searchBarData.stateDefaultOption);
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(searchBarData.budgetOptions[0]?.value || 'any');

  const tabIcons: Record<string, React.ReactNode> = {
    buy: <Home className="w-4 h-4" />,
    rent: <Key className="w-4 h-4" />,
    commercial: <Building2 className="w-4 h-4" />,
    plots: <Landmark className="w-4 h-4" />,
    projects: <Building className="w-4 h-4" />,
  };

  const popularCities = ['Ahmedabad', 'Dholera SIR', 'Surat', 'Vadodara', 'GIFT City', 'Rajkot', 'Mumbai', 'Pune'];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (locationQuery.trim()) params.set('q', locationQuery.trim());
    if (activeTab) params.set('type', activeTab);
    if (selectedBudget && selectedBudget !== 'any') params.set('budget', selectedBudget);
    if (selectedState && selectedState !== searchBarData.stateDefaultOption) params.set('state', selectedState);

    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  const handleCityClick = (city: string) => {
    setLocationQuery(city);
    router.push(`/properties?q=${encodeURIComponent(city)}`);
  };

  return (
    <div className="redbus-search-card">
      {/* Tab Navigation */}
      <div className="redbus-tabs-nav" role="tablist">
        {searchBarData.tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`redbus-tab-item ${isActive ? 'active' : ''}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
            >
              {tabIcons[tab.id] || <Sparkles className="w-4 h-4" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Search Inputs Row */}
      <form onSubmit={handleSearch} className="redbus-search-form">
        {/* State Select */}
        <div className="redbus-input-box">
          <label htmlFor="state-select">{searchBarData.stateLabel || 'State / Region'}</label>
          <div className="redbus-field-wrap">
            <Building2 className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value={searchBarData.stateDefaultOption}>{searchBarData.stateDefaultOption}</option>
              {states.map((st, idx) => (
                <option key={idx} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Search Field */}
        <div className="redbus-input-box" style={{ flex: '2 1 280px' }}>
          <label htmlFor="location-input">{searchBarData.locationLabel || 'City, Locality or Landmark'}</label>
          <div className="redbus-field-wrap">
            <MapPin className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
            <div style={{ width: '100%' }}>
              <LocationSearchInput
                value={locationQuery}
                onChange={(val) => setLocationQuery(val)}
                onSelectLocation={(locName) => {
                  setLocationQuery(locName);
                  router.push(`/properties?q=${encodeURIComponent(locName)}`);
                }}
                placeholder={searchBarData.locationPlaceholder || 'Enter city or locality (e.g. S.G. Highway)'}
              />
            </div>
          </div>
        </div>

        {/* Budget Dropdown */}
        <div className="redbus-input-box">
          <label htmlFor="budget-select">{searchBarData.budgetLabel || 'Budget Range'}</label>
          <div className="redbus-field-wrap">
            <Coins className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
            <select
              id="budget-select"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
            >
              {searchBarData.budgetOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Submit CTA Button */}
        <button type="submit" className="redbus-search-btn">
          <Search className="w-5 h-5" />
          <span>{searchBarData.searchBtnText || 'SEARCH'}</span>
        </button>
      </form>

      {/* Popular City Location Chips */}
      <div className="redbus-city-pills">
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', marginRight: '4px' }}>
          POPULAR CITIES:
        </span>
        {popularCities.map((city, idx) => (
          <button
            key={idx}
            type="button"
            className="redbus-city-pill"
            onClick={() => handleCityClick(city)}
          >
            <MapPin className="w-3 h-3 text-[#6D28D9]" />
            <span>{city}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
