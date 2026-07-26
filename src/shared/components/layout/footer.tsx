import { Facebook, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { APP_NAME } from '@/shared/const/app.const';
import { EMAIL, FACEBOOK_URL, LOCATIONS } from '@/shared/const/contacts.const';
import { FOOTER_NAV_ITEMS } from '@/shared/const/navigation.const';

const SOCIAL_LINK_CLASS =
  'inline-flex size-9 items-center justify-center rounded-full border border-primary-foreground/20 ' +
  'text-primary-foreground/70 transition-colors duration-200 hover:border-brand-academy hover:text-brand-academy';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="Dermako Beauty & Academy"
                width={44}
                height={44}
                className="size-11 rounded-full"
              />
              <span className="font-heading text-2xl font-bold tracking-widest text-primary-foreground">
                DERMAKO
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-brand-academy">
              Beauty &amp; Academy
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              სილამაზის სივრცე — აკადემია, ესთეტიკური მომსახურება და
              პროფესიონალური პროდუქცია. თბილისსა და საგარეჯოში.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <Link href="/" aria-label="Instagram" className={SOCIAL_LINK_CLASS}>
                <Instagram className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={SOCIAL_LINK_CLASS}
              >
                <Facebook className="size-4" aria-hidden="true" />
              </Link>
              <Link href={`mailto:${EMAIL}`} aria-label="Email" className={SOCIAL_LINK_CLASS}>
                <Mail className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              ნავიგაცია
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_NAV_ITEMS.map((item) =>
                item.type === 'link' ? (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-brand-academy"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="text-sm text-primary-foreground/70 transition-colors hover:text-brand-academy"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              კონტაქტი
            </h4>
            <ul className="mt-4 flex flex-col gap-4 text-sm">
              <li>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="text-primary-foreground/70 transition-colors hover:text-brand-academy"
                >
                  {EMAIL}
                </Link>
              </li>
              {LOCATIONS.map((loc) => (
                <li key={loc.city} className="flex flex-col gap-1">
                  <span className="font-semibold text-primary-foreground/80">{loc.city}</span>
                  <Link
                    href={`tel:${loc.phone.replace(/\s/g, '')}`}
                    className="text-primary-foreground/70 transition-colors hover:text-brand-academy"
                  >
                    {loc.phone}
                  </Link>
                  <span className="text-primary-foreground/50">{loc.address}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              სიახლეების გამოწერა
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              გამოიწერეთ სიახლეები აკადემიისა და სილამაზის სივრცის შესახებ.
            </p>
            <form className="mt-4 flex items-center gap-2">
              <Input
                type="email"
                placeholder="თქვენი ელფოსტა"
                className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
              />
              <Button type="submit" variant="gold" size="sm">
                გამოწერა
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row">
          <p className="text-sm text-primary-foreground/60">
            © 2026 {APP_NAME}. ყველა უფლება დაცულია.
          </p>
        </div>
      </div>
    </footer>
  );
};
