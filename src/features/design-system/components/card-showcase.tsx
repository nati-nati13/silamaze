import { Sparkles } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@/shared/components/ui/card';
import { IconBadge } from '@/shared/components/ui/icon-badge';

export const CardShowcase = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardImage>
          <span className="text-sm text-muted-foreground">სურათის ადგილი</span>
        </CardImage>
        <CardHeader>
          <CardTitle className="font-heading text-xl">სახის მოვლა</CardTitle>
          <CardDescription>პრემიუმ კოსმეტოლოგიური პროცედურა.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            image-top card variant · hover lift · hairline border.
          </p>
        </CardContent>
      </Card>

      <Card className="relative">
        <IconBadge size="sm" className="absolute -top-3 -right-3 z-10">
          <Sparkles aria-hidden="true" />
        </IconBadge>
        <CardHeader>
          <CardTitle className="font-heading text-xl">აკადემიის კურსი</CardTitle>
          <CardDescription>icon badge on card corner.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            feature card variant — no image, floating icon badge.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-academy">დერმაკო აკადემია</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">სასაჩუქრე ბარათი</CardTitle>
          <CardDescription>compact content-only variant.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            no image slot — used for text-first summaries and form panels.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
