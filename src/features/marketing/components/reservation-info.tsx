import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

import { EMAIL, LOCATIONS } from '@/shared/const/contacts.const';

export const ReservationInfo = () => {
  return (
    <div>
      <p className="eyebrow text-brand-academy">Reservation &amp; Contact</p>
      <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        დაჯავშნეთ ვიზიტი ან <span className="italic text-brand-green">კონსულტაცია</span>
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
        შეავსეთ მოკლე განაცხადის ფორმა. Dermako-ს ადმინისტრაცია
        დაგიკავშირდებათ სასურველი დროისა და დეტალების დასადასტურებლად.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-7">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          საკონტაქტო ინფორმაცია
        </h3>
        <ul className="mt-5 flex flex-col gap-6 text-sm">
          {LOCATIONS.map((loc) => (
            <li key={loc.city} className="flex flex-col gap-2.5">
              <p className="font-heading text-base font-semibold text-foreground">
                დერმაკო {loc.city}
              </p>
              <a
                href={`tel:${loc.phone.replace(/\s/g, '')}`}
                className="flex items-start gap-3 text-foreground transition-colors hover:text-brand-green"
              >
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden="true" />
                {loc.phone}
              </a>
              <span className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden="true" />
                {loc.address}, {loc.city}
              </span>
            </li>
          ))}
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden="true" />
            <a
              href={`mailto:${EMAIL}`}
              className="text-foreground transition-colors hover:text-brand-green"
            >
              {EMAIL}
            </a>
          </li>
        </ul>
      </div>

      <p className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-muted p-5 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden="true" />
        თქვენი პერსონალური მონაცემები დაცულია და გამოიყენება მხოლოდ
        ვიზიტის ორგანიზებისთვის.
      </p>
    </div>
  );
};
