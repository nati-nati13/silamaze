export type AcademyFeature = {
  title: string;
  description: string;
  icon: 'practice' | 'certificate' | 'individual' | 'programs';
};

export type AcademyCard = {
  title: string;
  description: string;
  icon: 'practice' | 'individual' | 'method';
};

export const ACADEMY_FEATURES: AcademyFeature[] = [
  {
    title: 'პრაქტიკაზე ორიენტირებული სწავლება',
    description:
      'თეორიისა და პრაქტიკის დაბალანსებული სასწავლო პროცესი, რომელიც ორიენტირებულია ' +
      'რეალური პროფესიული გამოცდილების მიღებაზე.',
    icon: 'practice',
  },
  {
    title: 'კურსის დასრულების სერტიფიკატი',
    description:
      'სასწავლო პროგრამის წარმატებით დასრულების შემდეგ გაიცემა შესაბამისი სერტიფიკატი.',
    icon: 'certificate',
  },
  {
    title: 'ინდივიდუალური მიდგომა',
    description:
      'მცირე ჯგუფები, მუდმივი მხარდაჭერა და ინსტრუქტორის უშუალო ჩართულობა სწავლის პროცესში.',
    icon: 'individual',
  },
  {
    title: 'თანამედროვე სასწავლო პროგრამები',
    description:
      'აქტუალური პროგრამები, თანამედროვე ტექნოლოგიები და ინდუსტრიის მოთხოვნებზე მორგებული სწავლება.',
    icon: 'programs',
  },
];

export const ACADEMY_CARDS: AcademyCard[] = [
  {
    title: 'პრაქტიკაზე ორიენტირებული სწავლება',
    description:
      'თეორიისა და პრაქტიკის დაბალანსებული სასწავლო პროცესი, რომელიც ორიენტირებულია ' +
      'რეალური პროფესიული გამოცდილების მიღებაზე.',
    icon: 'practice',
  },
  {
    title: 'ინდივიდუალური მიდგომა',
    description:
      'თითოეული სტუდენტის განვითარებაზე მორგებული სწავლების პროცესი, მუდმივი მხარდაჭერა ' +
      'და პროფესიული მენტორობა.',
    icon: 'individual',
  },
  {
    title: 'თანამედროვე მეთოდოლოგია',
    description:
      'აქტუალური სასწავლო პროგრამები, თანამედროვე ტექნოლოგიები და პროფესიული ' +
      'სტანდარტების შესაბამისი პრაქტიკა.',
    icon: 'method',
  },
];
