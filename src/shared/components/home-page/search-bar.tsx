'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBarData, StateItem } from '@/shared/types/cms';
import LocationSearchInput from '@/components/common/LocationSearchInput';

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

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (locationQuery.trim()) params.set('q', locationQuery.trim());
    if (activeTab) params.set('type', activeTab);
    if (selectedBudget && selectedBudget !== 'any') params.set('budget', selectedBudget);

    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  const handleChipClick = (chip: string) => {
    setLocationQuery(chip);
    router.push(`/properties?q=${encodeURIComponent(chip)}`);
  };

  return (
    <div className="searchbox">
      <div className="tabs" role="tablist">
        {searchBarData.tabs.map((tab) => (
          <button
            key={tab.id}
            className="tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="srow">
        <div className="fld">
          <label htmlFor="state-select">{searchBarData.stateLabel}</label>
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

        <div className="fld" style={{ flex: 1.5, position: 'relative' }}>
          <label htmlFor="location-input">{searchBarData.locationLabel}</label>
          <LocationSearchInput
            value={locationQuery}
            onChange={(val) => setLocationQuery(val)}
            onSelectLocation={(locName) => {
              setLocationQuery(locName);
              router.push(`/properties?q=${encodeURIComponent(locName)}`);
            }}
            placeholder={searchBarData.locationPlaceholder}
          />
        </div>

        <div className="fld">
          <label htmlFor="budget-select">{searchBarData.budgetLabel}</label>
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

        <div className="gobox">
          <button type="submit" className="btn gobtn">
            {searchBarData.searchBtnText}
          </button>
        </div>
      </form>

      <div className="chips" style={{ padding: '0 0 16px 0' }}>
        {searchBarData.quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            className="chip"
            onClick={() => handleChipClick(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
