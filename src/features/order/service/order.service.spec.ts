import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/features/order/repository/order.repository', () => ({
  orderRepository: {
    find: vi.fn(),
    count: vi.fn(),
    findById: vi.fn(),
    updateById: vi.fn(),
  },
}));

import { orderRepository } from '@/features/order/repository/order.repository';

import {
  getOrderByIdService,
  listOrdersForAdminService,
  updateOrderStatusService,
} from './order.service';

const mockFind = vi.mocked(orderRepository.find);
const mockCount = vi.mocked(orderRepository.count);
const mockFindById = vi.mocked(orderRepository.findById);
const mockUpdateById = vi.mocked(orderRepository.updateById);

const baseDoc = {
  _id: { toString: () => 'o1' },
  customerName: 'Test Customer',
  customerPhone: '555000111',
  items: [
    {
      productName: 'Hydrating Cream',
      quantity: 2,
      unitPrice: 50,
      discountPrice: null,
      subtotal: 100,
    },
  ],
  totalAmount: 100,
  status: 'pending',
  paymentStatus: 'unpaid',
  createdAt: new Date('2026-01-01T00:00:00Z'),
};

describe('listOrdersForAdminService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns mapped orders with pagination', async () => {
    mockFind.mockResolvedValueOnce([baseDoc] as never);
    mockCount.mockResolvedValueOnce(1);

    const result = await listOrdersForAdminService({ page: 1 } as never);

    expect(result.status).toBe(200);
    expect(result.data).toMatchObject({
      orders: [
        {
          id: 'o1',
          customerName: 'Test Customer',
          customerPhone: '555000111',
          totalAmount: 100,
          status: 'pending',
          paymentStatus: 'unpaid',
        },
      ],
      total: 1,
      page: 1,
      totalPages: 1,
    });
  });

  it('applies status and paymentStatus filters', async () => {
    mockFind.mockResolvedValueOnce([]);
    mockCount.mockResolvedValueOnce(0);

    await listOrdersForAdminService({ page: 1, status: 'confirmed', paymentStatus: 'paid' } as never);

    expect(mockFind).toHaveBeenCalledWith({ status: 'confirmed', paymentStatus: 'paid' }, 0, 20);
  });

  it('computes totalPages and applies skip for page > 1', async () => {
    mockFind.mockResolvedValueOnce([]);
    mockCount.mockResolvedValueOnce(45);

    const result = await listOrdersForAdminService({ page: 2 } as never);

    expect(mockFind).toHaveBeenCalledWith({}, 20, 20);
    expect(result.data).toMatchObject({ total: 45, page: 2, totalPages: 3 });
  });
});

describe('getOrderByIdService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns NOT_FOUND when the order does not exist', async () => {
    mockFindById.mockResolvedValueOnce(null);

    const result = await getOrderByIdService('o1');

    expect(result.status).toBe(404);
    expect(result.data).toEqual({ error: 'NOT_FOUND' });
  });

  it('returns the mapped order when found', async () => {
    mockFindById.mockResolvedValueOnce(baseDoc as never);

    const result = await getOrderByIdService('o1');

    expect(result.status).toBe(200);
    expect(result.data).toMatchObject({ id: 'o1', customerName: 'Test Customer' });
  });
});

describe('updateOrderStatusService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns NOT_FOUND when the order does not exist', async () => {
    mockFindById.mockResolvedValueOnce(null);

    const result = await updateOrderStatusService('o1', { status: 'confirmed' });

    expect(result.status).toBe(404);
    expect(result.data).toEqual({ error: 'NOT_FOUND' });
    expect(mockUpdateById).not.toHaveBeenCalled();
  });

  it('updates status and paymentStatus and returns the mapped order', async () => {
    mockFindById.mockResolvedValueOnce(baseDoc as never);
    mockUpdateById.mockResolvedValueOnce({
      ...baseDoc,
      status: 'completed',
      paymentStatus: 'paid',
    } as never);

    const result = await updateOrderStatusService('o1', { status: 'completed', paymentStatus: 'paid' });

    expect(mockUpdateById).toHaveBeenCalledWith('o1', { status: 'completed', paymentStatus: 'paid' });
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject({ status: 'completed', paymentStatus: 'paid' });
  });
});
