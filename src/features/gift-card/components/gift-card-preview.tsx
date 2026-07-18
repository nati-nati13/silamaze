import { CheckCircle, Clock, Send } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { GIFT_CARD_CONDITIONS } from '@/shared/const/gift-card.const';

type Props = {
  amountLabel: string;
  recipient: string;
  usageLabel: string;
  gradient: string;
  loading: boolean;
  onOrder: () => void;
};

export const GiftCardPreview = ({
  amountLabel,
  recipient,
  usageLabel,
  gradient,
  loading,
  onOrder,
}: Props) => {
  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/70">
              Esthetic Ecosystem
            </p>
            <p className="mt-1 font-heading text-2xl font-bold">DERMAKO</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70">ნომინალი</p>
            <p className="font-heading text-xl font-bold">{amountLabel || '—'}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs text-white/70">ბარათის მფლობელი</p>
          <p className="font-heading text-lg font-semibold">{recipient || '—'}</p>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-white/90">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            მოქმედებს 12 თვე
          </span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-full border border-white/40 px-3 py-1 uppercase tracking-wider">
              Clinic Pass
            </span>
          </span>
        </div>
        <p className="mt-2 text-xs text-white/70">გამოყენება: {usageLabel}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-heading text-base font-semibold text-foreground">
          ბარათის პირობები &amp; პრივილეგიები
        </p>
        <ul className="mt-4 space-y-2.5">
          {GIFT_CARD_CONDITIONS.map((c) => (
            <li key={c} className="flex items-start gap-3">
              <CheckCircle
                className="mt-0.5 size-4 shrink-0 text-brand-green"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-foreground">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={onOrder}
        disabled={loading}
        size="lg"
        className="w-full font-semibold"
      >
        <Send className="size-4" aria-hidden="true" />
        {loading ? 'იგზავნება...' : 'ბარათის შეკვეთა'}
      </Button>
    </div>
  );
};
