import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { FACEBOOK_URL, LOCATIONS } from '@/shared/const/contacts.const';

export const ContactSection = () => {
  return (
    <section
      id="slide-contact"
      className="snap-always snap-start h-screen relative flex items-center overflow-hidden bg-card"
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-px bg-primary/20"
        aria-hidden="true"
      />
      <div
        className="absolute right-8 top-0 bottom-0 w-px bg-primary/10"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              მოგვინახულეთ
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              ჩვენი <br />
              <span className="text-primary italic">მისამართები</span>
            </h2>
            <div className="mt-5 h-px w-16 bg-primary/50" aria-hidden="true" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              ორ ქალაქში გთავაზობთ იდენტურ პრემიუმ სერვისს. დაჯავშნეთ
              ვიზიტი ახლავე.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4">
              <Button asChild>
                <Link href="/kontakti">სრული კონტაქტი</Link>
              </Button>
              <div className="flex items-center gap-4">
                <Link
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  <Facebook className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  <Instagram className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/kontakti"
                  aria-label="Email"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  <Mail className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.city}
                className="group flex items-start gap-5 rounded-lg border border-border/40 bg-background/40 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-background/60"
              >
                <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-xl font-bold text-foreground">
                    {loc.city}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{loc.address}</p>
                </div>
              </div>
            ))}

            <p className="text-center text-xs tracking-widest uppercase text-muted-foreground/50 mt-4">
              © 2024 Dermako Academy. ყველა უფლება დაცულია.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
