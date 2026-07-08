export type Offering = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  icon: 'graduation' | 'sparkles' | 'shopping';
  tone: 'green' | 'card' | 'beige';
  href: string | null;
  cta?: string;
  comingSoon?: boolean;
};

export const OFFERINGS: Offering[] = [
  {
    id: 'courses',
    kicker: 'Academy',
    title: 'პროფესიული კურსები',
    description:
      'ისწავლე თანამედროვე ესთეტიკური მიმართულებები პრაქტიკულ გარემოში და მიიღე სერტიფიკატი.',
    icon: 'graduation',
    tone: 'green',
    href: '/akademia',
    cta: 'კურსების ნახვა',
  },
  {
    id: 'services',
    kicker: 'Beauty Space',
    title: 'ესთეტიკური მომსახურება',
    description:
      'ლაზერული ეპილაცია, კოსმეტოლოგია, პერმანენტული მაკიაჟი და სხვა პროფესიონალური პროცედურები.',
    icon: 'sparkles',
    tone: 'card',
    href: '/servesebi',
    cta: 'დაჯავშნე ვიზიტი',
  },
  {
    id: 'products',
    kicker: 'Shop',
    title: 'პროფესიონალური პროდუქცია',
    description:
      'აღმოაჩინე ესთეტიკური ინდუსტრიის პროფესიონალური ბრენდები და პროდუქტები.',
    icon: 'shopping',
    tone: 'beige',
    href: null,
    comingSoon: true,
  },
];
