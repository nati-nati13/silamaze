export type AcademyFeature = {
  title: string;
  description: string;
  icon: 'practice' | 'groups' | 'certificate' | 'environment';
};

export const ACADEMY_FEATURES: AcademyFeature[] = [
  {
    title: 'პრაქტიკული სწავლება',
    description: 'თეორია და რეალურ მოდელებზე მუშაობა ერთ სასწავლო პროცესში.',
    icon: 'practice',
  },
  {
    title: 'მცირე ჯგუფები',
    description: 'მეტი ყურადღება თითოეულ სტუდენტზე და უკეთესი პრაქტიკული გამოცდილება.',
    icon: 'groups',
  },
  {
    title: 'სერტიფიკატი',
    description: 'კურსის დასრულების შემდეგ სტუდენტი იღებს შესაბამის სერტიფიკატს.',
    icon: 'certificate',
  },
  {
    title: 'პროფესიული გარემო',
    description: 'სწავლება მოქმედ სპეციალისტებთან და თანამედროვე სამუშაო სივრცეში.',
    icon: 'environment',
  },
];
