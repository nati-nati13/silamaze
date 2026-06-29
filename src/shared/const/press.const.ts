export type PressItem = {
  id: string;
  source: string;
  title: string;
  date: string;
  url: string;
};

export const PRESS_ITEMS: PressItem[] = [
  {
    id: 'press-1',
    source: 'Forbes Georgia',
    title: 'კოსმეტოლოგიის ინდუსტრია საქართველოში: Dermako Academy-ის წარმატება',
    date: '2024-11-05',
    url: '#',
  },
  {
    id: 'press-2',
    source: 'Rustavi 2',
    title: 'პროფესიული განათლება სილამაზის სფეროში — ახალი სტანდარტი',
    date: '2024-10-20',
    url: '#',
  },
  {
    id: 'press-3',
    source: 'Business Media Georgia',
    title: 'Dermako Academy: ქართული კოსმეტოლოგიური სკოლა საერთაშორისო დონეზე',
    date: '2024-09-12',
    url: '#',
  },
];
