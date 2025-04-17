/**
 * ui.js - Функции для работы с пользовательским интерфейсом
 */

// Инициализация интерактивных элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initNavigationEvents();
    initCharacterTooltip();
    initMapInteractions();
    initCommandInput();
    initMobileMenu();
    initAccessibility();
    initRestrictedCommands();
});

/**
 * Инициализация событий навигации между секциями
 */
function initNavigationEvents() {
    const menuItems = document.querySelectorAll('.command-item');
    const sections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        if (item.classList.contains('restricted')) return;
        
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Если это кнопка справочника, показать модальное окно
            if (targetSection === 'handbook') {
                showHandbookModal();
                return;
            }
            
            // Для остальных пунктов меню переключаем секции
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            item.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    // Если это карта, имитируем загрузку
                    if (targetSection === 'locations') {
                        simulateMapLoading();
                    }
                }
            });
            
            // Закрываем мобильное меню после выбора секции
            const creatorBook = document.querySelector('.creator-book');
            const menuToggle = document.getElementById('menu-toggle');
            if (window.innerWidth <= 768 && creatorBook && menuToggle) {
                creatorBook.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/**
 * Инициализация мобильного меню
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const creatorBook = document.querySelector('.creator-book');
    
    if (menuToggle && creatorBook) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            creatorBook.classList.toggle('open');
            
            // Обновляем ARIA-атрибуты
            const isExpanded = creatorBook.classList.contains('open');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Дополнительный обработчик для закрытия меню при клике вне его
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInside = event.target.closest('.creator-book') || event.target.closest('#menu-toggle');
            
            if (!isClickInside && creatorBook && creatorBook.classList.contains('open')) {
                creatorBook.classList.remove('open');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
}

/**
 * Инициализация всплывающих подсказок персонажей
 */
function initCharacterTooltip() {
    const characterIcon = document.querySelector('.character-icon');
    
    if (characterIcon) {
        characterIcon.addEventListener('click', () => {
            const tooltips = [
                "Привет, Создатель! Готов исследовать Coreworld?",
                "В этом мире многое еще не доработано...",
                "Я чувствую, здесь есть скрытые команды. Попробуй что-нибудь ввести!",
                "Ты знаешь, что багнутые кабаны - это настоящий кошмар?",
                "Мне кажется, этот мир начинает осознавать себя...",
                "Хранитель Поляны знает больше, чем говорит...",
                "Интересно, есть ли в справочнике что-то про якоря мира?",
                "Аномалии находятся не там, где ты их ищешь. Попробуй нестандартные подходы.",
                "По слухам, в коде остались секретные команды от разработчиков.",
                "Древние Руины появляются только в определенное время. Нужно ждать.",
                "Программист может помочь с исправлением ошибок твоей ноги.",
                "Шу когда-то была обычным NPC, но что-то изменилось...",
                "Ветвящиеся Пути - место, где сходятся и расходятся версии реальности.",
                "Магия в этом мире - всего лишь побочный эффект недописанного кода.",
                "Цифровые линзы позволяют увидеть скрытые параметры объектов.",
                "Мяу! Я не просто код, я - кот с миссией!",
                "Книга Создателя хранит больше команд, чем показывает...",
                "Ты заметил, что некоторые NPC становятся всё более... осознанными?",
                "Семь якорей мира - ключ к стабильности Coreworld.",
                "Попробуй ввести код со словом 'matrix' или 'root'. Просто предположение."
            ];
            
            const randomTip = tooltips[Math.floor(Math.random() * tooltips.length)];
            showToast(randomTip, 'info');
        });
    }
}

/**
 * Имитация загрузки карты
 */
function simulateMapLoading() {
    const mapLoading = document.getElementById('map-loading');
    const worldMap = document.getElementById('world-map');
    
    if (mapLoading && worldMap) {
        mapLoading.style.display = 'flex';
        worldMap.style.opacity = '0';
        
        setTimeout(() => {
            mapLoading.style.opacity = '0';
            worldMap.style.opacity = '1';
            setTimeout(() => {
                mapLoading.style.display = 'none';
            }, 300);
        }, 1500); // Сокращено время загрузки карты
    }
}

/**
 * Инициализация интерактивных элементов карты
 */
function initMapInteractions() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        // При наведении на локацию
        point.addEventListener('mouseenter', () => {
            // Если локация "неопределена", применяем эффект глитча
            if (point.getAttribute('data-location') === 'unknown') {
                const marker = point.querySelector('.point-marker');
                if (marker) {
                    marker.style.animation = 'glitch 0.5s infinite';
                }
            }
        });
        
        // При уходе курсора
        point.addEventListener('mouseleave', () => {
            const marker = point.querySelector('.point-marker');
            if (marker) {
                marker.style.animation = 'pulse 2s infinite';
            }
        });
        
        // При клике на точку карты
        point.addEventListener('click', () => {
            const locationInfo = point.querySelector('.location-info');
            if (locationInfo) {
                const locationName = locationInfo.querySelector('h3').textContent;
                showToast(`Выбрана локация: ${locationName}`, 'info');
                
                // Дополнительные действия при клике на определенные локации
                if (point.getAttribute('data-location') === 'unknown') {
                    // Шанс найти аномалию
                    if (Math.random() < 0.3) { // 30% шанс
                        setTimeout(() => {
                            showToast('В неопределенной области обнаружена структурная аномалия!', 'warning');
                            incrementAnomalies();
                        }, 1000);
                    }
                }
            }
        });
    });
}

/**
 * Инициализация поля ввода команд
 */
function initCommandInput() {
    const commandInput = document.getElementById('command-input');
    const consoleButton = document.getElementById('console-button');
    const commandContainer = document.getElementById('command-container');
    
    // Сделаем кнопку консоли переключателем
    if (consoleButton && commandContainer) {
        consoleButton.addEventListener('click', () => {
            const isVisible = commandContainer.classList.contains('visible');
            
            if (!isVisible) {
                // Показываем консоль
                commandContainer.classList.add('visible');
                consoleButton.setAttribute('aria-pressed', 'true');
                consoleButton.style.backgroundColor = '#b94aff'; // Меняем цвет кнопки
                if (commandInput) {
                    commandInput.focus();
                }
            } else {
                // Скрываем консоль
                commandContainer.classList.remove('visible');
                consoleButton.setAttribute('aria-pressed', 'false');
                consoleButton.style.backgroundColor = ''; // Возвращаем исходный цвет
            }
        });
    }
    
    // Обработка нажатия ESC для закрытия консоли
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && commandContainer && commandContainer.classList.contains('visible')) {
            commandContainer.classList.remove('visible');
            if (consoleButton) {
                consoleButton.setAttribute('aria-pressed', 'false');
                consoleButton.style.backgroundColor = '';
            }
        }
    });
    
    // Обработка ввода команд
    if (commandInput) {
        commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processCommand(commandInput.value);
                commandInput.value = '';
            }
        });
    }
}

/**
 * Инициализация команд с ограничением доступа
 */
function initRestrictedCommands() {
    const restrictedCommands = document.querySelectorAll('.command-item.restricted');
    
    restrictedCommands.forEach(command => {
        command.addEventListener('click', () => {
            // Применяем эффект глитча
            command.classList.add('glitching');
            
            // Показываем сообщение об ошибке
            showToast('[ОШИБКА: Недостаточно прав доступа. Требуется авторизация уровня Создателя]', 'error');
            
            // Убираем эффект глитча через некоторое время
            setTimeout(() => {
                command.classList.remove('glitching');
            }, 500);
        });
    });
}

/**
 * Улучшение доступности
 */
function initAccessibility() {
    // Добавление клавиатурной навигации для меню
    const menuItems = document.querySelectorAll('.command-item:not(.restricted)');
    
    menuItems.forEach(item => {
        item.addEventListener('keydown', function(e) {
            // Активация при нажатии Enter или Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Добавление клавиатурной навигации для дебаг-режима
    const debugToggle = document.getElementById('debug-mode');
    if (debugToggle) {
        debugToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Добавление alt-текстов для изображений, у которых их нет
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.setAttribute('alt', 'Изображение');
    });
    
    // Улучшение доступности модальных окон
    document.querySelectorAll('.modal-close, .modal-button').forEach(button => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}