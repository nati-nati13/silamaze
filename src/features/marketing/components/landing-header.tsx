'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { PUBLIC_NAV_ITEMS } from '@/shared/const/navigation.const';

export const LandingHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-primary-foreground/10 bg-primary">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="Dermako Academy"
            width={40}
            height={40}
            className="size-10 rounded-full"
          />
          <span className="flex flex-col leading-none gap-1">
            <span className="font-heading text-xl font-bold tracking-widest text-primary-foreground">
              DERMAKO
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-academy">
              ACADEMY
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="ნავიგაცია">
          {PUBLIC_NAV_ITEMS.map((item) => {
            if (item.type === 'dropdown') {
              return (
                <Fragment key={item.label}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                        pathname === child.href
                          ? 'text-brand-academy'
                          : 'text-primary-foreground/70 hover:text-primary-foreground'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </Fragment>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-foreground/60 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/90 md:inline-flex"
          >
            <Link href="/kontakti">დაჯავშნა</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="მენიუ"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="md:hidden border-t border-primary-foreground/10 bg-primary px-6 py-4"
          aria-label="მობილური ნავიგაცია"
        >
          <ul className="flex flex-col gap-4">
            {PUBLIC_NAV_ITEMS.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <Fragment key={item.label}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block text-sm font-semibold tracking-widest uppercase transition-colors ${
                            pathname === child.href
                              ? 'text-brand-academy'
                              : 'text-primary-foreground/70 hover:text-primary-foreground'
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </Fragment>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block text-sm font-semibold tracking-widest uppercase transition-colors ${
                      pathname === item.href
                        ? 'text-primary'
                        : 'text-foreground/60 hover:text-primary'
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
