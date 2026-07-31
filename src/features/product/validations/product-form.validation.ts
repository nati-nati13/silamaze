import { z } from 'zod';

import { PRODUCT_DIVISIONS } from '@/shared/const/product.const';

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const DIVISION_LABELS: Record<string, string> = {
  beauty: 'Dermako Beauty',
  academy: 'Dermako Academy',
  products: 'Dermako Products',
};

export const ProductFormSchema = z
  .object({
    name: z.string().min(1, 'სახელი სავალდებულოა'),
    slug: z
      .string()
      .min(1, 'slug სავალდებულოა')
      .regex(SLUG_RE, 'პატარა ლათინური ასოები და ტირეები მხოლოდ'),
    description: z.string().optional(),
    division: z.enum(PRODUCT_DIVISIONS),
    category: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().min(0, 'ფასი უნდა იყოს 0-ზე მეტი ან ტოლი'),
    discountPrice: z.number().min(0).optional(),
    skinType: z.string().optional(),
    skinConcern: z.string().optional(),
    sku: z.string().optional(),
    stock: z.number().int().min(0).optional(),
    isActive: z.boolean(),
  })
  .refine((val) => !val.discountPrice || val.discountPrice < val.price, {
    message: 'discountPrice უნდა იყოს price-ზე ნაკლები',
    path: ['discountPrice'],
  });

export type ProductFormValues = z.infer<typeof ProductFormSchema>;

export const toCommaList = (items: string[]): string => items.join(', ');

export const fromCommaList = (value: string | undefined): string[] =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
