// Оптимизированный главный скрипт
document.addEventListener('DOMContentLoaded', function() {
    // Индикатор загрузки
    const pageLoading = document.createElement('div');
    pageLoading.className = 'page-loading';
    pageLoading.innerHTML = `
        <div class="loading-crystal"></div>
        <div class="loading-text">ЗАГРУЗКА КРИСТАЛЛОВ</div>
    `;
    document.body.appendChild(pageLoading);
    
    // Активируем только самое необходимое сразу
    setTimeout(() => {
        // Отложенная инициализация самых тяжелых эффектов
        createOptimizedParticles();
        
        // Инициализируем базовые функции
        initNavigation();
        initOptimizedObserver();
        
        // Отложенная инициализация остальных функций
        setTimeout(() => {
            initGalleryTabs();
            initCharactersInteraction();
            initHoverEffects();
            
                initPashalkas();
                initWatchersInterface();
            // Убираем загрузочный экран
            pageLoading.classList.add('loaded');
            setTimeout(() => {
                pageLoading.remove();
            }, 500);
        }, 200);
    }, 500);
});

function initOptimizedObserver() {
    // Используем один Observer для всех подобных элементов
    const elementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Перестаем наблюдать после появления
                elementsObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });
    
    // Наблюдаем за всеми нужными элементами
    document.querySelectorAll('.book-info, .lore-blocks, .characters-container, .gallery-content, .book-portal, .prophecy-container')
        .forEach(element => {
            element.classList.add('fade-in');
            elementsObserver.observe(element);
        });
}

// Функция создания оптимизированных частиц
function createOptimizedParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    // Значительно уменьшим количество частиц
    const isMobile = window.innerWidth <= 768;
    const isLowPerformance = navigator.hardwareConcurrency < 4;
    
    // Уменьшаем количество частиц до разумных значений
    const particleCount = isMobile ? 5 : (isLowPerformance ? 8 : 12);
    
    // Используем DocumentFragment для более эффективного добавления
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Уменьшаем размер частиц
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Используем css-классы вместо inline-стилей там, где это возможно
        particle.classList.add(`particle-${i % 3}`);
        
        fragment.appendChild(particle);
    }
    
    // Добавляем все частицы одним обращением к DOM
    container.appendChild(fragment);
}

// Функция для анимации элементов при прокрутке
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.book-info, .lore-blocks, .characters-container, .gallery-content, .book-portal, .prophecy-container');
    
    // Добавляем класс для анимации
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Оптимизированная проверка видимости с помощью Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Перестаем наблюдать за элементом после его появления
            }
        });
    }, {
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.1
    });
    
    // Начинаем наблюдение за элементами
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Функция инициализации улучшенной навигации
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    // Обработчик клика по элементу навигации
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Используем более простой эффект перехода
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Обновление активного элемента навигации при прокрутке с помощью Intersection Observer
    const observerOptions = {
        rootMargin: '-20% 0px -80% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === currentSection) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Начинаем наблюдение за секциями
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Обработчик для кнопки прокрутки вниз
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Функция инициализации табов галереи
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const panels = document.querySelectorAll('.gallery-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Простой переключатель активных классов
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const targetPanel = document.getElementById(`${this.getAttribute('data-tab')}-panel`);
            panels.forEach(panel => panel.classList.remove('active'));
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Упрощенная функция добавления интерактивности персонажам
function initCharactersInteraction() {
    const characters = document.querySelectorAll('.character-card');
    
    characters.forEach(character => {
        character.addEventListener('mouseenter', function() {
            const aura = this.querySelector('.character-aura');
            if (aura) aura.style.opacity = '1';
        });
        
        character.addEventListener('mouseleave', function() {
            const aura = this.querySelector('.character-aura');
            if (aura) aura.style.opacity = '0';
        });
        
        // Добавляем всплывающие подсказки к способностям
        const abilities = character.querySelectorAll('.ability');
        abilities.forEach(ability => {
            ability.addEventListener('mouseenter', function() {
                if (this.querySelector('.ability-tooltip')) return;
                
                const tooltip = document.createElement('div');
                tooltip.className = 'ability-tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = 'position:absolute;bottom:0;left:50%;transform:translateX(-50%) translateY(100%);background:rgba(15,43,61,0.9);color:white;padding:5px 10px;border-radius:5px;font-size:12px;white-space:nowrap;z-index:100;box-shadow:var(--shadow-sm);pointer-events:none;';
                
                this.appendChild(tooltip);
            });
            
            ability.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.ability-tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    });
    
    // Упрощенная анимация для Моро при клике
    const moroCard = document.getElementById('moro-card');
    if (moroCard) {
        moroCard.addEventListener('click', function() {
            const excerptElement = document.querySelector('.secret-excerpt');
            if (excerptElement) {
                excerptElement.classList.add('visible');
            }
        });
    }
}

// Инициализация пасхалок через элементы футера
function initPashalkas() {
    // Активация секретного пророчества через ссылку в футере
    const prophecyLink = document.getElementById('prophecy-link');
    const hiddenSecret = document.querySelector('.hidden-secret');
    
    if (prophecyLink && hiddenSecret) {
        prophecyLink.addEventListener('click', function(e) {
            e.preventDefault();
            hiddenSecret.classList.add('visible');
        });
        
        // Закрытие секретного пророчества
        const secretClose = hiddenSecret.querySelector('.secret-close');
        if (secretClose) {
            secretClose.addEventListener('click', function() {
                hiddenSecret.classList.remove('visible');
            });
        }
    }
    
    // Закрытие секретного отрывка книги
    const excerptClose = document.querySelector('.excerpt-close');
    const secretExcerpt = document.querySelector('.secret-excerpt');
    
    if (excerptClose && secretExcerpt) {
        excerptClose.addEventListener('click', function() {
            secretExcerpt.classList.remove('visible');
        });
    }
    
    // Инициализация дневника
    const kaelaCard = document.getElementById('kaela-card');
    const journal = document.querySelector('.kaela-journal');
    
    if (kaelaCard && journal) {
        kaelaCard.addEventListener('click', function() {
            journal.classList.add('visible');
        });
        
        // Закрытие дневника
        const journalClose = journal.querySelector('.journal-close');
        if (journalClose) {
            journalClose.addEventListener('click', function() {
                journal.classList.remove('visible');
            });
        }
        
        // Простая навигация по страницам дневника
        const journalPages = journal.querySelectorAll('.journal-page');
        const journalPrev = journal.querySelector('.journal-prev');
        const journalNext = journal.querySelector('.journal-next');
        let currentPage = 0;
        
        if (journalPrev && journalNext) {
            journalPrev.addEventListener('click', function() {
                if (currentPage > 0) {
                    journalPages[currentPage].classList.remove('current-page');
                    currentPage--;
                    journalPages[currentPage].classList.add('current-page');
                }
            });
            
            journalNext.addEventListener('click', function() {
                if (currentPage < journalPages.length - 1) {
                    journalPages[currentPage].classList.remove('current-page');
                    currentPage++;
                    journalPages[currentPage].classList.add('current-page');
                }
            });
        }
    }
    
    // Инициализация рун (упрощенная версия)
    const runes = document.querySelectorAll('.rune');
    const hiddenText = document.querySelector('.hidden-text');
    let activatedRunes = 0;
    
    if (runes.length && hiddenText) {
        runes.forEach(rune => {
            rune.addEventListener('click', function() {
                if (!this.classList.contains('activated')) {
                    this.classList.add('activated');
                    this.style.filter = 'brightness(1.5)';
                    
                    activatedRunes++;
                    if (activatedRunes === runes.length) {
                        hiddenText.classList.add('revealed');
                    }
                }
            });
        });
    }
}

// Функция для инициализации интерфейса "Созерцателей"
function initWatchersInterface() {
    // Выбираем все элементы интерфейса
    const watchersInterface = document.querySelector('.watchers-interface');
    if (!watchersInterface) return;
    
    const watchersLink = document.getElementById('watchers-link');
    const closeBtn = watchersInterface.querySelector('.interface-close');
    const sidebarOptions = watchersInterface.querySelectorAll('.sidebar-option');
    const dataPanels = watchersInterface.querySelectorAll('.data-block');
    const codeSubmit = watchersInterface.querySelector('.code-submit');
    const codeInput = watchersInterface.querySelector('.code-input');
    const accessError = watchersInterface.querySelector('.access-error');
    
    // Обработчик для открытия интерфейса
    if (watchersLink) {
        watchersLink.addEventListener('click', function(e) {
            e.preventDefault();
            watchersInterface.classList.remove('hidden');
            watchersInterface.classList.add('visible');
        });
    }
    
    // Обработчик для закрытия интерфейса
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            watchersInterface.classList.remove('visible');
            setTimeout(() => {
                watchersInterface.classList.add('hidden');
            }, 300);
        });
    }
    
    // Обработчик для переключения между панелями
    sidebarOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем активный класс со всех опций
            sidebarOptions.forEach(opt => opt.classList.remove('active'));
            // Добавляем активный класс текущей опции
            this.classList.add('active');
            
            // Получаем ID панели, которую нужно показать
            const panelId = 'panel-' + this.getAttribute('data-panel');
            
            // Скрываем все панели и показываем нужную
            dataPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === panelId) {
                    panel.classList.add('active');
                }
            });
        });
    });
    
    // Обработчик для проверки кода доступа
    if (codeSubmit && codeInput && accessError) {
        codeSubmit.addEventListener('click', function() {
            // Проверяем введенный код (можно добавить секретный код для пасхалки)
            if (codeInput.value.toUpperCase() === 'РАСКОЛ') {
                // Если код верный, показываем секретную информацию
                // Здесь можно добавить появление секретной панели
                codeInput.style.borderColor = 'rgba(78, 205, 196, 1)';
                accessError.textContent = 'ДОСТУП РАЗРЕШЕН. ЗАГРУЗКА ДАННЫХ...';
                accessError.style.color = 'rgba(78, 205, 196, 1)';
                accessError.classList.add('visible');
                
                // Имитация загрузки и показа секретной информации через 2 секунды
                setTimeout(() => {
                    // Здесь можно добавить секретную информацию
                    const restrictedContent = document.getElementById('panel-restricted');
                    if (restrictedContent) {
                        restrictedContent.innerHTML = `
                            <div class="secret-data">
                                <div class="data-header">ПРОЕКТ "РАСКОЛ": СОВЕРШЕННО СЕКРЕТНО</div>
                                <div class="data-content">
                                    <p>Дата начала: 500 лет назад</p>
                                    <p>Статус: Завершён успешно</p>
                                    <p>Цель: Получение контроля над магическими потоками путём целенаправленного разрушения портальной сети Шай'ри</p>
                                    <p>Результат: Город Шай'ри изолирован в межпространственной ловушке. 95% популяции Шай'ри уничтожено. Контроль над магическими потоками установлен.</p>
                                    <p>Примечание: Пророчество о "Последнем Ключе" и "Проводнике Сердец" представляет угрозу для результатов проекта. Требуется немедленная ликвидация всех причастных.</p>
                                </div>
                                <div class="classified-stamp danger-stamp">ВЫСШИЙ УРОВЕНЬ СЕКРЕТНОСТИ</div>
                            </div>
                        `;
                    }
                }, 2000);
                
            } else {
                // Если код неверный, показываем ошибку
                codeInput.style.borderColor = 'rgba(214, 51, 108, 0.9)';
                accessError.textContent = 'НЕВЕРНЫЙ КОД. ПОПЫТКА ЗАПИСАНА.';
                accessError.style.color = 'rgba(214, 51, 108, 0.9)';
                accessError.classList.add('visible');
                
                // Скрываем ошибку через 3 секунды
                setTimeout(() => {
                    accessError.classList.remove('visible');
                    codeInput.style.borderColor = 'rgba(78, 205, 196, 0.5)';
                }, 3000);
            }
        });
        
        // Добавляем обработчик нажатия Enter
        codeInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                codeSubmit.click();
            }
        });
    }
    
    // Добавляем небольшую анимацию для угрозы
    const threatBar = watchersInterface.querySelector('.threat-bar');
    if (threatBar) {
        setInterval(() => {
            const randomWidth = 85 + Math.random() * 10; // От 85% до 95%
            threatBar.style.width = randomWidth + '%';
        }, 2000);
    }
}

// Упрощенные эффекты при наведении
function initHoverEffects() {
    // Упрощенные эффекты для кнопок
    const ctaButtons = document.querySelectorAll('.cta-button, .read-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(26, 99, 85, 0.4), 0 0 15px rgba(78, 205, 196, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Подсветка блоков с персонажами
    const loreBlocks = document.querySelectorAll('.lore-block');
    
    loreBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.2)';
            this.style.transform = 'translateY(-5px)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(78, 205, 196, 0.3)';
            this.style.boxShadow = '';
            this.style.transform = 'translateY(0)';
        });
    });
}

// Вспомогательная функция для плавной прокрутки к элементу (оптимизированная)
function scrollToElement(element) {
    if (!element) return;
    
    window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}
