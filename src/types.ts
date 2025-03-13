export type TimeRange = 'daily' | 'weekly' | 'monthly';
export type CampaignType = 'search' | 'display' | 'shopping' | 'video';
export type BrandType = 'brand' | 'non-brand' | 'all';

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  isBrand: boolean;
  metrics: {
    date: string;
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    impressionShare: number;
    topImpressionShare: number;
    qualityScore: number;
  }[];
}