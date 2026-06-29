export type Course = {
  id: string;
  title: string;
  description: string;
  icon: 'sparkles' | 'zap' | 'pencil';
};

export const COURSES: Course[] = [
  {
    id: 'classical',
    title: 'კლასიკური კოსმეტოლოგია',
    description:
      'სრული პროფესიული კურსი კლასიკური კოსმეტოლოგიაში. სახის მოვლის, გაწმენდისა და მკურნალობის ტექნიკები პრაქტიკული სწავლებით.',
    icon: 'sparkles',
  },
  {
    id: 'laser',
    title: 'ლაზერული (დიოდური) ეპილაცია',
    description:
      'ლაზერული ეპილაციის თეორია და პრაქტიკა. მოწყობილობებთან მუშაობა, კანის ტიპების ანალიზი და უსაფრთხოება.',
    icon: 'zap',
  },
  {
    id: 'permanent',
    title: 'პერმანენტული მაკიაჟი',
    description:
      'სრული კურსი წარბების, ტუჩების და თვალის პერმანენტული მაკიაჟის ტექნიკებში. ფერის თეორია და ანატომია.',
    icon: 'pencil',
  },
];
