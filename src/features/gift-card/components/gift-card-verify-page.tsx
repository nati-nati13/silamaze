import { CheckCircle2, XCircle } from 'lucide-react';

import type { SafeVerification } from '@/features/gift-card/service/gift-card.service';
import { LandingHeader } from '@/features/marketing/components/landing-header';
import { Footer } from '@/shared/components/layout/footer';

type StatusView = { tone: 'ok' | 'bad'; title: string; note: string };

const STATUS_VIEW: Record<string, StatusView> = {
  active: { tone: 'ok', title: 'ბარათი აქტიურია', note: 'ბარათი მოქმედია და მზადაა გამოსაყენებლად.' },
  partially_used: { tone: 'ok', title: 'ბარათი აქტიურია', note: 'ბარათი ნაწილობრივ გამოყენებულია.' },
  redeemed: { tone: 'bad', title: 'ბარათი სრულად გამოყენებულია', note: 'ბალანსი ამოწურულია.' },
  expired: { tone: 'bad', title: 'ბარათი ვადაგასულია', note: 'მოქმედების ვადა ამოიწურა.' },
  cancelled: { tone: 'bad', title: 'ბარათი მიუწვდომელია', note: 'ბარათი გაუქმებულია.' },
  pending: { tone: 'bad', title: 'ბარათი ჯერ არ არის გააქტიურებული', note: 'ბარათი ჯერ არ არის გააქტიურებული.' },
  awaiting_payment: { tone: 'bad', title: 'ბარათი ჯერ არ არის გააქტიურებული', note: 'ბარათი ჯერ არ არის გააქტიურებული.' },
};

const FALLBACK_VIEW: StatusView = {
  tone: 'bad',
  title: 'ბარათი ვერ მოიძებნა',
  note: 'ბმული არასწორია ან ვადაგასულია.',
};

const fmtDate = (iso: string | null | undefined): string =>
  iso ? new Date(iso).toLocaleDateString('ka-GE') : '—';

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-border py-3 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-foreground">{value}</span>
  </div>
);

export const GiftCardVerifyPage = ({ data }: { data: SafeVerification }) => {
  const view: StatusView = data.status ? STATUS_VIEW[data.status] ?? FALLBACK_VIEW : FALLBACK_VIEW;
  const ok = data.found && view.tone === 'ok';
  const balance =
    data.remainingBalance !== null && data.remainingBalance !== undefined
      ? `${data.remainingBalance} ${data.currency ?? ''}`.trim()
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 pt-20">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-lg px-6">
            <p className="eyebrow text-center text-brand-academy">Dermako Gift Card</p>
            <div className="mt-6 rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {ok ? (
                  <CheckCircle2 className="size-12 text-brand-green" aria-hidden="true" />
                ) : (
                  <XCircle className="size-12 text-muted-foreground" aria-hidden="true" />
                )}
                <h1 className="mt-4 font-heading text-2xl font-semibold text-foreground">
                  {data.found ? view.title : 'ბარათი ვერ მოიძებნა'}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {data.found ? view.note : 'ბმული არასწორია ან ვადაგასულია.'}
                </p>
              </div>

              {data.found && (
                <div className="mt-6">
                  <Row label="ბარათის კოდი" value={data.code ?? '—'} />
                  <Row label="ღირებულება / სერვისი" value={data.amount ?? '—'} />
                  {balance && <Row label="დარჩენილი ბალანსი" value={balance} />}
                  <Row label="ფილიალი" value={data.location ?? '—'} />
                  <Row label="გაცემის თარიღი" value={fmtDate(data.issuedAt)} />
                  <Row label="მოქმედების ვადა" value={fmtDate(data.expiresAt)} />
                  {data.displayFrom ? <Row label="გამგზავნი" value={data.displayFrom} /> : null}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
