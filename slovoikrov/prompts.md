# Промпты DALL-E для лендинга «Слово и Кровь»

Все изображения в стиле **monochrome etching / dark woodcut с одним медно-янтарным акцентом**. Фон — уголь `#0f0d0b`. Основа — костяной `#e8dcc4`. Акцент — медь `#b87333`. Кровь-акцент `#6b1a1a` — минимум.

Общий style suffix (добавлять в конец каждого промпта):
> `Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text, no watermark, no letters. Centered, negative space around subject.`

Разрешение: `--ar` указано для каждого. Все png. После генерации помещать в `slovoikrov/images/` с указанным именем файла.

## Правила фона (важно)

| Файл | Фон | Почему |
|---|---|---|
| `hero-hands.png` | **solid charcoal black** `#0F0D0B`, edge-to-edge, без прозрачности | идёт в `object-fit: cover` под hero-оверлей, края обрезаются |
| `awakening-01/02/03.png` | **solid charcoal black**, edge-to-edge | фон scrollytelling, CSS накладывает radial-gradient |
| `epigraph-pustota.png` | **solid charcoal black**, edge-to-edge | фон секции эпиграфа, CSS накладывает radial-gradient |
| `zone-center/periphery/wastes.png` | **solid charcoal black**, edge-to-edge | фон внутри карточки `.world-card`, снизу накладывается градиент |
| `char-vornak/danka/zhguchka.png` | **solid charcoal black**, edge-to-edge | портрет в карточке `.char-card`, снизу градиент |
| `bone-plate.png` | **PNG с прозрачным альфа-каналом (transparent background)** | декоративный элемент-оверлей, размещается поверх секций разного цвета |
| `og-cover.png` | **solid charcoal black** | OpenGraph-превью в соцсетях — прозрачность не поддерживается |
| `favicon.png` | **solid charcoal black** | вкладка браузера и apple-touch-icon — прозрачность даёт мусор на светлой теме |

**Все промпты ниже уже содержат инструкцию фона (явный `solid charcoal-black` или `transparent PNG with alpha`). Если генератор проигнорировал — добавить в постобработку: для solid — flatten на `#0F0D0B`; для bone-plate — remove.bg или ручной маскинг.**

---

## 1. `hero-hands.png` — Hero, главный экран

**Размещение:** секция `.hero`, селектор `.hero-image img`, размер 1920×1080.

**Замещает заглушку:** `images/placeholder-wide.svg`

**Промпт:**
> A close-up of two open human palms raised toward the viewer, fingers slightly curled, lit from below. The skin is covered in fine pale-white cracks spreading like frost, glowing faintly warm amber-copper from deep within the fractures, as if memory is burning beneath flesh. Solid edge-to-edge charcoal-black background (#0F0D0B), NOT transparent — the black fills the entire frame to the edges, with heavy film grain on top. Strong chiaroscuro, single warm light source. Ancient, wounded, quiet power. Male hands, worn, calloused, mid-thirties. No face visible. Aspect 16:9. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text, no watermark, no letters.

---

## 2. `awakening-01.png` — Scrollytelling кадр 1

**Размещение:** секция `.scrolly`, `.scrolly-frame[data-frame="1"] img`, 1920×1080.

**Сцена:** «Во рту привкус крови. Язык прилип к нёбу.» (пробуждение в темноте)

**Промпт:**
> Extreme dark interior: a single ray of dusty light falls through a broken ceiling beam onto a stone floor. Absolute darkness around — solid edge-to-edge charcoal-black background (#0F0D0B), NOT transparent, fills the frame to the edges. On the floor in the light: the shape of a lying man's silhouette, half-turned, only his shoulder and jaw visible, wet black hair stuck to his cheek. Dust motes float. A cold, silent moment of returning consciousness. Heavy grain, deep charcoal, faint copper highlight where the light hits. Aspect 16:9. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 3. `awakening-02.png` — Scrollytelling кадр 2

**Размещение:** `.scrolly-frame[data-frame="2"] img`, 1920×1080.

**Сцена:** «Язык прилип к нёбу. Ни имени, ни вчера.» (корчма, разбитое помещение)

**Промпт:**
> Interior of a ruined tavern after violence. Wooden beams split, a long table overturned, clay cups broken on the floor, a kerosene lantern lies on its side, its flame dead but the glass still intact. Deep shadows. A single shaft of gray dawn light from a smashed window. No bodies visible, only suggestion. Cold, empty, aftermath. Solid edge-to-edge charcoal-black background (#0F0D0B) in the deep shadow areas, NOT transparent — black fills the frame to the edges. Heavy grain, woodcut lines. Aspect 16:9. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 4. `awakening-03.png` — Scrollytelling кадр 3

**Размещение:** `.scrolly-frame[data-frame="3"] img`, 1920×1080.

**Сцена:** «Руки знали, что делать.» (одна ладонь с трещиной)

**Промпт:**
> Extreme close-up of a single open palm seen from above, filling the frame, lying on rough stone. Fine white hairline cracks spread across the skin like frost or scars, one of them glowing faint warm amber-copper as if lit from inside the wound. The rest is solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to the edges. Dirt under fingernails, calluses. Ancient, alive, frightening. Heavy grain. Aspect 16:9. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 5. `epigraph-pustota.png` — Экран эпиграфа «ПУСТОТА»

**Размещение:** секция `.epigraph`, `.epigraph-bg img`, 1920×1080 (фон под текстом).

**Промпт:**
> An empty clay vessel, cracked and ancient, standing alone in a vast dark void. A single beam of warm copper-amber light falls into its open mouth from above, catching the dust. The vessel is bone-cream colored, worn, sacred. No ground visible, no horizon — only solid edge-to-edge charcoal-black (#0F0D0B) around it, NOT transparent, filling the frame to the edges. A meditation on waiting and absence. Heavy grain. Aspect 16:9. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 6. `zone-center.png` — Карточка «Центр»

**Размещение:** `.world-card[data-zone="center"] img`, 800×800 (квадрат).

**Промпт:**
> Silhouette of a steampunk city skyline at dusk: tall brick clock towers, copper pipes running between rooftops, pale steam rising from factory chimneys, a dirigible far in the sky, gaslamps glowing warm amber along a distant bridge. Slavic architectural hints — onion domes mixed with industrial spires. Cold heavy air, grimy order. Viewed from a low hill far away. Sky and foreground are solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to the edges. Heavy grain. Aspect 1:1. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 7. `zone-periphery.png` — Карточка «Периферия»

**Размещение:** `.world-card[data-zone="periphery"] img`, 800×800.

**Промпт:**
> A forest of pale silver-gray trees with smooth metallic-looking bark and sparse tin-like leaves (the "Pepelniki"). Mist between the trunks. A single narrow trail cutting through. The light is cold, filtered, unnatural. One small warm amber glow far in the distance between trees, like a lantern or a beast's eye. Slavic forest stripped of green. Deep shadows between trees are solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to the edges. Heavy grain. Aspect 1:1. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 8. `zone-wastes.png` — Карточка «Пустоши»

**Размещение:** `.world-card[data-zone="wastes"] img`, 800×800.

**Промпт:**
> An impossible landscape: a broken horizon where the sky and ground seem to fold into each other, distant mountains hang upside-down in a pale haze, cracks in reality glow faint amber-copper, the earth is ash-white and scorched. A single lone figure silhouette stands at the edge of a cliff, tiny against vastness. The Wastes — where physics fractures. Upper sky fades to solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to the edges. Heavy grain, surreal geometry. Aspect 1:1. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 9. `char-vornak.png` — Карточка героя: Безымянный / Ворнак

**Размещение:** `.char-card[data-char="vornak"] img`, 800×1200 (портрет 2:3).

**Промпт:**
> A man in his mid-thirties seen from the chest up, slightly turned away, face mostly in shadow, only one eye visible — steel-gray, tired, watchful. Dark worn travel leather over a coarse linen shirt. On his left exposed forearm and hand: pale-white hairline cracks spreading from palm up the skin, one faintly glowing amber. No identifying marks, no clan colors. A man carrying something he doesn't remember. Background is solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to the edges. Heavy grain, strong chiaroscuro. Aspect 2:3 portrait. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 10. `char-danka.png` — Карточка героя: Данька

**Размещение:** `.char-card[data-char="danka"] img`, 800×1200.

**Промпт:**
> A lean young man, maybe nineteen, with sharp cheekbones and wary narrow eyes, short messy dark hair, dirt on his neck and jaw, a rough bandage wrapped around his upper arm showing spots of dried blood. Simple coarse shirt and a leather cross-body bag. He looks over his shoulder, alert, not quite afraid but cornered. A survivor of the borderlands. Background is solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to the edges. Heavy grain. Aspect 2:3 portrait. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 11. `char-zhguchka.png` — Карточка героя: Жгучка

**Размещение:** `.char-card[data-char="zhguchka"] img`, 800×1200.

**Промпт:**
> A woman in her late twenties, weather-beaten but strong, auburn hair tied back tight, a thin old scar crossing her temple. Sharp green-gray eyes, measuring the viewer. She wears layered practical hunter's gear — leather cuirass over wool, a bone amulet at her throat, a long hunting knife at her belt. One hand rests on the knife handle, casual, ready. A woman who has survived too much. Background is solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to the edges, with faint amber rim light on her left side. Heavy grain. Aspect 2:3 portrait. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text.

---

## 12. `bone-plate.png` — Костяная пластинка (декоративный оверлей)

**Размещение:** декоративный накладной элемент. Если решим использовать — накладывается поверх секций разного цвета (`.hook`, `.quotes`, `.final-cta`). 800×800 квадрат.

**ВАЖНО — фон:** PNG-24 с **прозрачным альфа-каналом** (transparent background). Только сам объект-артефакт, без фона.

**Промпт:**
> A small oval piece of bone, aged ivory-yellow, hanging on a dark frayed leather cord. Carved on its surface: three stylized roots spreading downward from a single vertical stem (a simplified tree-like sigil). The bone glows faintly warm amber-copper from its carved lines as if heat lives inside it. A relic, a memory, a key. Isolated object study, museum-catalog clarity, centered, generous negative space around the subject. The background MUST be fully transparent (alpha channel, PNG-24 with transparency) — render only the bone plate and its cord, with soft natural edges and subtle drop shadow embedded in the alpha. No background fill, no solid color, no checkerboard pattern — transparent alpha only. Heavy grain ONLY on the object itself, not on the (transparent) background. Aspect 1:1. Style: dark atmospheric etching, painterly realism, muted palette — bone cream, copper-amber, deep brown leather. No text.

**Постобработка, если генератор выдал solid фон:**
- Пропустить через `remove.bg` или Photoshop (Select Subject → Mask → Export PNG-24).
- Проверить: в прозрачном редакторе объект видно, серой решётки вокруг нет мусора, тень «встроена» в alpha.

---

## 13. `og-cover.png` — Обложка для Open Graph / соцсетей

**Размещение:** `og:image`, `twitter:image`, 1200×630.

**Промпт:**
> Book cover composition for social media sharing. A single open palm centered, covered in fine pale cracks glowing faint warm amber-copper from within. The palm is lit from one side, dramatic chiaroscuro. Strong horizontal composition, palm positioned slightly left of center to leave room on the right for a title overlay (which will be added in post). Background is solid edge-to-edge charcoal-black (#0F0D0B), NOT transparent — black fills the frame to all edges (crucial: OpenGraph and Twitter cards do not support transparency, so the background MUST be solid black). Aspect 1.91:1 (1200×630). Heavy grain. Style: dark atmospheric etching, heavy grain, minimalist composition, muted palette — charcoal black, bone cream, single warm copper-amber accent. No text, no logo — text will be added separately in post.

---

## 14. `favicon.png` — Favicon (уникальный для книги)

**Размещение:** `/slovoikrov/favicon.png` — мастер 512×512. Браузер смасштабирует до 16/32/48, `apple-touch-icon` возьмёт 180. Один PNG — один файл, без SVG.

**Концепция:** миниатюрный «амулет серии». Висящая костяная пластинка с выжженным сигилом трёх корней, подсвеченная тёплой медной энергией изнутри гравировки. Образ напрямую отсылает к артефакту главы 1 и к гербу, выжженному на коже героя. Должна читаться и в 16×16 на вкладке браузера, и в 180×180 на iOS-хоумскрине — значит, композиция должна работать в обоих масштабах.

**Главный промпт (DALL-E 3 / Midjourney v7):**
> A premium book-series emblem favicon, 1:1 square, rendered with painterly-realistic depth on a pure charcoal-black background (#0F0D0B, no gradient). Centered composition, generous negative space around the subject.
>
> Subject: a small oval plate carved from aged bone — weathered ivory-cream color with fine natural hairline cracks and subtle age patina, lit like a museum relic. The plate is viewed straight on, fills about 65% of the canvas, with soft ambient shadow beneath it suggesting it floats in dark space.
>
> On the plate's face, deeply carved: a heraldic sigil of three roots descending from a single vertical stem. One central root goes straight down; two side roots curve outward and down to the lower-left and lower-right. Every carved line pulses with warm copper-amber light (#B87333 core, #D49255 glow), as if heat or memory still lives inside the bone. The light spills faintly onto the bone around each groove, creating a subtle warm halo.
>
> Tiny leather cord loop suggestion at the top of the plate (small dark sliver) — optional, only if it doesn't steal focus.
>
> Mood: ancient, sacred, mysterious. Not cute, not clip-art. Feels like a game-of-thrones-level heraldic crest reduced to its purest icon form.
>
> Style: dark fantasy heraldry, high-detail yet readable as a tiny icon, painterly realism, strong chiaroscuro, rim-light of copper-amber on bone edges. Palette is strictly: charcoal black, bone cream (#E8DCC4), copper-amber (#B87333 / #D49255), one hint of pale-white highlight on top edge of bone. No other colors. No text. No letters. No numbers. No watermark. No border frame. No modern icon gloss. Aspect 1:1.

**Если выбираешь Midjourney:** добавь `--ar 1:1 --style raw --s 250 --v 7`.

**Чек-лист приёмки:**
1. В 16×16: три луча-корня всё ещё различимы как три линии от центра (центр + две изогнутые наружу). Силуэт пластинки — читаемая овальная форма.
2. В 32×32 и 48×48: сигил горит тёплой медью, пластинка узнаваемо костяная.
3. В 180×180 (iOS home): выглядит как настоящий артефакт, детализация видна.
4. Нет белого фона, нет полупрозрачности по краям — чёрный до самой кромки png.
5. Центр сигила не смещён (иначе в 16×16 значок выглядит косо).

**Постобработка:**
- Экспортировать мастер 512×512 PNG.
- Опционально сделать и сохранить 180×180 как отдельный файл `apple-touch-icon.png` (в том же каталоге), если захочешь идеальную резкость на iOS.
- Проверить в браузере с разным зумом вкладки.

**Почему именно этот дизайн:** фавикон — первая точка узнавания среди других вкладок сайта `agaINTE GRAtis`. Нельзя ставить общий favicon сайта — лендинг растворится среди остальных книг. Костяная пластинка + сигил трёх корней — буквальная цитата из главы 1 канона, то же, что висит на шее главного героя. Это не украшение, а маленький фрагмент лора, который работает как подпись книги.

---

## Процесс генерации

1. Сгенерировать 1-14 в DALL-E 3 (или Midjourney v7 с `--style raw --ar` по аспекту).
2. Сохранить под именами выше в `slovoikrov/images/`.
3. Для hi-DPI: экспортировать в 2× (3840×2160 для hero, 1600×1600 для квадратов, 1600×2400 для портретов) и сжимать через `squoosh` или `mozjpeg -q 80` до <300 KB.
4. В HTML/CSS `placeholder-*.svg` менять на финальные файлы точечно — имена селекторов указаны в каждом разделе.
5. `favicon.png` — в корне `/slovoikrov/`, остальные — в `/slovoikrov/images/`.

## Чек-лист соответствия мира

- Руки с трещинами — канон (из `Библия/книга_1/иллюстрации.md`, глава 1).
- Костяная пластинка с тремя корнями — канон (глава 1, артефакт Ворнака).
- Пепельники — канон (глава 2, серебристо-серые деревья).
- Три зоны (Центр / Периферия / Пустоши) — канон (`Библия/мир/карта.md`).
- Стимпанк-элементы (паровые повозки, трубы, шестерни) — канон (`Библия/мир/экономика.md`).
- Палитра уголь + кость + медь + кровь — утверждена.
