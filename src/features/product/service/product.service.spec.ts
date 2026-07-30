import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/features/product/repository/product.repository', () => ({
  productRepository: {
    find: vi.fn(),
    count: vi.fn(),
  },
}));

import { productRepository } from '@/features/product/repository/product.repository';

import { listProductsService } from './product.service';

const mockFind = vi.mocked(productRepository.find);
const mockCount = vi.mocked(productRepository.count);

const baseDoc = {
  _id: { toString: () => 'p1' },
  name: 'Test Cream',
  slug: 'test-cream',
  description: '',
  division: 'beauty',
  category: 'face-creams',
  brand: 'Dermako',
  price: 100,
  discountPrice: null,
  skinType: [],
  skinConcern: [],
  images: [],
  sku: null,
  stock: 10,
  isActive: true,
};

describe('listProductsService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns mapped products with pagination', async () => {
    mockFind.mockResolvedValueOnce([baseDoc] as never);
    mockCount.mockResolvedValueOnce(1);

    const result = await listProductsService({ page: 1, limit: 12 } as never);

    expect(result.status).toBe(200);
    expect(result.data).toEqual({
      products: [
        {
          id: 'p1',
          name: 'Test Cream',
          slug: 'test-cream',
          description: '',
          division: 'beauty',
          category: 'face-creams',
          brand: 'Dermako',
          price: 100,
          discountPrice: null,
          skinType: [],
          skinConcern: [],
          images: [],
          sku: null,
          stock: 10,
          isActive: true,
        },
      ],
      total: 1,
      page: 1,
      totalPages: 1,
    });
  });

  it('always filters isActive: true and applies division/category/brand filters', async () => {
    mockFind.mockResolvedValueOnce([]);
    mockCount.mockResolvedValueOnce(0);

    await listProductsService({
      page: 1,
      limit: 12,
      division: 'beauty',
      category: 'serums',
      brand: 'Dermako',
    } as never);

    expect(mockFind).toHaveBeenCalledWith(
      { isActive: true, division: 'beauty', category: 'serums', brand: 'Dermako' },
      0,
      12
    );
  });

  it('builds a case-insensitive $or search filter on name/brand', async () => {
    mockFind.mockResolvedValueOnce([]);
    mockCount.mockResolvedValueOnce(0);

    await listProductsService({ page: 1, limit: 12, search: 'cream' } as never);

    expect(mockFind).toHaveBeenCalledWith(
      {
        isActive: true,
        $or: [
          { name: { $regex: 'cream', $options: 'i' } },
          { brand: { $regex: 'cream', $options: 'i' } },
        ],
      },
      0,
      12
    );
  });

  it('computes totalPages correctly and applies skip for page > 1', async () => {
    mockFind.mockResolvedValueOnce([]);
    mockCount.mockResolvedValueOnce(25);

    const result = await listProductsService({ page: 2, limit: 12 } as never);

    expect(mockFind).toHaveBeenCalledWith({ isActive: true }, 12, 12);
    expect(result.data).toMatchObject({ total: 25, page: 2, totalPages: 3 });
  });
});
