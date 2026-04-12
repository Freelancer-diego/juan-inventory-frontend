import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SalesTrendData } from '../../../../types';

interface SalesStatusChartProps {
    sales: SalesTrendData[];
}

export const SalesStatusChart = ({ sales }: SalesStatusChartProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
         <div>
            <h3 className="text-base font-bold text-slate-800">Tendencia de Ingresos</h3>
            <p className="text-sm text-slate-500">Comportamiento de ventas en el tiempo</p>
         </div>
         <div className="flex gap-4 text-xs font-semibold">
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Validado</div>
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-300 mr-2"></span>Pendiente</div>
         </div>
      </div>
      
      <div className="flex-1 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
                dataKey="date"
                tickFormatter={(val: string) => new Date(`${val}T12:00:00`).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                interval={Math.max(0, Math.floor(sales.length / 10) - 1)}
                fontSize={11}
                tick={{ fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                dy={10}
            />
            <YAxis fontSize={11} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="validated" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorValid)" />
            <Area type="monotone" dataKey="pending" stroke="#cbd5e1" strokeWidth={2} fillOpacity={0} strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
