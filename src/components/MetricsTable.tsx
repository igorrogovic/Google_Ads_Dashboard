import React from 'react';
import { Campaign } from '../types';

interface MetricsTableProps {
  campaigns: Campaign[];
}

export function MetricsTable({ campaigns }: MetricsTableProps) {
  const calculateAverages = (campaign: Campaign) => {
    const metrics = campaign.metrics;
    return {
      impressionShare: metrics.reduce((acc, m) => acc + m.impressionShare, 0) / metrics.length,
      topImpressionShare: metrics.reduce((acc, m) => acc + m.topImpressionShare, 0) / metrics.length,
      qualityScore: metrics.reduce((acc, m) => acc + m.qualityScore, 0) / metrics.length,
    };
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Campaign
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brand/Non-Brand
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Impression Share
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Top Impression Share
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quality Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((campaign) => {
            const averages = calculateAverages(campaign);
            return (
              <tr key={campaign.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {campaign.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campaign.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campaign.isBrand ? 'Brand' : 'Non-Brand'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {averages.impressionShare.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {averages.topImpressionShare.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {averages.qualityScore.toFixed(1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}