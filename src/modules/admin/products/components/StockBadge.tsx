interface StockBadgeProps {
  stock: number;
}

export const StockBadge = ({ stock }: StockBadgeProps) => {
  let colorClass = 'bg-emerald-100 text-emerald-700'; // > 10
  if (stock < 5) {
    colorClass = 'bg-red-100 text-red-700';
  } else if (stock <= 10) {
    colorClass = 'bg-amber-100 text-amber-700';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {stock} units
    </span>
  );
};
