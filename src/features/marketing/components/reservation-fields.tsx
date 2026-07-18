import { type Control } from 'react-hook-form';

import { ReservationType } from '@/features/booking/validations/reservation.validation';
import { ReservationGiftCardFields } from '@/features/marketing/components/reservation-giftcard-fields';
import { ReservationVisitFields } from '@/features/marketing/components/reservation-visit-fields';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { NativeSelect } from '@/shared/components/ui/select';
import { BOOKING_SERVICES } from '@/shared/const/booking.const';
import { COURSES } from '@/shared/const/courses.const';
import { GIFT_CARD_NOMINALS } from '@/shared/const/gift-card.const';

const TEXTAREA_CLASS =
  'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ' +
  'transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ' +
  'focus-visible:ring-ring';

const SELECTION_LABEL: Record<ReservationType['type'], string> = {
  service: 'აირჩიე ესთეტიკური სერვისი *',
  course: 'აირჩიე სასწავლო კურსი *',
  giftcard: 'აირჩიე ბარათის ნომინალი *',
};

type Props = {
  control: Control<ReservationType>;
  type: ReservationType['type'];
};

export const ReservationFields = ({ control, type }: Props) => {
  const isGiftCard = type === 'giftcard';

  return (
    <>
      <FormField
        control={control}
        name="selection"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{SELECTION_LABEL[type]}</FormLabel>
            <FormControl>
              <NativeSelect {...field}>
                <option value="">— აირჩიეთ სია ასარჩევად —</option>
                {type === 'giftcard' &&
                  GIFT_CARD_NOMINALS.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.amount} — {n.description}
                    </option>
                  ))}
                {type === 'course' &&
                  COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.price ? `${c.title} (${c.price})` : c.title}
                    </option>
                  ))}
                {type === 'service' &&
                  BOOKING_SERVICES.map((s) => (
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

      {isGiftCard ? (
        <ReservationGiftCardFields control={control} />
      ) : (
        <ReservationVisitFields control={control} />
      )}

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

      <FormField
        control={control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {isGiftCard ? 'მილოცვის ტექსტი' : 'დამატებითი კომენტარი ან დეტალები'}
            </FormLabel>
            <FormControl>
              <textarea
                {...field}
                rows={3}
                placeholder={
                  isGiftCard
                    ? 'მაგ: გილოცავ დაბადების დღეს!'
                    : 'მაგ: მაქვს მგრძნობიარე კანი, ან კითხვები პროცედურასთან დაკავშირებით...'
                }
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
