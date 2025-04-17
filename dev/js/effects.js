/**
 * effects.js - Визуальные эффекты и анимации
 */

/**
 * Создает эффект матрицы с падающими символами
 * @param {number} duration - Длительность эффекта в миллисекундах
 */
function createMatrixEffect(duration = 8000) {
    // Создаем эффект "Матрицы" на экране
    const matrix = document.createElement('div');
    matrix.className = 'matrix-effect';
    document.body.appendChild(matrix);
    
    // Генерация символов
    for (let i = 0; i < 100; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'matrix-symbol';
        symbol.style.left = `${Math.random() * 100}%`;
        symbol.style.animationDuration = `${3 + Math.random() * 5}s`;
        symbol.style.animationDelay = `${Math.random() * 2}s`;
        symbol.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
        matrix.appendChild(symbol);
    }
    
    // Удаляем эффект через указанное время
    setTimeout(() => {
        matrix.style.opacity = '0';
        setTimeout(() => {
            matrix.remove();
        }, 1000);
    }, duration);
    
    return matrix;
}

/**
 * Создает эффект глитча на указанном элементе
 * @param {HTMLElement} element - Элемент, к которому применяется эффект
 * @param {number} duration - Длительность эффекта в миллисекундах
 * @param {number} intensity - Интенсивность эффекта (1-10)
 */
function applyGlitchEffect(element, duration = 500, intensity = 5) {
    if (!element) return;
    
    // Сохраняем оригинальные стили
    const originalStyles = {
        transform: element.style.transform,
        filter: element.style.filter,
        textShadow: element.style.textShadow
    };
    
    // Создаем CSS-анимацию с заданной интенсивностью
    const glitchKeyframes = `
        @keyframes custom-glitch-${Date.now()} {
            0% {
                text-shadow: none;
                transform: skewX(0);
                filter: hue-rotate(0deg);
            }
            25% {
                text-shadow: ${0.2 * intensity}px 0 var(--glitch-1), -${0.2 * intensity}px 0 var(--glitch-2);
                transform: skewX(${0.5 * intensity}deg);
                filter: hue-rotate(${9 * intensity}deg);
            }
            50% {
                text-shadow: -${0.2 * intensity}px 0 var(--glitch-3), ${0.2 * intensity}px 0 var(--glitch-1);
                transform: skewX(-${0.5 * intensity}deg);
                filter: hue-rotate(${18 * intensity}deg);
            }
            75% {
                text-shadow: ${0.2 * intensity}px 0 var(--glitch-2), -${0.2 * intensity}px 0 var(--glitch-3);
                transform: skewX(${0.5 * intensity}deg);
                filter: hue-rotate(${27 * intensity}deg);
            }
            100% {
                text-shadow: none;
                transform: skewX(0);
                filter: hue-rotate(${36 * intensity}deg);
            }
        }
    `;
    
    // Добавляем стиль в документ
    const styleElement = document.createElement('style');
    styleElement.textContent = glitchKeyframes;
    document.head.appendChild(styleElement);
    
    // Задаем анимацию элементу
    const animationName = `custom-glitch-${Date.now()}`;
    element.style.animation = `${animationName} ${duration / 1000}s infinite`;
    
    // Останавливаем анимацию через указанное время
    setTimeout(() => {
        element.style.animation = '';
        element.style.transform = originalStyles.transform;
        element.style.filter = originalStyles.filter;
        element.style.textShadow = originalStyles.textShadow;
        
        // Удаляем стиль анимации
        document.head.removeChild(styleElement);
    }, duration);
}

/**
 * Создает эффект пульсации для элемента
 * @param {HTMLElement} element - Элемент, к которому применяется эффект
 * @param {number} duration - Длительность эффекта в миллисекундах
 * @param {string} color - Цвет пульсации (CSS-цвет)
 */
function createPulseEffect(element, duration = 2000, color = 'var(--accent-color)') {
    if (!element) return;
    
    // Сохраняем оригинальные стили
    const originalBoxShadow = element.style.boxShadow;
    const originalTransition = element.style.transition;
    
    // Создаем эффект пульсации
    element.style.transition = 'box-shadow 0.5s ease-in-out';
    
    // Функция для изменения тени
    const pulse = () => {
        element.style.boxShadow = `0 0 15px ${color}`;
        
        setTimeout(() => {
            element.style.boxShadow = `0 0 5px ${color}`;
        }, 500);
    };
    
    // Запускаем пульсацию
    let intervalId = setInterval(pulse, 1000);
    pulse(); // Запускаем сразу
    
    // Останавливаем эффект через указанное время
    setTimeout(() => {
        clearInterval(intervalId);
        element.style.boxShadow = originalBoxShadow;
        element.style.transition = originalTransition;
    }, duration);
}

/**
 * Создает эффект телепортации для элемента
 * @param {HTMLElement} element - Элемент, к которому применяется эффект
 * @param {Function} callback - Функция, вызываемая после завершения эффекта
 */
function createTeleportEffect(element, callback) {
    if (!element) return;
    
    // Сохраняем оригинальные стили
    const originalOpacity = element.style.opacity;
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;
    
    // Устанавливаем переходы
    element.style.transition = 'all 0.5s ease-in-out';
    
    // Эффект исчезновения
    element.style.opacity = '0';
    element.style.transform = 'scale(0.5)';
    
    // Через 500мс удаляем элемент
    setTimeout(() => {
        // Если указан callback, вызываем его
        if (callback && typeof callback === 'function') {
            callback();
        }
        
        // Восстанавливаем оригинальные стили
        element.style.opacity = originalOpacity;
        element.style.transform = originalTransform;
        element.style.transition = originalTransition;
    }, 500);
}

/**
 * Создает эффект появления текста по буквам
 * @param {HTMLElement} element - Элемент, содержащий текст
 * @param {number} speed - Скорость печати (мс на символ)
 * @param {Function} callback - Функция, вызываемая после завершения эффекта
 */
function createTypingEffect(element, speed = 50, callback) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }, speed);
}

/**
 * Создает эффект случайного глитча элементов на странице
 * @param {number} probability - Вероятность глитча (0-1)
 * @param {number} minDuration - Минимальная длительность эффекта в миллисекундах
 * @param {number} maxDuration - Максимальная длительность эффекта в миллисекундах
 */
function randomSiteGlitch(probability = 0.1, minDuration = 100, maxDuration = 500) {
    // Если вероятность не выпала, ничего не делаем
    if (Math.random() > probability) return;
    
    // Элементы, которые могут глитчить
    const glitchableSelectors = [
        '.logo-title',
        '.book-title',
        '.command-item',
        '.character-card h3',
        '.dialog-box',
        '.npc-name',
        '.section-title',
        '.location-info h3'
    ];
    
    // Выбираем случайный селектор
    const randomSelector = glitchableSelectors[Math.floor(Math.random() * glitchableSelectors.length)];
    const elements = document.querySelectorAll(randomSelector);
    
    // Если элементы найдены, выбираем случайный и применяем эффект
    if (elements.length > 0) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        const duration = Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration;
        
        applyGlitchEffect(randomElement, duration, Math.random() * 5 + 3);
    }
    
    // Планируем следующий глитч
    setTimeout(() => {
        randomSiteGlitch(probability, minDuration, maxDuration);
    }, Math.random() * 10000 + 5000);
}

/**
 * Создает эффект плавного появления элемента
 * @param {HTMLElement} element - Элемент, к которому применяется эффект
 * @param {number} duration - Длительность эффекта в миллисекундах
 * @param {string} direction - Направление появления (top, bottom, left, right)
 */
function createFadeInEffect(element, duration = 500, direction = 'bottom') {
    if (!element) return;
    
    // Сохраняем оригинальные стили
    const originalOpacity = element.style.opacity;
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;
    
    // Начальные значения в зависимости от направления
    let initialTransform = '';
    switch (direction) {
        case 'top':
            initialTransform = 'translateY(-30px)';
            break;
        case 'bottom':
            initialTransform = 'translateY(30px)';
            break;
        case 'left':
            initialTransform = 'translateX(-30px)';
            break;
        case 'right':
            initialTransform = 'translateX(30px)';
            break;
    }
    
    // Устанавливаем начальные стили
    element.style.opacity = '0';
    element.style.transform = initialTransform;
    element.style.transition = `opacity ${duration/1000}s ease, transform ${duration/1000}s ease`;
    
    // Запускаем анимацию (в следующем кадре)
    requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0)';
    });
    
    // После завершения анимации восстанавливаем оригинальные стили
    setTimeout(() => {
        // Сохраняем текущую прозрачность и трансформацию
        const currentOpacity = element.style.opacity;
        const currentTransform = element.style.transform;
        
        // Убираем переходы
        element.style.transition = '';
        
        // Устанавливаем итоговые значения без анимации
        element.style.opacity = currentOpacity;
        element.style.transform = currentTransform;
        
        // Восстанавливаем исходные значения для свойств, которые были до анимации
        if (originalTransition) element.style.transition = originalTransition;
    }, duration);
}

/**
 * Создает эффект уведомления с конфетти
 * @param {string} message - Текст уведомления
 * @param {string} type - Тип уведомления (success, info, warning, error)
 */
function createConfettiNotification(message, type = 'success') {
    // Создаем контейнер уведомления
    const notification = document.createElement('div');
    notification.className = `confetti-notification ${type}`;
    notification.textContent = message;
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Добавляем конфетти
    if (type === 'success') {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            notification.appendChild(confetti);
        }
    }
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Удаляем через некоторое время
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

/**
 * Инициализация эффектов при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
    // Запускаем случайные глитчи с низкой вероятностью
    setTimeout(() => {
        randomSiteGlitch(0.05);
    }, 15000);
});