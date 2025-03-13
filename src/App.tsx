import React, { useState, useMemo } from 'react';
import { Filters } from './components/Filters';
import { MetricsChart } from './components/MetricsChart';
import { MetricsTable } from './components/MetricsTable';
import { mockCampaigns } from './mockData';
import { CampaignType, BrandType, TimeRange } from './types';
import { BarChart3, TrendingUp } from 'lucide-react';

function App() {
  const [campaignType, setCampaignType] = useState<CampaignType>('search');
  const [brandType, setBrandType] = useState<BrandType>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter(campaign => {
      const matchesType = campaign.type === campaignType;
      const matchesBrand = brandType === 'all' 
        ? true 
        : brandType === 'brand' 
          ? campaign.isBrand 
          : !campaign.isBrand;
      return matchesType && matchesBrand;
    });
  }, [campaignType, brandType]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Google Ads Dashboard</h1>
        </div>

        <Filters
          campaignType={campaignType}
          setCampaignType={setCampaignType}
          brandType={brandType}
          setBrandType={setBrandType}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />

        <div className="mt-8 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
            </div>
            <MetricsChart data={filteredCampaigns} timeRange={timeRange} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Metrics</h2>
            <MetricsTable campaigns={filteredCampaigns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;