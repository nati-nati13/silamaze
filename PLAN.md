# Dermako Academy — ბრენდ-ბრიფის იმპლემენტაციის გეგმა

> წყარო: ბრენდ-ბრიფი (Aesop / Vogue Beauty / Apple / Dior Beauty — minimal editorial luxury).
> აუდიტის შედეგი: Hero, Header, Footer, About, Contact/Branches, Reservation ✅ დგას.
> აკლია: Testimonials, FAQ, Courses carousel, ფოტოგრაფია, Gallery masonry, scroll reveal.
> წინა გეგმა (სიახლეები/პრესა/გალერეა/სასაჩუქრე ბარათი) — ყველა ეტაპი დასრულებულია.

---

## სექციების სტატუსი (აუდიტი)

| სექცია | სტატუსი | დეფიციტი |
|---|---|---|
| Header | ✅ | label-ები: „აკადემია"→„კურსები" (განსახილველი) |
| Hero | ✅ | სიტყვა „იზრუნე" vs ბრიფის „იბრწყინე" |
| Offerings (3 pillars) | ✅ ბონუსი | ბრიფში არაა — რჩება |
| About | 🟡 | დიდი რეალური ფოტო (ახლა gradient placeholder) |
| Courses | 🟡 | grid → horizontal carousel, ფოტოები, CTA „დაწვრილებით" |
| Services | 🟡 | ქარდებში ფოტოგრაფია (ახლა icons) |
| Gallery | 🔴 | masonry layout, რეალური ფოტოები, homepage preview |
| Testimonials | 🔴 | არ არსებობს |
| FAQ | 🔴 | არ არსებობს |
| Contact/Branches | ✅ | — |
| Reservation | ✅ ბონუსი | — |
| Footer | ✅ | — |
| Scroll fade-in | 🟡 | მხოლოდ hero load-anim; სექციებზე scroll reveal არაა |

---

## ეტაპი 1 — Testimonials + FAQ (ფოტოზე დამოკიდებულება არაა)

**შეიქმნება:**
- [ ] `src/shared/const/testimonials.const.ts` — შეფასებები (name, role, text)
- [ ] `src/features/marketing/components/testimonials-section.tsx` — large elegant cards, serif ციტატა, bronze accents
- [ ] `src/shared/const/faq.const.ts` — კითხვა/პასუხი (კურსები, ფასები, სერტიფიკატი, ჯავშანი)
- [ ] `src/shared/components/ui/accordion.tsx` — shadcn accordion (`npx shadcn add accordion`)
- [ ] `src/features/marketing/components/faq-section.tsx` — minimal accordion

**შეიცვლება:**
- [ ] `src/features/marketing/components/home-page.tsx` — რიგი: … About → Testimonials → Reservation → FAQ → Branches → CtaBand

---

## ეტაპი 2 — Courses horizontal carousel

**შეიქმნება:**
- [ ] `src/features/marketing/components/courses-carousel.tsx` — client component, horizontal scroll-snap track, cinematic cards (photo-slot + title + desc + „დაწვრილებით"), prev/next ღილაკები

**შეიცვლება:**
- [ ] `src/shared/const/courses.const.ts` — `image` ველი (placeholder path-ები `/images/courses/<id>.webp`)
- [ ] `src/features/marketing/components/courses-section.tsx` — grid → carousel; EnrollButton რჩება ქარდში ან modal-ში
- ფოტო ჯერ არ არის → photo-slot gradient placeholder-ით, `image` მოვიდა თუ არა ავტომატურად ჩაჯდება

---

## ეტაპი 3 — ფოტოგრაფია (content-blocker; მოწოდება უნდა მომხმარებელმა)

**საჭირო ფოტოები (`public/images/`):**
- [ ] `about.webp` — 1 დიდი (კლინიკის ინტერიერი / სწავლების პროცესი)
- [ ] `courses/*.webp` — 5 (თითო კურსზე)
- [ ] `services/*.webp` — 5 (თითო სერვისზე)
- [ ] `gallery/*.webp` — 12± (gallery.const კატეგორიების მიხედვით)

**შეიცვლება (ფოტოების მოსვლისას):**
- [ ] `src/shared/const/services.const.ts` — `image` ველი
- [ ] `src/features/marketing/components/services-section.tsx` — icon → photo card
- [ ] `src/features/marketing/components/about-section.tsx` — gradient box → `next/image`
- [ ] `src/shared/const/gallery.const.ts` — `src` ველი

---

## ეტაპი 4 — Gallery masonry + homepage preview

**შეიცვლება:**
- [ ] `src/features/marketing/components/gallery-page.tsx` — uniform grid → masonry (`columns-2 sm:columns-3 lg:columns-4`, `break-inside-avoid`), premium hover (zoom + bronze overlay)

**შეიქმნება:**
- [ ] `src/features/marketing/components/gallery-preview-section.tsx` — homepage-ზე 6-8 ფოტო + „სრული გალერეა" ლინკი `/galeria`-ზე
- [ ] `home-page.tsx`-ში ჩართვა (Services-ის შემდეგ)

---

## ეტაპი 5 — Scroll fade-in reveal

**შეიცვლება:**
- [ ] `src/app/globals.css` — `.reveal` utility (opacity+translateY transition, `prefers-reduced-motion` guard)
- [ ] `src/shared/hooks/use-reveal.ts` ან მსუბუქი client wrapper კომპონენტი `src/shared/components/` — IntersectionObserver, ერთჯერადი trigger
- [ ] ყველა homepage სექციაზე გადაბმა
- წესი: subtle (12-16px, ~0.6s), არა flashy

---

## ეტაპი 6 — წვრილმანი შესწორებები

- [ ] `hero-section.tsx` — „იზრუნე." → „იბრწყინე." (ბრიფის ზუსტი headline)
- [ ] nav label განხილვა: „აკადემია" → „კურსები" (ბრიფის მენიუ)
- [ ] `CLAUDE.md` env doc fix: `MONGO_URI` → `MONGODB_URI` (კოდი ამას კითხულობს)

---

## წესები

- Design Direction ჩაკეტილია (CLAUDE.md §19) — light cream default, Deep Green მხოლოდ header/footer/CTA band, bronze accents, Fraunces + Inter. არ შეიცვალოს.
- Bronze მხოლოდ: CTA, მცირე აქცენტები, icons, dividers. Olive green — ზომიერად.
- Normal scroll. Snap/dot-nav აკრძალულია.
- ანიმაციები: subtle, `prefers-reduced-motion` guard სავალდებულო.
- inline styles / arbitrary `[...]` values აკრძალულია.
- ყველა ფაილი feature-based არქიტექტურით; constants `src/shared/const/`-ში.
- თითო ეტაპი ცალკე commit-ით, თანმიმდევრობით.
