'use client';

import { Gift, Menu, X } from 'lucide-react';
import Image from 'next/image';
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
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6 sm:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/logo.svg" alt="Dermako Beauty & Academy" width={44} height={44} className="size-11" />
          <span className="flex flex-col leading-none gap-1">
            <span className="font-heading text-2xl font-bold tracking-widest text-foreground">
              DERMAKO
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-academy">
              Beauty &amp; Academy
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 xl:flex" aria-label="ნავიგაცია">
          {PUBLIC_NAV_ITEMS.map((item) => {
            if (item.type !== 'link') return null;

            return (
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
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-brand-academy text-brand-academy hover:bg-brand-academy hover:text-primary-foreground"
          >
            <Link href="/sachuqari-barati">
              <Gift className="size-4" aria-hidden="true" />
              სასაჩუქრე ბარათი
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href="/dajavshna">დაჯავშნა</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="მენიუ"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <nav
          className="xl:hidden border-t border-border bg-background px-6 py-4"
          aria-label="მობილური ნავიგაცია"
        >
          <ul className="flex flex-col gap-4">
            {PUBLIC_NAV_ITEMS.map((item) => {
              if (item.type !== 'link') return null;

              return (
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
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
