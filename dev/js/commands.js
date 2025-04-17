/**
 * commands.js - Обработка команд и секретные функции
 */

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    enhanceSecretCommands();
});

/**
 * Обработка введенных команд
 * @param {string} command - Введенная пользователем команда
 */
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
            showToast('Доступные команды: /debug, /version, /status, /reset');
            break;
        case 'debug':
        case '/debug':
            document.body.classList.toggle('debug-mode');
            const isDebugOn = document.body.classList.contains('debug-mode');
            localStorage.setItem('debugMode', isDebugOn);
            document.getElementById('debug-mode').setAttribute('aria-pressed', isDebugOn);
            showToast(isDebugOn ? 'Дебаг-режим активирован' : 'Дебаг-режим деактивирован', 'info');
            if (isDebugOn) {
                enhanceDebugMode();
            } else {
                const existingPanel = document.querySelector('.debug-panel');
                if (existingPanel) {
                    existingPanel.remove();
                }
            }
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
            document.querySelector('.status-bars').style.display = 'flex';
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
            // Проверяем, есть ли команда в расширенных секретных командах
            if (typeof window.secretCommands !== 'undefined' && window.secretCommands[command]) {
                window.secretCommands[command].action();
            } else {
                showToast(`Команда "${command}" не распознана`, 'error');
            }
    }
}

/**
 * Расширение системы секретных команд
 */
function enhanceSecretCommands() {
    // Создаем глобальную переменную для секретных команд
    window.secretCommands = {
        'hello.world': {
            action: function() {
                showToast('Hello, Creator! The world is evolving...', 'success');
                
                // Более заметный эффект
                const overlay = document.createElement('div');
                overlay.classList.add('hello-world-effect');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(74, 156, 255, 0.1)';
                overlay.style.zIndex = '500';
                overlay.style.pointerEvents = 'none';
                
                document.body.appendChild(overlay);
                
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                    }, 1000);
                }, 3000);
                
                incrementAnomalies();
            }
        },
        'show.matrix': {
            action: function() {
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
                
                // Удаляем эффект через некоторое время
                setTimeout(() => {
                    matrix.style.opacity = '0';
                    setTimeout(() => {
                        matrix.remove();
                    }, 1000);
                }, 8000);
                
                incrementAnomalies();
            }
        },
        'unlock.all': {
            action: function() {
                const password = prompt('Введите пароль разработчика:');
                if (password === 'coreworld_dev') {
                    showToast('Все секции разблокированы!', 'success');
                    
                    // Разблокировка раздела "изменить"
                    const restrictedItem = document.querySelector('.command-item.restricted');
                    if (restrictedItem) {
                        restrictedItem.classList.remove('restricted');
                        restrictedItem.setAttribute('tabindex', '0');
                        
                        // Важно: добавляем обработчик события для нового пункта меню
                        restrictedItem.addEventListener('click', function() {
                            // Активируем секцию
                            document.querySelectorAll('.content-section').forEach(section => {
                                section.classList.remove('active');
                            });
                            document.getElementById('edit').classList.add('active');
                            
                            // Активируем пункт меню
                            document.querySelectorAll('.command-item').forEach(item => {
                                item.classList.remove('active');
                            });
                            this.classList.add('active');
                        });
                    }
                    
                    // Замена содержимого секции "изменить"
                    const editSection = document.getElementById('edit');
                    if (editSection) {
                        editSection.innerHTML = `
                            <h2 class="section-title">Редактор мира</h2>
                            <div class="editor-container">
                                <div class="editor-sidebar">
                                    <div class="editor-section">
                                        <h3>Объекты</h3>
                                        <div class="editor-items">
                                            <div class="editor-item" draggable="true">Дерево</div>
                                            <div class="editor-item" draggable="true">Камень</div>
                                            <div class="editor-item" draggable="true">Вода</div>
                                        </div>
                                    </div>
                                    <div class="editor-section">
                                        <h3>NPC</h3>
                                        <div class="editor-items">
                                            <div class="editor-item" draggable="true">Крестьянин</div>
                                            <div class="editor-item" draggable="true">Стражник</div>
                                            <div class="editor-item" draggable="true">Торговец</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="editor-canvas">
                                    <div class="canvas-placeholder">
                                        <p>Перетащите объекты на карту мира</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    
                    incrementAnomalies();
                    incrementAnomalies();
                } else {
                    showToast('Неверный пароль!', 'error');
                }
            }
        },
        'i.am.root': {
            action: function() {
                showToast('Привилегированный доступ активирован', 'success');
                
                // Показываем все скрытые дебаг-элементы
                document.querySelectorAll('.debug-text').forEach(el => {
                    el.style.display = 'block';
                    el.style.backgroundColor = 'rgba(255, 74, 110, 0.2)';
                    el.style.border = '1px dashed #ff4a6e';
                    el.style.padding = '5px';
                    el.style.margin = '5px 0';
                });
                
                // Добавляем эффект подсветки для всех системных элементов
                const systemHighlight = document.createElement('style');
                systemHighlight.textContent = `
                    .character-tag, .location-status, .book-status {
                        opacity: 1 !important;
                        transform: none !important;
                        border: 1px solid #ff4a6e !important;
                    }
                `;
                document.head.appendChild(systemHighlight);
                
                incrementAnomalies();
            }
        },
        'cat.pixel': {
            action: function() {
                showToast('Мяу! Пиксель доволен вашим вниманием', 'success');
                // Показываем картинку кота
                const catPopup = document.createElement('div');
                catPopup.className = 'cat-popup';
                catPopup.innerHTML = `
                    <img src="images/pixel.jpg" alt="Пиксель" class="cat-image">
                    <p>Пиксель: "Мяу! Похоже, ты нашел секретную команду. Я чувствую, что могу телепортироваться..."</p>
                    <button class="cat-button">Погладить кота</button>
                `;
                document.body.appendChild(catPopup);
                
                // Обработчик для кнопки
                const catButton = catPopup.querySelector('.cat-button');
                if (catButton) {
                    catButton.addEventListener('click', () => {
                        catPopup.classList.add('teleporting');
                        setTimeout(() => {
                            catPopup.remove();
                        }, 1000);
                        incrementAnomalies();
                    });
                }
            }
        },
        'access.database': {
            action: function() {
                showToast('Подключение к базе данных Coreworld...', 'info');
                
                setTimeout(() => {
                    showToast('Доступ запрещен. Обнаружена аномалия в сигнатуре пользователя.', 'error');
                    
                    // Создаем эффект сбоя
                    document.body.classList.add('glitching');
                    
                    setTimeout(() => {
                        document.body.classList.remove('glitching');
                        showToast('Аномальная сигнатура идентифицирована как [СОЗДАТЕЛЬ]', 'warning');
                        incrementAnomalies();
                    }, 2000);
                }, 3000);
            }
        },
        'developer.mode': {
            action: function() {
                document.body.classList.add('debug-mode');
                localStorage.setItem('debugMode', 'true');
                
                // Показываем специальное сообщение
                showToast('Режим разработчика активирован. Добро пожаловать, Скай!', 'success');
                
                // Добавляем специальные элементы управления
                const devPanel = document.createElement('div');
                devPanel.className = 'dev-panel';
                devPanel.innerHTML = `
                    <h3>Панель разработчика</h3>
                    <div class="dev-tools">
                        <button id="dev-fix-all">Исправить все ошибки</button>
                        <button id="dev-add-content">Добавить контент</button>
                        <button id="dev-teleport">Телепорт в руины</button>
                    </div>
                `;
                
                document.body.appendChild(devPanel);
                
                // Добавляем обработчики для кнопок
                document.getElementById('dev-fix-all').addEventListener('click', () => {
                    showToast('Запуск процесса исправления ошибок...', 'info');
                    incrementAnomalies();
                });
                
                incrementAnomalies();
            }
        }
    };
    
    // Дополнительные команды можно добавить здесь
}