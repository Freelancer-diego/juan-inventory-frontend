import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { TopSellingProduct } from '../../../../types';

interface TopProductsChartProps {
    data: TopSellingProduct[];
}

export const TopProductsChart = ({ data }: TopProductsChartProps) => {
    const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

    // Limit to top 10
    const limitedData = data.slice(0, 10);

    const chartData = limitedData.map(p => ({
        ...p,
        displayName: p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name,
        fullName: p.name
    }));

    // Dynamic height calculation: 50px per item
    const contentHeight = Math.max(100, chartData.length * 50);

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm h-full flex flex-col overflow-hidden">
            <div className="mb-4 shrink-0">
                <h3 className="text-base font-bold text-slate-800 mb-1">Productos Más Vendidos</h3>
                <p className="text-xs text-slate-400">Top {chartData.length} rendimiento</p>
            </div>
            
            <div className="flex-1 w-full relative min-h-0">
                 <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar">
                    <div style={{ height: `${contentHeight}px`, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={chartData} margin={{ left: 10, right: 10 }}>
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="displayName" 
                                    type="category" 
                                    width={100} 
                                    fontSize={11} 
                                    tick={{ fill: '#475569' }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    interval={0}
                                />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}} 
                                    contentStyle={{ borderRadius: '8px' }} 
                                    formatter={(value: number | undefined) => [`${value ?? 0} vendidos`, 'Ventas']}
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload.length > 0 && payload[0].payload) {
                                            return payload[0].payload.fullName;
                                        }
                                        return label;
                                    }}
                                />
                                <Bar dataKey="sold" radius={[0, 4, 4, 0]} barSize={20}>
                                    {chartData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                 </div>
            </div>
        </div>
    );
};
