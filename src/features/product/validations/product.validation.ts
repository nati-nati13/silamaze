import { z } from 'zod';

import { PRODUCT_CATEGORY_IDS } from '@/shared/const/product-categories.const';
import { PRODUCT_DIVISIONS } from '@/shared/const/product.const';

export const ProductQuerySchema = z.object({
  division: z.enum(PRODUCT_DIVISIONS).optional(),
  category: z.enum(PRODUCT_CATEGORY_IDS).optional(),
  brand: z.string().optional(),
  skinType: z.string().optional(),
  skinConcern: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(12),
});

export type ProductQueryType = z.infer<typeof ProductQuerySchema>;
