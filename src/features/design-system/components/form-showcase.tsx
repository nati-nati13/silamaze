import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { NativeSelect } from '@/shared/components/ui/select';

export const FormShowcase = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="ds-name">სახელი</Label>
        <Input id="ds-name" placeholder="თქვენი სახელი" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ds-email">ელფოსტა</Label>
        <Input id="ds-email" type="email" placeholder="you@example.com" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ds-branch">ფილიალი</Label>
        <NativeSelect id="ds-branch" defaultValue="tbilisi">
          <option value="tbilisi">თბილისი</option>
          <option value="sagarejo">საგარეჯო</option>
        </NativeSelect>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ds-disabled">გამორთული</Label>
        <Input id="ds-disabled" placeholder="disabled" disabled />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ds-invalid">შეცდომა</Label>
        <Input id="ds-invalid" aria-invalid="true" defaultValue="invalid@" />
      </div>

      <div className="flex items-end">
        <Button variant="default">დაჯავშნა</Button>
      </div>
    </div>
  );
};
