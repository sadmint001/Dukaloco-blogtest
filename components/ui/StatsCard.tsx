
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, colorClass }) => (
  <div className={`glass-card p-8 rounded-[32px] flex items-center gap-6 group hover:border-${colorClass}-500/30 transition-all duration-500`}>
    <div className={`w-14 h-14 bg-${colorClass}-500/10 rounded-2xl flex items-center justify-center text-${colorClass}-400 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1">{title}</p>
    </div>
  </div>
);

export default StatsCard;
