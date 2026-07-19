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

const USAGE_OPTIONS = [
  { value: 'თბილისი' as const, label: 'თბილისი' },
  { value: 'საგარეჯო' as const, label: 'საგარეჯო' },
  { value: 'ორივე' as const, label: 'ორივე' },
];

type Props = {
  state: GiftCardBuilderState;
  onChange: (patch: GiftCardPatch) => void;
};

export const GiftCardPersonalize = ({ state, onChange }: Props) => {
  return (
    <div>
      <p className="eyebrow text-brand-academy">3. პერსონალიზაცია</p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">პირადი შეტყობინება</label>
          <textarea
            className={`mt-1.5 ${TEXTAREA_CLASS}`}
            rows={2}
            placeholder="მაგ: მილოცვის ტექსტი ან კომენტარი..."
            value={state.message}
            onChange={(e) => onChange({ message: e.target.value })}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {GIFT_CARD_QUICK_MESSAGES.map((m) => (
              <button key={m} type="button" onClick={() => onChange({ message: m })} className={CHIP_CLASS}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">ვისგან გამოჩნდეს</label>
          <Input
            className="mt-1.5"
            placeholder="მაგ: სიყვარულით, შენი მეგობრისგან"
            value={state.displayFrom}
            disabled={state.isAnonymous}
            onChange={(e) => onChange({ displayFrom: e.target.value })}
          />
        </div>

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={state.isAnonymous}
              onChange={(e) => onChange({ isAnonymous: e.target.checked, displayFrom: '' })}
              className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
            />
            <span className="text-sm text-foreground">გამგზავნის ვინაობა არ გამოჩნდეს</span>
          </label>
          {state.isAnonymous && (
            <p className="mt-1.5 text-xs text-muted-foreground">
              მიმღები ვერ დაინახავს თქვენს სახელს, ტელეფონს ან ელ-ფოსტას.
            </p>
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
