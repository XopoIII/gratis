// Контентные данные — единый источник правды.
// При верстке React переносится в data/content.ts или CMS.

const author = {
  name: 'Агатис Интегра',
  initials: 'А · И',
  tag: 'Автор постапокалиптической прозы',
  intro: 'Постапок, фантастика, фэнтези, космос. Попаданцы и РПГ — без читерства. Книги, которые хочется читать с лампой, медленно, по одной главе на ночь.',
  pitch: '«Атмосфера важнее экшна. Деталь — важнее эффекта. Я пишу медленно и публикую главами. Если тебе так же нравится читать — нам по пути.»',
  avatarUrl: 'assets/agatis-avatar.png',
  socials: [
    { k: 'tg',     v: '@againtegratis',           href: 'https://t.me/againtegratis' },
    { k: 'at',     v: 'author.today/u/againtegratis', href: 'https://author.today/u/againtegratis' },
    { k: 'e-mail', v: 'agatis@samizdat',         href: 'mailto:agatis@samizdat' },
    { k: 'boost',  v: 'boosty / patreon',       href: '#' },
  ],
};

// Книга 1 — «Канон» (рабочее название), вселенная S-T-I-K-S
const book1 = {
  id: 'kanon',
  workingTitle: 'Канон',
  subtitle: 'Рабочее название',
  universe: 'S-T-I-K-S',
  genre: 'Постапок · тактический боевик / социальная интрига / тайна',
  mix: '70% боевик · 20% интрига · 10% тайна',
  status: 'Пишется глава 1',
  chapters: { done: 1, total: 22 },
  volume: '420–800 тыс. знаков (план)',
  coverUrl: 'assets/kanon-cover.jpg',
  landingHref: 'kanon/index.html',
  logline:
    'Сорокалетний охотник приходит в себя на пустом асфальте у мёртвого светофора. В кармане — пластиковый тамагочи в синей изоленте, за поясом — топорик той же изолентой. Город, который он знал, выключили вместе с ветром. И в эту тишину снизу, из-под асфальта, кто-то стучит ему ровно: тум-тум, пауза, тум-тум.',
  setting: 'Постапок. Спальный район провинциального города. Хрущёвки, мёртвый светофор, витрина магазина «Ривьера» с замершими часами 08:47, ливнёвка, бетонная опора, остановка с выбитым стеклом. Машин нет, ветра нет.',
  hero: 'Борис, 40 лет, охотник, двадцать лет в лесу. Старый перелом в левой руке, простреленное правое колено как метеостанция. За поясом — топорик с рукоятью в синей изоленте. В кармане куртки, в носовом платке, — тамагочи в той же изоленте: подарок матери перед первой охотой после её больницы. Мать умерла шесть лет назад в апреле.',
  parts: [
    { n: 'I',   name: 'Кисляк',    days: 'Главы 1–?',  hook: 'Пробуждение на асфальте. Первая тварь. Дар, от которого идёт кровь из ушей. Гул из-под земли: тум-тум, пауза, тум-тум.' },
    { n: 'II',  name: '—',         days: '—',          hook: 'В работе. Структура второй части ещё уточняется автором.' },
    { n: 'III', name: '—',         days: '—',          hook: 'В работе. Финал — после первой части.' },
  ],
  tags: ['Постапок', 'S-T-I-K-S', 'Иммерсия', 'Атмосферная проза', 'Тактика', '18+'],
};

// ============================================================================
// КАТАЛОГ — структурирован по секциям
// ============================================================================

// Шкатулка статусов (для штампа в углу карточки)
const STATUS = {
  WRITING:  { label: 'пишется',        tone: '#a52a1a' }, // красный — активный процесс
  DRAFT:    { label: 'в разработке',   tone: '#6b5942' }, // серый — стоит на полке
  PUBLISHED:{ label: 'опубликовано',   tone: '#1f5a3a' }, // зелёный — готово
  CYCLE:    { label: 'цикл',           tone: '#7a4a1a' }, // охра — цикл
};

// 1. СЕЙЧАС ПИШУ
const worksWriting = [
  {
    id: 'rzhav',
    n: '01',
    title: 'Ржавь',
    universe: 'Биопанк · советский постапок',
    genre: 'Биопанк · постапок',
    status: STATUS.WRITING,
    progress: 'глава 7 / ~15',
    volume: '90 дней пути',
    tagline: 'Заводы кашляют споровым шлаком, талоны на воздух выдаёт Палата. Каждая буква врастает в плоть.',
    cover: 'rzhav/images/cover.jpg',
    coverFallback: 'rzhav/images/og-cover.png',
    href: 'rzhav/index.html',
    tone: '#1a1208',
    accent: '#d4a13a',
  },
  {
    id: 'slovoikrov',
    n: '02',
    title: 'Слово и Кровь',
    subtitle: 'Книга I · Безродный',
    universe: 'Постапок-боярка',
    genre: 'Постапок · боярка',
    status: STATUS.WRITING,
    progress: 'глава 4 / ~18',
    volume: 'Книга 1 из цикла',
    tagline: 'Человек без памяти просыпается в мёртвом мире, где зона пожрала всё — и язык тоже стал оружием.',
    cover: 'slovoikrov/images/cover.jpg',
    coverFallback: 'slovoikrov/images/og-cover.png',
    href: 'slovoikrov/index.html',
    tone: '#1a1612',
    accent: '#b8862a',
  },
];

// 2. ОПУБЛИКОВАНО (отдельные романы с лендингом)
const worksPublished = [
  {
    id: 'navmor',
    n: '03',
    title: 'Навмор',
    universe: 'Славянское фэнтези',
    genre: 'Мистика · мрачное фэнтези',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 385 тыс.',
    tagline: 'Морозовы не бросают своих. Даже в аду. Гордей возвращается из мертвецкой за младшим братом.',
    cover: 'navmor/book-cover.png',
    href: 'navmor/index.html',
    at: 'https://author.today/work/469235',
    tone: '#0a0a10',
    accent: '#a98c5b',
  },
  {
    id: 'stalker',
    n: '04',
    title: 'Четыре болта',
    universe: 'S.T.A.L.K.E.R. · 2006',
    genre: 'Атмосферная проза · фанфик',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 229 тыс.',
    tagline: 'Четверо входят в Зону в 2006. Четыре болта — четыре жизни. Без квестов и магии.',
    cover: 'stalker/cover.png',
    href: 'stalker/index.html',
    at: 'https://author.today/work/562725',
    tone: '#0a0d08',
    accent: '#a8b878',
  },
  {
    id: 'zhusan',
    n: '05',
    title: 'Жусан',
    universe: 'Степной постапок',
    genre: 'Постапок · степь',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 356 тыс.',
    tagline: 'Степь пахнет полынью. Ветер несёт пепел. Полигон молчит. Постапок в казахской степи.',
    cover: 'zhusan/cover.jpg',
    href: 'zhusan/index.html',
    at: 'https://author.today/work/556729',
    tone: '#1a1520',
    accent: '#c8a36b',
  },
  {
    id: 'biokiber',
    n: '06',
    title: 'Биокибернетический ренессанс',
    universe: 'Постапок · после Резонанса',
    genre: 'Sci-fi · приключения',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 356 тыс.',
    tagline: '27 лет после слияния сети и биосферы. Алекс Кович ищет сестру-близнеца. Натуралы, симбионты, техноманты — у каждого свой ответ.',
    cover: 'covers/biokiber.jpg',
    href: 'biokiber/index.html',
    at: 'https://author.today/work/428222',
    tone: '#0a1a2a',
    accent: '#5fd0e8',
  },
  {
    id: 'miryzabyvayut',
    n: '07',
    title: 'Когда миры забывают моё имя',
    universe: 'Бесконечное фэнтези',
    genre: 'Романт. фэнтези · попаданцы',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 535 тыс.',
    tagline: 'Каждое её пробуждение — новая жизнь. Иногда богиня, иногда — шёпот ветра. В каждом мире её ждёт кто-то, кто слишком хорошо знает её имя.',
    cover: 'covers/miryzabyvayut.jpg',
    href: 'miryzabyvayut/index.html',
    at: 'https://author.today/work/427592',
    tone: '#0a0d18',
    accent: '#d0c8e8',
  },
  {
    id: 'sruchkoy',
    n: '08',
    title: 'С ручкой поневоле',
    universe: 'После Суперкатаклизма',
    genre: 'Юмор-фэнтези · боярка',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 224 тыс.',
    tagline: 'Геймер с ручкой, которая буквально воплощает написанное. Но всегда с подвохом.',
    cover: 'covers/sruchkoy.jpg',
    href: 'sruchkoy/index.html',
    at: 'https://author.today/work/432204',
    tone: '#2a1f17',
    accent: '#e88a3a',
  },
  {
    id: 'gg',
    n: '09',
    title: 'GG',
    universe: 'Alt+F4 · киберспорт',
    genre: 'РеалРПГ · юмор · 18+',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 134 тыс.',
    tagline: 'MadMarks — 20 лет, калаш в руках, никаких друзей в офлайне. Путь с нуба до про-игрока. Жёсткий стёб, тактика и тиммейты.',
    cover: 'covers/gg.jpg',
    href: 'gg/index.html',
    at: 'https://author.today/work/430273',
    tone: '#08090d',
    accent: '#d4af5a',
  },
  {
    id: 'lancelot',
    n: '10',
    title: 'Ланцелот Лепёшкин',
    universe: 'К.Г.Г. · комментоглавогенератор',
    genre: 'Юмор-фэнтези · эксперимент',
    status: STATUS.PUBLISHED,
    volume: 'Роман · 176 тыс.',
    tagline: 'Каждая глава — из читательских комментариев. Эксперимент: что будет, если полностью положиться на хаос комментов?',
    cover: 'covers/lancelot.jpg',
    href: 'lancelot/index.html',
    at: 'https://author.today/work/433674',
    tone: '#1a1208',
    accent: '#e8b53a',
  },
  {
    id: 'voron',
    n: '11',
    title: 'Ворон',
    universe: 'Crossout · Пустоши',
    genre: 'Рассказ · постапок',
    status: STATUS.PUBLISHED,
    volume: 'Рассказ · 14,5 тыс.',
    tagline: 'Старый ветеран Пустошей, потерявший всё тридцать лет назад. Но он всё ещё человек. Около часа чтения.',
    cover: 'covers/voron.jpg',
    href: 'voron/index.html',
    at: 'https://author.today/work/455327',
    tone: '#1a0a04',
    accent: '#d97a3a',
  },
];

// 3. ЦИКЛЫ (каждая карточка — один лендинг, веер обложек внутри)
const worksCycles = [
  {
    id: 'broken',
    n: '12',
    title: 'Сломанная Земля',
    universe: 'Климатический постапок',
    genre: 'Постапок · цикл',
    status: STATUS.CYCLE,
    booksCount: 5,
    volume: '5 книг',
    tagline: '10% выжили в холоде. Сколько выживут в новом мире? Пять книг о выживании после катастрофы.',
    covers: [
      'broken/book1.jpg',
      'broken/book2.jpg',
      'broken/book3.jpg',
      'broken/book4.jpg',
      'broken/book5.jpg',
    ],
    titles: ['40 км во льду', '10 процентов', 'Последняя орбита', 'Сквозь серые зубы', 'Тёплый рис'],
    href: 'broken/index.html',
    at: 'https://author.today/work/series/44532',
    tone: '#0c1218',
    accent: '#7aa4c8',
  },
  {
    id: 'auntie',
    n: '13',
    title: 'Постапок от тётушки',
    universe: 'Пенсионный архив',
    genre: 'Рассказы · 3 сборника',
    status: STATUS.CYCLE,
    booksCount: 3,
    volume: '3 сборника',
    tagline: 'Постапок · Попаданцы · Ужастики. Каждый рассказ — отдельный конец света. Мир не взрывается — он убывает.',
    covers: [
      'auntie/images/cover-postapok.png',
      'auntie/images/cover-popadancy.jpg',
      'auntie/images/cover-ujastiki.jpg',
    ],
    titles: ['Постапок', 'Попаданцы', 'Ужастики'],
    href: 'auntie/index.html',
    at: 'https://author.today/work/series/45326',
    tone: '#0a0a0d',
    accent: '#c8a36b',
  },
  {
    id: 'efir',
    n: '14',
    title: 'Эфир',
    universe: 'Δ∇ · киберпанк-постапок',
    genre: 'Киберпанк · РеалРПГ · цикл',
    status: STATUS.PUBLISHED,
    booksCount: 2,
    volume: '2 фазы · цикл',
    tagline: '«Он может замедлить время. Но не может остановить выбор.» Δ.E.F.I.R — феномен, переписывающий саму ткань мира.',
    covers: ['efir/covers/delta.jpg', 'efir/covers/nabla.jpg'],
    titles: ['Δ.E.F.I.R. Фаза 1: Замедление', '∇.E.F.I.R. Фаза 2: Фрактальный Разлом'],
    href: 'efir/index.html',
    at: 'https://author.today/work/series/42163',
    tone: '#050a14',
    accent: '#5fb8d4',
  },
  {
    id: 'ff',
    n: '15',
    title: 'Ф.Ф. — фанфики',
    universe: '«Умер от начос. Очнулся в...»',
    genre: 'Фанфик · цикл',
    status: STATUS.PUBLISHED,
    booksCount: 4,
    volume: '4 книги',
    tagline: 'R.A.T. · M.T.C. · S.C.P. · B.G.W. — четыре раза подавился начос, четыре раза очнулся не там. Гарри Поттер, Метро, SCP, Игра престолов.',
    covers: ['ff/covers/rat.jpg', 'ff/covers/mtc.jpg', 'ff/covers/scp.jpg', 'ff/covers/bgw.jpg'],
    titles: ['R.A.T. · крыса в Хогвартсе', 'М.Т.С. · сталкер в метро', 'S.C.P. · айтишник в Foundation', 'B.G.W. · бастард в Вестеросе'],
    href: 'ff/index.html',
    at: 'https://author.today/work/series/43483',
    tone: '#1a120c',
    accent: '#c89f5a',
  },
];

// 4. В РАЗРАБОТКЕ (черновики, книги ещё не пишутся)
const worksDrafts = [
  {
    id: 'kanon',
    n: '16',
    title: 'Канон',
    universe: 'S-T-I-K-S',
    genre: 'Постапок · тактический иммерсив',
    status: STATUS.DRAFT,
    progress: 'структура · план 22 глав',
    volume: '420–800 тыс. знаков (план)',
    tagline: 'Сорокалетний охотник приходит в себя на пустом асфальте у мёртвого светофора. Из-под земли — равномерный стук.',
    cover: 'assets/kanon-cover.jpg',
    href: 'kanon/index.html',
    tone: '#2a2620',
    accent: '#c8a36b',
  },
  {
    id: 'lm',
    n: '17',
    title: 'Линия Монеты',
    universe: 'Велиградье · цикл VII',
    genre: 'Тёмное славянское фэнтези',
    status: STATUS.DRAFT,
    progress: 'книга I / VII · план',
    volume: 'Цикл из 7 книг',
    tagline: 'Никита, 13 лет — Поглощение. Глеб, 12 — Стирание. Реестр приходит в село. Бабушка не спит уже третью ночь.',
    cover: null,
    coverGlyph: 'Л · М',
    coverBg: 'radial-gradient(120% 80% at 50% 50%, #2a1f17 0%, #0d0907 70%)',
    href: 'lm/index.html',
    tone: '#1a120c',
    accent: '#c89f5a',
  },
  {
    id: 'defir',
    n: '18',
    title: 'Дэфир',
    universe: 'Авторский постапок · туман',
    genre: 'Survival horror · цикл',
    status: STATUS.DRAFT,
    progress: 'идея · план',
    volume: '~32 главы (план)',
    tagline: 'Туман поднялся в 2025-м. К утру моря не было видно. Через две недели Владивосток ушёл по самые крыши.',
    cover: null,
    coverBg: 'radial-gradient(120% 80% at 50% 30%, #2c4046 0%, #0e1b1e 60%, #050a0c 100%)',
    coverGlyph: 'ДЭФИР',
    href: 'defir/index.html',
    tone: '#0e1b1e',
    accent: '#7fd5b8',
  },
];

// 5. ЕЩЁ НА AUTHOR.TODAY (книги без лендинга — пока пусто, всё переехало в worksPublished)
const worksOnAT = [];

// Объединённый массив для счётчика
const allWorks = [
  ...worksWriting,
  ...worksPublished,
  ...worksCycles,
  ...worksDrafts,
];

// Также экспортируем старый works для обратной совместимости (если где-то ещё используется)
const works = allWorks;

// «Сейчас за столом» — текущая глава
const nowAtDesk = {
  index: 1,
  title: 'Кисляк.',
  partLabel: 'Часть I · Кисляк',
  quote:
    '«Контузия. Да это контузия.» — Он сказал это вслух, в асфальт, в своё плечо, чтобы услышать собственный голос и вернуть себе хоть что-то понятное. Но под голосом всё так же шло: тум-тум, пауза, тум-тум.',
  meta: ['пишется первая глава', 'выкладывается на author.today', 'глава 1 / ~22'],
};

const reviews = [
  { q: 'Интегра умеет про тишину. И про то, как тишина в постапоке страшнее любой стычки.', a: 'Иван',    s: 'samizdat' },
  { q: 'Я давно не читал ничего, где Улей был бы НАСТОЛЬКО живым. Как полевой дневник.', a: 'Марина',  s: 'author.today' },
  { q: 'Жду каждую главу как сводку с фронта. Это редкое чувство — снова влюбляться в чтение.', a: 'Дмитрий', s: 'подписчик' },
  { q: 'Не боевик, а полевой дневник. Хочется идти рядом с героем.',                       a: 'Ольга',   s: 'samizdat' },
];

const faq = [
  ['Где читать?',          'Главы выкладываются на Author.Today. Сайт — точка входа.'],
  ['Сколько стоит?',       'Большинство книг бесплатны. Цены — на самой странице книги.'],
  ['Сколько уже написано?','Сейчас пишутся «Ржавь» и «Слово и Кровь». «Канон», «Линия Монеты», «Дэфир» — в плане.'],
  ['Можно ли цитировать?', 'Да. Со ссылкой на автора.'],
];

Object.assign(window, {
  author, book1,
  works, allWorks,
  worksWriting, worksPublished, worksCycles, worksDrafts, worksOnAT,
  nowAtDesk, reviews, faq,
});
