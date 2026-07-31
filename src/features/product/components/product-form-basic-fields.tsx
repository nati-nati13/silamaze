'use client';

import {
  DIVISION_LABELS,
  type ProductFormValues,
} from '@/features/product/validations/product-form.validation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { NativeSelect } from '@/shared/components/ui/select';
import { PRODUCT_CATEGORIES } from '@/shared/const/product-categories.const';
import { PRODUCT_DIVISIONS } from '@/shared/const/product.const';

import type { UseFormReturn } from 'react-hook-form';

const TEXTAREA_CLASS =
  'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ' +
  'transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ' +
  'focus-visible:ring-ring';

type Props = {
  form: UseFormReturn<ProductFormValues>;
  onSlugTouched: () => void;
};

export const ProductFormBasicFields = ({ form, onSlugTouched }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>სახელი *</FormLabel>
              <FormControl>
                <Input placeholder="მაგ: Hydrating Face Cream" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug *</FormLabel>
              <FormControl>
                <Input
                  placeholder="hydrating-face-cream"
                  {...field}
                  onChange={(e) => {
                    onSlugTouched();
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>აღწერა</FormLabel>
            <FormControl>
              <textarea rows={3} className={TEXTAREA_CLASS} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Division *</FormLabel>
              <FormControl>
                <NativeSelect {...field}>
                  {PRODUCT_DIVISIONS.map((d) => (
                    <option key={d} value={d}>
                      {DIVISION_LABELS[d]}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>კატეგორია</FormLabel>
              <FormControl>
                <NativeSelect {...field} value={field.value ?? ''}>
                  <option value="">— არ არჩეულა —</option>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ბრენდი</FormLabel>
            <FormControl>
              <Input placeholder="მაგ: Dermako" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
