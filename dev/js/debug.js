/**
 * debug.js - Функции для режима отладки
 */

/**
 * Расширенный дебаг-режим с инструментами разработчика
 */
function enhanceDebugMode() {
    // Проверяем, нет ли уже панели
    if (document.querySelector('.debug-panel')) {
        return;
    }
    
    // Добавление панели инструментов разработчика
    const debugPanel = document.createElement('div');
    debugPanel.className = 'debug-panel';
    debugPanel.innerHTML = `
        <div class="debug-panel-header">Инструменты разработчика</div>
        <div class="debug-panel-content">
            <div class="debug-section">
                <div class="debug-title">Информация о состоянии:</div>
                <div class="debug-info">
                    <div>LocalStorage элементов: <span id="debug-localstorage-count">0</span></div>
                    <div>Уровень аномалии: <span id="debug-anomaly-level">4%</span></div>
                    <div>Текущая секция: <span id="debug-current-section">description</span></div>
                    <div>Версия: <span id="debug-version">0.0.1</span></div>
                </div>
            </div>
            <div class="debug-section">
                <div class="debug-title">Быстрые команды:</div>
                <div class="debug-actions">
                    <button data-command="reset" class="debug-button">Сбросить прогресс</button>
                    <button data-command="add-anomaly" class="debug-button">+1 аномалия</button>
                    <button data-command="toggle-all-sections" class="debug-button">Показать все секции</button>
                    <button data-command="dump-logs" class="debug-button">Консоль</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Добавляем панель метрик производительности
    createPerformanceMetrics();
    
    // Обновление информации
    function updateDebugInfo() {
        const lsCount = document.getElementById('debug-localstorage-count');
        const anomalyLevel = document.getElementById('debug-anomaly-level');
        const currentSection = document.getElementById('debug-current-section');
        
        if (lsCount) lsCount.textContent = Object.keys(localStorage).length;
        
        const anomalyValueEl = document.querySelector('.anomaly-value');
        if (anomalyLevel && anomalyValueEl) anomalyLevel.textContent = anomalyValueEl.textContent;
        
        const activeSection = document.querySelector('.content-section.active');
        if (currentSection && activeSection) currentSection.textContent = activeSection.id;
    }
    
    // Обновлять каждую секунду
    setInterval(updateDebugInfo, 1000);
    updateDebugInfo(); // Начальное обновление
    
    // Обработчики для кнопок
    document.querySelectorAll('.debug-button').forEach(button => {
        button.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            
            switch(command) {
                case 'reset':
                    localStorage.clear();
                    localStorage.setItem('devBuildVisited', 'true');
                    localStorage.setItem('anomaliesFound', '0');
                    localStorage.setItem('debugMode', 'true');
                    showToast('Прогресс сброшен! Перезагрузка...', 'warning');
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    break;
                case 'add-anomaly':
                    incrementAnomalies();
                    break;
                case 'toggle-all-sections':
                    document.querySelectorAll('.content-section').forEach(section => {
                        section.style.display = section.style.display === 'block' ? 'none' : 'block';
                    });
                    showToast('Режим просмотра секций изменен', 'info');
                    break;
                case 'dump-logs':
                    showDebugConsole();
                    break;
            }
        });
    });
}

/**
 * Показать консоль отладки
 */
function showDebugConsole() {
    // Проверяем, существует ли консоль
    let debugConsole = document.querySelector('.debug-console');
    
    // Если нет, создаем
    if (!debugConsole) {
        debugConsole = document.createElement('div');
        debugConsole.className = 'debug-console';
        debugConsole.innerHTML = `
            <div class="debug-console-header">
                <div class="debug-console-title">Консоль отладки</div>
                <button class="debug-console-close">&times;</button>
            </div>
            <div class="debug-console-content"></div>
            <div class="debug-console-input">
                <input type="text" placeholder="Введите команду..." />
                <button>Выполнить</button>
            </div>
        `;
        document.body.appendChild(debugConsole);
        
        // Обработчики событий
        const closeButton = debugConsole.querySelector('.debug-console-close');
        const inputField = debugConsole.querySelector('input');
        const executeButton = debugConsole.querySelector('button');
        
        closeButton.addEventListener('click', () => {
            debugConsole.style.display = 'none';
        });
        
        // Выполнение команды
        const executeCommand = () => {
            const command = inputField.value.trim();
            if (command) {
                debugLog(command, 'info');
                interpretDebugCommand(command);
                inputField.value = '';
            }
        };
        
        // Обработчики событий для выполнения команды
        executeButton.addEventListener('click', executeCommand);
        
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCommand();
            }
        });
    }
    
    // Показываем консоль
    debugConsole.style.display = 'flex';
    
    // Добавляем начальные логи
    const contentArea = debugConsole.querySelector('.debug-console-content');
    if (contentArea && contentArea.innerHTML === '') {
        debugLog('Консоль отладки инициализирована', 'system');
        debugLog('Используйте команду "help" для просмотра доступных команд', 'info');
        
        // Дамп информации о системе
        debugLog('==== СИСТЕМНАЯ ИНФОРМАЦИЯ ====', 'system');
        debugLog(`Версия: 0.0.1 (dev build)`, 'info');
        debugLog(`Режим: АВТОНОМНЫЙ`, 'info');
        debugLog(`Уровень аномалии: ${document.querySelector('.anomaly-value').textContent}`, 'info');
        debugLog(`Найдено аномалий: ${localStorage.getItem('anomaliesFound') || '0'}`, 'info');
        debugLog('============================', 'system');
    }
    
    // Фокус на поле ввода
    setTimeout(() => {
        const inputField = debugConsole.querySelector('input');
        if (inputField) {
            inputField.focus();
        }
    }, 100);
}

/**
 * Добавить сообщение в консоль отладки
 * @param {string} message - Сообщение для вывода
 * @param {string} type - Тип сообщения (info, warning, error, system)
 */
function debugLog(message, type = 'info') {
    const debugConsole = document.querySelector('.debug-console-content');
    
    if (debugConsole) {
        const timestamp = new Date().toLocaleTimeString();
        
        const logEntry = document.createElement('div');
        logEntry.className = `debug-log ${type}`;
        logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
        
        debugConsole.appendChild(logEntry);
        
        // Прокрутка вниз
        debugConsole.scrollTop = debugConsole.scrollHeight;
    }
    
    // Также выводим в браузерную консоль
    switch (type) {
        case 'info':
            console.info(`[DEBUG] ${message}`);
            break;
        case 'warning':
            console.warn(`[DEBUG] ${message}`);
            break;
        case 'error':
            console.error(`[DEBUG] ${message}`);
            break;
        default:
            console.log(`[DEBUG] ${message}`);
    }
}

/**
 * Интерпретация и выполнение отладочных команд
 * @param {string} command - Команда для интерпретации
 */
function interpretDebugCommand(command) {
    const cmd = command.toLowerCase();
    
    switch (cmd) {
        case 'help':
            debugLog('Доступные команды:', 'system');
            debugLog('help - Список доступных команд', 'info');
            debugLog('clear - Очистить консоль', 'info');
            debugLog('dump - Вывести содержимое localStorage', 'info');
            debugLog('stats - Показать статистику страницы', 'info');
            debugLog('highlight [on|off] - Подсветка элементов страницы', 'info');
            debugLog('fps [on|off] - Показать счетчик FPS', 'info');
            debugLog('anomaly [add|reset] - Управление аномалиями', 'info');
            break;
        case 'clear':
            const contentArea = document.querySelector('.debug-console-content');
            if (contentArea) {
                contentArea.innerHTML = '';
                debugLog('Консоль очищена', 'system');
            }
            break;
        case 'dump':
            debugLog('==== СОДЕРЖИМОЕ LOCALSTORAGE ====', 'system');
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                debugLog(`${key}: ${value}`, 'info');
            }
            debugLog('===============================', 'system');
            break;
        case 'stats':
            const memory = performance.memory ? 
                `Память: ${Math.round(performance.memory.usedJSHeapSize / 1048576)} MB / ${Math.round(performance.memory.jsHeapSizeLimit / 1048576)} MB` :
                'Память: Недоступно';
            
            debugLog('==== СТАТИСТИКА СТРАНИЦЫ ====', 'system');
            debugLog(`Загружено ресурсов: ${performance.getEntriesByType('resource').length}`, 'info');
            debugLog(`Время загрузки: ${Math.round(performance.now() / 100) / 10} сек`, 'info');
            debugLog(memory, 'info');
            debugLog(`DOM элементов: ${document.getElementsByTagName('*').length}`, 'info');
            debugLog(`Активная секция: ${document.querySelector('.content-section.active').id}`, 'info');
            debugLog('============================', 'system');
            break;
        case 'highlight on':
            document.body.classList.add('highlight-components');
            debugLog('Подсветка компонентов включена', 'success');
            break;
        case 'highlight off':
            document.body.classList.remove('highlight-components');
            debugLog('Подсветка компонентов выключена', 'success');
            break;
        case 'fps on':
            if (!document.querySelector('.performance-metrics')) {
                createPerformanceMetrics();
            }
            document.querySelector('.performance-metrics').style.display = 'block';
            debugLog('Счетчик FPS включен', 'success');
            break;
        case 'fps off':
            const metrics = document.querySelector('.performance-metrics');
            if (metrics) {
                metrics.style.display = 'none';
            }
            debugLog('Счетчик FPS выключен', 'success');
            break;
        case 'anomaly add':
            incrementAnomalies();
            debugLog('Аномалия добавлена', 'success');
            break;
        case 'anomaly reset':
            localStorage.setItem('anomaliesFound', '0');
            updateAnomalyLevel(0);
            debugLog('Счетчик аномалий сброшен', 'success');
            break;
        default:
            if (cmd.startsWith('set ')) {
                // Установка значения localStorage
                const parts = cmd.substring(4).split('=');
                if (parts.length === 2) {
                    const key = parts[0].trim();
                    const value = parts[1].trim();
                    localStorage.setItem(key, value);
                    debugLog(`Установлено ${key}=${value}`, 'success');
                } else {
                    debugLog('Неверный синтаксис. Используйте: set key=value', 'error');
                }
            } else {
                debugLog(`Неизвестная команда: ${command}`, 'error');
            }
    }
}

/**
 * Создает панель метрик производительности
 */
function createPerformanceMetrics() {
    // Проверяем, существует ли уже
    if (document.querySelector('.performance-metrics')) {
        return;
    }
    
    // Создаем панель
    const metricsPanel = document.createElement('div');
    metricsPanel.className = 'performance-metrics';
    document.body.appendChild(metricsPanel);
    
    // Переменные для расчета FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;
    
    // Функция обновления FPS
    function updateFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            frameCount = 0;
            lastTime = currentTime;
            
            // Обновляем информацию
            updateMetrics();
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    // Функция обновления метрик
    function updateMetrics() {
        const memory = performance.memory ? 
            `MEM: ${Math.round(performance.memory.usedJSHeapSize / 1048576)} MB` :
            '';
            
        metricsPanel.textContent = `FPS: ${fps} | ${memory}`;
    }
    
    // Запускаем обновление FPS
    updateFPS();
}

/**
 * Внедрение отладочной информации в элементы DOM
 */
function injectDebugInfo() {
    if (!document.body.classList.contains('debug-mode')) {
        return;
    }
    
    // Добавляем отладочные атрибуты к элементам
    document.querySelectorAll('.content-section').forEach(section => {
        section.setAttribute('data-debug-id', section.id);
    });
    
    document.querySelectorAll('.command-item').forEach(item => {
        item.setAttribute('data-debug-target', item.getAttribute('data-section'));
    });
}

/**
 * Инициализация функций отладки при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация, если активен отладочный режим
    if (document.body.classList.contains('debug-mode')) {
        enhanceDebugMode();
        injectDebugInfo();
    }
});