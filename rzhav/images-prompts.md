# Ржавь · Промты для DALL·E 3

Промты оптимизированы под **DALL·E 3** (через ChatGPT, Bing Image Creator, OpenAI API). Если будешь использовать Midjourney / Stable Diffusion — они тоже поймут, но с ними можно и короче (tag-based). Для DALL·E важен **описательный естественный язык**.

---

## ⚠️ Важно по поводу кириллического текста

**DALL·E (и MJ, и SD) плохо рисуют кириллические буквы** — превращают их в нечитаемый набор знаков. Поэтому все промты составлены так, чтобы ИИ **не пытался писать русский текст**. Вместо этого:

1. Просим «aged weathered markings», «illegible lettering», «scratched scribbles» — ИИ нарисует фактуру, похожую на текст, но не буквы.
2. Просим **оставлять пустые области** под текст, который ты потом сам наложишь в Figma / Photoshop / Preview.
3. Латиницу DALL·E рисует **заметно лучше**, чем кириллицу — если в каких-то местах допустимо стилизовать под «иностранный документ», можно попросить латинский текст.

Ниже у каждого изображения есть блок **«Что сделать после генерации»** — что именно дорисовать поверх.

---

## Где лежат файлы и где они используются

Все файлы идут в `rzhav/images/`. Сейчас там SVG-плейсхолдеры в финальном стиле. Как только заменишь их реальными PNG/JPG — поменяй в HTML расширения:

| Файл | Где в коде | После замены на PNG |
|---|---|---|
| `stamp-round.png` | `index.html` → `<img>` в шапке | поменять расширение у 1 `<img>` |
| `appendix-mashinka.png` | `index.html` → Прил. А | поменять у 1 `<img>` |
| `appendix-talon.png` | `index.html` → Прил. Б | поменять у 1 `<img>` |
| `appendix-shahta.png` | `index.html` → Прил. В | поменять у 1 `<img>` |
| `appendix-rukopis.png` | `index.html` → Прил. Г (CTA) | поменять у 1 `<img>` |
| `og-cover.png` | `<meta og:image>`, `<meta twitter:image>`, JSON-LD | 4 правки в `index.html` + 1 в `read/index.html` + 2 в `read/ch0*.html` |
| `favicon.png` (или .ico) | `<link rel="icon">` | 1 правка во всех 4 HTML |

У плейсхолдеров везде подпись «PLACEHOLDER · имя-файла» в нижнем углу — видно, где стоит заглушка.

---

## Общая эстетика серии

**Канцелярский документ Управления Утилизации Бетонника-7 на пожелтевшей бумаге, обтянутый жёлтым туманом.**

Палитра:
- Бумага: `#e8d9a8` с пятнами `#c4a267`
- Ржавчина / красные штампы: `#8b2e1f`
- Синие канцелярские чернила: `#1e3a6a`
- Жёлтый туман: `#d9b84a`
- Тёплый серо-чёрный (машинопись): `#2a2a28`

Стиль обработки: **sepia 0.3–0.5, лёгкий grain, выцветший контраст.** Ничего глянцевого, ничего неонового. Все изображения должны выглядеть так, будто пролежали в папке в тёплой сухой подсобке лет десять.

---

## 1 · Круглый штамп (шапка бланка) — прозрачный PNG

**Файл:** `rzhav/images/stamp-round.png`
**Рендер-размер:** 400×400 px PNG с alpha-каналом
**DALL·E размер:** 1024×1024, потом уменьшить
**Где:** левый верхний угол бланка, `<div class="stamp-round">`
**В CSS:** повёрнут на −7°, `mix-blend-mode: multiply` — **фон обязан быть прозрачным**

### Промт:

```
A single aged round rubber ink stamp imprint on a fully transparent
background (no paper, no fill, alpha channel fully transparent outside
the stamp ink itself). The stamp has a double concentric outer circle
and appears pressed by hand with uneven pressure, so parts of the ink
are bold and other parts fade into weathered gaps and scattered dots.
The ink colour is a faded oxblood red, almost rust-coloured, like a
stamp that has been used for decades. Inside the outer ring, running
along the curve, there are illegible weathered markings that look
like bureaucratic text but are not actually readable — just abstract
texture suggesting official lettering. In the very centre, a stylized
industrial emblem: a rusted cogwheel with a downward arrow passing
through a trapezoidal chute, minimalist, like a Soviet-era factory
logo. Only the ink impression exists — no paper, no rectangle, no
shadow, no glow, no background colour. Output as PNG with transparent
background. Square 1024×1024 composition.
```

**Что сделать после генерации:**
1. Уменьшить до 400×400 с сохранением альфы.
2. Наложить кириллический текст вдоль кривой по внутреннему кольцу: «УПРАВЛЕНИЕ УТИЛИЗАЦИИ БЕТОННИКА-7» (вверху) и «СТАНЦИЯ СБРОСА №7 · СБОРЩИКИ» (внизу). Шрифт: Russo One или PT Mono, цвет `#8b2e1f`. Лёгкий blur 0.3px или шум, чтобы текст не выглядел идеальным.
3. Экспортировать PNG-24 с прозрачностью.
4. **Проверка:** положи файл поверх чёрного прямоугольника — если видишь белое/цветное вокруг штампа, фон не прозрачный, перегенерируй.

---

## 2 · Приложение А — жестяная машинка

**Файл:** `rzhav/images/appendix-mashinka.png`
**Размер:** 600×450 px (соотношение 4:3), JPG или PNG
**DALL·E размер:** 1792×1024 (landscape), потом обрезать до 4:3
**Где:** поле №6, первая карточка приложений

### Промт:

```
A forensic evidence photograph taken directly from above, looking
straight down at a single small battered Soviet-era tin toy truck
lying on a dirty grey concrete floor. The toy is a ZIL-style Soviet
cargo truck from the 1970s, made of stamped pressed metal — a short
boxy driver's cab at the front (with a flat rectangular windshield
and square side windows) and a flat open cargo bed at the back. All
wheels are missing — the truck rests directly on its bare axles and
chassis. The metal cab is heavily rusted in patches of orange and
brown; the sides of the cab are visibly crumpled and dented inward,
as if crushed by hand or stepped on, and one edge of the cab is bent
outward exposing a narrow slit between the panels. The faded original
paint (a dull green or blue) has almost completely worn off, revealing
bare grey primer underneath. Fine scratches cover the roof of the
cab, as if a child carved shapes or letters into it a long time ago
— the scratches are present but abstract and illegible, just lines
in metal. The toy is the only object in the frame. Harsh single
overhead lamp lighting, cold colour temperature, slight film grain,
cinematic muted sepia palette. No staging, no props, no text visible
anywhere. Documentary, archival feel, as if pulled from a case file.
```

**Что сделать после генерации:**
1. Кроп 4:3 (600×450).
2. Опционально: в фотошопе подрисовать кириллическую надпись на крыше машинки — «папе от мальца» очень тонким беленьким «царапанным» шрифтом. Или оставить только абстрактные царапины — работает и так.
3. Лёгкая пост-обработка: усилить sepia (+10%), добавить grain.

---

## 3 · Приложение Б — талон на воду (пустой бланк)

**Файл:** `rzhav/images/appendix-talon.png`
**Размер:** 600×450 px
**DALL·E размер:** 1792×1024 → обрезать 4:3
**Где:** поле №6, вторая карточка

### Промт:

```
A top-down photograph of a small aged paper ration ticket lying flat
on a dark concrete surface. The ticket is roughly 8 by 5 centimetres,
printed on yellowed pulp paper with a faint blue horizontal line
across the upper third and two shorter horizontal lines in the middle
as empty fill-in fields. The paper is stained with a faint brown
water ring in the upper right corner and one torn corner at the
bottom left. A small circular cancellation stamp impression in faded
red ink sits near the right edge, deliberately unreadable — just a
blurred circular mark. No text visible on the ticket at all, only
the empty printed form fields and the stamp impression. The paper
has visible grain, fibre texture, and slight folds. Cold overhead
lighting, archival photographic feel, muted sepia grade, film grain.
No other objects in the frame.
```

**Что сделать после генерации:**
1. Кроп 4:3.
2. В Figma наложить кириллический текст поверх пустых полей:
   - Заголовок: `ТАЛОН НА ЧИСТУЮ ВОДУ · 1 ФЛЯГА`
   - Поля: `СМЕНА: третья` / `ЯРУС: −9` / `ПОЛУЧАТЕЛЬ: Болотов Э.А.`
   - Внизу мелкое: `ДЕЙСТВИТЕЛЕН ДО КОНЦА СУТОК`
3. Шрифт — **PT Mono** для печатных подписей и **Caveat** для рукописных заполнений (третья, −9, Болотов).
4. Цвета: синий `#1e3a6a` для чернил, красный `#8b2e1f` для штампа.

---

## 4 · Приложение В — схема лом-магистрали

**Файл:** `rzhav/images/appendix-shahta.png`
**Размер:** 600×450 px
**DALL·E размер:** 1792×1024 → обрезать 4:3
**Где:** поле №6, третья карточка

### Промт:

```
A hand-drawn technical schematic sketch on a piece of yellowed paper,
photographed flat from above. The drawing is made with a blue
ballpoint pen and shows a simplified blueprint of an underground
industrial tunnel system: a vertical shaft on the left side with
small horizontal rungs of a ladder, connected to a longer horizontal
main pipe running to the right, branching once upward. Along the
horizontal pipe there are four small solid yellow triangle markers
drawn at regular intervals. The lines are slightly crooked, as if
drawn quickly from memory, not with a ruler. In the margins there
are a few small handwritten notes — but the notes are illegible,
just loops and strokes that look like writing without being real
letters. The paper has coffee ring stains in the upper right, creased
corners, some pencil smudges. Archival, film grain, muted colour.
No legible text anywhere.
```

**Что сделать после генерации:**
1. Кроп 4:3.
2. Наложить в Figma кириллические надписи Caveat'ом в тех местах, где ИИ нарисовал «псевдописьмо» — либо оставить как есть.
3. Можно добавить подписи: `ЛОМ-МАГ.` слева у шахты, `осн. труба →` посередине, `3-й лаз ↗` у ответвления, `уплотнитель тугой`, `капель с трассы` в полях.
4. Все подписи — синим `#1e3a6a`, Caveat'ом, слегка наклонно.

---

## 5 · Приложение Г — папка «РУКОПИСЬ» (локальный CTA)

**Файл:** `rzhav/images/appendix-rukopis.png`
**Размер:** 600×450 px
**DALL·E размер:** 1792×1024 → обрезать 4:3
**Где:** поле №6, четвёртая карточка — **это основная карточка-CTA на `/read/`**, должна выглядеть чуть «плотнее, притягательнее» остальных
**Важно:** приоритетный ассет — уделить ему больше внимания при генерации

### Промт:

```
A single closed thick cardboard file folder lying on a darker grey
concrete table, photographed from above. The folder is greyish-brown,
weathered on the corners, with visible fabric texture on the cardboard.
It is tied shut with a piece of coarse cotton string in a simple
horizontal and vertical cross pattern; the knot in the centre is
slightly loose, as if it has been untied and retied many times. On
the front cover, glued near the top, there is a rectangular paper
label with a visibly hand-stamped circular impression, faded oxblood
red ink, but any text on the label is illegible — only abstract
stamp markings. In the upper right corner of the folder, angled
diagonally, there is a large rectangular red ink stamp imprint,
double-framed, containing three Latin letters that read "DSP" — these
letters are rendered crisp and readable. Dramatic side lighting from
the left casts a long soft shadow from the folder and string.
Warm analog sepia tone, film grain, matte, no glow. Nothing else
in the frame.
```

*Латинские «DSP» я попросил специально — DALL·E их нарисует хорошо; это допустимо потому, что «ДСП» и «DSP» воспринимаются близко, но при желании замени в постобработке.*

**Что сделать после генерации:**
1. Кроп 4:3.
2. На ярлычок спереди наложить текст Russo One'ом: `РУКОПИСЬ` (крупно) и `16 ГЛАВ · Ф-47/Р` (мелко под ним), цвет — тёмно-серый `#2a2a28`.
3. Если «DSP» выглядит хорошо — оставить, если нет — заменить на «ДСП» в графредакторе.
4. Лёгкий контраст и grain, чтобы это выглядело плотнее и «новее» чем остальные приложения — как будто это свежая папка, которую хочется вскрыть.

---

## 6 · OG-обложка (социальные сети)

**Файл:** `rzhav/images/og-cover.png`
**Размер:** 1200×630 px (стандарт Open Graph), JPG или PNG
**DALL·E размер:** 1792×1024 → обрезать 1200×630
**Где:** `<meta og:image>`, `<meta twitter:image>`, Schema.org `image` — превью в Telegram / Twitter / Max / VK

### Промт:

```
A moody cinematic horizontal composition, 16:9 aspect ratio. In the
background: a vast desolate post-apocalyptic wasteland at dusk — flat
rust-coloured cracked earth stretching to the horizon, where the
silhouettes of several tall dead industrial towers and collapsed
factory smokestacks cut into a sky filled with thick yellow toxic
fog glowing softly from below. Two small human figures, a tall adult
and a child, walk away from the camera into the fog, their backs
turned, wearing ragged grey coats and respirator masks. In the
foreground, tilted at a slight angle, there is a large weathered
bureaucratic paper document on yellowed paper — no text is visible
on it yet, only empty horizontal form lines and a faint red circular
stamp impression in the upper right corner. The paper occupies the
lower two-thirds of the frame but leaves empty space for a title to
be added later. Colour grade: cold desaturated sepia, with a single
warm amber tone from the fog. Heavy film grain, analog, cinematic,
matte. No text, no UI, no logo anywhere.
```

**Что сделать после генерации:**
1. Кроп / ресайз до 1200×630.
2. Наложить в Figma большой крупный заголовок посередине или сверху листа: `РЖАВЬ` (Russo One, чёрный с лёгкой red offset-тенью для эффекта старой печати).
3. Под ним мелко: `БИОПАНК · 16 ГЛАВ · 78 ДНЕЙ ПУТИ` (PT Mono).
4. В правом верхнем углу — красный штамп `ДСП` (уже нарисован на бланке, просто дорисовать буквы поверх).
5. Внизу мелкое: `againte.gratis/rzhav` (PT Mono, полупрозрачный).
6. Сохранить как PNG или JPG ~200-300 КБ (OG-изображения больше 500 КБ соцсети иногда обрезают).

---

## 7 · Фавикон (уникальный) — прозрачный PNG

**Файл:** `rzhav/images/favicon.png` (или набор `favicon-32.png`, `favicon-64.png`, `favicon-180.png`, `favicon.ico`)
**Размер:** рендерить в 1024×1024, потом downscale
**Где:** `<link rel="icon">` во всех 4 HTML
**Задача:** уникальный символ «Ржави» — визуальная подпись книги. Прозрачный фон нужен, чтобы фавикон адаптировался под светлую и тёмную вкладку браузера.

### Вариант A · Красный штамп «Р» (рекомендую — читается в 16×16)

```
A centered square icon design, 1024×1024 pixels, on a fully
transparent background with no fill outside the stamp itself. In the
exact centre, a large oxblood-red rubber stamp imprint of a single
bold Cyrillic letter "Р" — rendered crisp, slab-serif, tilted
approximately 6 degrees counter-clockwise, with uneven ink pressure
so the letter has authentic stamp texture (some parts bold, some
parts faded). Around the letter there is a rectangular double-border
frame in the same oxblood-red ink, like an official bureaucratic
stamp. Nothing else in the icon — only the frame and the letter,
everything else is transparent alpha. High contrast, minimalist,
readable even when resized down to 16×16 pixels. No gradients, no
glow, no shadow, no paper texture, no fill. Output as PNG with
transparent background.
```

### Вариант B · Жестяной грузовик-силуэт (ЗИЛ)

```
A minimalist square icon, 1024×1024 pixels, on a fully transparent
background. In the centre, a simple dark silhouette of a small
Soviet-era ZIL-style tin toy truck viewed from the side — a boxy
driver's cab on the left with a flat windshield and square side
window, a flat open cargo bed on the right, no wheels, resting on
bare axles. The silhouette is rendered in a single tone of dark
rust-brown, as if stamped on nothing. Only the silhouette exists,
everything else is transparent alpha. Bold, iconic, readable at
favicon size. No background, no other elements, no text. High
contrast, matte. Output as PNG with transparent background.
```

### Вариант C · Ржавая шестерёнка с «7»

```
Minimalist square icon, 1024×1024 pixels, on a fully transparent
background. Centered: a single rusted industrial cogwheel with about
eight teeth, rendered in flat oxblood-red and dark brown tones like
an old stamp impression. In the hub of the cogwheel, a clearly
readable Latin digit "7" in bold slab-serif. Only the cogwheel and
the digit exist, everything else is transparent alpha. Iconic,
bold, readable at small sizes. No gradients, no glow, no fill.
Output as PNG with transparent background.
```

**Рекомендация:** Вариант A — читается лучше всех в 16×16 (вкладка браузера) и попадает в концепт лендинга.

**Что сделать после генерации:**
1. Открыть в Figma / Photoshop, кроп до квадрата.
2. Экспортировать в нескольких размерах:
   - `favicon.ico` (16×16, 32×32, 48×48 multi-resolution)
   - `favicon-32.png` (32×32) — для стандартной вкладки
   - `favicon-64.png` (64×64) — заменит текущий плейсхолдер
   - `apple-touch-icon.png` (180×180) — для iOS home screen
3. Проверить читаемость на 16×16 (должно работать даже в минимальном размере).

После того как будет `favicon.ico` в корне или в `rzhav/images/`, поменять в `index.html`:

```html
<link rel="icon" href="images/favicon.ico" sizes="any">
<link rel="icon" href="images/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
```

---

## Опциональные артефакты (на будущее)

Эти изображения пока НЕ используются в вёрстке, но их можно добавить в поле №6 как дополнительные приложения:

- **Карандашный портрет Багра** — сбоку, 3/4, шрамы от химии, респиратор ФС-4 снят и висит на поясе
- **Медкарта Малька** — с пятном под ухом, пометкой «анализ потерян»
- **Кадр Станции сброса** — конвейер сверху, размытое движение
- **Широкая панорама Ржави** — пустошь, силуэты
- **Обложка книги** отдельно для альбома автора

---

## Общие советы по работе с DALL·E 3

1. **Если буквы кириллицы всё же нужны в самом изображении** — проси «as a placeholder for handwritten text» или «with a blank label area where text will be added later». Не проси нарисовать конкретный русский текст — искажение гарантировано.

2. **Для ChatGPT Plus:** просто скопируй промт в чат, DALL·E поймёт. Размер указывай словами: «horizontal 16:9», «square», «portrait orientation».

3. **Для OpenAI API (`gpt-image-1` или `dall-e-3`):** параметр `size` — `1024x1024`, `1792x1024` (landscape) или `1024x1792` (portrait). Для `og-cover.png` — `1792x1024` с последующим обрезом до 1200×630.

4. **Для Bing Image Creator:** работает на том же движке DALL·E 3, результат равноценный. Можно бесплатно.

5. **Если хочется больше контроля над текстом** — попробуй **Ideogram** или **Flux Pro** (Black Forest Labs). Они лучше справляются с буквами, но кириллицу всё равно проверяй.

6. **Сравнение:** DALL·E 3 выигрывает в композиции и атмосфере, Midjourney — в стиле и текстуре, Flux — в тексте. Для атмосферных кадров (og-cover, машинка) — DALL·E/MJ; для штампов с текстом — Flux/Ideogram с последующей постобработкой.

7. **Цена:** в ChatGPT Plus — безлимит (по факту 40–50 в час). API — ~$0.04–0.08 за изображение DALL·E 3.

---

## Чеклист после получения всех картинок

- [ ] Положить 7 PNG в `rzhav/images/`
- [ ] В `index.html` заменить 4 `.svg` на `.png` у `<img>` (stamp-round, 4 appendix-*)
- [ ] В `index.html` заменить 1 `.svg` на `.png` у 5 meta (og-cover)
- [ ] В `read/index.html` заменить 1 `.svg` на `.png` у 2 meta (og-cover)
- [ ] В `read/ch01.html` и `read/ch02.html` заменить 1 `.svg` на `.png` у 3 мест каждом (og-cover через генератор `build_chapters.py` → 3 правки и перегенерировать)
- [ ] В `index.html` / всех HTML обновить `<link rel="icon">` на новый favicon
- [ ] Проверить размер файлов: картинки должны быть <500 КБ каждая (OG-cover лучше <300 КБ для соцсетей)
- [ ] Открыть сайт локально, проверить на мобиле
