import { Facebook, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { APP_NAME } from '@/shared/const/app.const';
import {
  EMAIL,
  FACEBOOK_URL,
  LOCATIONS,
  PHONE_NUMBER,
  PHONE_TEL,
} from '@/shared/const/contacts.const';
import { COURSES } from '@/shared/const/courses.const';
import { SERVICES } from '@/shared/const/services.const';

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
                alt="Dermako Academy"
                width={44}
                height={44}
                className="size-11 rounded-full"
              />
              <span className="font-heading text-2xl font-bold tracking-widest text-primary-foreground">
                DERMAKO
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-brand-academy">
              Academy · Beauty Space · Shop
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              სილამაზის სივრცე — აკადემია, ესთეტიკური მომსახურება და
              პროფესიონალური პროდუქცია. თბილისსა და საგარეჯოში.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              Academy
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <Link
                    href="/akademia"
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-brand-academy"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              Beauty Space
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href="/servesebi"
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-brand-academy"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              კონტაქტი
            </h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <Link
                  href={`tel:${PHONE_TEL}`}
                  className="text-primary-foreground/70 transition-colors hover:text-brand-academy"
                >
                  {PHONE_NUMBER}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="text-primary-foreground/70 transition-colors hover:text-brand-academy"
                >
                  {EMAIL}
                </Link>
              </li>
              {LOCATIONS.map((loc) => (
                <li key={loc.city} className="text-primary-foreground/50">
                  {loc.address}, {loc.city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row">
          <p className="text-sm text-primary-foreground/60">
            © 2026 {APP_NAME}. ყველა უფლება დაცულია.
          </p>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              aria-label="Instagram"
              className={SOCIAL_LINK_CLASS}
            >
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
            <Link
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className={SOCIAL_LINK_CLASS}
            >
              <Mail className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
