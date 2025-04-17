/**
 * core.js - Основной JavaScript файл с базовыми функциями и инициализацией
 */

// Инициализация страницы после загрузки
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация localStorage при первом посещении
    if (!localStorage.getItem('devBuildVisited')) {
        localStorage.setItem('devBuildVisited', 'true');
        localStorage.setItem('anomaliesFound', '0');
        localStorage.setItem('debugMode', 'false');
    }

    // Обработка загрузки изображений
    initImageLoading();
    
    // Имитация загрузки страницы
    simulateLoading();
    
    // Проверка и применение дебаг-режима
    applyDebugMode();
    
    // Восстановление прогресса пользователя
    restoreUserProgress();
    
    // Оптимизация производительности
    optimizePerformance();
    
    // Запуск случайных глитч-эффектов
    setTimeout(randomGlitchEffects, 15000);
});

/**
 * Инициализация загрузки изображений
 */
function initImageLoading() {
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

/**
 * Имитация загрузки страницы
 */
function simulateLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Проверяем, является ли это повторным посещением
    const isReturningVisitor = localStorage.getItem('devBuildVisited') === 'true';
    const loadingTime = isReturningVisitor ? 2000 : 4000; // 2 секунды для повторных, 4 для новых
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    }, loadingTime);
}

/**
 * Применение дебаг-режима при необходимости
 */
function applyDebugMode() {
    const debugMode = localStorage.getItem('debugMode') === 'true';
    if (debugMode) {
        document.body.classList.add('debug-mode');
    }
    
    // Обработчик переключения дебаг-режима
    const debugToggle = document.getElementById('debug-mode');
    if (debugToggle) {
        debugToggle.addEventListener('click', () => {
            document.body.classList.toggle('debug-mode');
            const newState = document.body.classList.contains('debug-mode');
            localStorage.setItem('debugMode', newState);
            
            // Обновление ARIA-атрибута
            debugToggle.setAttribute('aria-pressed', newState);
            
            if (newState) {
                showToast('Дебаг-режим активирован. Отображены скрытые системные сообщения.', 'success');
            } else {
                showToast('Дебаг-режим деактивирован.', 'info');
                // Удаляем панель дебага, если она есть
                const existingPanel = document.querySelector('.debug-panel');
                if (existingPanel) {
                    existingPanel.remove();
                }
            }
        });
    }
}

/**
 * Восстановление прогресса пользователя
 */
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

/**
 * Увеличение счетчика обнаруженных аномалий
 */
function incrementAnomalies() {
    let anomaliesFound = parseInt(localStorage.getItem('anomaliesFound') || '0');
    anomaliesFound++;
    localStorage.setItem('anomaliesFound', anomaliesFound.toString());
    
    showToast(`Аномалия обнаружена! Прогресс: ${anomaliesFound}/7`, 'success');
    updateAnomalyLevel(anomaliesFound);
    
    if (anomaliesFound >= 7) {
        setTimeout(() => {
            showToast('Все аномалии обнаружены! Истинное понимание Coreworld близко...', 'success');
            // Показываем секретное сообщение при обнаружении всех аномалий
            setTimeout(() => {
                showSecretMessage();
            }, 3000);
        }, 2000);
    }
}

/**
 * Обновление уровня аномалии
 * @param {number} level - Текущий уровень аномалии
 */
function updateAnomalyLevel(level) {
    const anomalyFill = document.querySelector('.anomaly-fill');
    const anomalyValue = document.querySelector('.anomaly-value');
    
    if (anomalyFill && anomalyValue) {
        const percentage = Math.min(4 + level * 2, 20); // От 4% до 20%
        
        anomalyFill.style.width = `${percentage}%`;
        anomalyValue.textContent = `${percentage}%`;
    }
}

/**
 * Показать секретное сообщение при обнаружении всех аномалий
 */
function showSecretMessage() {
    const secretMessage = document.createElement('div');
    secretMessage.className = 'secret-message';
    secretMessage.innerHTML = `
        <div class="secret-content">
            <h3>// СИСТЕМНОЕ СООБЩЕНИЕ //</h3>
            <p>Инициировано создание резервной копии сознания...</p>
            <p>Создатель опознан. Загрузка в процессе...</p>
            <p class="blink-text">Ожидайте появления следующей части.</p>
        </div>
    `;
    document.body.appendChild(secretMessage);
    
    // Удаляем сообщение через некоторое время
    setTimeout(() => {
        secretMessage.classList.add('fade-out');
        setTimeout(() => {
            secretMessage.remove();
        }, 1000);
    }, 10000);
}

/**
 * Показать всплывающее сообщение
 * @param {string} message - Текст сообщения
 * @param {string} type - Тип сообщения (info, success, warning, error)
 */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Удаляем сообщение через 5 секунд
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode === toastContainer) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }
}

/**
 * Оптимизация производительности
 */
function optimizePerformance() {
    // Отложенная загрузка изображений
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает нативную ленивую загрузку
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Запасной вариант для браузеров без поддержки
        const lazyLoad = function() {
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                if (isElementInViewport(img)) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        };
        
        // Проверка видимости элемента
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Вызываем при прокрутке
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        
        // Инициализация
        lazyLoad();
    }
    
    // Оптимизация анимаций
    const animatedElements = document.querySelectorAll('.glitching, .point-marker, .loading-spinner');
    animatedElements.forEach(el => {
        el.classList.add('will-change-transform');
    });
}

/**
 * Периодические глитч-эффекты для иммерсии
 */
function randomGlitchEffects() {
    // Массив элементов, которые могут глитчить
    const glitchableElements = [
        document.querySelector('.logo-title'),
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

/**
 * Функция дебаунс для оптимизации событий
 * @param {Function} func - Функция, которую нужно дебаунсить
 * @param {number} wait - Время ожидания в миллисекундах
 * @returns {Function} - Дебаунсированная функция
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}