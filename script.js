const bookLinks = {
    "Навмор": "https://againte.gratis/navmor/",
    "Δ.E.F.I.R. Фаза 1: Замедление": "https://againte.gratis/efir/",
    "∇.E.F.I.R. Фаза 2: Фрактальный Разлом": "https://againte.gratis/efir/∇/",
    "С ручкой поневоле": "https://author.today/work/432204",
    "Пропавшие вчера: Болото": "https://author.today/work/427953",
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
    "Навмор",
    "Δ.E.F.I.R. Фаза 1: Замедление",
    "∇.E.F.I.R. Фаза 2: Фрактальный Разлом"
];

const booksCoauthor = [
    "С ручкой поневоле",
    "Пропавшие вчера: Болото"
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
        isLoadingSequence = false;
        clearAllTimers();
        echoLine.style.opacity = 1;
        initialSequenceComplete = true;
        listMenu();
        
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
        window.open(url, url.startsWith('https://againte.gratis') ? '_self' : '_blank');
        addToHistory(`> 🌐 переход: ${bookName} → ${url}`);
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
    
    let output = "<div class='content-container'><div style='margin-bottom: 10px'><strong># Соцсети:</strong></div>";
    output += "<div class='social-item' data-social='ВКонтакте' role='button' tabindex='0' aria-label='Перейти в ВКонтакте'>- ВКонтакте</div>";
    output += "<div class='social-item' data-social='Telegram' role='button' tabindex='0' aria-label='Перейти в Telegram'>- Telegram</div>";
    output += "</div>";
    
    echoLine.innerHTML = output;
    state = 12;
    
    // Добавляем обработчики событий для социальных сетей
    document.querySelectorAll('.social-item').forEach(item => {
        item.addEventListener('click', function() {
            const socialName = this.getAttribute('data-social');
            showSocialError(socialName);
        });
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const socialName = this.getAttribute('data-social');
                showSocialError(socialName);
            }
        });
    });
    
    addToHistory('> открыт раздел: Соцсети');
}

function listMenu() {
    let menuHTML = "<div class='menu-container'>[ Выберите раздел ]<br><br>";
    menuHTML += "<div class='menu-item' data-action='books' role='button' tabindex='0' aria-label='Перейти к разделу книг'>↳ [ 1 ] Книги&nbsp;&nbsp;</div>";
    menuHTML += "<div class='menu-item' data-action='socials' role='button' tabindex='0' aria-label='Перейти к разделу соцсетей'>↳ [ 2 ] Соцсети</div>";
    menuHTML += "</div>";
    
    echoLine.innerHTML = menuHTML;
    state = 10;
    
    // Добавляем обработчики событий для пунктов меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'books') {
                listBooks();
            } else if (action === 'socials') {
                listSocials();
            }
        });
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const action = this.getAttribute('data-action');
                if (action === 'books') {
                    listBooks();
                } else if (action === 'socials') {
                    listSocials();
                }
            }
        });
    });
    
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
    
    let output = "<div class='content-container'><div style='margin-bottom: 10px'><strong># Книги:</strong></div>";
    
    booksMain.forEach(book => {
        const escapedBook = escapeHtml(book);
        output += `<div class='book-item' data-book='${escapedBook}' role='button' tabindex='0' aria-label='Открыть книгу ${escapedBook}'> - ${escapedBook}</div>`;
    });
    
    output += "<div style='margin: 10px 0'><strong># В соавторстве с Антон Хорш:</strong></div>";
    
    booksCoauthor.forEach(book => {
        const escapedBook = escapeHtml(book);
        output += `<div class='book-item' data-book='${escapedBook}' role='button' tabindex='0' aria-label='Открыть книгу ${escapedBook}'> - ${escapedBook}</div>`;
    });
    
    output += "</div>";
    
    echoLine.innerHTML = output;
    state = 11;
    
    // Добавляем обработчики событий для книг
    document.querySelectorAll('.book-item').forEach(item => {
        item.addEventListener('click', function() {
            const bookName = this.getAttribute('data-book');
            openBookLink(bookName);
        });
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const bookName = this.getAttribute('data-book');
                openBookLink(bookName);
            }
        });
    });
    
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
    
    // Обработчик для кнопки "Назад"
    backNav.addEventListener('click', handleBack);
    
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
