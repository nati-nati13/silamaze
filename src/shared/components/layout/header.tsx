'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { PUBLIC_NAV_ITEMS } from '@/shared/const/navigation.const';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-heading text-2xl font-bold tracking-widest text-foreground">
            DERMAKO
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-secondary">
            ACADEMY
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="ნავიგაცია">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="მენიუ"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <nav
          className="md:hidden border-t border-border bg-background px-6 py-4"
          aria-label="მობილური ნავიგაცია"
        >
          <ul className="flex flex-col gap-4">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-sm font-semibold tracking-widest uppercase transition-colors ${
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
