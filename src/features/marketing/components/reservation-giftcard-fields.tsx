import { type Control, useWatch } from 'react-hook-form';

import { ReservationType } from '@/features/booking/validations/reservation.validation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

const USAGE_OPTIONS = [
  { value: 'თბილისი', label: 'თბილისი' },
  { value: 'საგარეჯო', label: 'საგარეჯო' },
  { value: 'ორივე', label: 'ორივე ფილიალი' },
] as const;

const DELIVERY_OPTIONS = [
  { value: 'ელექტრონული', label: 'ელექტრონული ბარათი' },
  { value: 'ბეჭდური', label: 'ბეჭდური ბარათი' },
] as const;

const optionClass = (active: boolean) =>
  `rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-foreground'
      : 'border-border text-muted-foreground hover:border-brand-green/50'
  }`;

type Props = {
  control: Control<ReservationType>;
};

export const ReservationGiftCardFields = ({ control }: Props) => {
  const delivery = useWatch({ control, name: 'delivery' });

  return (
    <>
      <FormField
        control={control}
        name="usage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>სად იქნება გამოყენებული? *</FormLabel>
            <FormControl>
              <div className="grid grid-cols-3 gap-3">
                {USAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => field.onChange(opt.value)}
                    className={optionClass(field.value === opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FormControl>
            <p className="text-xs text-muted-foreground">
              ბარათი მოქმედებს გაცემიდან 12 თვის განმავლობაში.
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="delivery"
        render={({ field }) => (
          <FormItem>
            <FormLabel>მიწოდების მეთოდი *</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-3">
                {DELIVERY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => field.onChange(opt.value)}
                    className={optionClass(field.value === opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {delivery === 'ბეჭდური' && (
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>მიწოდების მისამართი *</FormLabel>
              <FormControl>
                <Input
                  placeholder="მაგ: ქ. თბილისი, ვაჟა-ფშაველას გამზ. 8, ბ. 12"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
