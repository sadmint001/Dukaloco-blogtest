
import React from 'react';
import StatsCard from '../../ui/StatsCard';
import { FileText, Users, TrendingUp } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface InsightsHubProps {
  postCount: number;
  userCount: number;
  chartData: any[];
}

const InsightsHub: React.FC<InsightsHubProps> = ({ postCount, userCount, chartData }) => {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatsCard title="Total Entries" value={postCount} icon={<FileText className="w-5 h-5 md:w-6 md:h-6" />} colorClass="indigo" />
        <StatsCard title="Verified Authors" value={userCount} icon={<Users className="w-5 h-5 md:w-6 md:h-6" />} colorClass="emerald" />
        <StatsCard title="Total Reach" value="48.2k" icon={<TrendingUp className="w-5 h-5 md:w-6 md:h-6" />} colorClass="amber" />
      </div>

      <div className="glass-card p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-3">
            <div className="w-1.5 md:w-2 h-6 md:h-8 bg-indigo-500 rounded-full"></div>
            Volume Analytics
          </h3>
        </div>
        <div className="h-[250px] md:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10, fontWeight: 600}} 
                dy={10} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.03)'}} 
                contentStyle={{
                  backgroundColor: '#0f172a', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#334155'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InsightsHub;
