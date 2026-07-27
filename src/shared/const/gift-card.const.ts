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

export const RECIPIENT_DELIVERY_STATUSES = ['pending', 'scheduled', 'sent', 'failed'] as const;

export type RecipientDeliveryStatus = (typeof RECIPIENT_DELIVERY_STATUSES)[number];

export const GIFT_CARD_VALIDITY_MONTHS = 12;

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

export type GiftCardBenefit = {
  icon: 'gift' | 'sparkles' | 'leaf' | 'crown';
  title: string;
  description: string;
};

export const GIFT_CARD_BENEFITS: GiftCardBenefit[] = [
  {
    icon: 'gift',
    title: 'უნიკალური საჩუქარი',
    description: 'მისაწვდისობა ნებისმიერი განსაკუთრებული მოვლენისთვის',
  },
  {
    icon: 'sparkles',
    title: 'თავისუფალი არჩევანი',
    description: 'მიმღები თავად ირჩევს სასურველ მომსახურებას',
  },
  {
    icon: 'leaf',
    title: 'სილამაზე და ზრუნვა',
    description: 'აჩუქეთ არა ნივთი, არამედ საკუთარი თავის მოვლის გამოცდილება',
  },
  {
    icon: 'crown',
    title: 'პრემიუმ გამოცდილება',
    description: 'სასაჩუქრე სერტიფიკატი მოქცემდება Dermako Beauty-ს მომსახურეობაზე',
  },
];

export type GiftCardGalleryItem = {
  id: string;
  label: string;
  image: string;
};

export const GIFT_CARD_GALLERY_ITEMS: GiftCardGalleryItem[] = [
  { id: 'gc-gallery-1', label: 'დახურული კონვერტი', image: '/images/gift-card/envelope-closed.png' },
  { id: 'gc-gallery-2', label: 'გახსნილი კონვერტი', image: '/images/gift-card/envelope-open.png' },
  { id: 'gc-gallery-3', label: 'სერტიფიკატის დიზაინი', image: '/images/gift-card/certificate-design.png' },
  { id: 'gc-gallery-4', label: 'პრემიუმ შეფუთვა', image: '/images/gift-card/premium-wrap.png' },
];

export type GiftCardServicePreviewItem = {
  icon: 'laser' | 'injection' | 'facial' | 'massage' | 'other';
  label: string;
};

export const GIFT_CARD_SERVICE_PREVIEW_ITEMS: GiftCardServicePreviewItem[] = [
  { icon: 'laser', label: 'ლაზერული ეპილაცია' },
  { icon: 'injection', label: 'ინექციური კოსმეტოლოგია' },
  { icon: 'facial', label: 'სახის წმენდა' },
  { icon: 'massage', label: 'მასაჟი' },
  { icon: 'other', label: 'სხვა მომსახურება' },
];

export const GIFT_CARD_PREVIEW_AMOUNTS: string[] = ['100 ₾', '200 ₾', '300 ₾', '500 ₾'];

export const GIFT_CARD_USAGE_RULES: string[] = [
  'სერტიფიკატი მოქმედებს Dermako Beauty-ის ყველა მომსახურებაზე',
  'სერტიფიკატი არ იცვლება ნაღდი ფულადი ეკვივალენტზე',
  'სერტიფიკატის ნომინალი არ იყოფა მცირე თანხებზე და გაუხარჯავი თანხა არ ექვემდებარება დაბრუნებას',
  'სერტიფიკატის ნომინალის გადაჭარბების შემთხვევაში თანხის სხვაობის გადახდა წარმოებს სალაროში ნაღდი ანგარიშსწორებით',
  'სერტიფიკატი ძალაშია მისი შეძენის დღიდან ერთი (1) წლის განმავლობაში',
];

export type GiftCardHowToStep = {
  step: number;
  title: string;
  description: string;
};

export const GIFT_CARD_HOW_TO_STEPS: GiftCardHowToStep[] = [
  { step: 1, title: 'დაგვიკავშირდით', description: 'ტელეფონით, Facebook-ით ან ვიზიტით' },
  { step: 2, title: 'პირობა', description: 'შეარჩევთ მომსახურებას ან თანხას' },
  { step: 3, title: 'მომზადება', description: 'სასაჩუქრე სერტიფიკატი პრემიუმ შეფუთვით' },
  { step: 4, title: 'აიღეთ ფილიალში', description: 'თქვენ ან მიმღები პირი' },
];

export type GiftCardFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const GIFT_CARD_FAQ_ITEMS: GiftCardFaqItem[] = [
  {
    id: 'gc-faq-1',
    question: 'რამდენ ხანს მოქმედებს სასაჩუქრე სერტიფიკატი?',
    answer: 'სერტიფიკატი ძალაშია შეძენის დღიდან ერთი წლის განმავლობაში.',
  },
  {
    id: 'gc-faq-2',
    question: 'შემიძლია სხვა ადამიანზე გავცემო?',
    answer:
      'დიახ, სერტიფიკატი შეგიძლიათ აჩუქოთ ნებისმიერ ადამიანს — უბრალოდ მიუთითეთ მიმღების სახელი გაფორმებისას.',
  },
  {
    id: 'gc-faq-3',
    question: 'შეიძლება თუ არა ფულადი დაბრუნება?',
    answer: 'არა, სერტიფიკატი არ იცვლება ნაღდი ფულადი ეკვივალენტზე.',
  },
  {
    id: 'gc-faq-4',
    question: 'შეიძლება თუ არა ნაწილობრივი მომსახურების არჩევა?',
    answer:
      'დიახ, დარჩენილი თანხა ჩაითვლება შემდეგი ვიზიტისთვის, თუ სერტიფიკატის ღირებულება მომსახურების ფასს აღემატება.',
  },
];
