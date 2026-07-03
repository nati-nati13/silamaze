'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { PUBLIC_NAV_ITEMS } from '@/shared/const/navigation.const';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Dermako Academy" width={40} height={40} className="size-10" />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-2xl font-bold tracking-widest text-foreground">
              DERMAKO
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-secondary">
              ACADEMY
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="ნავიგაცია">
          {PUBLIC_NAV_ITEMS.map((item) => {
            if (item.type === 'dropdown') {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                      item.children.some((c) => c.href === pathname)
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-2 z-50">
                      <div className="min-w-40 rounded-md border border-border bg-background shadow-md py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                              pathname === child.href
                                ? 'text-primary bg-muted'
                                : 'text-muted-foreground hover:text-primary hover:bg-muted'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

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
            {PUBLIC_NAV_ITEMS.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <li key={item.label}>
                    <button
                      className="flex w-full items-center justify-between text-sm font-semibold tracking-widest uppercase text-muted-foreground"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {openDropdown === item.label && (
                      <ul className="mt-2 flex flex-col gap-2 pl-4 border-l border-border">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block text-sm font-semibold tracking-widest uppercase transition-colors ${
                                pathname === child.href
                                  ? 'text-primary'
                                  : 'text-muted-foreground hover:text-primary'
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

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
