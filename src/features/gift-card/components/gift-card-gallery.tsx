import Image from 'next/image';

import { GIFT_CARD_GALLERY_ITEMS } from '@/shared/const/gift-card.const';

export const GiftCardGallery = () => {
  return (
    <section className="bg-card py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            როგორ გამოიყურება
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            {GIFT_CARD_GALLERY_ITEMS.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="relative aspect-3/2 overflow-hidden rounded-2xl border border-border bg-muted">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-xs font-semibold text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-heading text-2xl font-semibold text-foreground">პრემიუმ შეფუთვა</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Dermako-ს სასაჩუქრე სერტიფიკატი ხელნაკეთი ტექსტურირებული კონვერტით და პრემიუმ
              ხარისხის სერტიფიკატით მზადდება, რაც მას განსაკუთრებულ და დასამახსოვრებელ საჩუქრად
              აქცევს.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
