import React, { useState, useEffect, useMemo } from 'react';
import { Filters } from './components/Filters';
import { MetricsChart } from './components/MetricsChart';
import { MetricsTable } from './components/MetricsTable';
import { mockCampaigns } from './mockData';
import { CampaignType, BrandType, TimeRange } from './types';
import { BarChart3, TrendingUp } from 'lucide-react';

// CSV URL configuration
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4HJd_4HWo3oS9SeuqZHISLpT-_rMmDE6_YwYGWLCsdbe-40YDUVQ2YUhNF0Ym6WKWlAAWg8RtoF0a/pub?output=csv';

function App() {
  const [campaignType, setCampaignType] = useState('search');
  const [brandType, setBrandType] = useState('all');
  const [timeRange, setTimeRange] = useState('daily');
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch and process CSV data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const csvText = await response.text();
        const rows = csvText
          .split('\n')
          .map(row => row.split(','))
          .filter(row => row.length > 1);
    
        if (rows.length === 0) {
          throw new Error('No data found in the spreadsheet');
        }

        // Parse the CSV data into campaign objects
        // Assuming the first row contains headers
        const headers = rows[0].map(header => header.trim());
        
        const parseNumber = (value) => {
          if (!value || value.trim() === '') return 0;
          
          // Remove any quotes and spaces
          let cleanValue = value.trim().replace(/"/g, '');
          
          // Handle percentage values
          if (cleanValue.includes('%')) {
            return Number(cleanValue.replace('%', '').replace(/,/g, '')) / 100;
          }
          
          // Handle currency values
          if (cleanValue.startsWith('$')) {
            cleanValue = cleanValue.substring(1);
          }
          
          // Remove commas and convert to number
          const number = Number(cleanValue.replace(/,/g, ''));
          return isNaN(number) ? 0 : number;
        };

        // Convert data rows to campaign objects (skip header row)
        const parsedCampaigns = rows.slice(1).map((row, index) => {
          const campaign = {
            id: `campaign-${index}`,
            type: 'search', // Default value, adjust as needed
            isBrand: false, // Default value, adjust as needed
            metrics: {}
          };
          
          // Map each column to the appropriate property
          headers.forEach((header, i) => {
            const value = row[i]?.trim() || '';
            
            // Map specific columns to campaign properties
            if (header.toLowerCase() === 'campaign name') {
              campaign.name = value;
            } else if (header.toLowerCase() === 'campaign type') {
              campaign.type = value.toLowerCase();
            } else if (header.toLowerCase() === 'is brand') {
              campaign.isBrand = value.toLowerCase() === 'true' || value === '1';
            } else {
              // All other columns are treated as metrics
              campaign.metrics[header.toLowerCase()] = parseNumber(value);
            }
          });
          
          return campaign;
        });

        // Filter out invalid entries
        const validCampaigns = parsedCampaigns.filter(campaign => 
          campaign.name && 
          (campaign.type === 'search' || campaign.type === 'display')
        );

        if (validCampaigns.length > 0) {
          setCampaigns(validCampaigns);
        } else {
          // Fallback to mock data if no valid campaigns
          console.warn('No valid campaigns found in the spreadsheet, using mock data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesType = campaign.type === campaignType;
      const matchesBrand = brandType === 'all' 
        ? true 
        : brandType === 'brand' 
          ? campaign.isBrand 
          : !campaign.isBrand;
      return matchesType && matchesBrand;
    });
  }, [campaignType, brandType, campaigns]);

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

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading data from Google Sheets...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            <p>Error loading data: {error}</p>
            <p className="text-sm">Using mock data instead.</p>
          </div>
        )}

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
