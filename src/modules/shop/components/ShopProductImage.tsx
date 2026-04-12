import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ShopProductImageProps {
  src?: string;
  alt: string;
  /** Extra Tailwind classes forwarded to the wrapper div */
  className?: string;
  /** Whether to apply hover zoom (for cards). Default: false */
  zoom?: boolean;
}

/**
 * Consistent, elegant product image for the shop.
 * - Shows a shimmer skeleton while the image loads
 * - Fades in once ready (prevents layout flash)
 * - Falls back to a placeholder for missing or broken URLs
 * - Lazy-loads to save bandwidth
 */
export const ShopProductImage = ({
  src,
  alt,
  className = '',
  zoom = false,
}: ShopProductImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = !src || error;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-100 ${className}`}>
      {showFallback ? (
        /* ── Placeholder ─────────────────────────────────────── */
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-300 select-none">
          <ImageOff size={36} strokeWidth={1.5} />
          <span className="text-xs font-medium tracking-wide uppercase">Sin imagen</span>
        </div>
      ) : (
        <>
          {/* ── Shimmer skeleton (visible while loading) ──────── */}
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
          )}

          {/* ── Actual image ──────────────────────────────────── */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={[
              'absolute inset-0 w-full h-full object-cover',
              'transition-opacity duration-500',
              loaded ? 'opacity-100' : 'opacity-0',
              zoom ? 'group-hover:scale-105 transition-transform duration-500' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </>
      )}
    </div>
  );
};
