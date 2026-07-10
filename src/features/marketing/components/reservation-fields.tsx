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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>თქვენი სახელი *</FormLabel>
              <FormControl>
                <Input placeholder="მაგ: მარიამ ბერიძე" {...field} />
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
                <Input placeholder="მაგ: 599 00 00 00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="selection"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {isCourse ? 'სასურველი კურსი *' : 'სასურველი ესთეტიკური სერვისი *'}
            </FormLabel>
            <FormControl>
              <NativeSelect {...field}>
                <option value="">— აირჩიეთ სია ასარჩევად —</option>
                {isCourse
                  ? COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ვიზიტის თარიღი *</FormLabel>
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
              <FormLabel>სასურველი საათი *</FormLabel>
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
            <FormLabel>დამატებითი შეტყობინება</FormLabel>
            <FormControl>
              <textarea
                {...field}
                rows={3}
                placeholder="მაგ: მინდა უფასო კანის კომპიუტერული დიაგნოსტიკის ჩატარება..."
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
