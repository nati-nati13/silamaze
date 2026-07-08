export type Service = {
  id: string;
  title: string;
  description: string;
  icon: 'sparkles' | 'syringe' | 'hand' | 'pencil' | 'zap';
};

export const SERVICES: Service[] = [
  {
    id: 'classical',
    title: 'კლასიკური კოსმეტოლოგია',
    description:
      'სახის კანის სიღრმისეული მოვლა, გაწმენდა და აღდგენა. ინდივიდუალური მოვლის პროგრამები თქვენი კანის ტიპის მიხედვით.',
    icon: 'sparkles',
  },
  {
    id: 'injection',
    title: 'ინექციური კოსმეტოლოგია',
    description:
      'ბოტულოტოქსინი, ჰიალურონის მჟავა და სხვა ინექციური პროცედურები კვალიფიციური სპეციალისტებისგან.',
    icon: 'syringe',
  },
  {
    id: 'massage',
    title: 'მასაჟი',
    description:
      'სახისა და სხეულის მასაჟი — მოდუნება, ტონუსის აღდგენა და კანის გამოჯანმრთელება. პროფესიული ტექნიკები.',
    icon: 'hand',
  },
  {
    id: 'permanent',
    title: 'პერმანენტული მაკიაჟი',
    description:
      'წარბების, ტუჩებისა და თვალის ხაზის პერმანენტული მაკიაჟი. დახვეწილი, ბუნებრივი და გამძლე შედეგი.',
    icon: 'pencil',
  },
  {
    id: 'laser',
    title: 'ლაზერული (დიოდური) ეპილაცია',
    description:
      'ეფექტური და უსაფრთხო ლაზერული ეპილაცია სხეულის ნებისმიერ ზონაზე. თანამედროვე დიოდური ლაზერი.',
    icon: 'zap',
  },
];
