export type ProductHowToStep = {
  step: number;
  title: string;
  description: string;
};

export const PRODUCT_HOW_TO_STEPS: ProductHowToStep[] = [
  {
    step: 1,
    title: 'კანის საჭიროებების შეფასება',
    description: 'ვმუშაობთ თქვენი კანის მდგომარეობისა და მიზნების განსაზღვრაზე.',
  },
  {
    step: 2,
    title: 'სპეციალისტის რეკომენდაცია',
    description: 'პროფესიონალი კონსულტანტი გირჩევთ თქვენთვის შესაფერის პროდუქტებს.',
  },
  {
    step: 3,
    title: 'ინდივიდუალური მოვლის რუტინა',
    description: 'ვქმნით მოვლის პერსონალურ გეგმას განისაზღვრებული და ბალანსირებული კანისთვის.',
  },
];

export type ProductTrustBadge = {
  icon: 'shield-check' | 'user-check' | 'award';
  title: string;
  description: string;
};

export const PRODUCT_TRUST_BADGES: ProductTrustBadge[] = [
  {
    icon: 'shield-check',
    title: 'პროფესიონალური შერჩევა',
    description: 'მაღალი ხარისხის, სანდო პროდუქტები',
  },
  {
    icon: 'user-check',
    title: 'ინდივიდუალური მიდგომა',
    description: 'თქვენს საჭიროებაზე მორგებული რეკომენდაციები',
  },
  {
    icon: 'award',
    title: 'ხარისხზე ორიენტაცია',
    description: 'უსაფრთხოება და ეფექტურობა',
  },
];
