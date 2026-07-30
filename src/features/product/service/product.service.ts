import { productRepository } from '@/features/product/repository/product.repository';
import { Product, ProductListResult } from '@/features/product/types/product.types';
import { ProductQueryType } from '@/features/product/validations/product.validation';
import { ServiceResult } from '@/shared/types/common';

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

  const products: Product[] = docs.map((doc) => ({
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
  }));

  return {
    data: {
      products,
      total,
      page: query.page,
      totalPages: Math.max(1, Math.ceil(total / query.limit)),
    },
    status: 200,
  };
}
