'use client';

import type { ProductFormValues } from '@/features/product/validations/product-form.validation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

import type { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<ProductFormValues>;
};

export const ProductFormPricingFields = ({ form }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ფასი (₾) *</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                step="0.01"
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="discountPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ფასდაკლებული ფასი (₾)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                step="0.01"
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(e.target.value ? e.target.valueAsNumber : undefined)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
