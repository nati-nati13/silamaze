import {
  GiftCardBuilderState,
  GiftCardFieldErrors,
  GiftCardPatch,
} from '@/features/gift-card/types/gift-card.types';
import { Input } from '@/shared/components/ui/input';

const METHODS = [
  { value: 'ელექტრონული' as const, label: 'ელექტრონული ბარათი' },
  { value: 'ბეჭდური' as const, label: 'ბეჭდური ბარათი' },
];

const TIMINGS = [
  { value: 'immediate' as const, label: 'გააქტიურებისთანავე' },
  { value: 'scheduled' as const, label: 'კონკრეტულ თარიღზე' },
];

const optionClass = (active: boolean) =>
  `rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-foreground'
      : 'border-border text-muted-foreground hover:border-brand-green/50'
  }`;

type Props = {
  state: GiftCardBuilderState;
  onChange: (patch: GiftCardPatch) => void;
  errors: GiftCardFieldErrors;
  minDate: string;
};

export const GiftCardDeliveryFields = ({ state, onChange, errors, minDate }: Props) => {
  return (
    <div>
      <p className="eyebrow text-brand-academy">4. გაგზავნა</p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">მიწოდების მეთოდი *</label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {METHODS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => onChange({ deliveryMethod: m.value })}
                className={optionClass(state.deliveryMethod === m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {state.deliveryMethod === 'ბეჭდური' && (
          <div>
            <label className="text-sm font-medium text-foreground">მიწოდების მისამართი *</label>
            <Input
              className="mt-1.5"
              placeholder="მაგ: ქ. თბილისი, ვაჟა-ფშაველას გამზ. 8"
              value={state.address}
              onChange={(e) => onChange({ address: e.target.value })}
            />
            {errors.address && (
              <p className="mt-1.5 text-sm font-medium text-destructive">{errors.address}</p>
            )}
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground">გაგზავნის დრო</label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {TIMINGS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => onChange({ deliveryTiming: t.value })}
                className={optionClass(state.deliveryTiming === t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {state.deliveryTiming === 'scheduled' && (
          <div>
            <label className="text-sm font-medium text-foreground">გაგზავნის თარიღი *</label>
            <Input
              className="mt-1.5"
              type="date"
              min={minDate}
              value={state.deliveryDate}
              onChange={(e) => onChange({ deliveryDate: e.target.value })}
            />
            {errors.deliveryDate && (
              <p className="mt-1.5 text-sm font-medium text-destructive">{errors.deliveryDate}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
