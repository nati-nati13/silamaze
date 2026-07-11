export type AboutFeature = {
  title: string;
  description: string;
  icon: 'check' | 'users' | 'certificate' | 'sparkles';
};

// set to '/images/about.webp' when the photo is added to public/images/
export const ABOUT_IMAGE: string | null = null;

export const ABOUT_FEATURES: AboutFeature[] = [
  {
    title: 'პრაქტიკოსი ოსტატები',
    description: 'მასწავლებლები, რომლებიც ყოველდღიურად მუშაობენ რეალურ კლიენტებთან.',
    icon: 'check',
  },
  {
    title: 'მცირე ჯგუფები',
    description: 'ინდივიდუალური ყურადღება და საკმარისი პრაქტიკის დრო ყველასთვის.',
    icon: 'users',
  },
  {
    title: 'სერტიფიკატი კურსის ბოლოს',
    description: 'კურსის დასრულების შემდეგ იღებ დამადასტურებელ დოკუმენტს.',
    icon: 'certificate',
  },
  {
    title: 'პრაქტიკა კლინიკაში',
    description: 'სწავლისას მუშაობ ჩვენსავე Beauty Space-ში, რეალურ სამუშაო გარემოში.',
    icon: 'sparkles',
  },
];
