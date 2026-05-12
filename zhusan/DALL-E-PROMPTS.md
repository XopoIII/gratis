# DALL-E промты для изображений лендинга "Жусан"

## Общие правила

- Все силуэты должны быть **чисто чёрными** на **белом фоне** (или прозрачном, если DALL-E поддерживает)
- После генерации **удалить белый фон** (сделать прозрачным) в любом редакторе (Photoshop, remove.bg, Figma)
- Силуэты используются как CSS `mask-image` — нужна только форма, без деталей внутри
- Формат: **PNG** с прозрачностью
- Финальное качество: web-оптимизация (TinyPNG или аналог), целевой размер < 10KB для силуэтов

---

## 1. `mountains.png` — Горная гряда

**Текущее:** 13KB, простой чёрный силуэт гор
**Используется:** фон горизонта, CSS `background`, `opacity: 0.6`
**Размер:** ~1500x200px (широкий панорамный)

### DALL-E промт:
```
A seamless panoramic mountain range silhouette, pure black on white background. Low rolling hills and mountains typical of the Kazakh steppe near Semipalatinsk. The mountains are gentle, not sharp alpine peaks — smooth undulating ridgeline with occasional slightly higher hills. The silhouette should tile horizontally. Minimalist, clean edges. Side view, landscape orientation, very wide aspect ratio. No sky details, no textures — solid black shape only.
```

### Постобработка:
1. Обрезать до соотношения ~7.5:1 (широкая панорама)
2. Убрать белый фон (прозрачность)
3. Убедиться, что низ полностью залит чёрным (горы должны уходить за нижний край)
4. Сохранить как PNG, ширина 1500px

---

## 2. `polygon.png` — Силуэт ядерного полигона

**Текущее:** 6.5KB, силуэт зданий с вышкой
**Используется:** CSS `background`, `opacity: 0.4`, эффект свечения ночью
**Размер:** ~400x250px

### DALL-E промт:
```
A stark black silhouette of a Soviet nuclear test site facility on white background. Features: a tall lattice observation/radio tower on the left, low concrete bunkers and administrative buildings in the center, a single tall chimney/smokestack on the right. The buildings are blocky, utilitarian Soviet brutalist architecture. Flat terrain. The entire composition is a clean black silhouette with no internal details, no textures — pure solid black shapes. Side view, like a cutout shadow. Aspect ratio approximately 1.6:1.
```

### Постобработка:
1. Убрать белый фон
2. Убедиться, что все элементы — единый чёрный силуэт
3. Основание зданий ровное (по нижнему краю)
4. Сохранить как PNG, ширина 400px

---

## 3. `wanderer.png` — Силуэт странника (Артём)

**Текущее:** 2KB, силуэт человека с рюкзаком и посохом
**Используется:** CSS `mask-image`, кликабельный персонаж
**Размер:** ~120x320px (высокий вертикальный)

### DALL-E промт:
```
A solid black silhouette of a lone wanderer/traveler on white background. Young man walking to the right, carrying a large hiking backpack, holding a walking staff/stick in his right hand. Slightly hunched under the weight of the pack. Windswept hair. Wearing practical post-apocalyptic clothing — boots, cargo pants, jacket. The silhouette is completely solid black, no internal details. Full body, in motion. Clean edges. Portrait/vertical orientation.
```

### Постобработка:
1. Убрать белый фон
2. Обрезать плотно вокруг фигуры
3. Высота ~320px
4. PNG с прозрачностью

---

## 4. `girl.png` — Силуэт девушки (Асем)

**Текущее:** 1.5KB, силуэт девушки с развевающимися волосами
**Используется:** CSS `mask-image`, кликабельный персонаж
**Размер:** ~100x280px

### DALL-E промт:
```
A solid black silhouette of a young Kazakh woman standing on white background. She is looking into the distance, one hand raised to her forehead shielding her eyes from the sun. Long hair blowing in the steppe wind to the right. Wearing a long skirt/dress and boots — practical steppe clothing. Standing still, alert posture. The silhouette is completely solid black with no internal details. Full body. Clean edges. Portrait/vertical orientation.
```

### Постобработка:
1. Убрать белый фон
2. Обрезать плотно, оставив место для развевающихся волос
3. Высота ~280px
4. PNG с прозрачностью

---

## 5. `garrison.png` — Силуэт военной базы

**Текущее:** 3KB, силуэт казармы со сторожевой вышкой
**Используется:** CSS `mask-image`, фон секции "Закат"
**Размер:** ~500x200px (широкий)

### DALL-E промт:
```
A solid black silhouette of a small Soviet military garrison/outpost on white background. Left side: a partially ruined multi-story concrete barracks building. Center: a wooden watchtower with a guard platform. Right side: low single-story barracks and supply buildings. A thin fence/barbed wire line connects the structures. An antenna/radio mast on the far right. The terrain is flat. All structures are a single solid black silhouette — no internal details, no textures. Wide landscape composition, side view like a shadow cutout. Aspect ratio approximately 2.5:1.
```

### Постобработка:
1. Убрать белый фон
2. Нижний край — ровная линия земли
3. Ширина 500px
4. PNG с прозрачностью

---

## 6. `commander.png` — Силуэт командира (Ержанов)

**Текущее:** 2.8KB, силуэт офицера в шинели
**Используется:** CSS `mask-image`, кликабельный персонаж
**Размер:** ~120x340px

### DALL-E промт:
```
A solid black silhouette of a stern military commander standing at attention on white background. A middle-aged man in a long Soviet-style military officer's coat/greatcoat, wearing an officer's peaked cap. Hands behind his back or at his sides. Rigid, authoritative posture. The coat is knee-length. Military boots. The silhouette is completely solid black with no internal details. Full body, standing straight, facing the viewer. Clean edges. Portrait/vertical orientation.
```

### Постобработка:
1. Убрать белый фон
2. Обрезать плотно
3. Высота ~340px
4. PNG с прозрачностью

---

## 7. `mysterious.png` — Загадочный силуэт (ночная секция)

**Текущее:** 2.1KB, фигура в капюшоне/плаще, рваный низ
**Используется:** CSS `background`, появляется в ночной секции с зелёным свечением
**Размер:** ~120x360px

### DALL-E промт:
```
A solid black silhouette of a mysterious hooded figure on white background. A tall, ominous human shape wrapped in a long tattered cloak or robe. The hood conceals the face entirely — no features visible. The bottom of the cloak is ragged, fraying, dissolving into wisps and tendrils as if the fabric is disintegrating or merging with darkness. Arms are not visible, hidden under the cloak. Standing perfectly still. The overall shape is haunting, otherworldly. The silhouette is completely solid black. Full body. Clean edges at top, intentionally ragged/dissolving at the bottom. Portrait/vertical orientation.
```

### Постобработка:
1. Убрать белый фон
2. Сохранить рваные края внизу — это ключевой элемент жути
3. Высота ~360px
4. PNG с прозрачностью

---

## 8. `wormwood-sprig.png` — Веточка полыни

**Текущее:** 556B, маленькая зелёная веточка (НЕ силуэт)
**Используется:** декоратор в разделителе, `opacity: 0.5`
**Размер:** ~50x50px

### DALL-E промт:
```
A small, simple illustration of a single wormwood (Artemisia absinthium) sprig on a white background. The sprig has a thin stem with 3-4 small feathery, deeply divided silvery-green leaves branching off. Muted sage green color palette. Minimalist botanical illustration style, slightly stylized. No background details. The plant is small and delicate. Top-down or slight angle view. Simple, iconic, suitable for use as a small decorative element.
```

### Постобработка:
1. Убрать белый фон
2. Обрезать до ~50x50px
3. Цвет должен примерно совпадать с `--wormwood-color` (#4a5a3a — приглушённый зелёный)
4. PNG с прозрачностью, оптимизировать до < 1KB

---

## 9. `og-cover.jpg` — Open Graph обложка (для соцсетей)

**Текущее:** 89KB (jpg) / 3.1MB (png)
**Используется:** мета-теги og:image, twitter:image
**Размер:** строго **1200x630px**

### DALL-E промт:
```
A cinematic wide landscape of the Kazakh steppe at dusk. Golden-orange sky fading into deep purple at the top. A vast flat grassland covered in silvery-green wormwood (artemisia) plants stretches to the horizon. In the far distance, the dark silhouette of low mountains and the barely visible outline of industrial buildings (a Soviet nuclear test site). The foreground has detailed wormwood plants swaying in the wind. The atmosphere is lonely, vast, post-apocalyptic but hauntingly beautiful. Muted warm color palette — amber, burnt orange, dusty gold, sage green. Cinematic aspect ratio 1.91:1. Photorealistic, atmospheric, with subtle film grain. No text, no people, no animals.
```

### Постобработка:
1. Обрезать до 1200x630px
2. Сохранить как JPG, качество 80-85%
3. Целевой размер: 80-120KB
4. Можно наложить лёгкий текст "ЖУСАН" в Bitter Bold если нужно

---

## 10. `cover.jpg` — Обложка книги

**Текущее:** 149KB, уже есть хорошая обложка (ржавый знак радиации с полынью)
**Используется:** `<img>` в финальной секции
**Размер:** 280x420px (отображение), исходник может быть крупнее

### Статус: ГОТОВО
Текущая обложка качественная, перегенерация не требуется.
Если всё же нужна альтернатива:

### DALL-E промт (запасной):
```
Book cover art, vertical portrait orientation. A rusted radiation warning sign on a metal pole in the center, heavily corroded and weathered. Fresh green wormwood (artemisia) plants are growing up along the pole and around the sign, reclaiming it. The background is a dark, moody Kazakh steppe at twilight — overcast sky with amber and grey tones. The ground is cracked, dry earth with sparse grass. Atmosphere: post-apocalyptic beauty, nature reclaiming the remnants of nuclear testing. Dark, cinematic color grading — desaturated with warm amber highlights. Photorealistic, high detail. No text on the image.
```

### Постобработка:
1. Обрезать до соотношения 2:3 (портретная ориентация)
2. Наложить текст "ЖУСАН" вверху (Bitter Bold, белый, tracking 0.15em)
3. Наложить "Агатис Интегра" внизу (Source Sans 3, белый)
4. Сохранить как JPG, ширина 560px (2x для retina), качество 85%

---

## 11. `standing-figure.png` — Силуэт стоящей фигуры (для "Стоящих на горизонте")

**Текущее:** НЕТ ФАЙЛА — сейчас простые CSS-прямоугольники
**Используется:** JS генерирует 8-14 фигур на горизонте, каждая — CSS `mask-image` от этого файла
**Размер:** ~40x120px (маленький, вертикальный)
**Нужно:** 1 изображение, код масштабирует через CSS-переменные

### DALL-E промт:
```
A solid black silhouette of a person standing completely still on a transparent background, PNG with transparency. The figure is very simple and minimal — a thin, elongated human shape. Standing upright, arms hanging at sides, not moving. Slightly unsettling proportions — the body is unnaturally thin and slightly too tall. The head is a simple oval shape, featureless — no face, no hair details. The figure could be male or female, it's ambiguous and anonymous. The pose is rigid, frozen, like someone standing in a field staring at you from a distance. The silhouette is completely solid black with no internal detail. The edges are clean but slightly organic, not perfectly geometric. Full body from head to feet. Centered, transparent background. Portrait/vertical orientation. Minimalist, eerie, unsettling.
```

### Альтернативный промт (более жуткий):
```
A solid black silhouette of an eerily still human figure on a transparent background, PNG with transparency. Very thin, elongated proportions. Standing perfectly motionless as if frozen in place. The head is slightly tilted to one side. Arms at sides, fingers barely visible. The overall shape is human but something feels wrong — proportions are subtly off, too thin, too still. Like a figure spotted on the horizon of an empty steppe that you can't quite identify. Completely solid black, no internal details. Full body. Clean edges. Vertical orientation. Horror undertone, liminal space aesthetic. Transparent background.
```

### Постобработка:
1. Убрать белый фон (прозрачность)
2. Обрезать плотно вокруг фигуры
3. Размер: ширина 40px, высота ~120px
4. PNG с прозрачностью
5. Файл будет маленький (< 2KB)

### Интеграция в код:
После создания `standing-figure.png` — код уже обновлён для его использования.
Фигуры генерируются JS, каждая масштабируется через `width`/`height`.
CSS `mask-image` окрашивает силуэт в `#0a0a0a` и управляет opacity.

---

## 12. `wormwood-plant.png` — Силуэт полыни для поля (нижний слой экрана)

**Текущее:** НЕТ ФАЙЛА — сейчас CSS-палочки 3px с кружками (::before и ::after)
**Используется:** JS генерирует 30-55 растений внизу экрана, каждое — `mask-image` от этого файла
**Размер:** ~30x80px (маленький, вертикальный)
**Нужно:** 1 изображение, код масштабирует каждое растение отдельно (рандомная высота 20-65px)

### DALL-E промт:
```
A solid black silhouette of a single wormwood (Artemisia) plant on a transparent background, PNG with transparency. The plant grows straight up from the ground — a thin central stem with small feathery divided leaves branching off alternately on both sides. The leaves are the classic deeply-lobed wormwood shape — like tiny fingers spreading out. The top has a small cluster of tiny round flower buds. Total height about 3x the width. The plant is delicate, wispy, slightly wild-looking — not a perfect garden plant, but a hardy steppe survivor. The silhouette is completely solid black with no internal detail, but the leaf shapes create a recognizable organic outline. Vertical orientation, centered. Transparent background.
```

### Альтернативный промт (более стилизованный):
```
A minimalist solid black silhouette of an artemisia/sagebrush plant on a transparent background, PNG with transparency. A single thin stem growing upward with small deeply-divided feathery leaves. The overall shape is narrow and vertical, like a natural antenna. The leaves are small, angular, spreading outward from the stem. Some tiny round seed heads at the top. The silhouette captures the essence of steppe wormwood — sparse, tough, aromatic. Completely solid black, no texture or gradients. Botanical illustration style reduced to pure black shape. Vertical orientation. Transparent background.
```

### Постобработка:
1. Убрать белый фон (прозрачность)
2. Обрезать плотно, оставив чуть места по бокам для листьев
3. Размер: ширина ~30px, высота ~80px
4. PNG с прозрачностью
5. Файл будет маленький (< 2KB)

### Интеграция в код:
CSS `.wormwood` получит `mask-image: url('wormwood-plant.png')` вместо текущих `::before`/`::after` кружков. Цвет задаётся через `background: var(--wormwood-color)`.

---

## Чеклист

| # | Файл | Тип | Нужно генерировать? |
|---|------|-----|-------------------|
| 1 | `mountains.png` | Силуэт | По желанию (текущий ОК) |
| 2 | `polygon.png` | Силуэт | По желанию (текущий ОК) |
| 3 | `wanderer.png` | Силуэт | По желанию (текущий ОК) |
| 4 | `girl.png` | Силуэт | По желанию (текущий ОК) |
| 5 | `garrison.png` | Силуэт | По желанию (текущий ОК) |
| 6 | `commander.png` | Силуэт | По желанию (текущий ОК) |
| 7 | `mysterious.png` | Силуэт | По желанию (текущий ОК) |
| 8 | `wormwood-sprig.png` | Иллюстрация | По желанию (текущий ОК) |
| 9 | `og-cover.jpg` | Фото/арт | Рекомендуется обновить |
| 10 | `cover.jpg` | Обложка | Не нужно (уже хорош) |
| **11** | **`standing-figure.png`** | **Силуэт** | **ДА — ОБЯЗАТЕЛЬНО** |
| **12** | **`wormwood-plant.png`** | **Силуэт** | **ДА — ОБЯЗАТЕЛЬНО** |

## Важные замечания по DALL-E

1. **Силуэты (1-7):** DALL-E плохо делает чисто чёрные силуэты. Лучше генерировать детальное изображение и потом конвертировать в силуэт:
   - Сгенерировать реалистичное изображение
   - В Photoshop/Figma: Image > Adjustments > Threshold (порог на максимум)
   - Или: Select Subject > Fill Black > Delete Background

2. **Прозрачность:** DALL-E (в ChatGPT) теперь поддерживает PNG с прозрачностью. Добавляйте к промту: `"transparent background, PNG"` если доступно.

3. **Текст:** DALL-E плохо рисует кириллический текст. Текст на обложку и og-cover накладывайте вручную.

4. **Консистентность стиля:** Генерируйте все силуэты в одной сессии, чтобы стиль был единым.
