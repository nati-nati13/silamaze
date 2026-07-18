import { type Control } from 'react-hook-form';

import { ReservationType } from '@/features/booking/validations/reservation.validation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { NativeSelect } from '@/shared/components/ui/select';
import { AVAILABLE_TIMES } from '@/shared/const/booking.const';
import { LOCATIONS } from '@/shared/const/contacts.const';

type Props = {
  control: Control<ReservationType>;
};

export const ReservationVisitFields = ({ control }: Props) => {
  return (
    <>
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>აირჩიე ფილიალი (მდებარეობა) *</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-3">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.city}
                    type="button"
                    onClick={() => field.onChange(loc.city)}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      field.value === loc.city
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-brand-green/50'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-foreground">
                      დერმაკო {loc.city}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {loc.address}
                    </span>
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>თარიღი *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>სასურველი დრო *</FormLabel>
              <FormControl>
                <NativeSelect {...field}>
                  <option value="">— აირჩიეთ დრო —</option>
                  {AVAILABLE_TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
