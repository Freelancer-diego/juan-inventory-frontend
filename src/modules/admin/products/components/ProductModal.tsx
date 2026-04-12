import { useState, useEffect, useRef } from 'react';
import type { Product, Category } from '../../../../types';
import { X, ImageIcon, Loader2 } from 'lucide-react';
import { dialog } from '../../../../shared/utils/dialog';
import { productsService } from '../services/products.service';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: any) => Promise<void>;
  product?: Product;
  categories: Category[];
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;

/** Formatea un número como pesos colombianos sin símbolo de moneda (solo separador de miles) */
const formatThousands = (value: number): string =>
  value > 0 ? new Intl.NumberFormat('es-CO').format(value) : '';

export const ProductModal = ({ isOpen, onClose, onSubmit, product, categories }: ProductModalProps) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: 0,
    stock: 0,
    image: '',
    categoryId: '',
  });
  // Displays para los campos numéricos (texto formateado que ve el usuario)
  const [priceDisplay, setPriceDisplay] = useState('');
  const [stockDisplay, setStockDisplay] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image || '',
        categoryId: product.categoryId || '',
      });
      setPriceDisplay(formatThousands(product.price));
      setStockDisplay(product.stock > 0 ? product.stock.toString() : '');
      setPreviewUrl(product.image || '');
    } else {
      setFormData({ id: '', name: '', price: 0, stock: 0, image: '', categoryId: '' });
      setPriceDisplay('');
      setStockDisplay('');
      setPreviewUrl('');
    }
    setSelectedFile(null);
    setFileError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    setFormData(f => ({ ...f, price: num }));
    setPriceDisplay(raw ? new Intl.NumberFormat('es-CO').format(num) : '');
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setStockDisplay(raw);
    setFormData(f => ({ ...f, stock: raw ? parseInt(raw, 10) : 0 }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Solo se permiten archivos JPG, PNG o WEBP.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`El archivo no debe superar ${MAX_SIZE_MB} MB.`);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;

      if (selectedFile) {
        setUploadingImage(true);
        try {
          imageUrl = await productsService.uploadImage(selectedFile);
        } finally {
          setUploadingImage(false);
        }
      }

      await onSubmit({ ...formData, image: imageUrl });
      onClose();
    } catch (error) {
      console.error(error);
      dialog.error('Verifica los datos e intenta de nuevo.', 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  const isEdit = !!product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* ID — solo en creación */}
          {!isEdit && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">ID (Slug)</label>
              <input
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                value={formData.id}
                onChange={e => setFormData({ ...formData, id: e.target.value })}
                placeholder="ej. tornillo-m8-ferreteria"
              />
              <p className="text-xs text-slate-400">Identificador único del producto</p>
            </div>
          )}

          {/* Nombre */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Nombre</label>
            <input
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nombre del producto"
            />
          </div>

          {/* Categoría */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Categoría</label>
            <select
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white text-slate-700"
              value={formData.categoryId}
              onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
            >
              <option value="" disabled>Selecciona una categoría...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Precio & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Precio (COP)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                  $
                </span>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={priceDisplay}
                  onChange={handlePriceChange}
                  placeholder="0"
                />
              </div>
              {priceDisplay && (
                <p className="text-xs text-slate-400">
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                  }).format(formData.price)}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Stock Inicial</label>
              <input
                required
                type="text"
                inputMode="numeric"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={stockDisplay}
                onChange={handleStockChange}
                placeholder="0"
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Imagen del producto <span className="text-slate-400 font-normal">(Opcional)</span>
            </label>

            {previewUrl && (
              <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={() => setPreviewUrl('')}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl('');
                    setSelectedFile(null);
                    setFormData(f => ({ ...f, image: '' }));
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-slate-500 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {!previewUrl && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <ImageIcon size={28} className="text-slate-300" />
                <div className="text-center">
                  <p className="text-sm text-slate-500">
                    <span className="text-blue-600 font-medium">Selecciona un archivo</span>
                  </p>
                  <p className="text-xs text-slate-400">JPG, PNG o WEBP · máx. 5 MB</p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            {fileError && <p className="text-xs text-red-500">{fileError}</p>}
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              {(loading || uploadingImage) && <Loader2 size={16} className="animate-spin" />}
              {uploadingImage ? 'Subiendo imagen...' : loading ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Crear Producto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
