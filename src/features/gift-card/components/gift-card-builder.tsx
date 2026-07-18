'use client';

import { useState } from 'react';

import { GiftCardBuyerFields } from '@/features/gift-card/components/gift-card-buyer-fields';
import { GiftCardPersonalize } from '@/features/gift-card/components/gift-card-personalize';
import { GiftCardPreview } from '@/features/gift-card/components/gift-card-preview';
import { GiftCardSelector } from '@/features/gift-card/components/gift-card-selector';
import {
  BuyerFieldErrors,
  GiftCardBuilderState,
  GiftCardPatch,
} from '@/features/gift-card/types/gift-card.types';
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
  buyerFirstName: '',
  buyerLastName: '',
  buyerPhone: '',
  buyerEmail: '',
  recipientName: '',
  recipientPhone: '',
  recipientEmail: '',
  displayFrom: '',
  usage: 'ორივე',
  message: '',
  themeId: 'green',
};

const USAGE_LABEL: Record<GiftCardBuilderState['usage'], string> = {
  თბილისი: 'თბილისი',
  საგარეჯო: 'საგარეჯო',
  ორივე: 'ორივე ფილიალი',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BUYER_KEYS: (keyof GiftCardBuilderState)[] = [
  'buyerFirstName',
  'buyerLastName',
  'buyerPhone',
  'buyerEmail',
];

export const GiftCardBuilder = () => {
  const [state, setState] = useState<GiftCardBuilderState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buyerErrors, setBuyerErrors] = useState<BuyerFieldErrors>({});
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const patch = (p: GiftCardPatch) => {
    if (BUYER_KEYS.some((k) => k in p)) setBuyerErrors({});
    setState((s) => ({ ...s, ...p }));
  };

  const nominal = GIFT_CARD_NOMINALS.find((n) => n.id === state.selectionId);
  const amountLabel = state.mode === 'amount' ? nominal?.amount ?? '' : state.selectionId;
  const gradient = CARD_THEMES.find((t) => t.id === state.themeId)?.gradient ?? CARD_THEMES[0].gradient;

  const onOrder = async () => {
    const errs: BuyerFieldErrors = {};
    if (state.buyerFirstName.trim().length < 2) errs.firstName = 'შეიყვანეთ სახელი';
    if (state.buyerLastName.trim().length < 2) errs.lastName = 'შეიყვანეთ გვარი';
    if (state.buyerPhone.trim().length < 5) errs.phone = 'შეიყვანეთ ტელეფონი';
    // builder cards are delivered digitally, so a valid email is required
    if (!EMAIL_RE.test(state.buyerEmail.trim())) errs.email = 'შეიყვანეთ სწორი ელ-ფოსტა';
    if (Object.keys(errs).length > 0) {
      setBuyerErrors(errs);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await http.post<{ giftCardCode: string }>('/gift-cards/public', {
        amount: amountLabel || 'შეთანხმებით',
        usage: state.usage,
        delivery: 'ელექტრონული',
        buyerFirstName: state.buyerFirstName,
        buyerLastName: state.buyerLastName,
        buyerPhone: state.buyerPhone,
        buyerEmail: state.buyerEmail,
        recipientName: state.recipientName,
        recipientPhone: state.recipientPhone,
        recipientEmail: state.recipientEmail,
        displayFrom: state.displayFrom,
        message: state.message,
      });
      setOrderCode(res?.giftCardCode ?? null);
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
        {orderCode && (
          <div className="mt-6 rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">ბარათის კოდი</p>
            <p className="mt-1 font-mono text-lg font-bold tracking-wider text-foreground">
              {orderCode}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              შეინახეთ ეს კოდი — დაგჭირდებათ ბარათის გასააქტიურებლად.
            </p>
          </div>
        )}
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setState(INITIAL);
            setSuccess(false);
            setBuyerErrors({});
            setOrderCode(null);
          }}
        >
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
        <div className="flex flex-col gap-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <GiftCardBuyerFields state={state} onChange={patch} errors={buyerErrors} />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <GiftCardPersonalize state={state} onChange={patch} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <GiftCardSelector
            mode={state.mode}
            selectionId={state.selectionId}
            onModeChange={(mode) => patch({ mode, selectionId: '' })}
            onSelect={(id) => patch({ selectionId: id })}
          />
        </div>

        <div>
          <p className="eyebrow text-brand-academy">ბარათის ესკიზი</p>
          <div className="mt-4">
            <GiftCardPreview
              amountLabel={amountLabel}
              recipient={state.recipientName}
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
