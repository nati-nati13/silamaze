import { GiftCardBuilderState, GiftCardPatch } from '@/features/gift-card/types/gift-card.types';
import { Input } from '@/shared/components/ui/input';
import { CARD_THEMES, GIFT_CARD_QUICK_MESSAGES } from '@/shared/const/gift-card.const';

const TEXTAREA_CLASS =
  'flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ' +
  'transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ' +
  'focus-visible:ring-ring';

const CHIP_CLASS =
  'rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors ' +
  'hover:border-brand-green/50 hover:text-foreground';

const PURPOSE_TABS = [
  { value: 'gift' as const, label: 'საჩუქრად' },
  { value: 'self' as const, label: 'ჩემი დაჯავშნა' },
];

const USAGE_OPTIONS = [
  { value: 'თბილისი' as const, label: 'თბილისი' },
  { value: 'საგარეჯო' as const, label: 'საგარეჯო' },
  { value: 'ორივე' as const, label: 'ორივე' },
];

type Props = {
  state: GiftCardBuilderState;
  onChange: (patch: GiftCardPatch) => void;
  phoneError?: string | null;
};

export const GiftCardPersonalize = ({ state, onChange, phoneError }: Props) => {
  return (
    <div>
      <p className="eyebrow text-brand-academy">2. პერსონალიზაცია</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {PURPOSE_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange({ purpose: tab.value })}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
              state.purpose === tab.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:border-brand-green/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">ვისთვის (სახელი)</label>
          <Input
            className="mt-1.5"
            placeholder="მაგ: მარიამ ბერიძე"
            value={state.recipient}
            onChange={(e) => onChange({ recipient: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">ვისგან (სახელი)</label>
          <Input
            className="mt-1.5"
            placeholder="მაგ: ანა და გიორგი"
            value={state.sender}
            onChange={(e) => onChange({ sender: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">შემძენის ტელეფონი *</label>
          <Input
            className="mt-1.5"
            type="tel"
            placeholder="მაგ: +995 599 12 34 56"
            value={state.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
          {phoneError && (
            <p className="mt-1.5 text-sm font-medium text-destructive">{phoneError}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">სად იქნება გამოყენებული?</label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {USAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ usage: opt.value })}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  state.usage === opt.value
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-brand-green/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">მილოცვის ტექსტი</label>
          <textarea
            className={`mt-1.5 ${TEXTAREA_CLASS}`}
            rows={2}
            placeholder="მაგ: მილოცვის ტექსტი ან კომენტარი..."
            value={state.message}
            onChange={(e) => onChange({ message: e.target.value })}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {GIFT_CARD_QUICK_MESSAGES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ message: m })}
                className={CHIP_CLASS}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">ბარათის დიზაინი (თემა)</label>
          <div className="mt-2 flex gap-3">
            {CARD_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-label={t.label}
                onClick={() => onChange({ themeId: t.id })}
                className={`size-8 rounded-full ${t.dot} ring-offset-2 transition-shadow ${
                  state.themeId === t.id ? 'ring-2 ring-brand-green' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
