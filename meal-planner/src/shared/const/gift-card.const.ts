export type GiftCardNominal = {
  id: string;
  amount: string;
  description: string;
};

export const GIFT_CARD_NOMINALS: GiftCardNominal[] = [
  {
    id: 'gc-50',
    amount: '50₾',
    description: 'სტარტერ ბარათი — მოკლე პროცედურებისთვის',
  },
  {
    id: 'gc-100',
    amount: '100₾',
    description: 'კლასიკური ბარათი — ერთი პროფესიული სეანსი',
  },
  {
    id: 'gc-150',
    amount: '150₾',
    description: 'პრემიუმ ბარათი — კომბინირებული სერვისი',
  },
  {
    id: 'gc-200',
    amount: '200₾',
    description: 'VIP ბარათი — სრული მოვლის პაკეტი',
  },
];

export const GIFT_CARD_CONDITIONS: string[] = [
  'მოქმედებს 6 თვის განმავლობაში გაცემის დღიდან',
  'გამოიყენება ნებისმიერ სერვისზე',
  'ვრცელდება ორივე ფილიალში — თბილისსა და საგარეჯოში',
  'არ ანაზღაურდება ნაღდი ფულით',
  'შეიძლება გამოიყენო ნაწილ-ნაწილ',
];
