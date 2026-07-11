# DERMAKO — Image Specification & AI Generation Prompts

ერთიანი ვიზუალური იდენტობა ყველა ფოტოსთვის. მიზანი: ყველა კადრი გამოიყურებოდეს ისე, თითქოს ერთ დღეს, ერთ კლინიკაში, ერთმა luxury commercial ფოტოგრაფმა გადაიღო — ერთი განათებით და ერთი color grading-ით.

---

## Global Creative Direction (ყველა ფოტოზე ვრცელდება)

| პარამეტრი | მნიშვნელობა |
|---|---|
| სტილი | Quiet Luxury · Medical Elegance · Editorial Beauty · Scandinavian Minimalism · Premium Wellness |
| განათება | Warm diffused daylight — დიდი ფანჯრიდან, რბილი ჩრდილები, ხელოვნური flash-ის გარეშე |
| ინტერიერი | Cream (#F7F3EA) კედლები, თბილი ხის დეტალები, მინიმალური აღჭურვილობა კადრში |
| აქცენტები | Deep forest green (#18312B) — ტექსტილი/დეტალი; soft bronze (#B88945) — წვრილი ლითონის დეტალები |
| კანის ტონები | ბუნებრივი, არარეტუშირებული განცდა, health-glow |
| ფონი | მინიმალური, dekluttered, რბილი depth-of-field |
| განწყობა | სიმშვიდე, პროფესიონალიზმი, პრემიუმ wellness — არა „სამედიცინო სისტერილე", არა „ინსტაგრამ-გლამური" |
| ტექნიკა | Realistic commercial photography, full-frame look, 50–85mm, f/2.8–f/4, ISO low, ბუნებრივი გრეინი მინიმალური |
| ფორმატი | WebP (საბოლოო), sRGB |

**Shared AI prompt suffix** (ყველა პრომპტს ბოლოში ემატება):

> …quiet luxury aesthetic clinic, cream interior with warm wood details, deep forest green textile accents, subtle bronze metal details, warm diffused window daylight, soft shadows, natural skin tones, scandinavian minimalism, editorial beauty photography, realistic commercial photo, shot on full-frame camera 85mm f/2.8, shallow depth of field, consistent warm color grading, no text, no watermark

---

## 1. About — 1 ფოტო

### `about.webp`
| ველი | სპეცი |
|---|---|
| File path | `public/images/about.webp` |
| ჩართვა | `src/shared/const/about.const.ts` → `ABOUT_IMAGE = '/images/about.webp'` |
| Dimensions | 1200×1200 |
| Aspect ratio | 1:1 |
| Composition | ინსტრუქტორი + სტუდენტი პროცედურის მაგიდასთან; ინსტრუქტორი ხელით აჩვენებს ტექნიკას, სტუდენტი აკვირდება. კადრის ქვედა მესამედი შედარებით მშვიდი (გლას-ბეიჯი ედება UI-ში) |
| Camera angle | Eye-level, ოდნავ გვერდიდან (3/4), medium shot |
| Lighting | ფანჯრის რბილი დღის შუქი მარცხნიდან |
| Mood | მენტორობა, ნდობა, სიმშვიდე |
| Background | Cream კედელი, blur-ში მწვანე დეტალი (ხალათი ან ტექსტილი) |
| Palette | Cream + white coat + deep green აქცენტი |
| Subject | ორი ქალი — ინსტრუქტორი თეთრ სამედიცინო ხალათში და სტუდენტი — სახის პროცედურის სწავლების პროცესში |

**AI Prompt:**
> A cosmetology instructor in an elegant white medical coat teaching a female student during a facial treatment demonstration, mentor pointing at technique with gloved hand, student observing attentively, medium shot, eye-level 3/4 angle, calm lower third of frame, …*(suffix)*

---

## 2. Courses — 5 ფოტო (სწავლის პროცესი, სტუდენტის პერსპექტივა)

ყველა: **1280×720, 16:9**, ჩართვა `src/shared/const/courses.const.ts` → შესაბამისი ობიექტის `image` ველი (`'/images/courses/<id>.webp'`).

### `courses/classical.webp`
| ველი | სპეცი |
|---|---|
| Composition | სტუდენტი ასრულებს სახის მოვლის პროცედურას მოდელზე, ინსტრუქტორი გვერდით აკვირდება |
| Camera angle | Over-the-shoulder, medium shot |
| Lighting/Mood/BG/Palette | Global + პროდუქტების მინიმალური თარო blur-ში |
| Subject | სწავლების მომენტი — ხელები, სახის მასკის აპლიკაცია |

**AI Prompt:**
> Cosmetology student performing classic facial skincare treatment on a client, instructor supervising beside, over-the-shoulder medium shot, hands applying cream mask, minimal product shelf blurred in background, 16:9, …*(suffix)*

### `courses/laser.webp`
| ველი | სპეცი |
|---|---|
| Composition | თანამედროვე დიოდური ლაზერის აპარატი მოქმედებაში; სტუდენტი მართავს handpiece-ს, დამცავი სათვალეები |
| Camera angle | Side profile, medium-close |
| Subject | აპარატის და ტექნიკის სწავლება |

**AI Prompt:**
> Student training on a modern white diode laser hair removal machine, holding laser handpiece over client's arm, both wearing protective glasses, sleek device with subtle bronze detail, side profile medium-close shot, 16:9, …*(suffix)*

### `courses/permanent.webp`
| ველი | სპეცი |
|---|---|
| Composition | წარბის პერმანენტული მაკიაჟის ვარჯიში — close-up ხელებზე და ინსტრუმენტზე |
| Camera angle | Top-down 45°, close-up |
| Subject | პიგმენტაციის ტექნიკა, სიზუსტე |

**AI Prompt:**
> Close-up of permanent makeup training session, gloved hands holding microblading pen over client's eyebrow, precise focused work, top-down 45 degree close shot, 16:9, …*(suffix)*

### `courses/injection.webp`
| ველი | სპეცი |
|---|---|
| Composition | ინექციური კოსმეტოლოგიის სწავლება — სტერილური მაგიდა, ხელთათმანები, ინსტრუქტორის ზედამხედველობა |
| Camera angle | Medium-close, ოდნავ ზემოდან |
| Subject | უსაფრთხო, პროფესიული ინექციის ტექნიკა |

**AI Prompt:**
> Aesthetic injection training in premium clinic, instructor guiding student's gloved hand holding fine syringe near client's cheek, sterile minimal tray beside, medium-close slightly elevated shot, calm professional atmosphere, 16:9, …*(suffix)*

### `courses/massage.webp`
| ველი | სპეცი |
|---|---|
| Composition | სახის მასაჟის ტექნიკის ჩვენება — ინსტრუქტორის ხელები კლიენტის სახეზე, სტუდენტები აკვირდებიან |
| Camera angle | Eye-level, medium |
| Subject | ხელების ტექნიკა, სიმშვიდე |

**AI Prompt:**
> Facial massage technique demonstration, instructor's hands performing lifting massage on relaxed client's face, one student observing, eye-level medium shot, serene spa-like calm, 16:9, …*(suffix)*

---

## 3. Services — 5 ფოტო (კლიენტის განცდა/შედეგი — არა სწავლება)

ყველა: **1280×720, 16:9**, ჩართვა `src/shared/const/services.const.ts` → `image` ველი (`'/images/services/<id>.webp'`).

განსხვავება Courses-ისგან: კადრში **მხოლოდ სპეციალისტი და კლიენტი** — სტუდენტები/დამკვირვებლები არ ჩანან. აქცენტი კლიენტის კომფორტზე.

### `services/classical.webp`
**Composition:** კლიენტი მოდუნებული პროცედურის საწოლზე, სპეციალისტი ატარებს სახის პროცედურას. Camera: eye-level side, medium. Subject: spa-სიმშვიდე.

**AI Prompt:**
> Relaxed female client receiving luxury facial treatment, cosmetologist gently applying serum, client's eyes closed in serene comfort, eye-level side medium shot, 16:9, …*(suffix)*

### `services/injection.webp`
**Composition:** ესთეტიკური ინექცია — სპეციალისტის თავდაჯერებული ხელი, კლიენტი მშვიდი. Camera: medium-close, 3/4. Subject: პროფესიონალიზმი + უსაფრთხოება.

**AI Prompt:**
> Professional aesthetic practitioner performing subtle facial injection on calm client, confident gloved hands, fine syringe, premium clinical yet warm setting, 3/4 medium-close shot, 16:9, …*(suffix)*

### `services/massage.webp`
**Composition:** სხეულის/სახის რელაქსაციური მასაჟი, რბილი პირსახოცები (cream/green). Camera: ზემოდან ან გვერდიდან, medium. Subject: სრული მოდუნება.

**AI Prompt:**
> Client enjoying relaxing facial and neck massage, therapist's hands in gentle motion, soft cream towels and deep green textile accents, side medium shot, deeply calm wellness mood, 16:9, …*(suffix)*

### `services/permanent.webp`
**Composition:** დასრულებული პერმანენტული მაკიაჟის შედეგი — კლიენტი სარკეში იყურება ან portrait ახლო ხედით, ბუნებრივი შედეგი. Camera: close-up portrait. Subject: შედეგი და კმაყოფილება.

**AI Prompt:**
> Beauty portrait of client with fresh natural-looking permanent eyebrow makeup, subtle satisfied smile, flawless natural result, close-up editorial beauty portrait, 16:9 crop, …*(suffix)*

### `services/laser.webp`
**Composition:** ლაზერული ეპილაციის სესია — handpiece კლიენტის ფეხზე/მკლავზე, კლიენტი კომფორტში. Camera: medium-close side. Subject: თანამედროვე ტექნოლოგია + კომფორტი.

**AI Prompt:**
> Laser hair removal session on client's leg with modern diode device, specialist guiding sleek handpiece, client relaxed and comfortable, medium-close side shot, 16:9, …*(suffix)*

---

## 4. Gallery — 12 ფოტო (masonry)

ყველა: **1000×1250, 4:5 portrait** (გამონაკლისები ქვემოთ), ჩართვა `src/shared/const/gallery.const.ts` → შესაბამისი item-ის `src` ველი (`'/images/gallery/<id>.webp'`). Masonry `object-cover`-ს იყენებს — ზუსტი ratio მოქნილია, პორტრეტი სჯობს.

| ფაილი | ზომა / ratio | Composition · Angle · Subject | AI Prompt (core + suffix) |
|---|---|---|---|
| `gallery/g1.webp` | 1000×1250 · 4:5 | სახის კოსმეტოლოგიური პროცედურა — ხელები + სახე, close. Top-down 45° | Facial cosmetology treatment in progress, gloved hands and client face close-up, top-down 45 angle, portrait 4:5 |
| `gallery/g2.webp` | 1000×1250 · 4:5 | სიღრმისეული გაწმენდა — აპარატული წმენდა, close-up | Deep facial cleansing procedure with ultrasonic device on client skin, close-up, portrait 4:5 |
| `gallery/g3.webp` | 1000×1250 · 4:5 | ჰიალურონის ინექცია — ზუსტი ხელი, კლიენტი მშვიდი | Hyaluronic acid injection, precise gloved hand with fine syringe, calm client, portrait 4:5 |
| `gallery/g4.webp` | 1000×1000 · 1:1 | კაბინეტის ინტერიერი — ცარიელი, დალაგებული, დღის შუქი. Wide | Empty premium cosmetology room interior, treatment bed with cream linens, green plant accent, bronze fixtures, wide interior shot, square 1:1 |
| `gallery/g5.webp` | 1000×1250 · 4:5 | წარბების პერმანენტული — microblading close | Eyebrow microblading procedure extreme close-up, precision tool on brow, portrait 4:5 |
| `gallery/g6.webp` | 1000×1250 · 4:5 | ტუჩების პერმანენტული — ტუჩის კონტურირება close | Lip blush permanent makeup procedure close-up, pigment application on lips, portrait 4:5 |
| `gallery/g7.webp` | 1000×1250 · 4:5 | თვალის ხაზი — დახუჭული თვალი, ინსტრუმენტი | Permanent eyeliner procedure on closed eye, steady gloved hand with fine tool, macro detail, portrait 4:5 |
| `gallery/g8.webp` | 1000×1250 · 4:5 | ლაზერი ფეხებზე — handpiece მოძრაობაში | Laser hair removal on client's legs, sleek white handpiece gliding on skin, portrait 4:5 |
| `gallery/g9.webp` | 1000×1000 · 1:1 | დიოდური აპარატი — device hero shot, ინტერიერში | Modern diode laser machine hero shot in premium clinic corner, cream wall, bronze detail, square 1:1 |
| `gallery/g10.webp` | 1000×1250 · 4:5 | სახის მასაჟი — ხელები ლოყებზე, კლიენტი თვალდახუჭული | Facial lifting massage, therapist hands on client's cheeks, closed eyes serenity, portrait 4:5 |
| `gallery/g11.webp` | 1000×1250 · 4:5 | სხეულის მასაჟი — ზურგი, cream პირსახოცი | Relaxing back massage, hands on shoulders, cream towels and dim warm light, portrait 4:5 |
| `gallery/g12.webp` | 1000×1250 · 4:5 | ლიმფოდრენაჟი — რბილი მოძრაობა, wellness | Lymphatic drainage facial massage, gentle upward hand strokes, wellness serenity, portrait 4:5 |

თითო prompt-ს ბოლოში ემატება shared suffix (ზემოთ).

---

## 5. Brand Philosophy — 1 ფოტო

### `brand-philosophy.webp`
| ველი | სპეცი |
|---|---|
| File path | `public/images/brand-philosophy.webp` |
| ჩართვა | `src/shared/const/offerings.const.ts` → `BRAND_PHILOSOPHY_IMAGE = '/images/brand-philosophy.webp'` |
| Dimensions | 1200×1600 |
| Aspect ratio | 3:4 portrait |
| Composition | კლინიკის მისაღები სივრცე — მარმარილოს რეცეფშენ-დახლი, ადმინისტრატორი თეთრ ტანსაცმელში, უკან ბრენდირებული კედელი; ორსართულიანი ან მაღალჭერიანი ინტერიერი |
| Camera angle | Eye-level, wide-medium interior shot |
| Lighting | ფანჯრის თბილი დღის შუქი, რბილი ჩრდილები |
| Mood | პრემიუმ სტუმართმოყვარეობა, სიმშვიდე, quiet luxury |
| Background | Cream კედლები, თბილი ხის და bronze დეტალები, მწვანე ტექსტილის/მცენარის აქცენტი |
| Palette | Cream + marble white + deep green + bronze |
| Subject | მისაღები სივრცის hero-კადრი ბრენდის ფილოსოფიის სექციისთვის |

**AI Prompt:**
> Elegant luxury aesthetic clinic reception interior, curved marble reception desk with fluted details, receptionist in white attire working at desk, branded cream wall with subtle logo, tall ceiling with warm wood slat accents, green velvet seating accent, portrait 3:4 wide-medium interior shot, …*(suffix)*

---

## ჩასმის Workflow (ფოტოების მოსვლისას)

1. ფაილები → `public/images/` (ზუსტი სახელებით, ზემოთ მოცემული სტრუქტურით)
2. Const-ებში path-ების ჩაწერა:
   - `about.const.ts` → `ABOUT_IMAGE`
   - `courses.const.ts` → თითო კურსზე `image: '/images/courses/<id>.webp'`
   - `services.const.ts` → `image: '/images/services/<id>.webp'`
   - `gallery.const.ts` → `src: '/images/gallery/<id>.webp'`
3. კომპონენტები ავტომატურად აიტაცებენ — კოდის ცვლილება არ სჭირდება. ფაილი რომ დააკლდეს, gallery tile-ს `onError` fallback აქვს, courses/services/about კი placeholder-ზე რჩება სანამ path არ ჩაიწერება.

**სულ: 23 ფოტო** (hero-photo.webp უკვე არსებობს — ახალი გენერაციისას მასაც იგივე grading მიეცი).
