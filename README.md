# Агатис Интегра — официальный сайт автора

Сайт-каталог постапокалиптической и фэнтези-прозы автора Агатис Интегра.

🌐 **Production**: https://againte.gratis/

## Структура

```
/                       ← главная (каталог книг автора, React-страница с SEO-fallback)
/<book-slug>/           ← лендинги каждой книги (19 шт.)
/robots.txt             ← AI-боты + поисковые краулеры (allowlist)
/sitemap.xml            ← карта 20 URL
/llms.txt               ← структурированный markdown для LLM (GEO / LLMO)
/CNAME                  ← привязка к домену
```

Книги и циклы (slug → название):

| Slug | Название | Статус |
|---|---|---|
| `rzhav` | Ржавь | пишется |
| `slovoikrov` | Слово и Кровь · Книга I · Безродный | пишется |
| `navmor` | Навмор | опубликовано |
| `stalker` | Четыре болта (S.T.A.L.K.E.R.) | опубликовано |
| `zhusan` | Жусан | опубликовано |
| `biokiber` | Биокибернетический ренессанс | опубликовано |
| `miryzabyvayut` | Когда миры забывают моё имя | опубликовано |
| `sruchkoy` | С ручкой поневоле | опубликовано |
| `gg` | GG | опубликовано |
| `lancelot` | Ланцелот Лепёшкин | опубликовано |
| `voron` | Ворон | опубликовано |
| `broken` | Сломанная Земля (5 книг) | цикл |
| `auntie` | Постапок от тётушки (3 сборника) | цикл |
| `efir` | Эфир Δ∇ (2 книги) | цикл |
| `ff` | Ф.Ф. — фанфики (4 книги) | цикл |
| `kanon` | Канон (S-T-I-K-S) | в разработке |
| `stiks` | Канон-анонс | в разработке |
| `lm` | Линия Монеты | в разработке |
| `defir` | Дэфир | в разработке |

## Локальный запуск

Сайт — статичный HTML/CSS/JS (главная использует React+Babel inline через CDN). Никакого билда не требуется.

```bash
python3 -m http.server 8080
# открыть http://localhost:8080
```

## Деплой на GitHub Pages

1. **Создать репозиторий** (например `againte/website`) и запушить:
   ```bash
   git init
   git add .
   git commit -m "feat: initial deploy of againte.gratis"
   git remote add origin git@github.com:USERNAME/REPO.git
   git push -u origin main
   ```

2. **Включить GitHub Pages**: в настройках репозитория → Pages → Source: `main` branch, root (`/`).

3. **Подтвердить домен**: `CNAME` в корне уже содержит `againte.gratis`. В настройках DNS-провайдера добавить:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   USERNAME.github.io.
   ```

4. **Включить HTTPS** в GitHub Pages → Enforce HTTPS.

5. **Зарегистрировать в поиске**:
   - [Google Search Console](https://search.google.com/search-console) → добавить домен, отправить `sitemap.xml`
   - [Яндекс.Вебмастер](https://webmaster.yandex.ru/) → то же
   - [Bing Webmaster Tools](https://www.bing.com/webmasters) → то же
   - [IndexNow](https://www.indexnow.org/) — мгновенная индексация Bing/Yandex

## SEO / LLMO

Сайт подготовлен под классический SEO и Generative Engine Optimization (май 2026):

- **`robots.txt`** — явный allowlist для 20+ AI-краулеров (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, Claude-User, anthropic-ai, Google-Extended, PerplexityBot, Perplexity-User, CCBot, Applebot-Extended, Meta-ExternalAgent, Meta-ExternalFetcher, MistralAI-User, DuckAssistBot, YandexGPT, Bytespider, Diffbot, cohere-ai)
- **`sitemap.xml`** — 20 URL с приоритетами и changefreq
- **`llms.txt`** — Markdown-структура для LLM (definition-first, info-density, источники)
- **JSON-LD на каждой странице** — Person, WebSite, CollectionPage, Book / BookSeries, FAQPage, BreadcrumbList
- **Статический HTML-fallback** в главной — для AI-краулеров, которые не выполняют JS
- **OpenGraph + Twitter Card** на всех 20 страницах
- **Canonical, hreflang, robots** мета-теги
- **E-E-A-T**: автор указан явно через Person schema на каждой странице

## Шрифты

`fonts/` — локально подгружаемые woff2 (PT Mono, Russo One, Caveat и др.). Подключаются через `@font-face` с `unicode-range` и `font-display: swap`.

## Лицензия

© Агатис Интегра. Тексты — все права защищены. Дизайн сайта — для использования автором.
