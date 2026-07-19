import {
  GiftCardBuilderState,
  GiftCardFieldErrors,
  GiftCardPatch,
} from '@/features/gift-card/types/gift-card.types';
import { Input } from '@/shared/components/ui/input';

type Props = {
  state: GiftCardBuilderState;
  onChange: (patch: GiftCardPatch) => void;
  errors: GiftCardFieldErrors;
};

export const GiftCardRecipientFields = ({ state, onChange, errors }: Props) => {
  const digital = state.deliveryMethod === 'ელექტრონული';

  return (
    <div>
      <p className="eyebrow text-brand-academy">2. მიმღების ინფორმაცია</p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">მიმღების სახელი *</label>
          <Input
            className="mt-1.5"
            placeholder="მაგ: ლუკა ცქიტიშვილი"
            value={state.recipientName}
            onChange={(e) => onChange({ recipientName: e.target.value })}
          />
          {errors.recipientName && (
            <p className="mt-1.5 text-sm font-medium text-destructive">{errors.recipientName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">
            მიმღების ელ-ფოსტა {digital ? '*' : '(არასავალდებულო)'}
          </label>
          <Input
            className="mt-1.5"
            type="email"
            placeholder="მაგ: recipient@gmail.com"
            value={state.recipientEmail}
            onChange={(e) => onChange({ recipientEmail: e.target.value })}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            ამ მისამართზე გაიგზავნება ციფრული სასაჩუქრე ბარათი.
          </p>
          {errors.recipientEmail && (
            <p className="mt-1.5 text-sm font-medium text-destructive">{errors.recipientEmail}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">მიმღების ტელეფონი (არასავალდებულო)</label>
          <Input
            className="mt-1.5"
            type="tel"
            placeholder="მაგ: +995 599 12 34 56"
            value={state.recipientPhone}
            onChange={(e) => onChange({ recipientPhone: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
