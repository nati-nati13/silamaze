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
import { AVAILABLE_TIMES, BOOKING_SERVICES } from '@/shared/const/booking.const';
import { LOCATIONS } from '@/shared/const/contacts.const';
import { COURSES } from '@/shared/const/courses.const';

const TEXTAREA_CLASS =
  'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ' +
  'transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ' +
  'focus-visible:ring-ring';

type Props = {
  control: Control<ReservationType>;
  isCourse: boolean;
};

export const ReservationFields = ({ control, isCourse }: Props) => {
  return (
    <>
      <FormField
        control={control}
        name="selection"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {isCourse ? 'აირჩიე სასწავლო კურსი *' : 'აირჩიე ესთეტიკური სერვისი *'}
            </FormLabel>
            <FormControl>
              <NativeSelect {...field}>
                <option value="">— აირჩიეთ სია ასარჩევად —</option>
                {isCourse
                  ? COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.price ? `${c.title} (${c.price})` : c.title}
                    </option>
                  ))
                  : BOOKING_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>სახელი და გვარი *</FormLabel>
            <FormControl>
              <Input placeholder="მაგ: ნინო ბერიძე" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ტელეფონის ნომერი *</FormLabel>
            <FormControl>
              <Input placeholder="მაგ: +995 599 12 34 56" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ელ-ფოსტა (შეტყობინებების მისაღებად)</FormLabel>
            <FormControl>
              <Input type="email" placeholder="მაგ: example@gmail.com" {...field} />
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

      <FormField
        control={control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>დამატებითი კომენტარი ან დეტალები</FormLabel>
            <FormControl>
              <textarea
                {...field}
                rows={3}
                placeholder="მაგ: მაქვს მგრძნობიარე კანი, ან კითხვები პროცედურასთან დაკავშირებით..."
                className={TEXTAREA_CLASS}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
