export type SidebarNavItem = {
  href: string;
  label: string;
  icon: 'dashboard';
};

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
];

export type PublicNavItem = {
  href: string;
  label: string;
};

export const PUBLIC_NAV_ITEMS: PublicNavItem[] = [
  { href: '/', label: 'მთავარი' },
  { href: '/servesebi', label: 'სერვისები' },
  { href: '/akademia', label: 'აკადემია' },
  { href: '/kontakti', label: 'კონტაქტი' },
];
