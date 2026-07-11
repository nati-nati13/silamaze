export type Offering = {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: 'sparkle' | 'graduation' | 'shopping';
  href: string;
  cta: string;
};

export const BRAND_PHILOSOPHY_IMAGE = '/images/brand-philosophy.webp';

export const BRAND_PHILOSOPHY_IMAGE_ALT =
  'დერმაკოს პრემიუმ ინტერიერი და მისაღები სივრცე';

export const OFFERINGS: Offering[] = [
  {
    id: 'beauty',
    title: 'DERMAKO BEAUTY',
    label: 'ესთეტიკური კლინიკა და მომსახურება',
    description:
      'უმაღლესი ხარისხის ესთეტიკური მომსახურება, აპარატურული და ინექციური კოსმეტოლოგიის თანამედროვე პროცედურები. ' +
      'გამოცდილი სპეციალისტები, ინდივიდუალური მიდგომა და თანამედროვე ტექნოლოგიები უზრუნველყოფს უსაფრთხო, ' +
      'ბუნებრივ და ჰარმონიულ შედეგს.',
    icon: 'sparkle',
    href: '/servesebi',
    cta: 'იხილეთ მომსახურებები',
  },
  {
    id: 'academy',
    title: 'DERMAKO ACADEMY',
    label: 'პროფესიული სილამაზის განათლება',
    description:
      'პრაქტიკაზე ორიენტირებული სასწავლო პროგრამები კოსმეტოლოგიის, ლაზერული ეპილაციის, პერმანენტული მაკიაჟისა ' +
      'და მასაჟის მიმართულებით. თეორიული ცოდნა, ინტენსიური პრაქტიკა რეალურ მოდელებზე და კურსის დასრულების ' +
      'შემდეგ გაცემული სერტიფიკატი.',
    icon: 'graduation',
    href: '/akademia',
    cta: 'აკადემიის გაცნობა',
  },
  {
    id: 'products',
    title: 'DERMAKO PRODUCTS',
    label: 'პროფესიონალური კოსმეტიკური ხაზი',
    description:
      'პროფესიონალური ხარისხის კოსმეტიკური პროდუქცია ყოველდღიური და პროფესიული გამოყენებისთვის. ' +
      'ინოვაციური ფორმულები, ეფექტური ინგრედიენტები და სანდო მოვლა, რომელიც იდეალურად ავსებს ' +
      'ესთეტიკურ პროცედურებს.',
    icon: 'shopping',
    href: '/sachuqari-barati',
    cta: 'იხილეთ პროდუქცია',
  },
];
