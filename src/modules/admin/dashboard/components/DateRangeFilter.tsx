import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

type Preset = 'today' | 'month' | 'custom';

export interface DateRange {
  from: string;
  to: string;
}

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const toISO = (d: Date) => d.toISOString().slice(0, 10);

const presets: { key: Preset; label: string }[] = [
  { key: 'today', label: 'Hoy' },
  { key: 'month', label: 'Este mes' },
  { key: 'custom', label: 'Personalizado' },
];

const getPresetRange = (preset: Preset): DateRange | null => {
  const now = new Date();
  if (preset === 'today') {
    const today = toISO(now);
    return { from: today, to: today };
  }
  if (preset === 'month') {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: toISO(firstDay), to: toISO(now) };
  }
  return null;
};

const detectPreset = (range: DateRange): Preset => {
  const todayRange = getPresetRange('today')!;
  const monthRange = getPresetRange('month')!;
  if (range.from === todayRange.from && range.to === todayRange.to) return 'today';
  if (range.from === monthRange.from && range.to === monthRange.to) return 'month';
  return 'custom';
};

const formatLabel = (range: DateRange): string => {
  const fmt = (s: string) =>
    new Date(`${s}T12:00:00`).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  return range.from === range.to ? fmt(range.from) : `${fmt(range.from)} – ${fmt(range.to)}`;
};

export const DateRangeFilter = ({ value, onChange }: DateRangeFilterProps) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customFrom, setCustomFrom] = useState(value.from);
  const [customTo, setCustomTo] = useState(value.to);
  const [customError, setCustomError] = useState('');

  const activePreset = detectPreset(value);

  const handlePreset = (preset: Preset) => {
    if (preset === 'custom') {
      setShowCustom(true);
      return;
    }
    setShowCustom(false);
    const range = getPresetRange(preset)!;
    onChange(range);
  };

  const applyCustom = () => {
    if (!customFrom || !customTo) {
      setCustomError('Selecciona ambas fechas.');
      return;
    }
    if (customFrom > customTo) {
      setCustomError('La fecha de inicio no puede ser posterior a la fecha fin.');
      return;
    }
    setCustomError('');
    setShowCustom(false);
    onChange({ from: customFrom, to: customTo });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      {/* Preset buttons */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
        {presets.map(p => {
          const isActive =
            p.key === 'custom'
              ? activePreset === 'custom'
              : activePreset === p.key;
          return (
            <button
              key={p.key}
              onClick={() => handlePreset(p.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {p.key === 'custom' && <ChevronDown size={13} />}
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Active range label */}
      <div className="flex items-center gap-1.5 text-sm text-slate-500">
        <Calendar size={14} className="text-slate-400" />
        <span className="font-medium text-slate-700">{formatLabel(value)}</span>
      </div>

      {/* Custom date inputs — inline panel */}
      {showCustom && (
        <div className="flex flex-wrap items-end gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Desde</label>
            <input
              type="date"
              value={customFrom}
              max={customTo || toISO(new Date())}
              onChange={e => { setCustomFrom(e.target.value); setCustomError(''); }}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Hasta</label>
            <input
              type="date"
              value={customTo}
              min={customFrom}
              max={toISO(new Date())}
              onChange={e => { setCustomTo(e.target.value); setCustomError(''); }}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div className="flex items-end gap-2 pb-0.5">
            <button
              onClick={applyCustom}
              className="px-4 py-1.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors"
            >
              Aplicar
            </button>
            <button
              onClick={() => { setShowCustom(false); setCustomError(''); }}
              className="px-4 py-1.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
          {customError && (
            <p className="w-full text-xs text-rose-600 font-medium">{customError}</p>
          )}
        </div>
      )}
    </div>
  );
};
