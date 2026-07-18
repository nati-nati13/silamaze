'use client';

import { useState } from 'react';

import { GiftCardPersonalize } from '@/features/gift-card/components/gift-card-personalize';
import { GiftCardPreview } from '@/features/gift-card/components/gift-card-preview';
import { GiftCardSelector } from '@/features/gift-card/components/gift-card-selector';
import { GiftCardBuilderState, GiftCardPatch } from '@/features/gift-card/types/gift-card.types';
import { Button } from '@/shared/components/ui/button';
import { CARD_THEMES, GIFT_CARD_NOMINALS } from '@/shared/const/gift-card.const';
import { http } from '@/shared/lib/http';

const TABS = [
  { value: 'beauty' as const, label: '💅 Beauty Gift Card' },
  { value: 'academy' as const, label: '🎓 Academy Gift Card' },
];

const INITIAL: GiftCardBuilderState = {
  tab: 'beauty',
  mode: 'amount',
  selectionId: 'gc-silver',
  purpose: 'gift',
  recipient: '',
  sender: '',
  phone: '',
  usage: 'ორივე',
  message: '',
  themeId: 'green',
};

const USAGE_LABEL: Record<GiftCardBuilderState['usage'], string> = {
  თბილისი: 'თბილისი',
  საგარეჯო: 'საგარეჯო',
  ორივე: 'ორივე ფილიალი',
};

export const GiftCardBuilder = () => {
  const [state, setState] = useState<GiftCardBuilderState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const patch = (p: GiftCardPatch) => {
    if ('phone' in p) setPhoneError(null);
    setState((s) => ({ ...s, ...p }));
  };

  const nominal = GIFT_CARD_NOMINALS.find((n) => n.id === state.selectionId);
  const amountLabel = state.mode === 'amount' ? nominal?.amount ?? '' : state.selectionId;
  const gradient = CARD_THEMES.find((t) => t.id === state.themeId)?.gradient ?? CARD_THEMES[0].gradient;

  const onOrder = async () => {
    if (state.phone.trim().length < 5) {
      setPhoneError('შეიყვანეთ ტელეფონის ნომერი');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await http.post('/gift-cards/public', {
        amount: amountLabel || 'შეთანხმებით',
        usage: state.usage,
        delivery: 'ელექტრონული',
        recipient: state.recipient,
        sender: state.sender,
        name: state.sender || state.recipient || 'სტუმარი',
        phone: state.phone,
        message: state.message,
      });
      setSuccess(true);
    } catch {
      setError('შეცდომა. სცადეთ კვლავ.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <p className="font-heading text-4xl font-bold text-brand-green">✓</p>
        <p className="mt-3 font-heading text-xl font-semibold text-foreground">
          ბარათის შეკვეთა მიღებულია!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          ჩვენი გუნდი მალე დაგიკავშირდებათ ბარათის გასაფორმებლად.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => { setState(INITIAL); setSuccess(false); setPhoneError(null); }}>
          ახალი ბარათი
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => patch({ tab: tab.value })}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
              state.tab === tab.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:border-brand-green/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <GiftCardSelector
            mode={state.mode}
            selectionId={state.selectionId}
            onModeChange={(mode) => patch({ mode, selectionId: '' })}
            onSelect={(id) => patch({ selectionId: id })}
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <GiftCardPersonalize state={state} onChange={patch} phoneError={phoneError} />
        </div>

        <div>
          <p className="eyebrow text-brand-academy">3. ბარათის ესკიზი</p>
          <div className="mt-4">
            <GiftCardPreview
              amountLabel={amountLabel}
              recipient={state.recipient}
              usageLabel={USAGE_LABEL[state.usage]}
              gradient={gradient}
              loading={loading}
              onOrder={onOrder}
            />
          </div>
          {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  );
};
