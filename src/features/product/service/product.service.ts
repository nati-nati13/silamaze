import { productRepository } from '@/features/product/repository/product.repository';
import { Product, ProductListResult } from '@/features/product/types/product.types';
import {
  ProductCreateType,
  ProductUpdateType,
} from '@/features/product/validations/product-admin.validation';
import { ProductQueryType } from '@/features/product/validations/product.validation';
import { ServiceResult } from '@/shared/types/common';

const PAGE_SIZE_DEFAULT = 20;

function toProduct(doc: {
  _id: { toString(): string };
  name: string;
  slug: string;
  description?: string | null;
  division: string;
  category?: string | null;
  brand?: string | null;
  price: number;
  discountPrice?: number | null;
  skinType?: string[] | null;
  skinConcern?: string[] | null;
  images?: string[] | null;
  sku?: string | null;
  stock?: number | null;
  isActive: boolean;
}): Product {
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    description: doc.description ?? '',
    division: doc.division as Product['division'],
    category: (doc.category as Product['category']) ?? null,
    brand: doc.brand ?? '',
    price: doc.price,
    discountPrice: doc.discountPrice ?? null,
    skinType: doc.skinType ?? [],
    skinConcern: doc.skinConcern ?? [],
    images: doc.images ?? [],
    sku: doc.sku ?? null,
    stock: doc.stock ?? 0,
    isActive: doc.isActive,
  };
}

export async function listProductsService(
  query: ProductQueryType
): Promise<ServiceResult<ProductListResult>> {
  const filter: Record<string, unknown> = { isActive: true };
  if (query.division) filter.division = query.division;
  if (query.category) filter.category = query.category;
  if (query.brand) filter.brand = query.brand;
  if (query.skinType) filter.skinType = query.skinType;
  if (query.skinConcern) filter.skinConcern = query.skinConcern;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { brand: { $regex: query.search, $options: 'i' } },
    ];
  }

  const skip = (query.page - 1) * query.limit;

  const [docs, total] = await Promise.all([
    productRepository.find(filter, skip, query.limit),
    productRepository.count(filter),
  ]);

  return {
    data: {
      products: docs.map(toProduct),
      total,
      page: query.page,
      totalPages: Math.max(1, Math.ceil(total / query.limit)),
    },
    status: 200,
  };
}

// Admin listing — unlike listProductsService, does not hide inactive products.
export async function listProductsForAdminService(query: {
  page?: number;
  search?: string;
}): Promise<ServiceResult<ProductListResult>> {
  const page = query.page ?? 1;
  const filter: Record<string, unknown> = {};
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { brand: { $regex: query.search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * PAGE_SIZE_DEFAULT;

  const [docs, total] = await Promise.all([
    productRepository.find(filter, skip, PAGE_SIZE_DEFAULT),
    productRepository.count(filter),
  ]);

  return {
    data: {
      products: docs.map(toProduct),
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE_DEFAULT)),
    },
    status: 200,
  };
}

export async function getProductByIdService(
  id: string
): Promise<ServiceResult<Product>> {
  const doc = await productRepository.findById(id);
  if (!doc) return { data: { error: 'NOT_FOUND' }, status: 404 };
  return { data: toProduct(doc), status: 200 };
}

export async function createProductService(
  input: ProductCreateType
): Promise<ServiceResult<Product>> {
  const existing = await productRepository.findBySlug(input.slug);
  if (existing) return { data: { error: 'SLUG_TAKEN' }, status: 409 };

  const id = await productRepository.create({
    name: input.name,
    slug: input.slug,
    description: input.description ?? '',
    division: input.division,
    category: input.category,
    brand: input.brand ?? '',
    price: input.price,
    discountPrice: input.discountPrice ?? null,
    skinType: input.skinType ?? [],
    skinConcern: input.skinConcern ?? [],
    sku: input.sku ?? null,
    stock: input.stock ?? 0,
    isActive: input.isActive ?? true,
  });

  const doc = await productRepository.findById(id);
  return { data: toProduct(doc!), status: 201 };
}

export async function updateProductService(
  id: string,
  input: ProductUpdateType
): Promise<ServiceResult<Product>> {
  const current = await productRepository.findById(id);
  if (!current) return { data: { error: 'NOT_FOUND' }, status: 404 };

  if (input.slug && input.slug !== current.slug) {
    const existing = await productRepository.findBySlug(input.slug);
    if (existing) return { data: { error: 'SLUG_TAKEN' }, status: 409 };
  }

  const nextPrice = input.price ?? current.price;
  const nextDiscountPrice =
    input.discountPrice !== undefined ? input.discountPrice : current.discountPrice ?? null;
  if (nextDiscountPrice != null && nextDiscountPrice >= nextPrice) {
    return { data: { error: 'DISCOUNT_PRICE_TOO_HIGH' }, status: 400 };
  }

  const updated = await productRepository.updateById(id, input);
  return { data: toProduct(updated!), status: 200 };
}

export async function deleteProductService(id: string): Promise<ServiceResult<{ id: string }>> {
  const current = await productRepository.findById(id);
  if (!current) return { data: { error: 'NOT_FOUND' }, status: 404 };

  // soft delete: keep the record (order/reference history), just hide it from listings
  await productRepository.updateById(id, { isActive: false });
  return { data: { id }, status: 200 };
}
