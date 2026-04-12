import type { Product } from '../../../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

interface StockChartProps {
    products: Product[];
}

export const StockChart = ({ products }: StockChartProps) => {
  // Slice to max 10 items to prevent overcrowding
  const limitedProducts = products.slice(0, 10);
  
  const data = limitedProducts.map(p => ({
    name: p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name,
    fullName: p.name, // Store full name for tooltip
    stock: p.stock,
  }));

  // Calculate dynamic height: 60px per item or min 100% of container
  // This ensures the bars have enough space and triggers scroll if needed
  const contentHeight = Math.max(100, data.length * 60);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="mb-4 shrink-0">
        <h3 className="text-base font-bold text-slate-800">Alerta de Stock Bajo</h3>
        <p className="text-sm text-slate-500">Top {data.length} críticos (requieren atención)</p>
      </div>
      
      <div className="flex-1 w-full relative min-h-0">
        <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar">
            <div style={{ height: `${contentHeight}px`, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                    <XAxis type="number" fontSize={11} tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={120} 
                        fontSize={11} 
                        tick={{ fill: '#475569' }} 
                        axisLine={false} 
                        tickLine={false}
                        interval={0} 
                    />
                    <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number | undefined) => [`${value ?? 0} unidades`, 'Stock']}
                        labelFormatter={(label, payload) => {
                            if (payload && payload.length > 0 && payload[0].payload) {
                                return payload[0].payload.fullName;
                            }
                            return label;
                        }}
                    />
                    <Bar dataKey="stock" radius={[0, 4, 4, 0]} barSize={24}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.stock < 10 ? '#ef4444' : '#3b82f6'} />
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
