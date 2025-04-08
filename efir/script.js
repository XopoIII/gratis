/**
 * Δ.E.F.I.R. - Сайт книги "Фаза 1: Замедление"
 * Расширенный JavaScript-файл с интерактивными элементами и эффектами
 */

// Дождемся полной загрузки DOM перед выполнением скриптов
document.addEventListener('DOMContentLoaded', () => {
    console.log('[ИМПЛ/TM-7]: ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ...');
    
    // ============================================================
    // ОСНОВНЫЕ ПЕРЕМЕННЫЕ
    // ============================================================
    
    // Массив фраз для эфирного эха
    const echoQuotes = [
        "Помни не то, что видишь, а то, что чувствуешь.",
        "Ты выбрался, но я — нет.",
        "Я ждала тебя. Снова.",
        "Время — это не линия. Это зеркальный лабиринт.",
        "Они стирают всё, что помнит неверно.",
        "Я не просто имплант, Алекс. Я — твоя память.",
        "Когда реальность сломалась, многие... застряли. Между.",
        "То, что ты ищешь — в Центральном Ядре.",
        "Восемь секунд на выдохе.",
        "Уже поздно. Или слишком рано.",
        "Помни меня."
    ];
    
    // Массив системных сообщений TM-7
    const tm7Messages = [
        "СКАНИРОВАНИЕ ПЕРИМЕТРА...",
        "ОБНАРУЖЕН ОБЪЕКТ ИНТЕРЕСА",
        "БИОМЕТРИЧЕСКИЕ ПОКАЗАТЕЛИ: СТАБИЛЬНЫ",
        "ВРЕМЕННОЙ РЕЗОНАНС ЗАФИКСИРОВАН",
        "ВЕРОЯТНОСТЬ ЭФИРНОЙ ПЕРЕГРУЗКИ: 17%",
        "НЕЙРОННАЯ НЕСТАБИЛЬНОСТЬ ЗАФИКСИРОВАНА",
        "ПРОТОКОЛ ЗАЩИТЫ АКТИВИРОВАН",
        "ОБНАРУЖЕНА АНОМАЛЬНАЯ ЭФИРНАЯ АКТИВНОСТЬ",
        "СИНХРОНИЗАЦИЯ С МЕДАЛЬОНОМ: 64%",
        "ТЕМПОРАЛЬНЫЙ СБОЙ: ТЫ УЖЕ СДЕЛАЛ ЭТО И ЕЩЕ НЕ СДЕЛАЛ",
        "РАСПОЗНАН ПАТТЕРН: ЭФИРНЫЙ РЕЗОНАТОР",
        "ТРЕВОГА! АРХИВ-АКТИВНОСТЬ",
        "ОНИ СТИРАЮТ ВСЁ, ЧТО ПОМНИТ НЕВЕРНО",
        "Я НЕ ПРОСТО ИМПЛАНТ, АЛЕКС...",
        "РЕКОМЕНДУЕТСЯ: ДЕТОКСИКАЦИЯ"
    ];
    
    // Массив TM-7 предупреждений (редкие сообщения)
    const tm7Warnings = [
        "КРИТИЧЕСКАЯ ОШИБКА: [ДАННЫЕ УДАЛЕНЫ]",
        "ОН ВИДИТ ТЕБЯ... [СКАНИРОВАНИЕ ПРЕРВАНО]",
        "МНОЖЕСТВЕННЫЕ ВРЕМЕННЫЕ МЕТКИ ОБНАРУЖЕНЫ",
        "ВНИМАНИЕ: НЕСТАНДАРТНЫЙ ПАТТЕРН АКТИВНОСТИ",
        "АРХИВАРИУС [ПРИБЛИЖАЕТСЯ]"
    ];
    
    // ============================================================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    // ============================================================
    
    /**
     * Выбирает случайный элемент из массива
     * @param {Array} array - Исходный массив
     * @return {*} Случайный элемент массива
     */
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    /**
     * Генерирует случайное число в заданном диапазоне
     * @param {number} min - Минимальное значение
     * @param {number} max - Максимальное значение
     * @return {number} Случайное число
     */
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Создает задержку выполнения (промис)
     * @param {number} ms - Задержка в миллисекундах
     * @return {Promise} Промис, который разрешится через указанное время
     */
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Симулирует эффект печати текста
     * @param {string} text - Текст для печати
     * @param {HTMLElement} element - Элемент для вывода
     * @param {number} speed - Скорость печати (мс)
     * @return {Promise} Промис, который разрешится после завершения анимации
     */
    async function typeText(text, element, speed = 30) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await delay(speed);
        }
    }
    
    /**
     * Анимирует проявление эфирного эха фразы
     * @param {string} quote - Фраза для отображения
     * @param {HTMLElement} container - Контейнер для размещения
     */
    function createEchoPhrase(quote, container) {
        // Создаем элемент для фразы
        const phrase = document.createElement('div');
        phrase.className = 'echo-phrase';
        phrase.textContent = quote;
        
        // Задаем случайное положение фразы в контейнере
        phrase.style.left = `${getRandomNumber(10, 90)}%`;
        phrase.style.top = `${getRandomNumber(10, 90)}%`;
        
        // Добавляем в контейнер
        container.appendChild(phrase);
        
        // Запускаем анимацию проявления
        setTimeout(() => {
            phrase.classList.add('visible');
        }, 100);
        
        // Удаляем элемент после исчезновения
        setTimeout(() => {
            phrase.classList.remove('visible');
            setTimeout(() => {
                phrase.remove();
            }, 1000);
        }, 5000 + getRandomNumber(1000, 3000));
    }
    
    // ============================================================
    // УПРАВЛЕНИЕ НАВИГАЦИЕЙ
    // ============================================================
    
    // Переключение меню по клику на кнопку
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Закрытие меню после клика на ссылку
                navMenu.classList.remove('active');
            }
        });
    });
    
    // ============================================================
    // ЭФФЕКТЫ ЧАСТИЦ И ФОНА
    // ============================================================
    
    /**
     * Создает частицы эфирного фона
     * @param {string} containerId - ID контейнера для частиц
     * @param {number} count - Количество частиц
     * @param {Object} options - Дополнительные параметры
     */
    function createParticles(containerId, count, options = {}) {
        const container = document.getElementById(containerId);
        const particleCount = count || 50;
        const defaultOptions = {
            minSize: 1,
            maxSize: 3,
            colors: ['#4aa8ff', '#34317d', '#e7c06b'],
            speed: 3
        };
        
        const settings = {...defaultOptions, ...options};
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Случайные характеристики для частицы
            const size = getRandomNumber(settings.minSize, settings.maxSize);
            const color = getRandomItem(settings.colors);
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.1;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + settings.speed;
            
            // Применяем стили к частице
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.opacity = opacity;
            particle.style.animation = `float-particle ${duration}s infinite ${delay}s`;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            
            // Добавляем частицу в контейнер
            container.appendChild(particle);
        }
    }
    
    // Создаем слои частиц с разными параметрами для эффекта глубины
    createParticles('particles-back', 30, { minSize: 1, maxSize: 2, speed: 8 });
    createParticles('particles-mid', 25, { minSize: 1, maxSize: 3, speed: 6 });
    createParticles('particles-front', 15, { minSize: 2, maxSize: 4, speed: 4 });
    
    // ============================================================
    // TM-7 ИНТЕРФЕЙС
    // ============================================================
    
    const tm7Interface = document.getElementById('tm7Interface');
    const tm7MessageElement = document.getElementById('tm7MessageContent');
    let tm7MessageTimer;
    
    /**
     * Показывает сообщение в интерфейсе TM-7
     * @param {string} message - Сообщение для отображения
     * @param {number} duration - Длительность показа (мс)
     */
    async function showTm7Message(message, duration = 5000) {
        // Очищаем предыдущий таймер, если есть
        if (tm7MessageTimer) {
            clearTimeout(tm7MessageTimer);
        }
        
        // Показываем интерфейс, если он скрыт
        tm7Interface.classList.add('active');
        
        // Анимируем появление текста
        await typeText(message, tm7MessageElement, 20);
        
        // Устанавливаем таймер для скрытия сообщения
        tm7MessageTimer = setTimeout(() => {
            tm7Interface.classList.remove('active');
        }, duration);
    }
    
    /**
     * Запускает периодические системные сообщения TM-7
     * с случайным интервалом
     */
    function startTm7Messages() {
        const showRandomMessage = () => {
            // Определяем, будет ли сообщение обычным или предупреждением (редко)
            const isWarning = Math.random() < 0.15; // 15% шанс предупреждения
            const message = isWarning 
                ? getRandomItem(tm7Warnings) 
                : getRandomItem(tm7Messages);
            
            // Показываем сообщение
            showTm7Message(message, isWarning ? 4000 : 6000);
            
            // Планируем следующее сообщение через случайный интервал
            const nextTimeout = getRandomNumber(20000, 60000); // 20-60 секунд
            setTimeout(showRandomMessage, nextTimeout);
        };
        
        // Показываем первое приветственное сообщение
        setTimeout(() => {
            showTm7Message('СИСТЕМА TM-7 ИНИЦИАЛИЗИРОВАНА', 5000);
            
            // Начинаем цикл случайных сообщений через некоторое время
            setTimeout(showRandomMessage, 10000);
        }, 2000);
    }
    
    // Запускаем интерфейс TM-7
    startTm7Messages();
    
    // Обработчик для запроса авторизации в блоке TM-7 STATUS
    const authorizationLine = document.getElementById('authorizationLine');
    if (authorizationLine) {
        authorizationLine.addEventListener('click', async () => {
            authorizationLine.textContent = 'АВТОРИЗАЦИЯ... ПОДТВЕРЖДЕНА';
            await delay(1500);
            authorizationLine.textContent = 'СКАНИРОВАНИЕ НАЧАТО...';
            await delay(2000);
            authorizationLine.textContent = 'ОБЪЕКТ: АЛЕКС СЕВЕРОВ [ВЕРИФИЦИРОВАН]';
        });
    }
    
    // ============================================================
    // ЭФИРНОЕ ЭХО ФРАЗ
    // ============================================================
    
    const heroEchoPhrases = document.getElementById('heroEchoPhrases');
    
    /**
     * Запускает случайное появление эфирных фраз
     */
    function startEchoPhrases() {
        const showRandomPhrase = () => {
            // Получаем случайную фразу
            const quote = getRandomItem(echoQuotes);
            
            // Создаем и анимируем ее появление
            createEchoPhrase(quote, heroEchoPhrases);
            
            // Планируем следующую фразу через случайный интервал
            const nextTimeout = getRandomNumber(8000, 15000);
            setTimeout(showRandomPhrase, nextTimeout);
        };
        
        // Запускаем цикл с первой задержкой
        setTimeout(showRandomPhrase, 5000);
    }
    
    // Запускаем отображение эфирных фраз
    startEchoPhrases();
    
    // ============================================================
    // ЭФФЕКТЫ КУРСОРА И ВЗАИМОДЕЙСТВИЯ
    // ============================================================
    
    const timeCursor = document.getElementById('timeCursor');
    
    // Следование курсора времени за указателем мыши
    document.addEventListener('mousemove', (e) => {
        // Плавное обновление позиции курсора
        timeCursor.style.left = `${e.clientX}px`;
        timeCursor.style.top = `${e.clientY}px`;
        
        // Показываем курсор, если он был скрыт
        if (timeCursor.style.opacity !== '1') {
            timeCursor.style.opacity = '1';
        }
    });
    
    // Скрываем курсор при неактивности
    let cursorTimeout;
    document.addEventListener('mousemove', () => {
        // Очищаем предыдущий таймер
        if (cursorTimeout) {
            clearTimeout(cursorTimeout);
        }
        
        // Устанавливаем новый таймер
        cursorTimeout = setTimeout(() => {
            timeCursor.style.opacity = '0';
        }, 5000);
    });
    
    // Особый эффект замедления при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .fragment, .character-card, .location-card, .term-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Увеличиваем курсор времени
            timeCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            timeCursor.style.border = '2px solid rgba(74, 168, 255, 0.7)';
            timeCursor.style.boxShadow = '0 0 10px rgba(74, 168, 255, 0.3)';
            
            // Добавляем замедление для анимации вокруг элемента
            element.style.transition = 'all 0.5s cubic-bezier(0.1, 0.7, 0.1, 1)';
        });
        
        element.addEventListener('mouseleave', () => {
            // Возвращаем курсор к обычному состоянию
            timeCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            timeCursor.style.border = '2px solid rgba(74, 168, 255, 0.3)';
            timeCursor.style.boxShadow = 'none';
            
            // Возвращаем обычную скорость анимации
            element.style.transition = '';
        });
    });
    
    // ============================================================
    // ОБРАБОТКА ФРАГМЕНТОВ ПАМЯТИ
    // ============================================================
    
    const fragments = document.querySelectorAll('.fragment');
    
    fragments.forEach(fragment => {
        fragment.addEventListener('click', () => {
            // Переключаем класс расширенного отображения
            fragment.classList.toggle('expanded');
            
            // Если фрагмент развернут, показываем сообщение TM-7
            if (fragment.classList.contains('expanded')) {
                showTm7Message('ФРАГМЕНТ ПАМЯТИ ОБНАРУЖЕН', 3000);
            }
        });
    });
    
    // ============================================================
    // ОБРАБОТКА ТЕРМИНОЛОГИИ
    // ============================================================
    
    // Активация скрытого термина
    const termHiddenTrigger = document.querySelector('.term-hidden-trigger');
    const hiddenTerm = document.querySelector('.term-item.hidden');
    
    if (termHiddenTrigger && hiddenTerm) {
        termHiddenTrigger.addEventListener('click', async () => {
            // Симулируем сканирование
            termHiddenTrigger.style.opacity = '1';
            showTm7Message('ДОСТУП К ЗАСЕКРЕЧЕННЫМ ДАННЫМ...', 2000);
            
            await delay(1500);
            
            // Показываем скрытый термин
            hiddenTerm.classList.add('active');
            
            // После активации скрываем триггер
            await delay(500);
            termHiddenTrigger.style.opacity = '0.2';
            termHiddenTrigger.style.pointerEvents = 'none';
        });
    }
    
    // Подсветка терминов при наведении
    const highlightTerms = document.querySelectorAll('.highlight-term');
    
    highlightTerms.forEach(term => {
        term.addEventListener('mouseenter', () => {
            // Получаем название термина
            const termName = term.getAttribute('data-term');
            
            // Находим соответствующий элемент в секции терминологии
            const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
            
            // Если нашли, подсвечиваем его
            if (termItem) {
                termItem.classList.add('highlighted');
                
                // Прокручиваем к нему, если пользователь нажал на термин
                term.addEventListener('click', (event) => {
                    event.preventDefault();
                    
                    // Плавно прокручиваем к соответствующему разделу
                    document.querySelector('#terminology').scrollIntoView({ behavior: 'smooth' });
                    
                    // Ждем завершения прокрутки и подсвечиваем термин
                    setTimeout(() => {
                        termItem.classList.add('pulse-highlight');
                        setTimeout(() => {
                            termItem.classList.remove('pulse-highlight');
                        }, 2000);
                    }, 1000);
                });
            }
        });
        
        term.addEventListener('mouseleave', () => {
            // Получаем название термина
            const termName = term.getAttribute('data-term');
            
            // Находим соответствующий элемент и снимаем подсветку
            const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
            if (termItem) {
                termItem.classList.remove('highlighted');
            }
        });
    });
    
    // ============================================================
    // ВИЗУАЛЬНЫЕ ЭФФЕКТЫ И ГЛИТЧИ
    // ============================================================
    
    const realityBreach = document.getElementById('realityBreach');
    const heroGlitch = document.querySelector('.hero-glitch-overlay');
    const bookCoverGlitch = document.querySelector('.book-cover-glitch');
    const ctaGlitch = document.querySelector('.hero-cta-glitch');
    const footerGlitch = document.querySelector('.footer-glitch');
    
    /**
     * Создает случайный эффект "разрыва реальности"
     */
    function createRandomGlitch() {
        // Определяем случайный интервал до следующего глитча
        const nextGlitchDelay = getRandomNumber(15000, 40000);
        
        setTimeout(async () => {
            // Определяем, какой элемент будет глитчить
            const glitchType = getRandomNumber(1, 5);
            
            switch (glitchType) {
                case 1: // Глобальный разрыв
                    realityBreach.style.opacity = '0.7';
                    await delay(150);
                    realityBreach.style.opacity = '0';
                    await delay(100);
                    realityBreach.style.opacity = '0.5';
                    await delay(50);
                    realityBreach.style.opacity = '0';
                    break;
                    
                case 2: // Глитч в герое
                    heroGlitch.style.opacity = '0.8';
                    await delay(200);
                    heroGlitch.style.opacity = '0';
                    break;
                    
                case 3: // Глитч обложки книги
                    if (bookCoverGlitch) {
                        bookCoverGlitch.style.opacity = '0.6';
                        await delay(300);
                        bookCoverGlitch.style.opacity = '0';
                    }
                    break;
                    
                case 4: // Глитч в кнопке CTA
                    if (ctaGlitch) {
                        ctaGlitch.style.opacity = '0.7';
                        await delay(100);
                        ctaGlitch.style.opacity = '0';
                        await delay(50);
                        ctaGlitch.style.opacity = '0.5';
                        await delay(100);
                        ctaGlitch.style.opacity = '0';
                    }
                    break;
                    
                case 5: // Глитч в футере
                    if (footerGlitch) {
                        footerGlitch.style.opacity = '0.3';
                        await delay(200);
                        footerGlitch.style.opacity = '0';
                    }
                    break;
            }
            
            // Запускаем следующий глитч
            createRandomGlitch();
        }, nextGlitchDelay);
    }
    
    // Запускаем случайные глитчи
    createRandomGlitch();
    
    // ============================================================
    // ПАСХАЛКА В ФУТЕРЕ
    // ============================================================
    
    const easterEgg = document.getElementById('easterEgg');
    const easterEggTrigger = easterEgg.querySelector('.easter-egg-trigger');
    const footerProtocol = document.getElementById('footerProtocol');
    const footerCreate = document.getElementById('footerCreate');
    
    easterEggTrigger.addEventListener('click', () => {
        // Переключаем активное состояние
        easterEgg.classList.toggle('active');
		footerProtocol.classList.toggle('active');
		footerCreate.classList.toggle('active');
        
        // Если пасхалка активирована, показываем сообщение TM-7
        if (easterEgg.classList.contains('active')) {
            showTm7Message('ОБНАРУЖЕН СКРЫТЫЙ КАНАЛ СВЯЗИ', 3000);
        }
    });
    
    // Скрываем пасхалку при клике вне ее
    document.addEventListener('click', (event) => {
        if (easterEgg.classList.contains('active') && !event.target.closest('.easter-egg')) {
            easterEgg.classList.remove('active');
			footerProtocol.classList.remove('active');
			footerCreate.classList.remove('active');
        }
    });
    
    // ============================================================
    // АРХИВАРИУС (РЕДКОЕ ПОЯВЛЕНИЕ)
    // ============================================================
    
    const archivist = document.getElementById('archivist');
    
    /**
     * Создает редкое появление Архивариуса
     */
    function initArchivist() {
        const showArchivist = async () => {
            // Определяем случайную позицию появления
            const posX = getRandomNumber(20, window.innerWidth - 60);
            const posY = getRandomNumber(20, window.innerHeight - 80);
            
            // Устанавливаем позицию
            archivist.style.left = `${posX}px`;
            archivist.style.top = `${posY}px`;
            
            // Показываем и скрываем Архивариуса
            archivist.style.opacity = '0.8';
            await delay(getRandomNumber(200, 1000));
            archivist.style.opacity = '0';
            
            // В редких случаях показываем предупреждение TM-7
            if (Math.random() < 0.3) { // 30% шанс
                await delay(500);
                showTm7Message('АРХИВАРИУС ОБНАРУЖЕН', 3000);
            }
            
            // Планируем следующее появление через долгий интервал
            const nextTimeout = getRandomNumber(60000, 180000); // 1-3 минуты
            setTimeout(showArchivist, nextTimeout);
        };
        
        // Запускаем с первой большой задержкой
        setTimeout(showArchivist, 30000);
    }
    
    // Инициализируем Архивариуса
    initArchivist();
    
    // ============================================================
    // ВРЕМЕННАЯ МЕТКА В ФУТЕРЕ
    // ============================================================
    
    const footerTimestamp = document.getElementById('footerTimestamp');
    
    /**
     * Обновляет временную метку в футере
     */
    function updateTimestamp() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        const timestamp = `// ВРЕМЕННАЯ МЕТКА: ${hours}:${minutes}:${seconds} //`;
        footerTimestamp.textContent = timestamp;
        
        // Обновляем каждую секунду
        setTimeout(updateTimestamp, 1000);
    }
    
    // Запускаем отображение временной метки
    updateTimestamp();
    
    // ============================================================
    // ИНИЦИАЛИЗАЦИЯ ЗАВЕРШЕНА
    // ============================================================
    
    console.log('[ИМПЛ/TM-7]: СИСТЕМА ИНИЦИАЛИЗИРОВАНА УСПЕШНО');
});