'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 sm:px-10">
        <Link href="/" className="flex flex-col gap-1">
          <span className="font-heading text-2xl font-semibold tracking-widest text-primary-foreground">
            DERMAKO
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-academy">
            Beauty · Academy · Products
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="ნავიგაცია">
          {PUBLIC_NAV_ITEMS.map((item) => {
            if (item.type === 'dropdown') {
              const isChildActive = item.children.some(
                (child) => pathname === child.href
              );

              return (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className={`inline-flex max-w-20 items-center gap-1 text-center text-xs font-semibold
                      tracking-widest uppercase leading-relaxed transition-colors duration-200 ${
                isChildActive
                  ? 'text-brand-academy'
                  : 'text-primary-foreground/70 group-hover:text-primary-foreground'
                }`}
                  >
                    {item.label}
                    <ChevronDown className="size-3 shrink-0" aria-hidden="true" />
                  </button>
                  <div
                    className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0
                      transition-all duration-200 group-hover:visible group-hover:opacity-100
                      group-focus-within:visible group-focus-within:opacity-100"
                  >
                    <ul className="min-w-48 rounded-md border border-border bg-card p-2 shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block rounded-sm px-3 py-2 text-xs font-semibold tracking-widest uppercase transition-colors ${
                              pathname === child.href
                                ? 'text-brand-academy'
                                : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-brand-academy'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
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
            className="hidden bg-brand-academy font-semibold text-primary-foreground hover:bg-brand-academy/90 lg:inline-flex"
          >
            <Link href="/#slide-reservation">დაჯავშნა</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="მენიუ"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="lg:hidden border-t border-primary-foreground/10 bg-primary px-6 py-4"
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
                        ? 'text-brand-academy'
                        : 'text-primary-foreground/70 hover:text-primary-foreground'
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
