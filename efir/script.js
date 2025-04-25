document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // УТИЛИТЫ
    // ==========================================
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
        },
        
        // Функция для тротлинга выполнения функций
        throttle(fn, wait) {
            let lastTime = 0;
            return function(...args) {
                const now = Date.now();
                if (now - lastTime >= wait) {
                    fn(...args);
                    lastTime = now;
                }
            };
        }
    };
    
    // ==========================================
    // ДАННЫЕ
    // ==========================================
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
    
    // Кэширование часто используемых элементов DOM
    const DOM = {
        tm7Interface: document.getElementById('tm7Interface'),
        tm7MessageContent: document.getElementById('tm7MessageContent'),
        navMenu: document.getElementById('navMenu'),
        heroEchoPhrases: document.getElementById('heroEchoPhrases'),
        archivist: document.getElementById('archivist'),
        footerTimestamp: document.getElementById('footerTimestamp'),
        timeCursor: document.getElementById('timeCursor'),
        footerProtocol: document.getElementById('footerProtocol'),
        footerCreate: document.getElementById('footerCreate'),
        easterEgg: document.getElementById('easterEgg'),
        realityBreach: document.getElementById('realityBreach'),
        heroGlitch: document.querySelector('.hero-glitch-overlay'),
        bookCoverGlitch: document.querySelector('.book-cover-glitch'),
        ctaGlitch: document.querySelector('.hero-cta-glitch'),
        footerGlitch: document.querySelector('.footer-glitch'),
        authorizationLine: document.getElementById('authorizationLine')
    };
    
    // ==========================================
    // СОЗДАНИЕ ЭХО-ФРАЗ
    // ==========================================
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
    
    // ==========================================
    // НАВИГАЦИЯ (Оптимизирована)
    // ==========================================
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        
        // Делегирование событий для навигационных ссылок
        document.body.addEventListener('click', function(e) {
            // Обработка клика на переключатель меню
            if (e.target.closest('.nav-toggle')) {
                DOM.navMenu.classList.toggle('active');
                return;
            }
            
            // Закрытие меню при клике вне его
            if (!e.target.closest('.nav') && DOM.navMenu.classList.contains('active')) {
                DOM.navMenu.classList.remove('active');
                return;
            }
            
            // Обработка клика на навигационные ссылки
            const navLink = e.target.closest('a[href^="#"]');
            if (navLink) {
                e.preventDefault();
                
                const targetId = navLink.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    
                    DOM.navMenu.classList.remove('active');
                }
            }
        });
    }
    
    // ==========================================
    // TM-7 ИНТЕРФЕЙС (Оптимизирован)
    // ==========================================
    function initTm7Interface() {
        let tm7MessageTimer;
        
        async function showTm7Message(message, duration = 5000) {
            if (tm7MessageTimer) {
                clearTimeout(tm7MessageTimer);
            }
            DOM.tm7Interface.classList.add('active');
            await utils.typeText(message, DOM.tm7MessageContent, 20);
            tm7MessageTimer = setTimeout(() => {
                DOM.tm7Interface.classList.remove('active');
            }, duration);
        }
        
        function startTm7Messages() {
            const showRandomMessage = () => {
                // Уменьшена вероятность предупреждений с 0.15 до 0.1
                const isWarning = Math.random() < 0.1;
                const message = isWarning 
                    ? utils.getRandomItem(tm7Warnings) 
                    : utils.getRandomItem(tm7Messages);
                showTm7Message(message, isWarning ? 4000 : 6000);
                
                // Увеличен интервал появления сообщений до 30-90 секунд
                const nextTimeout = utils.getRandomNumber(30000, 90000);
                setTimeout(showRandomMessage, nextTimeout);
            };
            
            setTimeout(() => {
                showTm7Message('СИСТЕМА TM-7 ИНИЦИАЛИЗИРОВАНА', 5000);
                setTimeout(showRandomMessage, 10000);
            }, 2000);
        }
        
        startTm7Messages();
        
        // Обработка авторизации (объединено в один обработчик)
        if (DOM.authorizationLine) {
            DOM.authorizationLine.addEventListener('click', async () => {
                DOM.authorizationLine.textContent = 'АВТОРИЗАЦИЯ... ПОДТВЕРЖДЕНА';
                await utils.delay(1500);
                DOM.authorizationLine.textContent = 'СКАНИРОВАНИЕ НАЧАТО...';
                await utils.delay(2000);
                DOM.authorizationLine.textContent = 'ОБЪЕКТ: АЛЕКС СЕВЕРОВ [ВЕРИФИЦИРОВАН]';
            });
        }
    }
    
    // Обработка изменения видимости страницы (для оптимизации)
    function initVisibilityHandler() {
        let tm7InterfaceTimer;
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Очищаем только основной таймер TM-7, а не все таймеры
                clearTimeout(tm7InterfaceTimer);
            } else {
                tm7InterfaceTimer = setTimeout(() => initTm7Interface(), 5000);
            }
        });
    }
    
    // ==========================================
    // ЭХО ФРАЗЫ (Оптимизировано)
    // ==========================================
    function initEchoPhrases() {
        if (!DOM.heroEchoPhrases) return;
        
        let echoPhrasesTimer;
        
        function showRandomPhrase() {
            const quote = utils.getRandomItem(echoQuotes);
            createEchoPhrase(quote, DOM.heroEchoPhrases);
            
            // Увеличен интервал до 10-20 секунд
            const nextTimeout = utils.getRandomNumber(10000, 20000);
            echoPhrasesTimer = setTimeout(showRandomPhrase, nextTimeout);
        }
        
        // Начать показ фраз с небольшой задержкой
        echoPhrasesTimer = setTimeout(showRandomPhrase, 5000);
        
        // Остановка/запуск при изменении видимости вкладки
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearTimeout(echoPhrasesTimer);
            } else {
                echoPhrasesTimer = setTimeout(showRandomPhrase, 5000);
            }
        });
    }
    
    // ==========================================
    // КУРСОР ВРЕМЕНИ (Оптимизирован)
    // ==========================================
    function initTimeCursor() {
		const timeCursor = document.getElementById('timeCursor');
		if (!timeCursor) return;
		
		// Оптимизированное отслеживание движения мыши с использованием requestAnimationFrame
		let ticking = false;
		let lastMouseEvent = null;
		
		function updateCursor() {
			if (!lastMouseEvent) return;
			
			timeCursor.style.left = `${lastMouseEvent.clientX}px`;
			timeCursor.style.top = `${lastMouseEvent.clientY}px`;
			
			if (timeCursor.style.opacity !== '1') {
				timeCursor.style.opacity = '1';
			}
			
			ticking = false;
		}
		
		document.addEventListener('mousemove', (e) => {
			lastMouseEvent = e;
			
			if (!ticking) {
				requestAnimationFrame(updateCursor);
				ticking = true;
			}
		});
		
		// Скрываем курсор при неактивности - оптимизировано с дебаунсом
		let cursorTimeout;
		function resetCursorTimeout() {
			if (cursorTimeout) {
				clearTimeout(cursorTimeout);
			}
			
			cursorTimeout = setTimeout(() => {
				timeCursor.style.opacity = '0';
			}, 5000);
		}
		
		// Используем дебаунсированную функцию только при необходимости
		document.addEventListener('mousemove', resetCursorTimeout);
		
		// Делегирование событий для эффектов наведения
		const interactiveSelectors = 'a, button, .fragment, .character-card, .location-card, .term-item, .highlight-term, .world-marker, .easter-egg-trigger';
		
		// Кэширование текущего состояния курсора
		let isOverInteractive = false;
		
		document.addEventListener('mouseover', (e) => {
			const targetElement = e.target.closest(interactiveSelectors);
			
			// Меняем состояние только если оно реально изменилось
			if (targetElement && !isOverInteractive) {
				isOverInteractive = true;
				timeCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
				timeCursor.style.border = '2px solid rgba(74, 168, 255, 0.7)';
				timeCursor.style.boxShadow = '0 0 10px rgba(74, 168, 255, 0.3)';
			}
		});
		
		document.addEventListener('mouseout', (e) => {
			const targetElement = e.target.closest(interactiveSelectors);
			const relatedTarget = e.relatedTarget?.closest(interactiveSelectors);
			
			// Проверяем, что мы действительно покинули интерактивный элемент
			// и не перешли на другой интерактивный элемент
			if (targetElement && !relatedTarget && isOverInteractive) {
				isOverInteractive = false;
				timeCursor.style.transform = 'translate(-50%, -50%) scale(1)';
				timeCursor.style.border = '2px solid rgba(74, 168, 255, 0.3)';
				timeCursor.style.boxShadow = 'none';
			}
		});
		
		// Очистка ресурсов при изменении видимости страницы
		document.addEventListener('visibilitychange', () => {
			if (document.hidden) {
				if (cursorTimeout) {
					clearTimeout(cursorTimeout);
				}
				timeCursor.style.opacity = '0';
			} else {
				resetCursorTimeout();
			}
		});
	}
    
    // ==========================================
    // ФРАГМЕНТЫ ПАМЯТИ (Делегирование событий)
    // ==========================================
    function initMemoryFragments() {
        // Делегирование событий вместо множества слушателей
        const fragmentsContainer = document.querySelector('.fragments');
        if (!fragmentsContainer) return;
        
        fragmentsContainer.addEventListener('click', (e) => {
            const fragment = e.target.closest('.fragment');
            if (!fragment) return;
            
            fragment.classList.toggle('expanded');
            
            if (fragment.classList.contains('expanded') && DOM.tm7Interface && DOM.tm7MessageContent) {
                // Показываем сообщение TM-7 при развороте фрагмента
                DOM.tm7Interface.classList.add('active');
                DOM.tm7MessageContent.textContent = 'ФРАГМЕНТ ПАМЯТИ ОБНАРУЖЕН';
                
                setTimeout(() => {
                    DOM.tm7Interface.classList.remove('active');
                }, 3000);
            }
        });
    }
    
    // ==========================================
    // ОБРАБОТКА СКРЫТЫХ ТЕРМИНОВ
    // ==========================================
    function initHiddenTerms() {
        const termHiddenTrigger = document.querySelector('.term-hidden-trigger');
        const hiddenTerm = document.querySelector('.term-item.hidden');
        
        if (termHiddenTrigger && hiddenTerm) {
            termHiddenTrigger.addEventListener('click', async () => {
                termHiddenTrigger.style.opacity = '1';
                
                // Показываем сообщение TM-7
                if (DOM.tm7Interface && DOM.tm7MessageContent) {
                    DOM.tm7Interface.classList.add('active');
                    utils.typeText('ДОСТУП К ЗАСЕКРЕЧЕННЫМ ДАННЫМ...', DOM.tm7MessageContent);
                    
                    setTimeout(() => {
                        DOM.tm7Interface.classList.remove('active');
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
    
    // ==========================================
    // ПОДСВЕТКА ТЕРМИНОВ (Делегирование событий)
    // ==========================================
    function initTermHighlighting() {
        // Делегирование событий вместо множества слушателей
        document.body.addEventListener('mouseover', (e) => {
            const term = e.target.closest('.highlight-term');
            if (!term) return;
            
            const termName = term.getAttribute('data-term');
            if (!termName) return;
            
            const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
            if (termItem) {
                termItem.classList.add('highlighted');
            }
        });
        
        document.body.addEventListener('mouseout', (e) => {
            const term = e.target.closest('.highlight-term');
            if (!term) return;
            
            const termName = term.getAttribute('data-term');
            if (!termName) return;
            
            const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
            if (termItem) {
                termItem.classList.remove('highlighted');
            }
        });
        
        document.body.addEventListener('click', (e) => {
            const term = e.target.closest('.highlight-term');
            if (!term) return;
            
            const termName = term.getAttribute('data-term');
            if (!termName) return;
            
            const termItem = document.querySelector(`.term-item[data-term="${termName}"]`);
            const terminologySection = document.querySelector('#terminology');
            
            if (termItem && terminologySection) {
                e.preventDefault();
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
    }
    
    // ==========================================
    // ЭФФЕКТЫ ГЛИЧЕЙ (Оптимизированы)
    // ==========================================
    function initGlitchEffects() {
        // Оптимизированная версия создания глич-эффектов
        // Мы уменьшаем количество таймеров и создаем систему очереди эффектов
        
        let glitchTimer;
        const glitchEffects = [
            {
                element: DOM.realityBreach,
                type: 'opacity',
                values: [0.7, 0, 0.5, 0],
                durations: [150, 100, 50, 0]
            },
            {
                element: DOM.heroGlitch,
                type: 'opacity',
                values: [0.8, 0],
                durations: [200, 0]
            },
            {
                element: DOM.bookCoverGlitch,
                type: 'opacity',
                values: [0.6, 0],
                durations: [300, 0]
            },
            {
                element: DOM.ctaGlitch,
                type: 'opacity',
                values: [0.7, 0, 0.5, 0],
                durations: [100, 50, 100, 0]
            },
            {
                element: DOM.footerGlitch,
                type: 'opacity',
                values: [0.3, 0],
                durations: [200, 0]
            }
        ];
        
        async function playGlitchEffect(effect) {
            if (!effect.element) return;
            
            for (let i = 0; i < effect.values.length; i++) {
                effect.element.style[effect.type] = effect.values[i];
                await utils.delay(effect.durations[i]);
            }
        }
        
        function createRandomGlitch() {
            const glitchType = utils.getRandomNumber(0, glitchEffects.length - 1);
            const effect = glitchEffects[glitchType];
            
            if (effect.element) {
                playGlitchEffect(effect);
            }
            
            // Увеличиваем минимальный интервал до 20 секунд, что снизит нагрузку
            const nextGlitchDelay = utils.getRandomNumber(20000, 60000);
            glitchTimer = setTimeout(createRandomGlitch, nextGlitchDelay);
        }
        
        // Запускаем систему глич-эффектов с начальной задержкой
        glitchTimer = setTimeout(createRandomGlitch, 10000);
        
        // Останавливаем/запускаем при изменении видимости вкладки
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearTimeout(glitchTimer);
            } else {
                glitchTimer = setTimeout(createRandomGlitch, 10000);
            }
        });
    }
    
    // ==========================================
    // ПАСХАЛКА (Делегирование событий)
    // ==========================================
    function initEasterEgg() {
        // Используем делегирование событий
        document.body.addEventListener('click', (e) => {
            const easterEggTrigger = e.target.closest('.easter-egg-trigger');
            
            // Клик на триггер пасхалки
            if (easterEggTrigger && DOM.easterEgg) {
                DOM.easterEgg.classList.toggle('active');
                
                if (DOM.footerProtocol) {
                    DOM.footerProtocol.classList.toggle('active');
                }
                
                if (DOM.footerCreate) {
                    DOM.footerCreate.classList.toggle('active');
                }
                
                if (DOM.easterEgg.classList.contains('active') && DOM.tm7Interface && DOM.tm7MessageContent) {
                    // Показываем сообщение TM-7
                    DOM.tm7Interface.classList.add('active');
                    DOM.tm7MessageContent.textContent = 'ОБНАРУЖЕН СКРЫТЫЙ КАНАЛ СВЯЗИ';
                    
                    setTimeout(() => {
                        DOM.tm7Interface.classList.remove('active');
                    }, 3000);
                }
                
                return;
            }
            
            // Закрытие пасхалки при клике вне её
            if (DOM.easterEgg && DOM.easterEgg.classList.contains('active') && !e.target.closest('.easter-egg')) {
                DOM.easterEgg.classList.remove('active');
                
                if (DOM.footerProtocol) {
                    DOM.footerProtocol.classList.remove('active');
                }
                
                if (DOM.footerCreate) {
                    DOM.footerCreate.classList.remove('active');
                }
            }
        });
    }
    
    // ==========================================
    // ЭФФЕКТ КОРРУПЦИИ (Оптимизирован)
    // ==========================================
    function initCorruptionEffect() {
        // Используем throttle для оптимизации обработки скролла
        const throttledCheck = utils.throttle(() => {
            const redZone = document.querySelector('[data-location="red-zone"]');
            if (!redZone) return;
            
            const rect = redZone.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                document.body.classList.add('corrupted');
            } else {
                document.body.classList.remove('corrupted');
            }
        }, 100); // Увеличен интервал тротлинга до 100мс
        
        document.addEventListener('scroll', throttledCheck);
    }
    
    // ==========================================
    // МАРКЕРЫ НА КАРТЕ МИРА (Делегирование событий)
    // ==========================================
    function initWorldMarkers() {
        const worldMap = document.getElementById('worldMap');
        if (!worldMap) return;
        
        worldMap.addEventListener('click', (e) => {
            const marker = e.target.closest('.world-marker');
            if (!marker) return;
            
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
    }
    
    // ==========================================
    // АРХИВАРИУС (Оптимизирован)
    // ==========================================
    function initArchivist() {
        if (!DOM.archivist) return;
        
        let archivistTimer;
        
        function showArchivist() {
            const posX = utils.getRandomNumber(20, window.innerWidth - 60);
            const posY = utils.getRandomNumber(20, window.innerHeight - 80);
            
            DOM.archivist.style.left = `${posX}px`;
            DOM.archivist.style.top = `${posY}px`;
            DOM.archivist.style.opacity = '0.8';
            
            setTimeout(async () => {
                DOM.archivist.style.opacity = '0';
                
                // Уменьшаем вероятность показа сообщения
                if (Math.random() < 0.2) {
                    await utils.delay(500);
                    
                    if (DOM.tm7Interface && DOM.tm7MessageContent) {
                        DOM.tm7Interface.classList.add('active');
                        DOM.tm7MessageContent.textContent = 'АРХИВАРИУС ОБНАРУЖЕН';
                        
                        setTimeout(() => {
                            DOM.tm7Interface.classList.remove('active');
                        }, 3000);
                    }
                }
                
                // Увеличиваем интервал появления до 2-5 минут
                const nextTimeout = utils.getRandomNumber(120000, 300000);
                archivistTimer = setTimeout(showArchivist, nextTimeout);
            }, utils.getRandomNumber(200, 1000));
        }
        
        // Начинаем первое появление с задержкой
        archivistTimer = setTimeout(showArchivist, 30000);
        
        // Останавливаем/запускаем при изменении видимости вкладки
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearTimeout(archivistTimer);
            } else {
                archivistTimer = setTimeout(showArchivist, 30000);
            }
        });
    }
    
    // ==========================================
    // ВРЕМЕННАЯ МЕТКА В ПОДВАЛЕ (Оптимизирована)
    // ==========================================
    function updateFooterTimestamp() {
        if (!DOM.footerTimestamp) return;
        
        let footerTimer;
        
        function update() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            const timestamp = `// ВРЕМЕННАЯ МЕТКА: ${hours}:${minutes}:${seconds} //`;
            DOM.footerTimestamp.textContent = timestamp;
            
            // Обновляем каждые 3 секунды вместо каждой секунды
            footerTimer = setTimeout(update, 3000);
        }
        
        update();
        
        // Останавливаем обновление времени, когда вкладка не активна
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearTimeout(footerTimer);
            } else {
                update();
            }
        });
    }
    
    // ==========================================
    // ИНИЦИАЛИЗАЦИЯ ВСЕГО
    // ==========================================
    function initializeEverything() {
        // Используем IntersectionObserver для анимации при прокрутке
        const observerOptions = { threshold: 0.1 };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Отключаем наблюдение после активации анимации
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Наблюдаем за элементами, которые должны анимироваться при прокрутке
        document.querySelectorAll('.echo-phrase, .location-card, .character-card, .fragment, .term-item').forEach(elem => {
            observer.observe(elem);
        });
        
        // Инициализация всех компонентов
        initNavigation();
        initTm7Interface();
        initVisibilityHandler();
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