export const GALLERY_CATEGORIES = [
  'ყველა',
  'კოსმეტოლოგია',
  'პერმანენტული მაკიაჟი',
  'ლაზერული ეპილაცია',
  'მასაჟი',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  id: string;
  alt: string;
  category: Exclude<GalleryCategory, 'ყველა'>;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', alt: 'სახის კოსმეტოლოგიური პროცედურა', category: 'კოსმეტოლოგია' },
  { id: 'g2', alt: 'სახის სიღრმისეული გაწმენდა', category: 'კოსმეტოლოგია' },
  { id: 'g3', alt: 'ჰიალურონის ინექცია', category: 'კოსმეტოლოგია' },
  { id: 'g4', alt: 'კოსმეტოლოგიური კაბინეტი', category: 'კოსმეტოლოგია' },
  { id: 'g5', alt: 'წარბების პერმანენტული მაკიაჟი', category: 'პერმანენტული მაკიაჟი' },
  { id: 'g6', alt: 'ტუჩების პერმანენტული მაკიაჟი', category: 'პერმანენტული მაკიაჟი' },
  { id: 'g7', alt: 'თვალის ხაზის პერმანენტული მაკიაჟი', category: 'პერმანენტული მაკიაჟი' },
  { id: 'g8', alt: 'ლაზერული ეპილაცია — ფეხები', category: 'ლაზერული ეპილაცია' },
  { id: 'g9', alt: 'დიოდური ლაზერის პროცედურა', category: 'ლაზერული ეპილაცია' },
  { id: 'g10', alt: 'სახის მასაჟი', category: 'მასაჟი' },
  { id: 'g11', alt: 'სხეულის რელაქსაციის მასაჟი', category: 'მასაჟი' },
  { id: 'g12', alt: 'ლიმფოდრენაჟული მასაჟი', category: 'მასაჟი' },
];
