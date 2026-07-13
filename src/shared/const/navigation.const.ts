export type SidebarNavItem = {
  href: string;
  label: string;
  icon: 'dashboard';
};

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
];

export type PublicNavLink = {
  type: 'link';
  href: string;
  label: string;
};

export type PublicNavDropdown = {
  type: 'dropdown';
  label: string;
  children: { href: string; label: string }[];
};

export type PublicNavItem = PublicNavLink | PublicNavDropdown;

export const PUBLIC_NAV_ITEMS: PublicNavItem[] = [
  { type: 'link', href: '/', label: 'მთავარი' },
  { type: 'link', href: '/akademia', label: 'აკადემია' },
  { type: 'link', href: '/servesebi', label: 'სერვისები' },
  { type: 'link', href: '/produqcia', label: 'პროდუქცია' },
  { type: 'link', href: '/galeria', label: 'გალერეა' },
  {
    type: 'dropdown',
    label: 'ჩვენ შესახებ',
    children: [
      { href: '/siaxleebi', label: 'სიახლეები' },
      { href: '/pressa', label: 'პრესა' },
      { href: '/sachuqari-barati', label: 'სასაჩუქრე ბარათი' },
    ],
  },
  { type: 'link', href: '/kontakti', label: 'კონტაქტი' },
];
