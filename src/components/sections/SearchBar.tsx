'use client';

import React, { useState } from 'react';
import { SearchBarData, StateItem } from '@/types/cms';
import { Button } from '../common/Button';

export interface SearchBarProps {
  searchBarData: SearchBarData;
  states: StateItem[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchBarData, states }) => {
  const [activeTab, setActiveTab] = useState(searchBarData.tabs[0]?.id || 'buy');
  const [selectedState, setSelectedState] = useState(searchBarData.stateDefaultOption);
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(searchBarData.budgetOptions[0]?.value || 'any');

  return (
    <div className="searchbox">
      <div className="tabs" role="tablist">
        {searchBarData.tabs.map((tab) => (
          <button
            key={tab.id}
            className="tab"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="srow">
        <div className="fld">
          <label htmlFor="state-select">{searchBarData.stateLabel}</label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option>{searchBarData.stateDefaultOption}</option>
            {states.map((st, idx) => (
              <option key={idx} value={st.name}>
                {st.name}
              </option>
            ))}
          </select>
        </div>

        <div className="fld">
          <label htmlFor="location-input">{searchBarData.locationLabel}</label>
          <input
            id="location-input"
            placeholder={searchBarData.locationPlaceholder}
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
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
          <Button>{searchBarData.searchBtnText}</Button>
        </div>
      </div>

      <div className="chips" style={{ padding: '0 0 16px 0' }}>
        {searchBarData.quickChips.map((chip, idx) => (
          <button
            key={idx}
            className="chip"
            onClick={() => setLocationQuery(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};
