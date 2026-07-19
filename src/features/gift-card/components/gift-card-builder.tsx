'use client';

import { useState } from 'react';

import { GiftCardBuyerFields } from '@/features/gift-card/components/gift-card-buyer-fields';
import { GiftCardDeliveryFields } from '@/features/gift-card/components/gift-card-delivery-fields';
import { GiftCardPersonalize } from '@/features/gift-card/components/gift-card-personalize';
import { GiftCardPreview } from '@/features/gift-card/components/gift-card-preview';
import { GiftCardRecipientFields } from '@/features/gift-card/components/gift-card-recipient-fields';
import { GiftCardSelector } from '@/features/gift-card/components/gift-card-selector';
import { GiftCardSuccess } from '@/features/gift-card/components/gift-card-success';
import {
  GiftCardBuilderState,
  GiftCardFieldErrors,
  GiftCardPatch,
} from '@/features/gift-card/types/gift-card.types';
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
  recipientEmail: '',
  recipientPhone: '',
  displayFrom: '',
  message: '',
  isAnonymous: false,
  usage: 'ორივე',
  themeId: 'green',
  deliveryMethod: 'ელექტრონული',
  deliveryTiming: 'immediate',
  deliveryDate: '',
  address: '',
};

const USAGE_LABEL: Record<GiftCardBuilderState['usage'], string> = { თბილისი: 'თბილისი', საგარეჯო: 'საგარეჯო', ორივე: 'ორივე ფილიალი' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALIDATED_KEYS: (keyof GiftCardBuilderState)[] = [
  'buyerFirstName',
  'buyerLastName',
  'buyerPhone',
  'buyerEmail',
  'recipientName',
  'recipientEmail',
  'address',
  'deliveryDate',
];

export const GiftCardBuilder = () => {
  const [state, setState] = useState<GiftCardBuilderState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<GiftCardFieldErrors>({});
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const minDate = new Date().toISOString().split('T')[0];

  const patch = (p: GiftCardPatch) => {
    if (VALIDATED_KEYS.some((k) => k in p)) setErrors({});
    setState((s) => ({ ...s, ...p }));
  };

  const nominal = GIFT_CARD_NOMINALS.find((n) => n.id === state.selectionId);
  const amountLabel = state.mode === 'amount' ? nominal?.amount ?? '' : state.selectionId;
  const gradient = CARD_THEMES.find((t) => t.id === state.themeId)?.gradient ?? CARD_THEMES[0].gradient;

  const validate = (): GiftCardFieldErrors => {
    const e: GiftCardFieldErrors = {};
    if (state.buyerFirstName.trim().length < 2) e.firstName = 'შეიყვანეთ სახელი';
    if (state.buyerLastName.trim().length < 2) e.lastName = 'შეიყვანეთ გვარი';
    if (state.buyerPhone.trim().length < 5) e.phone = 'შეიყვანეთ ტელეფონი';
    if (!EMAIL_RE.test(state.buyerEmail.trim())) e.email = 'შეიყვანეთ სწორი ელ-ფოსტა';
    if (state.recipientName.trim().length < 2) e.recipientName = 'შეიყვანეთ მიმღების სახელი';
    if (state.deliveryMethod === 'ელექტრონული' && !EMAIL_RE.test(state.recipientEmail.trim())) {
      e.recipientEmail = 'შეიყვანეთ მიმღების ელ-ფოსტა';
    }
    if (state.deliveryMethod === 'ბეჭდური' && state.address.trim().length < 5) {
      e.address = 'მიუთითეთ მისამართი';
    }
    if (state.deliveryTiming === 'scheduled' && (!state.deliveryDate || state.deliveryDate < minDate)) {
      e.deliveryDate = 'აირჩიეთ სწორი თარიღი';
    }
    return e;
  };

  const onOrder = async () => {
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await http.post<{ giftCardCode: string }>('/gift-cards/public', {
        amount: amountLabel || 'შეთანხმებით',
        usage: state.usage,
        delivery: state.deliveryMethod,
        address: state.deliveryMethod === 'ბეჭდური' ? state.address : '',
        buyerFirstName: state.buyerFirstName,
        buyerLastName: state.buyerLastName,
        buyerPhone: state.buyerPhone,
        buyerEmail: state.buyerEmail,
        recipientName: state.recipientName,
        recipientPhone: state.recipientPhone,
        recipientEmail: state.recipientEmail,
        displayFrom: state.isAnonymous ? '' : state.displayFrom,
        isAnonymous: state.isAnonymous,
        deliveryDate: state.deliveryTiming === 'scheduled' ? state.deliveryDate : '',
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
      <GiftCardSuccess
        orderCode={orderCode}
        onReset={() => {
          setState(INITIAL);
          setSuccess(false);
          setErrors({});
          setOrderCode(null);
        }}
      />
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
            <GiftCardBuyerFields state={state} onChange={patch} errors={errors} />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <GiftCardRecipientFields state={state} onChange={patch} errors={errors} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <GiftCardPersonalize state={state} onChange={patch} />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <GiftCardDeliveryFields state={state} onChange={patch} errors={errors} minDate={minDate} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
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
    </div>
  );
};
