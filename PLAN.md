# Dermako Academy — განვითარების გეგმა

---

## არსებული გვერდები (მზა)

| გვერდი | Route | სტატუსი |
|---|---|---|
| მთავარი | `/` | ✅ მზადა |
| სერვისები | `/servesebi` | ✅ მზადა |
| აკადემია | `/akademia` | ✅ მზადა |
| კონტაქტი | `/kontakti` | ✅ მზადა |
| Login | `/login` | ✅ მზადა |

---

## ახალი გვერდები

| გვერდი | Route | ეტაპი |
|---|---|---|
| სიახლეები | `/siaxleebi` | ეტაპი 1 |
| პრესა | `/pressa` | ეტაპი 1 |
| გალერეა | `/galeria` | ეტაპი 2 |
| სასაჩუქრე ბარათი | `/sachuqari-barati` | ეტაპი 3 |

---

## მენიუს სტრუქტურა

```
მთავარი                    → /
ჩვენ შესახებ (dropdown)   →
  └─ სიახლეები             → /siaxleebi
  └─ პრესა                 → /pressa
სერვისები                  → /servesebi
გალერეა                    → /galeria
სასაჩუქრე ბარათი          → /sachuqari-barati
აკადემია                   → /akademia
კონტაქტი                   → /kontakti
```

---

## ეტაპი 1 — Header dropdown "ჩვენ შესახებ" + სიახლეები + პრესა

**შეიცვლება:**
- [x] `src/shared/const/navigation.const.ts` — dropdown სტრუქტურა (`PUBLIC_NAV_ITEMS`-ში dropdown ტიპი)
- [x] `src/shared/components/layout/header.tsx` — dropdown UI (hover desktop, accordion mobile)

**შეიქმნება:**
- [x] `src/app/(public)/siaxleebi/page.tsx` → route `/siaxleebi`
- [x] `src/features/marketing/components/news-page.tsx` (stub)
- [x] `src/shared/const/news.const.ts`
- [x] `src/app/(public)/pressa/page.tsx` → route `/pressa`
- [x] `src/features/marketing/components/press-page.tsx` (stub)
- [x] `src/shared/const/press.const.ts`

---

## ეტაპი 2 — გალერეა (მთავარ მენიუში ცალკე)

**შეიცვლება:**
- [x] `src/shared/const/navigation.const.ts` — "გალერეა" მთავარ nav-ში

**შეიქმნება:**
- [x] `src/app/(public)/galeria/page.tsx` → route `/galeria`
- [x] `src/features/marketing/components/gallery-page.tsx`
- [x] `src/shared/const/gallery.const.ts` (placeholder ფოტო-ობიექტები: alt, category)

---

## ეტაპი 3 — სასაჩუქრე ბარათი (მთავარ მენიუში ცალკე)

**შეიცვლება:**
- [x] `src/shared/const/navigation.const.ts` — "სასაჩუქრე ბარათი" მთავარ nav-ში

**შეიქმნება:**
- [x] `src/app/(public)/sachuqari-barati/page.tsx` → route `/sachuqari-barati`
- [x] `src/features/marketing/components/gift-card-page.tsx`
- [x] `src/shared/const/gift-card.const.ts` (ნომინალები, პირობები)

---

## წესები

- მთავარი გვერდის `hero` და არსებული დიზაინი **არ შეიცვლოს და არ წაიშალოს**
- ფერები ღია/ვარდისფერი დარჩეს — მუქი ფონები ახალ გვერდებზე არ გამოიყენოს
- თითო ეტაპი ცალ-ცალკე გაკეთდეს, თანმიმდევრობით
- ყველა ახალი ფაილი feature-based არქიტექტურით (`src/features/marketing/` ან `src/shared/const/`)
- inline styles აკრძალულია — მხოლოდ Tailwind utility კლასები
