import { Campaign } from './types';

// Function to fetch data from a published Google Sheet
export async function fetchCampaignsFromSheet(): Promise<Campaign[]> {
  // Google Sheets must be published to the web as CSV or JSON
  // Format: https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv
  // Or use the JSON feed: https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:json
  
  const SHEET_ID = '2PACX-1vT38NZsUT4crVOdQVSSRkSLn6vVwCDI4QSSQ5bGNN1mGPMlT3cWNd-I0LAMGONEQ-vl5s6O3krnPl4L';
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
  
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    // Google's JSON response has some extra characters we need to remove
    const jsonData = JSON.parse(text.substring(47).slice(0, -2));
    
    // Transform the Google Sheets data into Campaign objects
    const campaigns: Campaign[] = jsonData.table.rows.map((row: any, index: number) => {
      const cells = row.c;
      
      // Assuming your sheet has columns: id, name, type, isBrand, metrics (as JSON string)
      return {
        id: cells[0]?.v?.toString() || `${index}`,
        name: cells[1]?.v?.toString() || '',
        type: cells[2]?.v?.toString() || 'search',
        isBrand: cells[3]?.v === 'true' || cells[3]?.v === true,
        metrics: cells[4]?.v ? JSON.parse(cells[4]?.v) : []
      };
    });
    
    return campaigns;
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error);
    // Fallback to mock data if fetch fails
    return mockCampaigns;
  }
}

// Keep the mock data as fallback
const generateMetrics = (days: number) => {
  return Array.from({ length: days }).map((_, index) => ({
    date: format(addDays(new Date('2024-01-01'), index), 'yyyy-MM-dd'),
    impressions: Math.floor(Math.random() * 10000),
    clicks: Math.floor(Math.random() * 1000),
    conversions: Math.floor(Math.random() * 100),
    cost: Math.random() * 1000,
    impressionShare: Math.random() * 100,
    topImpressionShare: Math.random() * 100,
    qualityScore: Math.floor(Math.random() * 10) + 1,
  }));
};

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Brand Search Campaign',
    type: 'search',
    isBrand: true,
    metrics: generateMetrics(90),
  },
  {
    id: '2',
    name: 'Non-Brand Search Campaign',
    type: 'search',
    isBrand: false,
    metrics: generateMetrics(90),
  },
  {
    id: '3',
    name: 'Display Remarketing',
    type: 'display',
    isBrand: true,
    metrics: generateMetrics(90),
  },
  {
    id: '4',
    name: 'Shopping Campaign',
    type: 'shopping',
    isBrand: false,
    metrics: generateMetrics(90),
  },
  {
    id: '5',
    name: 'Performance Max Campaign',
    type: 'performance-max',
    isBrand: false,
    metrics: generateMetrics(90),
  },
];
