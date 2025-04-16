// Инициализация страницы после загрузки
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация localStorage при первом посещении
    if (!localStorage.getItem('devBuildVisited')) {
        localStorage.setItem('devBuildVisited', 'true');
        localStorage.setItem('anomaliesFound', '0');
        localStorage.setItem('debugMode', 'false');
    }

    // Имитация загрузки страницы
    simulateLoading();
    
    // Проверка и применение дебаг-режима
    applyDebugMode();
    
    // Инициализация интерактивных элементов
    initNavigationEvents();
    initCharacterTooltip();
    initMapInteractions();
    initCommandInput();
    initModalEvents();
    initRestrictedCommands();
    
    // Восстановление прогресса пользователя
    restoreUserProgress();
});

// Имитация загрузки страницы
function simulateLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Через 8 секунд (подождать окончания анимаций)
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    }, 8000);
}

// Применение дебаг-режима при необходимости
function applyDebugMode() {
    const debugMode = localStorage.getItem('debugMode') === 'true';
    if (debugMode) {
        document.body.classList.add('debug-mode');
    }
    
    // Обработчик переключения дебаг-режима
    document.getElementById('debug-mode').addEventListener('click', () => {
        document.body.classList.toggle('debug-mode');
        const newState = document.body.classList.contains('debug-mode');
        localStorage.setItem('debugMode', newState);
        
        if (newState) {
            showToast('Дебаг-режим активирован. Отображены скрытые системные сообщения.', 'success');
        } else {
            showToast('Дебаг-режим деактивирован.', 'info');
        }
    });
}

// Инициализация событий навигации
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
        });
    });
}

// Инициализация всплывающих подсказок персонажей
function initCharacterTooltip() {
    const characterContainer = document.querySelector('.character-container');
    let tooltips = [
        "Привет, Создатель! Готов исследовать Coreworld?",
        "В этом мире многое еще не доработано...",
        "Я чувствую, здесь есть скрытые команды. Попробуй что-нибудь ввести!",
        "Ты знаешь, что багнутые кабаны - это настоящий кошмар?",
        "Мне кажется, этот мир начинает осознавать себя..."
    ];
    
    // Случайные фразы при нажатии на персонажа
    characterContainer.addEventListener('click', () => {
        const tooltip = document.querySelector('.character-tooltip p');
        const randomTip = tooltips[Math.floor(Math.random() * tooltips.length)];
        tooltip.textContent = randomTip;
        tooltip.style.animation = 'none';
        void tooltip.offsetWidth; // Трюк для перезапуска анимации
        tooltip.style.animation = 'fadeIn 0.5s forwards';
    });
}

// Имитация загрузки карты
function simulateMapLoading() {
    const mapLoading = document.getElementById('map-loading');
    const worldMap = document.getElementById('world-map');
    
    mapLoading.style.display = 'flex';
    worldMap.style.opacity = '0';
    
    setTimeout(() => {
        mapLoading.style.opacity = '0';
        worldMap.style.opacity = '1';
        setTimeout(() => {
            mapLoading.style.display = 'none';
        }, 300);
    }, 2000);
}

// Инициализация интерактивных элементов карты
function initMapInteractions() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        // При наведении на локацию
        point.addEventListener('mouseenter', () => {
            // Если локация "неопределена", применяем эффект глитча
            if (point.getAttribute('data-location') === 'unknown') {
                const marker = point.querySelector('.point-marker');
                marker.style.animation = 'glitch 0.5s infinite';
            }
        });
        
        // При уходе курсора
        point.addEventListener('mouseleave', () => {
            const marker = point.querySelector('.point-marker');
            marker.style.animation = 'pulse 2s infinite';
        });
    });
}

// Инициализация поля ввода команд
function initCommandInput() {
    const commandInput = document.getElementById('command-input');
    
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processCommand(commandInput.value);
            commandInput.value = '';
        }
    });
}

// Обработка введенных команд
function processCommand(command) {
    command = command.trim().toLowerCase();
    
    // Секретная команда
    if (command === 'initiate.protocol_x') {
        showSecretModal();
        incrementAnomalies();
        return;
    }
    
    // Другие команды
    switch (command) {
        case 'help':
        case '/help':
            showToast('Доступные команды: /описание, /персонажи, /локации, /купить, /справочник', 'info');
            break;
        case 'debug':
        case '/debug':
            document.body.classList.toggle('debug-mode');
            const isDebugOn = document.body.classList.contains('debug-mode');
            localStorage.setItem('debugMode', isDebugOn);
            showToast(isDebugOn ? 'Дебаг-режим активирован' : 'Дебаг-режим деактивирован', 'info');
            break;
        case 'version':
        case '/version':
            showToast('COREWORLD.DEV.0.0.1 | АВТОНОМНЫЙ РЕЖИМ', 'info');
            break;
        case 'status':
        case '/status':
            const anomaliesFound = localStorage.getItem('anomaliesFound') || '0';
            showToast(`>> Прогресс восстановления: ${anomaliesFound}/7 аномалий устранено`, 'info');
            break;
        case 'display.interface':
            document.querySelector('.status-bar').style.display = 'flex';
            document.querySelector('.command-input-container').style.opacity = '1';
            showToast('Интерфейс активирован', 'success');
            incrementAnomalies();
            break;
        case 'reset':
        case '/reset':
            if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
                localStorage.clear();
                localStorage.setItem('devBuildVisited', 'true');
                localStorage.setItem('anomaliesFound', '0');
                localStorage.setItem('debugMode', 'false');
                showToast('Прогресс сброшен. Перезагрузка...', 'warning');
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
            break;
        default:
            showToast(`Команда "${command}" не распознана`, 'error');
    }
}

// Инициализация модальных окон
function initModalEvents() {
    // Справочник
    document.getElementById('handbook-button').addEventListener('click', () => {
        showHandbookModal();
    });
    
    // Закрытие модальных окон
    const closeButtons = document.querySelectorAll('.modal-close, .modal-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
}

// Показать модальное окно справочника
function showHandbookModal() {
    const modal = document.getElementById('handbook-modal');
    modal.style.display = 'flex';
}

// Показать секретное модальное окно
function showSecretModal() {
    const modal = document.getElementById('secret-modal');
    modal.style.display = 'flex';
    
    // Имитация загрузки секретного режима
    const loadingText = modal.querySelector('.loading-text');
    const systemText = modal.querySelector('.system-text');
    
    loadingText.style.opacity = '1';
    systemText.style.opacity = '0';
    
    setTimeout(() => {
        loadingText.style.opacity = '0';
        setTimeout(() => {
            systemText.style.opacity = '1';
        }, 500);
    }, 2000);
}

// Инициализация команд с ограничением доступа
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

// Восстановление прогресса пользователя
function restoreUserProgress() {
    const anomaliesFound = parseInt(localStorage.getItem('anomaliesFound') || '0');
    
    // Если пользователь уже находил аномалии, показываем сообщение
    if (anomaliesFound > 0) {
        setTimeout(() => {
            showToast(`>> Прогресс восстановления: ${anomaliesFound}/7 аномалий устранено`, 'info');
        }, 10000); // Показываем через 10 секунд после загрузки
    }
    
    // Обновляем шкалу аномалий
    updateAnomalyLevel(anomaliesFound);
}

// Увеличение счетчика обнаруженных аномалий
function incrementAnomalies() {
    let anomaliesFound = parseInt(localStorage.getItem('anomaliesFound') || '0');
    anomaliesFound++;
    localStorage.setItem('anomaliesFound', anomaliesFound.toString());
    
    showToast(`Аномалия обнаружена! Прогресс: ${anomaliesFound}/7`, 'success');
    updateAnomalyLevel(anomaliesFound);
    
    if (anomaliesFound >= 7) {
        setTimeout(() => {
            showToast('Все аномалии обнаружены! Истинное понимание Coreworld близко...', 'success');
        }, 2000);
    }
}

// Обновление уровня аномалии
function updateAnomalyLevel(level) {
    const anomalyFill = document.querySelector('.anomaly-fill');
    const anomalyValue = document.querySelector('.anomaly-value');
    const percentage = Math.min(4 + level * 2, 20); // От 4% до 20%
    
    anomalyFill.style.width = `${percentage}%`;
    anomalyValue.textContent = `${percentage}%`;
}

// Показать всплывающее сообщение
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Удаляем сообщение через 5 секунд
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 5000);
}

// Периодические глитч-эффекты для иммерсии
function randomGlitchEffects() {
    // Массив элементов, которые могут глитчить
    const glitchableElements = [
        document.querySelector('.logo'),
        ...document.querySelectorAll('.character-card h3'),
        ...document.querySelectorAll('.map-point .point-marker')
    ].filter(el => el !== null);
    
    // Если нет элементов или шанс не выпал, завершаем
    if (glitchableElements.length === 0 || Math.random() > 0.2) {
        setTimeout(randomGlitchEffects, Math.random() * 10000 + 5000);
        return;
    }
    
    // Выбираем случайный элемент
    const element = glitchableElements[Math.floor(Math.random() * glitchableElements.length)];
    
    // Применяем эффект глитча
    element.classList.add('glitching');
    
    // Убираем эффект через некоторое время
    setTimeout(() => {
        element.classList.remove('glitching');
    }, 500);
    
    // Планируем следующий глитч
    setTimeout(randomGlitchEffects, Math.random() * 10000 + 5000);
}

// Запускаем случайные глитч-эффекты через некоторое время после загрузки
setTimeout(randomGlitchEffects, 15000);