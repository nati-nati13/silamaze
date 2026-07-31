import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/features/product/repository/product.repository', () => ({
  productRepository: {
    find: vi.fn(),
    count: vi.fn(),
    findById: vi.fn(),
    findBySlug: vi.fn(),
    create: vi.fn(),
    updateById: vi.fn(),
  },
}));

import { productRepository } from '@/features/product/repository/product.repository';

import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  listProductsService,
  updateProductService,
} from './product.service';

const mockFind = vi.mocked(productRepository.find);
const mockCount = vi.mocked(productRepository.count);
const mockFindById = vi.mocked(productRepository.findById);
const mockFindBySlug = vi.mocked(productRepository.findBySlug);
const mockCreate = vi.mocked(productRepository.create);
const mockUpdateById = vi.mocked(productRepository.updateById);

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

describe('getProductByIdService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns NOT_FOUND when the product does not exist', async () => {
    mockFindById.mockResolvedValueOnce(null);

    const result = await getProductByIdService('p1');

    expect(result.status).toBe(404);
    expect(result.data).toEqual({ error: 'NOT_FOUND' });
  });

  it('returns the mapped product when found', async () => {
    mockFindById.mockResolvedValueOnce(baseDoc as never);

    const result = await getProductByIdService('p1');

    expect(result.status).toBe(200);
    expect(result.data).toMatchObject({ id: 'p1', name: 'Test Cream' });
  });
});

describe('createProductService', () => {
  beforeEach(() => vi.clearAllMocks());

  const input = {
    name: 'New Cream',
    slug: 'new-cream',
    division: 'beauty',
    price: 50,
  };

  it('rejects when the slug is already taken', async () => {
    mockFindBySlug.mockResolvedValueOnce(baseDoc as never);

    const result = await createProductService(input as never);

    expect(result.status).toBe(409);
    expect(result.data).toEqual({ error: 'SLUG_TAKEN' });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('creates and returns the mapped product on success', async () => {
    mockFindBySlug.mockResolvedValueOnce(null);
    mockCreate.mockResolvedValueOnce('p2');
    mockFindById.mockResolvedValueOnce({ ...baseDoc, _id: { toString: () => 'p2' } } as never);

    const result = await createProductService(input as never);

    expect(result.status).toBe(201);
    expect(result.data).toMatchObject({ id: 'p2' });
  });
});

describe('updateProductService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns NOT_FOUND when the product does not exist', async () => {
    mockFindById.mockResolvedValueOnce(null);

    const result = await updateProductService('p1', { name: 'X' } as never);

    expect(result.status).toBe(404);
    expect(result.data).toEqual({ error: 'NOT_FOUND' });
  });

  it('rejects when changing to a slug already taken by another product', async () => {
    mockFindById.mockResolvedValueOnce(baseDoc as never);
    mockFindBySlug.mockResolvedValueOnce({ ...baseDoc, _id: { toString: () => 'other' } } as never);

    const result = await updateProductService('p1', { slug: 'taken-slug' } as never);

    expect(result.status).toBe(409);
    expect(result.data).toEqual({ error: 'SLUG_TAKEN' });
  });

  it('rejects when discountPrice >= price', async () => {
    mockFindById.mockResolvedValueOnce(baseDoc as never);

    const result = await updateProductService('p1', { discountPrice: 200 } as never);

    expect(result.status).toBe(400);
    expect(result.data).toEqual({ error: 'DISCOUNT_PRICE_TOO_HIGH' });
    expect(mockUpdateById).not.toHaveBeenCalled();
  });

  it('updates and returns the mapped product on success', async () => {
    mockFindById.mockResolvedValueOnce(baseDoc as never);
    mockUpdateById.mockResolvedValueOnce({ ...baseDoc, name: 'Updated Cream' } as never);

    const result = await updateProductService('p1', { name: 'Updated Cream' } as never);

    expect(result.status).toBe(200);
    expect(result.data).toMatchObject({ name: 'Updated Cream' });
  });
});

describe('deleteProductService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns NOT_FOUND when the product does not exist', async () => {
    mockFindById.mockResolvedValueOnce(null);

    const result = await deleteProductService('p1');

    expect(result.status).toBe(404);
    expect(result.data).toEqual({ error: 'NOT_FOUND' });
    expect(mockUpdateById).not.toHaveBeenCalled();
  });

  it('soft-deletes by setting isActive to false', async () => {
    mockFindById.mockResolvedValueOnce(baseDoc as never);
    mockUpdateById.mockResolvedValueOnce({ ...baseDoc, isActive: false } as never);

    const result = await deleteProductService('p1');

    expect(result.status).toBe(200);
    expect(result.data).toEqual({ id: 'p1' });
    expect(mockUpdateById).toHaveBeenCalledWith('p1', { isActive: false });
  });
});
