export type ServiceCategory =
  | 'face'
  | 'injection'
  | 'massage'
  | 'laser'
  | 'permanent';

export type ServiceFilter = {
  value: ServiceCategory | 'all';
  label: string;
};

export const SERVICE_FILTERS: ServiceFilter[] = [
  { value: 'all', label: 'ყველა მომსახურება' },
  { value: 'face', label: 'სახის მოვლა' },
  { value: 'injection', label: 'ინექციური კოსმეტოლოგია' },
  { value: 'massage', label: 'მასაჟი' },
  { value: 'laser', label: 'ლაზერული ეპილაცია' },
  { value: 'permanent', label: 'პერმანენტული მაკიაჟი' },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: 'sparkles' | 'syringe' | 'hand' | 'pencil' | 'zap';
  category: ServiceCategory;
  image?: string;
};

export const SERVICES: Service[] = [
  {
    id: 'classical',
    title: 'კლასიკური კოსმეტოლოგია',
    description:
      'სახის კანის სიღრმისეული მოვლა, გაწმენდა და აღდგენა. ინდივიდუალური მოვლის პროგრამები თქვენი კანის ტიპის მიხედვით.',
    icon: 'sparkles',
    category: 'face',
  },
  {
    id: 'injection',
    title: 'ინექციური კოსმეტოლოგია',
    description:
      'ბოტულოტოქსინი, ჰიალურონის მჟავა და სხვა ინექციური პროცედურები კვალიფიციური სპეციალისტებისგან.',
    icon: 'syringe',
    category: 'injection',
  },
  {
    id: 'massage',
    title: 'მასაჟი',
    description:
      'სახისა და სხეულის მასაჟი — მოდუნება, ტონუსის აღდგენა და კანის გამოჯანმრთელება. პროფესიული ტექნიკები.',
    icon: 'hand',
    category: 'massage',
  },
  {
    id: 'permanent',
    title: 'პერმანენტული მაკიაჟი',
    description:
      'წარბების, ტუჩებისა და თვალის ხაზის პერმანენტული მაკიაჟი. დახვეწილი, ბუნებრივი და გამძლე შედეგი.',
    icon: 'pencil',
    category: 'permanent',
  },
  {
    id: 'laser',
    title: 'ლაზერული (დიოდური) ეპილაცია',
    description:
      'ეფექტური და უსაფრთხო ლაზერული ეპილაცია სხეულის ნებისმიერ ზონაზე. თანამედროვე დიოდური ლაზერი.',
    icon: 'zap',
    category: 'laser',
  },
];
