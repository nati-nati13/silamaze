import { BuyerFieldErrors, GiftCardBuilderState, GiftCardPatch } from '@/features/gift-card/types/gift-card.types';
import { Input } from '@/shared/components/ui/input';

type Props = {
  state: GiftCardBuilderState;
  onChange: (patch: GiftCardPatch) => void;
  errors: BuyerFieldErrors;
};

export const GiftCardBuyerFields = ({ state, onChange, errors }: Props) => {
  return (
    <div>
      <p className="eyebrow text-brand-academy">1. შემძენის ინფორმაცია</p>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground">შემძენის სახელი *</label>
            <Input
              className="mt-1.5"
              placeholder="მაგ: მარიამ"
              value={state.buyerFirstName}
              onChange={(e) => onChange({ buyerFirstName: e.target.value })}
            />
            {errors.firstName && (
              <p className="mt-1.5 text-sm font-medium text-destructive">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">შემძენის გვარი *</label>
            <Input
              className="mt-1.5"
              placeholder="მაგ: ბერიძე"
              value={state.buyerLastName}
              onChange={(e) => onChange({ buyerLastName: e.target.value })}
            />
            {errors.lastName && (
              <p className="mt-1.5 text-sm font-medium text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">შემძენის ტელეფონი *</label>
          <Input
            className="mt-1.5"
            type="tel"
            placeholder="მაგ: +995 599 12 34 56"
            value={state.buyerPhone}
            onChange={(e) => onChange({ buyerPhone: e.target.value })}
          />
          {errors.phone && (
            <p className="mt-1.5 text-sm font-medium text-destructive">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">
            შემძენის ელ-ფოსტა (ციფრული ბარათის მისაღებად) *
          </label>
          <Input
            className="mt-1.5"
            type="email"
            placeholder="მაგ: example@gmail.com"
            value={state.buyerEmail}
            onChange={(e) => onChange({ buyerEmail: e.target.value })}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm font-medium text-destructive">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};
