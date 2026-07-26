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
import { Switch } from '@/shared/components/ui/switch';

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
  const giftToFriend = useWatch({ control, name: 'giftToFriend' });

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

      {delivery === 'ელექტრონული' && (
        <FormField
          control={control}
          name="giftToFriend"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                <div>
                  <FormLabel className="text-sm font-medium text-foreground">
                    ვჩუქნი მეგობარს
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    ჩართეთ, თუ გსურთ ბარათი პირდაპირ მიმღების ელ-ფოსტაზე გაიგზავნოს.
                  </p>
                </div>
                <FormControl>
                  <Switch checked={field.value === true} onCheckedChange={field.onChange} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      )}

      {delivery === 'ელექტრონული' && giftToFriend && (
        <FormField
          control={control}
          name="recipientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>მიმღების ელ-ფოსტა *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="მაგ: friend@gmail.com"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                ბარათი გაეგზავნება მიმღებს, გადახდის დასტური კი — თქვენს ელ-ფოსტაზე.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
