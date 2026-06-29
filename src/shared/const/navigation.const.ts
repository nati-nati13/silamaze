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
  {
    type: 'dropdown',
    label: 'ჩვენ შესახებ',
    children: [
      { href: '/siaxleebi', label: 'სიახლეები' },
      { href: '/pressa', label: 'პრესა' },
    ],
  },
  { type: 'link', href: '/servesebi', label: 'სერვისები' },
  { type: 'link', href: '/akademia', label: 'აკადემია' },
  { type: 'link', href: '/kontakti', label: 'კონტაქტი' },
];
