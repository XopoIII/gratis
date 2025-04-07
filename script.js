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

const echoLine = document.getElementById("echo-line");
const errorMessage = document.getElementById("error-message");
const historyLog = document.getElementById("history-log");
const backNav = document.getElementById("back-nav");

let state = 0;
let initialSequenceComplete = false;
let username = "integrant";
let activeTimers = [];
let isLoadingSequence = false;

const ERROR_TYPES = {
    CRITICAL: '#ff0055',
    WARNING: '#ffaa00',
    INFO: '#44aaff'
};

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

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function safeSetTimeout(callback, delay) {
    const timerId = setTimeout(() => {
        const index = activeTimers.indexOf(timerId);
        if (index > -1) {
            activeTimers.splice(index, 1);
        }
        callback();
    }, delay);
    
    activeTimers.push(timerId);
    return timerId;
}

function clearAllTimers() {
    activeTimers.forEach(timerId => clearTimeout(timerId));
    activeTimers = [];
}

function skipLoadingSequence(reason = 'click') {
    if (isLoadingSequence) {
        // Сначала отключаем флаг загрузки, чтобы предотвратить повторные вызовы
        isLoadingSequence = false;
        
        // Затем очищаем таймеры и выполняем остальные действия
        clearAllTimers();
        echoLine.style.opacity = 1;
        initialSequenceComplete = true;
        listMenu();
        
        // Логируем причину пропуска загрузки
        if (reason === 'escape') {
            addToHistory('> загрузка пропущена по клавише Escape');
        } else {
            addToHistory('> загрузка пропущена по клику');
        }
    }
}

function typeMessage(text, callback, speed = 80) {
    clearAllTimers();
    
    echoLine.style.opacity = 1;
    echoLine.textContent = "";
    let index = 0;
    
    function typeChar() {
        if (index < text.length) {
            echoLine.textContent += text.charAt(index);
            index++;
            const randomSpeed = speed + Math.floor(Math.random() * 40 - 20);
            safeSetTimeout(typeChar, randomSpeed);
        } else if (callback) {
            safeSetTimeout(callback, 500);
        }
    }
    
    typeChar();
}

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

function openBookLink(bookName) {
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

function listSocials() {
    backNav.style.opacity = 1;
    
    let output = "<div style='margin-bottom: 10px'><strong># Соцсети:</strong></div>";
    output += "<div class='social-item' onclick='showSocialError(\"ВКонтакте\")'>- ВКонтакте</div>";
    output += "<div class='social-item' onclick='showSocialError(\"Telegram\")'>- Telegram</div>";
    
    echoLine.innerHTML = output;
    state = 12;
    
    addToHistory('> открыт раздел: Соцсети');
}

function listMenu() {
    let menuHTML = "[ Выберите раздел ]<br>";
    menuHTML += "<div class='menu-item' onclick='listBooks()'>↳ [ 1 ] Книги</div>";
    menuHTML += "<div class='menu-item' onclick='listSocials()'>↳ [ 2 ] Соцсети</div>";
    
    echoLine.innerHTML = menuHTML;
    state = 10;
    
    if (initialSequenceComplete) {
        addToHistory('> отображено главное меню');
    }
}

function showSocialError(socialName) {
    errorMessage.textContent = `❌ Ошибка перехода`;
    errorMessage.style.color = ERROR_TYPES.WARNING;
    errorMessage.style.opacity = 1;
    
    addToHistory(`> попытка перехода: ${socialName} ❌ ошибка: сервис недоступен`, 'warning');
    
    safeSetTimeout(() => {
        errorMessage.style.opacity = 0;
        safeSetTimeout(() => {
            errorMessage.textContent = "";
        }, 300);
    }, 2000);
}

function handleBack() {
    if (state === 11 || state === 12) {
        backNav.style.opacity = 0;
        addToHistory('> возврат к главному меню');
        listMenu();
    }
}

function listBooks() {
    backNav.style.opacity = 1;
    
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
    
    addToHistory('> открыт раздел: Книги');
}

function startLoadingSequence() {
    isLoadingSequence = true;
    initialSequenceComplete = true;
    
    typeMessage(">> signal accepted.", () => {
        typeMessage(">> initializing interface...", () => {
            safeSetTimeout(() => {
                typeMessage(">> идентификация: посетитель", () => {
                    safeSetTimeout(() => {
                        typeMessage(`:: инициализация завершена — добро пожаловать, ${username}`, () => {
                            safeSetTimeout(() => {
                                isLoadingSequence = false;
                                listMenu();
                                addToHistory('> сессия началась');
                            }, 500);
                        });
                    }, 800);
                });
            }, 1200);
        });
    });
}

function initPage() {
    safeSetTimeout(() => {
        echoLine.style.opacity = 1;
        echoLine.textContent = ":: awaiting signal...";
    }, 1000);
    
    document.body.addEventListener("click", () => {
        if (state === 0 && !initialSequenceComplete) {
            startLoadingSequence();
        } else if (isLoadingSequence) {
            skipLoadingSequence('click');
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && (state === 11 || state === 12)) {
            handleBack();
        }
        
        if (state === 10) {
            if (event.key === '1') {
                listBooks();
            } else if (event.key === '2') {
                listSocials();
            }
        }
        
        if (event.key === 'Backspace' && (state === 11 || state === 12)) {
            handleBack();
            event.preventDefault();
        }
        
        if (isLoadingSequence && event.key === 'Escape') {
            skipLoadingSequence('escape');
            event.preventDefault();
        }
    });
    
    window.addEventListener('beforeunload', () => {
        clearAllTimers();
    });
}

window.listBooks = listBooks;
window.listSocials = listSocials;
window.handleBack = handleBack;
window.openBookLink = openBookLink;
window.showSocialError = showSocialError;

document.addEventListener('DOMContentLoaded', initPage);

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initPage();
}
