export type GiftCardNominal = {
  id: string;
  tier: string;
  amount: string;
  value: number;
  badge?: string;
  description: string;
};

export const GIFT_CARD_NOMINALS: GiftCardNominal[] = [
  {
    id: 'gc-bronze',
    tier: 'ბრონზის სასაჩუქრე ბარათი',
    amount: '100 ₾',
    value: 100,
    badge: 'კანის უფასო დიაგნოსტიკა',
    description: 'შესანიშნავი საჩუქარი პირველადი მოვლისთვის.',
  },
  {
    id: 'gc-silver',
    tier: 'ვერცხლის სასაჩუქრე ბარათი',
    amount: '250 ₾',
    value: 250,
    badge: '+10% ბონუს კრედიტი',
    description: 'პოპულარული — პროცედურული კრედიტი კომბინირებული სერვისისთვის.',
  },
  {
    id: 'gc-gold',
    tier: 'ოქროს სასაჩუქრე ბარათი',
    amount: '500 ₾',
    value: 500,
    badge: '+15% ბონუს კრედიტი',
    description: 'მდიდრული, გამორჩეული სასაჩუქრე პაკეტი.',
  },
  {
    id: 'gc-platinum',
    tier: 'პლატინის VIP სასაჩუქრე ბარათი',
    amount: '1000 ₾',
    value: 1000,
    badge: '+20% ბონუს კრედიტი & VIP',
    description: 'პრემიუმ VIP გამოცდილება სრული მოვლის პაკეტით.',
  },
];

export type CardTheme = {
  id: string;
  label: string;
  dot: string;
  gradient: string;
};

export const CARD_THEMES: CardTheme[] = [
  { id: 'green', label: 'მწვანე', dot: 'bg-emerald-800', gradient: 'from-emerald-800 to-emerald-950' },
  { id: 'bronze', label: 'ბრონზი', dot: 'bg-amber-600', gradient: 'from-amber-600 to-amber-800' },
  { id: 'navy', label: 'ლურჯი', dot: 'bg-indigo-900', gradient: 'from-indigo-900 to-slate-900' },
  { id: 'rose', label: 'ვარდისფერი', dot: 'bg-rose-400', gradient: 'from-rose-400 to-pink-600' },
];

export const GIFT_CARD_QUICK_MESSAGES: string[] = [
  'გილოცავ დაბადების დღეს!',
  'საყვარელი და საუკეთესო სურვილებით!',
  'გისურვებ ბედნიერებასა და სილამაზეს!',
];

export const GIFT_CARD_STATUSES = [
  'pending',
  'awaiting_payment',
  'active',
  'partially_used',
  'redeemed',
  'expired',
  'cancelled',
] as const;

export type GiftCardStatus = (typeof GIFT_CARD_STATUSES)[number];

// prepared for future status-transition workflow (not enforced yet)
export const GIFT_CARD_STATUS_TRANSITIONS: Record<GiftCardStatus, GiftCardStatus[]> = {
  pending: ['awaiting_payment', 'cancelled'],
  awaiting_payment: ['active', 'cancelled'],
  active: ['partially_used', 'redeemed', 'expired', 'cancelled'],
  partially_used: ['redeemed', 'expired'],
  redeemed: [],
  expired: [],
  cancelled: [],
};

export const GIFT_CARD_CONDITIONS: string[] = [
  'ძალაშია თბილისსა და საგარეჯოში',
  'ნებისმიერი მომსახურება ან პრემიუმ კოსმეტიკის შეძენა',
  'სასაჩუქრედ — მდიდრული ფიზიკური შეფუთვა ან ელ. ბარათი',
  'მოქმედების ვადა: 12 თვე შეძენიდან',
  'არ ანაზღაურდება ნაღდი ფულით',
];
