import { CheckCircle, Hand, Pencil, Sparkles, Syringe, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { EnrollButton } from '@/features/enrollment/components/enroll-button';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { FACEBOOK_URL } from '@/shared/const/contacts.const';
import { COURSES, type Course } from '@/shared/const/courses.const';

const ICON_MAP: Record<Course['icon'], LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  pencil: Pencil,
  syringe: Syringe,
  hand: Hand,
};

const WHY_US = [
  'გამოცდილი, სერტიფიცირებული ინსტრუქტორები',
  'პრაქტიკული სწავლება თანამედროვე აპარატებზე',
  'სერტიფიკატი კურსის დასრულებისას',
  'მცირე ჯგუფები — ინდივიდუალური მიდგომა',
  'კარიერული კონსულტაცია',
];

export const AcademyPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-foreground py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
              Dermako Academy
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-background sm:text-6xl">
              აკადემია
            </h1>
            <p className="mt-4 text-base text-background/70 max-w-xl mx-auto">
              გახდი პროფესიონალი კოსმეტოლოგი. ისწავლე საუკეთესო ინსტრუქტორებთან.
            </p>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <header className="mb-16 text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
                კურსები
              </p>
              <h2 className="mt-3 font-heading text-4xl font-bold text-foreground">
                პროფესიული პროგრამები
              </h2>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {COURSES.map((course) => {
                const Icon = ICON_MAP[course.icon];
                return (
                  <Card
                    key={course.id}
                    className="group relative gap-0 overflow-hidden border-secondary/20 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div
                      className="absolute top-0 left-0 h-1 w-full bg-secondary"
                      aria-hidden="true"
                    />
                    <CardHeader className="pt-8 pb-3">
                      <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {course.description}
                      </p>
                      <div className="mt-6">
                        <EnrollButton courseId={course.id} courseTitle={course.title} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
                  რატომ Dermako
                </p>
                <h2 className="mt-3 font-heading text-4xl font-bold text-foreground">
                  ჩვენი უპირატესობები
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Dermako Academy-ში გარანტირებულად მიიღებ მაღალი ხარისხის განათლებას.
                </p>
              </div>
              <ul className="space-y-4">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
              მზად ხარ დაიწყო?
            </h2>
            <p className="mt-4 text-base text-primary-foreground/80">
              დაგვიკავშირდი Facebook-ზე ან ეწვიე ჩვენ ერთ-ერთ ფილიალს.
            </p>
            <div className="mt-8">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  Facebook-ზე დაკავშირება
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
