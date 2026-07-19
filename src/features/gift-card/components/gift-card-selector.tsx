import { Check } from 'lucide-react';

import { BOOKING_SERVICES } from '@/shared/const/booking.const';
import { GIFT_CARD_NOMINALS } from '@/shared/const/gift-card.const';

type Mode = 'amount' | 'procedure';

type Props = {
  mode: Mode;
  selectionId: string;
  onModeChange: (mode: Mode) => void;
  onSelect: (id: string) => void;
};

const MODE_TABS: { value: Mode; label: string }[] = [
  { value: 'amount', label: 'კონკრეტული თანხა' },
  { value: 'procedure', label: 'კონკრეტული პროცედურა' },
];

export const GiftCardSelector = ({ mode, selectionId, onModeChange, onSelect }: Props) => {
  return (
    <div>
      <p className="eyebrow text-brand-academy">ბარათის არჩევა</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {MODE_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onModeChange(tab.value)}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
              mode === tab.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:border-brand-green/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex max-h-96 flex-col gap-3 overflow-y-auto pr-1">
        {mode === 'amount'
          ? GIFT_CARD_NOMINALS.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => onSelect(n.id)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                selectionId === n.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-brand-green/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {n.badge && (
                    <span className="text-xs font-semibold text-brand-academy">{n.badge}</span>
                  )}
                  <p className="mt-1 font-heading text-base font-semibold text-foreground">
                    {n.tier}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {n.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-heading text-lg font-bold text-foreground">
                    {n.amount}
                  </span>
                  {selectionId === n.id && (
                    <Check className="size-4 text-brand-green" aria-hidden="true" />
                  )}
                </div>
              </div>
            </button>
          ))
          : BOOKING_SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSelect(s)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                selectionId === s
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-brand-green/50'
              }`}
            >
              {s}
              {selectionId === s && (
                <Check className="size-4 text-brand-green" aria-hidden="true" />
              )}
            </button>
          ))}
      </div>
    </div>
  );
};
