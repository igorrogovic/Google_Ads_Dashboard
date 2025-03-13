import { Campaign } from './types';
import { addDays, format } from 'date-fns';

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
];