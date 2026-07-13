export type Location = {
  city: string;
  address: string;
  mapQuery: string;
  phone: string;
  hours: string;
};

export const LOCATIONS: Location[] = [
  {
    city: 'თბილისი',
    address: 'ვაჟა-ფშაველას გამზირი 8',
    mapQuery: '41.7270835,44.764282',
    phone: '+995 555 12 34 56',
    hours: 'ორშ–შაბ · 10:00–19:00',
  },
  {
    city: 'საგარეჯო',
    address: 'ერეკლე II-ის 49',
    mapQuery: '41.7386892,45.3249174',
    phone: '+995 555 12 34 56',
    hours: 'ორშ–შაბ · 10:00–19:00',
  },
];

export const PHONE_NUMBER = '+995 555 12 34 56';
export const PHONE_TEL = '+995555123456';
export const EMAIL = 'dermako.academy8@gmail.com';
export const FACEBOOK_URL = 'https://www.facebook.com/mariam.mako.520412';
