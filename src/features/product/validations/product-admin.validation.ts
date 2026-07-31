import { z } from 'zod';

import { PRODUCT_CATEGORY_IDS } from '@/shared/const/product-categories.const';
import { PRODUCT_DIVISIONS } from '@/shared/const/product.const';

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const productFields = {
  name: z.string().min(1, 'სახელი სავალდებულოა'),
  slug: z
    .string()
    .min(1, 'slug სავალდებულოა')
    .regex(SLUG_RE, 'slug უნდა შედგებოდეს პატარა ლათინური ასოებისა და ტირეებისგან'),
  description: z.string().optional(),
  division: z.enum(PRODUCT_DIVISIONS),
  category: z.enum(PRODUCT_CATEGORY_IDS).optional(),
  brand: z.string().optional(),
  price: z.coerce.number().min(0, 'ფასი უნდა იყოს 0-ზე მეტი ან ტოლი'),
  discountPrice: z.coerce.number().min(0).optional().nullable(),
  skinType: z.array(z.string()).optional(),
  skinConcern: z.array(z.string()).optional(),
  sku: z.string().optional().nullable(),
  stock: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
};

export const ProductCreateSchema = z.object(productFields).refine(
  (val) => val.discountPrice == null || val.discountPrice < val.price,
  { message: 'discountPrice უნდა იყოს price-ზე ნაკლები', path: ['discountPrice'] }
);

export type ProductCreateType = z.infer<typeof ProductCreateSchema>;

export const ProductUpdateSchema = z.object(productFields).partial();

export type ProductUpdateType = z.infer<typeof ProductUpdateSchema>;
