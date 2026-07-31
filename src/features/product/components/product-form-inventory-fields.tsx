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
import { Switch } from '@/shared/components/ui/switch';

import type { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<ProductFormValues>;
};

export const ProductFormInventoryFields = ({ form }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="skinType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>კანის ტიპი (მძიმით გამოყოფილი)</FormLabel>
              <FormControl>
                <Input placeholder="მშრალი, ცხიმიანი, ნორმალური" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skinConcern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>კანის პრობლემა (მძიმით გამოყოფილი)</FormLabel>
              <FormControl>
                <Input placeholder="აკნე, პიგმენტაცია" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="DRM-FC-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>მარაგი</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step="1"
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

      <FormField
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
              <FormLabel className="text-sm font-medium text-foreground">აქტიური</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};
