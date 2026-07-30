import { ProductCategoryId } from '@/shared/const/product-categories.const';
import { ProductDivision } from '@/shared/const/product.const';

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  division: ProductDivision;
  category: ProductCategoryId | null;
  brand: string;
  price: number;
  discountPrice: number | null;
  skinType: string[];
  skinConcern: string[];
  images: string[];
  sku: string | null;
  stock: number;
  isActive: boolean;
};

export type ProductListResult = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};
