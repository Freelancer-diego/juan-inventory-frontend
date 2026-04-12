import { Package } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
}

export const ProductImage = ({ src, alt }: ProductImageProps) => {
  if (src) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className="h-10 w-10 rounded-lg object-cover border border-slate-200"
      />
    );
  }

  return (
    <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
      <Package size={20} />
    </div>
  );
};
