import { Button } from '@/shared/components/ui/button';

type Props = {
  orderCode: string | null;
  onReset: () => void;
};

export const GiftCardSuccess = ({ orderCode, onReset }: Props) => {
  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
      <p className="font-heading text-4xl font-bold text-brand-green">✓</p>
      <p className="mt-3 font-heading text-xl font-semibold text-foreground">
        ბარათის შეკვეთა მიღებულია!
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        შეკვეთის დასტური გამოგზავნილია ელ-ფოსტაზე. ბარათი გააქტიურდება გადახდის შემდეგ.
      </p>
      {orderCode && (
        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">ბარათის კოდი</p>
          <p className="mt-1 font-mono text-lg font-bold tracking-wider text-foreground">
            {orderCode}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            შეინახეთ ეს კოდი — დაგჭირდებათ ბარათის გასააქტიურებლად.
          </p>
        </div>
      )}
      <Button className="mt-6" variant="outline" onClick={onReset}>
        ახალი ბარათი
      </Button>
    </div>
  );
};
