import React from 'react';
import { CampaignType, BrandType, TimeRange } from '../types';

interface FiltersProps {
  campaignType: CampaignType;
  setCampaignType: (type: CampaignType) => void;
  brandType: BrandType;
  setBrandType: (type: BrandType) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export function Filters({
  campaignType,
  setCampaignType,
  brandType,
  setBrandType,
  timeRange,
  setTimeRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap justify-between p-4 bg-white rounded-lg shadow-sm">
      {/* Left side filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
          <select
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value as CampaignType)}
            className="border rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="search">Search</option>
            <option value="display">Display</option>
            <option value="shopping">Shopping</option>
            <option value="video">Video</option>
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
      
      {/* Right side date selectors */}
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
