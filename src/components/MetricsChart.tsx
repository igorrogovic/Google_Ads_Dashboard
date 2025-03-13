import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Campaign, TimeRange } from '../types';
import { format, parseISO, startOfWeek, startOfMonth } from 'date-fns';

interface MetricsChartProps {
  data: Campaign[];
  timeRange: TimeRange;
}

export function MetricsChart({ data, timeRange }: MetricsChartProps) {
  const aggregateData = (campaigns: Campaign[]) => {
    const metricsMap = new Map();

    campaigns.forEach(campaign => {
      campaign.metrics.forEach(metric => {
        const date = parseISO(metric.date);
        let key = metric.date;

        if (timeRange === 'weekly') {
          key = format(startOfWeek(date), 'yyyy-MM-dd');
        } else if (timeRange === 'monthly') {
          key = format(startOfMonth(date), 'yyyy-MM');
        }

        if (!metricsMap.has(key)) {
          metricsMap.set(key, {
            date: key,
            impressions: 0,
            clicks: 0,
            conversions: 0,
            cost: 0,
          });
        }

        const current = metricsMap.get(key);
        metricsMap.set(key, {
          ...current,
          impressions: current.impressions + metric.impressions,
          clicks: current.clicks + metric.clicks,
          conversions: current.conversions + metric.conversions,
          cost: current.cost + metric.cost,
        });
      });
    });

    return Array.from(metricsMap.values());
  };

  const chartData = aggregateData(data);

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-lg shadow-sm">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              if (timeRange === 'monthly') {
                return format(parseISO(date), 'MMM yyyy');
              }
              return format(parseISO(date), 'MMM dd');
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="impressions" stroke="#8884d8" name="Impressions" />
          <Line type="monotone" dataKey="clicks" stroke="#82ca9d" name="Clicks" />
          <Line type="monotone" dataKey="conversions" stroke="#ffc658" name="Conversions" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}