export type PhilosophyPillar = {
  icon: 'beauty' | 'academy' | 'expertise';
  title: string;
  description: string;
  href: string;
};

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    icon: 'beauty',
    title: 'Beauty',
    description: 'ესთეტიკური პროცედურები, რომლებიც ბუნებრივ სილამაზეს უსვამენ ხაზს.',
    href: '/servesebi',
  },
  {
    icon: 'academy',
    title: 'Academy',
    description: 'პროფესიული კურსები მომავალი კოსმეტოლოგებისთვის.',
    href: '/akademia',
  },
  {
    icon: 'expertise',
    title: 'Expertise',
    description: 'გამოცდილი გუნდი და თანამედროვე, სამეცნიეროდ დადასტურებული მიდგომა.',
    href: '/galeria',
  },
];
