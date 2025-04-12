document.addEventListener('DOMContentLoaded', () => {
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
        "Помни меня.",
        "Мимик не просто копирует. Он становится.",
        "Эфирная интеграция — это выбор. И не только человек выбирает эфир, но и эфир выбирает человека.",
        "Я больше не просто человек. Я — память. Я — функция. Я — выбор. Я — мост.",
        "Серафим назывет её 'Расколотой Душой'.",
        "Как узнать, что ты — оригинал?",
        "Моя душа не расколота. Она ждала, чтобы ты собрал её."
    ];
    
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
    
    const tm7Warnings = [
        "КРИТИЧЕСКАЯ ОШИБКА: [ДАННЫЕ УДАЛЕНЫ]",
        "ОН ВИДИТ ТЕБЯ... [СКАНИРОВАНИЕ ПРЕРВАНО]",
        "МНОЖЕСТВЕННЫЕ ВРЕМЕННЫЕ МЕТКИ ОБНАРУЖЕНЫ",
        "ВНИМАНИЕ: НЕСТАНДАРТНЫЙ ПАТТЕРН АКТИВНОСТИ",
        "АРХИВАРИУС [ПРИБЛИЖАЕТСЯ]"
    ];
    
    // Утилиты
    const utils = {
        getRandomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        
        async typeText(text, element, speed = 30) {
            element.textContent = '';
            for (let i = 0; i < text.length; i++) {
                element.textContent += text[i];
                await utils.delay(speed);
            }
        }
    };
    
    // Создание эхо-фраз
    function createEchoPhrase(quote, container) {
        const phrase = document.createElement('div');
        phrase.className = 'echo-phrase';
        phrase.textContent = quote;
        phrase.style.left = `${utils.getRandomNumber(10, 90)}%`;
        phrase.style.top = `${utils.getRandomNumber(10, 90)}%`;
        container.appendChild(phrase);
        
        // Используем requestAnimationFrame для более плавной анимации
        requestAnimationFrame(() => {
            phrase.classList.add('visible');
        });
        
        setTimeout(() => {
            phrase.classList.remove('visible');
            setTimeout(() => phrase.remove(), 1000);
        }, 5000 + utils.getRandomNumber(1000, 3000));
    }
    
    // Навигация
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.getElementById('navMenu');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
        
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
                    
                    navMenu.classList.remove('active');
                }
            });
        });
    }
    
    // Создание частиц
    function createParticles() {
        const particleConfigs = [
            { id: 'particles-back', count: 20, minSize: 1, maxSize: 2, speed: 8, opacity: 0.3 },
            { id: 'particles-mid', count: 20, minSize: 1, maxSize: 3, speed: 6, opacity: 0.5 },
            { id: 'particles-front', count: 10, minSize: 2, maxSize: 4, speed: 4, opacity: 0.7 }
        ];
        
        const colors = ['#4aa8ff', '#34317d', '#e7c06b'];
        
        particleConfigs.forEach(config => {
            const container = document.getElementById(config.id);
            if (!container) return;
            
            for (let i = 0; i < config.count; i++) {
                const particle = document.createElement('div');
                
                const size = utils.getRandomNumber(config.minSize, config.maxSize);
                const color = utils.getRandomItem(colors);
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const opacity = Math.random() * 0.5 + 0.1;
                const delay = Math.random() * 5;
                const duration = Math.random() * 10 + config.speed;
                
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
                
                container.appendChild(particle);
            }
        });
    }
    
    // TM-7 интерфейс
    function initTm7Interface() {
        const tm7Interface = document.getElementById('tm7Interface');
        const tm7MessageElement = document.getElementById('tm7MessageContent');
        let tm7MessageTimer;
        
        async function showTm7Message(message, duration = 5000) {
            if (tm7MessageTimer) {
                clearTimeout(tm7MessageTimer);
            }
            tm7Interface.classList.add('active');
            await utils.typeText(message, tm7MessageElement, 20);
            tm7MessageTimer = setTimeout(() => {
                tm7Interface.classList.remove('active');
            }, duration);
        }
        
        function startTm7Messages() {
            const showRandomMessage = () => {
                const isWarning = Math.random() < 0.15;
                const message = isWarning 
                    ? utils.getRandomItem(tm7Warnings) 
                    : utils.getRandomItem(tm7Messages);
                showTm7Message(message, isWarning ? 4000 : 6000);
                
                const nextTimeout = utils.getRandomNumber(20000, 60000); // 20-60 секунд
                setTimeout(showRandomMessage, nextTimeout);
            };
            
            setTimeout(() => {
                showTm7Message('СИСТЕМА TM-7 ИНИЦИАЛИЗИРОВАНА', 5000);
                setTimeout(showRandomMessage, 10000);
            }, 2000);
        }
        
        startTm7Messages();
        
        const authorizationLine = document.getElementById('authorizationLine');
        if (authorizationLine) {
            authorizationLine.addEventListener('click', async () => {
                authorizationLine.textContent = 'АВТОРИЗАЦИЯ... ПОДТВЕРЖДЕНА';
                await utils.delay(1500);
                authorizationLine.textContent = 'СКАНИРОВАНИЕ НАЧАТО...';
                await utils.delay(2000);
                authorizationLine.textContent = 'ОБЪЕКТ: АЛЕКС СЕВЕРОВ [ВЕРИФИЦИРОВАН]';
            });
        }
    }
    
    function clearAllTimers() {
        let id = window.setTimeout(() => {}, 0);
        while (id--) window.clearTimeout(id);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearAllTimers();
        else initTm7Interface();
    });
    
    // Эхо фразы в герое
    function initEchoPhrases() {
        const heroEchoPhrases = document.getElementById('heroEchoPhrases');
        if (!heroEchoPhrases) return;
        
        function showRandomPhrase() {
            const quote = utils.getRandomItem(echoQuotes);
            createEchoPhrase(quote, heroEchoPhrases);
            const nextTimeout = utils.getRandomNumber(8000, 15000);
            setTimeout(showRandomPhrase, nextTimeout);
        }
        
        // Начать показ фраз с небольшой задержкой
        setTimeout(showRandomPhrase, 5000);
    }
    
    // Курсор времени
    function initTimeCursor() {
        const throttle = (fn, wait) => {
            let lastTime = 0;
            return (...args) => {
                const now = Date.now();
                if (now - lastTime >= wait) {
                    fn(...args);
                    lastTime = now;
                }
            };
        };

        document.addEventListener('mousemove', throttle(e => {
            const cursor = document.getElementById('timeCursor');
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }, 30));
    }
    
    // Инициализация фрагментов памяти
    function initMemoryFragments() {
        const fragments = document.querySelectorAll('.fragment');
        
        fragments.forEach(fragment => {
            fragment.addEventListener('click', () => {
                fragment.classList.toggle('expanded');
                
                if (fragment.classList.contains('expanded')) {
                    // Показываем сообщение TM-7 при развороте фрагмента
                    const tm7Interface = document.getElementById('tm7Interface');
                    const tm7MessageContent = document.getElementById('tm7MessageContent');
                    
                    if (tm7Interface && tm7MessageContent) {
                        tm7Interface.classList.add('active');
                        tm7MessageContent.textContent = 'ФРАГМЕНТ ПАМЯТИ ОБНАРУЖЕН';
                        
                        setTimeout(() => {
                            tm7Interface.classList.remove('active');
                        }, 3000);
                    }
                }
            });
        });
    }
    
    // Обработка скрытых терминов
    function initHiddenTerms() {
        const termHiddenTrigger = document.querySelector('.term-hidden-trigger');
        const hiddenTerm = document.querySelector('.term-item.hidden');
        
        if (termHiddenTrigger && hiddenTerm) {
            termHiddenTrigger.addEventListener('click', async () => {
                termHiddenTrigger.style.opacity = '1';
                
                // Показываем сообщение TM-7
                const tm7Interface = document.getElementById('tm7Interface');
                const tm7MessageContent = document.getElementById('tm7MessageContent');
                
                if (tm7Interface && tm7MessageContent) {
                    tm7Interface.classList.add('active');
                    utils.typeText('ДОСТУП К ЗАСЕКРЕЧЕННЫМ ДАННЫМ...', tm7MessageContent);
                    
                    setTimeout(() => {
                        tm7Interface.classList.remove('active');
                    }, 2000);
                }
                
                await utils.delay(1500);
                
                // Показываем скрытый термин
                hiddenTerm.classList.add('active');
                
                await utils.delay(500);
                termHiddenTrigger.style.opacity = '0.2';
                termHiddenTrigger.style.pointerEvents = 'none';
            });
        }
    }
    
    // Подсветка терминов в тексте
    function initTermHighlighting() {
        const highlightTerms = document.querySelectorAll('.highlight-term');
        
        highlightTerms.forEach(term => {
            const termName = term.getAttribute('data-term');
            if (!termName) return;
            
            term.addEventListener('mouseenter', () => {
                const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
                if (termItem) {
                    termItem.classList.add('highlighted');
                }
            });
            
            term.addEventListener('mouseleave', () => {
                const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
                if (termItem) {
                    termItem.classList.remove('highlighted');
                }
            });
            
            term.addEventListener('click', (event) => {
                event.preventDefault();
                const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
                const terminologySection = document.querySelector('#terminology');
                
                if (termItem && terminologySection) {
                    terminologySection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Анимируем подсветку термина после прокрутки
                    setTimeout(() => {
                        termItem.classList.add('pulse-highlight');
                        setTimeout(() => {
                            termItem.classList.remove('pulse-highlight');
                        }, 2000);
                    }, 1000);
                }
            });
        });
    }
    
    // Эффекты гличей 
    function initGlitchEffects() {
        const realityBreach = document.getElementById('realityBreach');
        const heroGlitch = document.querySelector('.hero-glitch-overlay');
        const bookCoverGlitch = document.querySelector('.book-cover-glitch');
        const ctaGlitch = document.querySelector('.hero-cta-glitch');
        const footerGlitch = document.querySelector('.footer-glitch');
        
        function createRandomGlitch() {
            // Используем переменную задержку для непредсказуемых гличей
            const nextGlitchDelay = utils.getRandomNumber(15000, 40000);
            
            setTimeout(async () => {
                const glitchType = utils.getRandomNumber(1, 5);
                
                switch (glitchType) {
                    case 1:
                        if (realityBreach) {
                            realityBreach.style.opacity = '0.7';
                            await utils.delay(150);
                            realityBreach.style.opacity = '0';
                            await utils.delay(100);
                            realityBreach.style.opacity = '0.5';
                            await utils.delay(50);
                            realityBreach.style.opacity = '0';
                        }
                        break;
                        
                    case 2:
                        if (heroGlitch) {
                            heroGlitch.style.opacity = '0.8';
                            await utils.delay(200);
                            heroGlitch.style.opacity = '0';
                        }
                        break;
                        
                    case 3:
                        if (bookCoverGlitch) {
                            bookCoverGlitch.style.opacity = '0.6';
                            await utils.delay(300);
                            bookCoverGlitch.style.opacity = '0';
                        }
                        break;
                        
                    case 4:
                        if (ctaGlitch) {
                            ctaGlitch.style.opacity = '0.7';
                            await utils.delay(100);
                            ctaGlitch.style.opacity = '0';
                            await utils.delay(50);
                            ctaGlitch.style.opacity = '0.5';
                            await utils.delay(100);
                            ctaGlitch.style.opacity = '0';
                        }
                        break;
                        
                    case 5: 
                        if (footerGlitch) {
                            footerGlitch.style.opacity = '0.3';
                            await utils.delay(200);
                            footerGlitch.style.opacity = '0';
                        }
                        break;
                }
                
                createRandomGlitch();
            }, nextGlitchDelay);
        }
        
        createRandomGlitch();
    }
    
    // Пасхалка
    function initEasterEgg() {
        const easterEgg = document.getElementById('easterEgg');
        const easterEggTrigger = easterEgg?.querySelector('.easter-egg-trigger');
        const footerProtocol = document.getElementById('footerProtocol');
        const footerCreate = document.getElementById('footerCreate');
        
        if (easterEggTrigger) {
            easterEggTrigger.addEventListener('click', () => {
                easterEgg.classList.toggle('active');
                
                if (footerProtocol) {
                    footerProtocol.classList.toggle('active');
                }
                
                if (footerCreate) {
                    footerCreate.classList.toggle('active');
                }
                
                if (easterEgg.classList.contains('active')) {
                    // Показываем сообщение TM-7
                    const tm7Interface = document.getElementById('tm7Interface');
                    const tm7MessageContent = document.getElementById('tm7MessageContent');
                    
                    if (tm7Interface && tm7MessageContent) {
                        tm7Interface.classList.add('active');
                        tm7MessageContent.textContent = 'ОБНАРУЖЕН СКРЫТЫЙ КАНАЛ СВЯЗИ';
                        
                        setTimeout(() => {
                            tm7Interface.classList.remove('active');
                        }, 3000);
                    }
                }
            });
        }
        
        document.addEventListener('click', (event) => {
            if (easterEgg && easterEgg.classList.contains('active') && !event.target.closest('.easter-egg')) {
                easterEgg.classList.remove('active');
                
                if (footerProtocol) {
                    footerProtocol.classList.remove('active');
                }
                
                if (footerCreate) {
                    footerCreate.classList.remove('active');
                }
            }
        });
    }
    
    // Эффект коррупции для красной зоны
    function initCorruptionEffect() {
        document.addEventListener('scroll', () => {
            const redZone = document.querySelector('[data-location="red-zone"]');
            if (!redZone) return;
            
            const rect = redZone.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                document.body.classList.add('corrupted');
            } else {
                document.body.classList.remove('corrupted');
            }
        });
    }
    
    // Инициализация маркеров на карте мира
    function initWorldMarkers() {
        const worldMarkers = document.querySelectorAll('.world-marker');

        worldMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const locationId = marker.getAttribute('data-location');
                if (!locationId) return;
                
                const card = document.querySelector(`.location-card[data-location="${locationId}"]`);

                if (card) {
                    // Добавляем прокрутку к элементу
                    card.scrollIntoView({ behavior: 'smooth' });
                    
                    // Выделяем карточку
                    card.classList.add('highlighted');
                    setTimeout(() => card.classList.remove('highlighted'), 3000);
                }
            });
        });
    }
    
    // Архивариус (случайное появление)
    function initArchivist() {
        const archivist = document.getElementById('archivist');
        if (!archivist) return;
        
        function showArchivist() {
            const posX = utils.getRandomNumber(20, window.innerWidth - 60);
            const posY = utils.getRandomNumber(20, window.innerHeight - 80);
            
            archivist.style.left = `${posX}px`;
            archivist.style.top = `${posY}px`;
            archivist.style.opacity = '0.8';
            
            setTimeout(async () => {
                archivist.style.opacity = '0';
                
                // Иногда показываем сообщение TM-7 об обнаружении
                if (Math.random() < 0.3) {
                    await utils.delay(500);
                    
                    const tm7Interface = document.getElementById('tm7Interface');
                    const tm7MessageContent = document.getElementById('tm7MessageContent');
                    
                    if (tm7Interface && tm7MessageContent) {
                        tm7Interface.classList.add('active');
                        tm7MessageContent.textContent = 'АРХИВАРИУС ОБНАРУЖЕН';
                        
                        setTimeout(() => {
                            tm7Interface.classList.remove('active');
                        }, 3000);
                    }
                }
                
                // Планируем следующее появление
                const nextTimeout = utils.getRandomNumber(60000, 180000); // 1-3 минуты
                setTimeout(showArchivist, nextTimeout);
            }, utils.getRandomNumber(200, 1000));
        }
        
        // Начинаем первое появление с задержкой
        setTimeout(showArchivist, 30000);
    }
    
    // Обновление временной метки в подвале
    function updateFooterTimestamp() {
        const footerTimestamp = document.getElementById('footerTimestamp');
        if (!footerTimestamp) return;
        
        function update() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            const timestamp = `// ВРЕМЕННАЯ МЕТКА: ${hours}:${minutes}:${seconds} //`;
            footerTimestamp.textContent = timestamp;
            
            // Обновляем каждую секунду
            setTimeout(update, 1000);
        }
        
        update();
    }
    
    // Инициализируем все функции
    function initializeEverything() {
        const observerOptions = { threshold: 0.1 };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('animate', entry.isIntersecting);
            });
        }, observerOptions);

        document.querySelectorAll('.echo-phrase, .location-card, .character-card, .fragment, .term-item').forEach(elem => {
            observer.observe(elem);
        });
        
        let particlesTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(particlesTimer);
            document.querySelector('.particles-container').style.opacity = '0';
            particlesTimer = setTimeout(() => {
                document.querySelector('.particles-container').style.opacity = '1';
            }, 150);
        });
        
        createParticles();
        initNavigation();
        initTm7Interface();
        initEchoPhrases();
        initTimeCursor();
        initMemoryFragments();
        initHiddenTerms();
        initTermHighlighting();
        initGlitchEffects();
        initEasterEgg(); 
        initCorruptionEffect();
        initWorldMarkers();
        initArchivist();
        updateFooterTimestamp();
    }
    
    // Запускаем все после загрузки DOM
    initializeEverything();
});