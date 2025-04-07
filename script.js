const bookLinks = {
    "Δ.E.F.I.R. Фаза 1: Замедление": "https://author.today/work/436551",
    "Шай'ри": "https://author.today/work/435263",
    "Dev Build: Версия 0.0.1": "https://author.today/work/435212",
    "С ручкой поневоле": "https://author.today/work/432204",
    "Андо": "https://author.today/work/428774",
    "GG": "https://author.today/work/430273",
    "Ланцелот Лепёшкин и тайны Тьмумерии": "https://author.today/work/433674",
    "Биокибернетический ренессанс": "https://author.today/work/428222",
    "Когда миры забывают моё имя": "https://author.today/work/427592",
    "Пропавшие вчера: Болото": "https://author.today/work/427953",
    "Волшебная мандаринка Вон": "https://author.today/work/423308",
    "Волшебная мандаринка Вон: Приключения в Таиланде": "https://author.today/work/424891",
};


function openBookLink(bookName) {
	console.log(bookName)
    const url = bookLinks[bookName];
    if (url) {
        window.open(url, '_blank');
        addToHistory(`> переход: ${bookName} ✅`);
    } else {
        errorMessage.textContent = `❌ Ссылка не найдена`;
        errorMessage.style.color = ERROR_TYPES.CRITICAL;
        errorMessage.style.opacity = 1;
        addToHistory(`> попытка: ${bookName} ❌ ссылка отсутствует`, 'error');

        safeSetTimeout(() => {
            errorMessage.style.opacity = 0;
            safeSetTimeout(() => errorMessage.textContent = "", 300);
        }, 2000);
    }
}


// Кэширование DOM-элементов для повышения производительности
const echoLine = document.getElementById("echo-line");
const errorMessage = document.getElementById("error-message");
const historyLog = document.getElementById("history-log");

// Состояние приложения
let state = 0;
let initialSequenceComplete = false;
let username = "integrant"; // Имя пользователя для персонализации

// Очистка таймеров при необходимости
let activeTimers = [];

// Типы ошибок и их цвета
const ERROR_TYPES = {
    CRITICAL: '#ff0055',
    WARNING: '#ffaa00',
    INFO: '#44aaff'
};

// Данные
const booksMain = [
    "Δ.E.F.I.R. Фаза 1: Замедление",
    "Шай'ри",
    "Dev Build: Версия 0.0.1",
    "GG",
    "Ланцелот Лепёшкин и тайны Тьмумерии",
    "Биокибернетический ренессанс",
    "Когда миры забывают моё имя"
];

const booksCoauthor = [
    "С ручкой поневоле",
    "Андо",
    "Пропавшие вчера: Болото",
    "Волшебная мандаринка Вон",
    "Волшебная мандаринка Вон: Приключения в Таиланде"
];

/**
 * Функция для безопасного создания HTML-строк
 * Предотвращает XSS-атаки при вставке пользовательских данных
 */
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Управление таймерами для предотвращения утечек памяти
 */
function safeSetTimeout(callback, delay) {
    const timerId = setTimeout(() => {
        // Удаляем таймер из списка активных таймеров
        const index = activeTimers.indexOf(timerId);
        if (index > -1) {
            activeTimers.splice(index, 1);
        }
        // Выполняем колбэк
        callback();
    }, delay);
    
    // Добавляем таймер в список активных таймеров
    activeTimers.push(timerId);
    
    return timerId;
}

/**
 * Очистка всех активных таймеров
 */
function clearAllTimers() {
    activeTimers.forEach(timerId => clearTimeout(timerId));
    activeTimers = [];
}

/**
 * Анимированный вывод текста по символам
 */
function typeMessage(text, callback, speed = 80) {
    // Очищаем предыдущие таймеры, чтобы избежать конфликтов
    clearAllTimers();
    
    echoLine.style.opacity = 1;
    echoLine.textContent = "";
    let index = 0;
    
    function typeChar() {
        if (index < text.length) {
            echoLine.textContent += text.charAt(index);
            index++;
            // Случайная задержка для более естественного эффекта печати
            const randomSpeed = speed + Math.floor(Math.random() * 40 - 20);
            safeSetTimeout(typeChar, randomSpeed);
        } else if (callback) {
            safeSetTimeout(callback, 500);
        }
    }
    
    typeChar();
}

/**
 * Добавляет запись в лог истории
 */
function addToHistory(message, type = 'info') {
    if (!historyLog.style.opacity || historyLog.style.opacity === '0') {
        historyLog.style.opacity = 1;
    }
    
    const timestamp = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const entryColor = type === 'error' ? '#ff5555' : (type === 'warning' ? '#ffaa00' : '#666');
    
    const logEntry = document.createElement('div');
    logEntry.style.color = entryColor;
    logEntry.innerHTML = `[${timestamp}] ${message}`;
    
    historyLog.appendChild(logEntry);
    historyLog.scrollTop = historyLog.scrollHeight;
}



/**
 * Отображение списка соцсетей
 */
function listSocials() {
    // Показываем кнопку назад
    document.getElementById('back-nav').style.opacity = 1;
    
    let output = "<div style='margin-bottom: 10px'><strong># Соцсети:</strong></div>";
    output += "<div class='social-item' onclick='showSocialError(\"ВКонтакте\")'>- ВКонтакте</div>";
    output += "<div class='social-item' onclick='showSocialError(\"Telegram\")'>- Telegram</div>";
    
    echoLine.innerHTML = output;
    state = 12;
    
    // Добавляем запись в лог
    addToHistory('> открыт раздел: Соцсети');
}

/**
 * Отображение главного меню
 */
function listMenu() {
    let menuHTML = "[ Выберите раздел ]<br>";
    menuHTML += "<div class='menu-item' onclick='listBooks()'>↳ [ 1 ] Книги</div>";
    menuHTML += "<div class='menu-item' onclick='listSocials()'>↳ [ 2 ] Соцсети</div>";
    
    echoLine.innerHTML = menuHTML;
    state = 10;
    
    // Добавляем запись в лог только если это не начальная загрузка
    if (initialSequenceComplete) {
        addToHistory('> отображено главное меню');
    }
}

/**
 * Отображение ошибки при попытке перейти в соцсеть
 */
function showSocialError(socialName) {
    // Используем тип ошибки предупреждение (оранжевый)
    errorMessage.textContent = `❌ Ошибка перехода`;
    errorMessage.style.color = ERROR_TYPES.WARNING;
    errorMessage.style.opacity = 1;
    
    // Добавляем запись в лог
    addToHistory(`> попытка перехода: ${socialName} ❌ ошибка: сервис недоступен`, 'warning');
    
    // Скрываем сообщение через 2 секунды
    safeSetTimeout(() => {
        errorMessage.style.opacity = 0;
        safeSetTimeout(() => {
            errorMessage.textContent = "";
        }, 300);
    }, 2000);
}

/**
 * Обработчик кнопки "Назад"
 */
function handleBack() {
    if (state === 11 || state === 12) {
        // Скрываем кнопку назад при возврате в главное меню
        document.getElementById('back-nav').style.opacity = 0;
        
        // Добавляем запись в лог
        addToHistory('> возврат к главному меню');
        
        listMenu();
    }
}

// Пасхалки и другие интерактивные элементы могут быть добавлены здесь

// Определение обработчика клавиатуры
document.addEventListener('keydown', (event) => {
    // Обработка нажатия клавиши Escape для возвращения в главное меню
    if (event.key === 'Escape' && (state === 11 || state === 12)) {
        handleBack();
    }
    
    // Обработка цифровых клавиш для быстрой навигации
    if (state === 10) {
        if (event.key === '1') {
            listBooks();
        } else if (event.key === '2') {
            listSocials();
        }
    }
    
    // Обработка клавиши Backspace как альтернативы кнопке "Назад"
    if (event.key === 'Backspace' && (state === 11 || state === 12)) {
        handleBack();
        event.preventDefault(); // Предотвращаем навигацию браузера назад
    }
});

// Делаем функции доступными глобально для использования в onclick
window.listBooks = listBooks;
window.listSocials = listSocials;
window.handleBack = handleBack;
window.openBookLink = openBookLink;
window.showSocialError = showSocialError;

/**
 * Отображение списка книг
 */
function listBooks() {
    // Показываем кнопку назад
    document.getElementById('back-nav').style.opacity = 1;
    
    let output = "<div style='margin-bottom: 10px'><strong># Книги:</strong></div>";
    
    booksMain.forEach(book => {
        const escapedBook = escapeHtml(book);
        output += `<div class='book-item' onclick='openBookLink("${escapedBook}")'> - ${escapedBook}</div>`;
    });
    
    output += "<div style='margin: 10px 0'><strong># В соавторстве с Антон Хорш:</strong></div>";
    
    booksCoauthor.forEach(book => {
        const escapedBook = escapeHtml(book);
        output += `<div class='book-item' onclick='openBookLink("${escapedBook}")'> - ${escapedBook}</div>`;
    });
    
    echoLine.innerHTML = output;
    state = 11;
    
    // Добавляем запись в лог
    addToHistory('> открыт раздел: Книги');
}

// Инициализация страницы
function initPage() {
    safeSetTimeout(() => {
        echoLine.style.opacity = 1;
        echoLine.textContent = ":: awaiting signal...";
    }, 1000);
    
    // Обработчик клика для начала взаимодействия
    document.body.addEventListener("click", () => {
        if (state === 0 && !initialSequenceComplete) {
            initialSequenceComplete = true;
            
            // Начинаем последовательность инициализации
            typeMessage(">> signal accepted.", () => {
                typeMessage(">> initializing interface...", () => {
                    safeSetTimeout(() => {
                        typeMessage(">> идентификация: посетитель", () => {
                            safeSetTimeout(() => {
                                typeMessage(`:: инициализация завершена — добро пожаловать, ${username}`, () => {
                                    safeSetTimeout(() => {
                                        listMenu();
                                        // Добавляем первую запись в лог
                                        addToHistory('> сессия началась');
                                    }, 500);
                                });
                            }, 800);
                        });
                    }, 1200);
                });
            });
        }
    });
    
    // Очистка при выходе со страницы
    window.addEventListener('beforeunload', () => {
        clearAllTimers();
    });
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initPage);

// Запускаем инициализацию непосредственно, если DOM уже загружен
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initPage();
}
