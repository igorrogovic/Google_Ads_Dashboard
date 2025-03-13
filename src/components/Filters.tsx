import React from 'react';
import { CampaignType, BrandType, TimeRange } from '../types';

interface FiltersProps {
  campaignType: CampaignType;
  setCampaignType: (type: CampaignType) => void;
  brandType: BrandType;
  setBrandType: (type: BrandType) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

export function Filters({
  campaignType,
  setCampaignType,
  brandType,
  setBrandType,
  timeRange,
  setTimeRange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
        <select
          value={campaignType}
          onChange={(e) => setCampaignType(e.target.value as CampaignType)}
          className="border rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="search">Search</option>
          <option value="display">Display</option>
          <option value="shopping">Shopping</option>
          <option value="video">Video</option>
          <option value="performance-max">Performance Max</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Brand Type</label>
        <select
          value={brandType}
          onChange={(e) => setBrandType(e.target.value as BrandType)}
          className="border rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="brand">Brand</option>
          <option value="non-brand">Non-Brand</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Time Range</label>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="border rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );
}
