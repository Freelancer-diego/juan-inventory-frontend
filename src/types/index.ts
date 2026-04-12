export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
}

export const SaleStatus = {
  PENDIENTE: 'PENDIENTE',
  VALIDADA: 'VALIDADA',
  CANCELADA: 'CANCELADA',
} as const;

export type SaleStatus = typeof SaleStatus[keyof typeof SaleStatus];


export interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  status: SaleStatus;
  customerName: string;
  customerPhone: string;
  saleCode?: string;
  orderSummary?: string;
}

export interface SalesTrendData {
  date: string;
  pending: number;
  validated: number;
  canceled: number;
}

export interface TopSellingProduct {
  name: string;
  sold: number;
}
