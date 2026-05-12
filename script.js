// Ссылки строятся на основе реальных <a> из статического HTML-fallback (#static-fallback).
// Это даёт SEO/GEO-видимость без JS и позволяет JS переиспользовать те же URL.
const bookLinks = {};
const socialLinks = {};

// Порядок книг в интерактивном меню (совпадает с порядком в HTML-fallback).
const booksMain = [];

const echoLine = document.getElementById("echo-line");
const errorMessage = document.getElementById("error-message");
const historyLog = document.getElementById("history-log");
const backNav = document.getElementById("back-nav");
const staticFallback = document.getElementById("static-fallback");

let state = 0;
let initialSequenceComplete = false;
let username = "integrant";
let activeTimers = [];
let isLoadingSequence = false;
let isNavigating = false;

const ERROR_TYPES = {
    CRITICAL: '#ff0055',
    WARNING: '#ffaa00',
    INFO: '#44aaff'
};

function collectLinksFromFallback() {
    if (!staticFallback) return;

    const bookAnchors = staticFallback.querySelectorAll('a.book-item[data-book]');
    bookAnchors.forEach((a) => {
        const name = a.getAttribute('data-book');
        const href = a.getAttribute('href');
        if (name && href) {
            bookLinks[name] = href;
            if (!booksMain.includes(name)) booksMain.push(name);
        }
    });

    const socialAnchors = staticFallback.querySelectorAll('a.social-item[data-social]');
    socialAnchors.forEach((a) => {
        const name = a.getAttribute('data-social');
        const href = a.getAttribute('href');
        if (name && href) {
            socialLinks[name] = href;
        }
    });
}

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
    const entryColor = type === 'error' ? '#ff5555' : (type === 'warning' ? '#ffaa00' : '#999');

    const logEntry = document.createElement('div');
    logEntry.style.color = entryColor;
    logEntry.textContent = `[${timestamp}] ${message}`;

    historyLog.appendChild(logEntry);
    historyLog.scrollTop = historyLog.scrollHeight;
}

function openBookLink(bookName) {
    if (isNavigating) return;
    isNavigating = true;
    safeSetTimeout(() => { isNavigating = false; }, 300);

    const url = bookLinks[bookName];
    if (url) {
        window.open(url, url.startsWith('https://againte.gratis') ? '_self' : '_blank');
        addToHistory(`> переход: ${bookName} → ${url}`);
    } else {
        errorMessage.textContent = 'Ссылка не найдена';
        errorMessage.style.color = ERROR_TYPES.CRITICAL;
        errorMessage.style.opacity = 1;
        addToHistory(`> попытка: ${bookName} — ссылка отсутствует`, 'error');

        safeSetTimeout(() => {
            errorMessage.style.opacity = 0;
            safeSetTimeout(() => errorMessage.textContent = "", 300);
        }, 2000);
    }
}

function openSocialLink(socialName) {
    if (isNavigating) return;
    isNavigating = true;
    safeSetTimeout(() => { isNavigating = false; }, 300);

    const url = socialLinks[socialName];
    if (url) {
        window.open(url, '_blank');
        addToHistory(`> переход: ${socialName} → ${url}`);
        return;
    }

    errorMessage.textContent = 'Ошибка перехода';
    errorMessage.style.color = ERROR_TYPES.WARNING;
    errorMessage.style.opacity = 1;

    addToHistory(`> попытка перехода: ${socialName} — сервис недоступен`, 'warning');

    safeSetTimeout(() => {
        errorMessage.style.opacity = 0;
        safeSetTimeout(() => {
            errorMessage.textContent = "";
        }, 300);
    }, 2000);
}

function listSocials() {
    backNav.style.opacity = 1;

    // Рендерим через настоящие <a>, чтобы ссылка оставалась ссылкой (кликабельна, открывается в новой вкладке, копируется).
    const container = document.createElement('div');
    container.className = 'content-container';

    const title = document.createElement('div');
    title.style.marginBottom = '10px';
    title.innerHTML = '<strong># Соцсети:</strong>';
    container.appendChild(title);

    Object.keys(socialLinks).forEach((name) => {
        const a = document.createElement('a');
        a.className = 'social-item';
        a.href = socialLinks[name];
        a.setAttribute('data-social', name);
        a.setAttribute('role', 'link');
        a.setAttribute('aria-label', `Перейти в ${name}`);
        a.setAttribute('rel', 'noopener');
        a.setAttribute('target', '_blank');
        a.textContent = `- ${name}`;
        container.appendChild(a);
    });

    echoLine.textContent = '';
    echoLine.appendChild(container);
    echoLine.style.opacity = 1;
    state = 12;

    addToHistory('> открыт раздел: Соцсети');
}

function listMenu() {
    backNav.style.opacity = 0;

    const container = document.createElement('div');
    container.className = 'menu-container';
    container.innerHTML =
        "[ Выберите раздел ]<br><br>" +
        "<div class='menu-item' data-action='books' role='button' tabindex='0' aria-label='Перейти к разделу книг'>↳ [ 1 ] Книги&nbsp;&nbsp;</div>" +
        "<div class='menu-item' data-action='socials' role='button' tabindex='0' aria-label='Перейти к разделу соцсетей'>↳ [ 2 ] Соцсети</div>";

    echoLine.textContent = '';
    echoLine.appendChild(container);
    echoLine.style.opacity = 1;
    state = 10;

    if (initialSequenceComplete) {
        addToHistory('> отображено главное меню');
    }
}

function handleBack() {
    if (state === 11 || state === 12) {
        addToHistory('> возврат к главному меню');
        listMenu();
    }
}

function listBooks() {
    backNav.style.opacity = 1;

    const container = document.createElement('div');
    container.className = 'content-container';

    const title = document.createElement('div');
    title.style.marginBottom = '10px';
    title.innerHTML = '<strong># Книги:</strong>';
    container.appendChild(title);

    booksMain.forEach((book) => {
        const href = bookLinks[book] || '#';
        const a = document.createElement('a');
        a.className = 'book-item';
        a.href = href;
        a.setAttribute('data-book', book);
        a.setAttribute('role', 'link');
        a.setAttribute('aria-label', `Открыть книгу ${book}`);
        a.textContent = ` - ${book}`;
        container.appendChild(a);
    });

    echoLine.textContent = '';
    echoLine.appendChild(container);
    echoLine.style.opacity = 1;
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
    // Сначала собираем ссылки из статического HTML (единственный источник правды).
    collectLinksFromFallback();

    // Плавный старт терминала — без блокирующих операций, ссылки в DOM уже есть и кликабельны.
    safeSetTimeout(() => {
        echoLine.style.opacity = 1;
        echoLine.textContent = ":: awaiting signal...";
    }, 1000);

    // Обработчик для кнопки "Назад"
    backNav.addEventListener('click', handleBack);
    backNav.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBack();
        }
    });

    // Event delegation — единый обработчик для всех интерактивных элементов
    echoLine.addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        if (menuItem) {
            const action = menuItem.getAttribute('data-action');
            if (action === 'books') listBooks();
            else if (action === 'socials') listSocials();
            return;
        }

        const bookItem = e.target.closest('.book-item');
        if (bookItem) {
            // Это реальный <a> с href — пусть браузер обрабатывает переход сам,
            // но мы записываем его в history-log.
            const name = bookItem.getAttribute('data-book');
            if (name) addToHistory(`> переход: ${name} → ${bookItem.getAttribute('href')}`);
            return;
        }

        const socialItem = e.target.closest('.social-item');
        if (socialItem) {
            const name = socialItem.getAttribute('data-social');
            if (name) addToHistory(`> переход: ${name} → ${socialItem.getAttribute('href')}`);
            return;
        }
    });

    echoLine.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;

        const menuItem = e.target.closest('.menu-item');
        if (menuItem) {
            e.preventDefault();
            const action = menuItem.getAttribute('data-action');
            if (action === 'books') listBooks();
            else if (action === 'socials') listSocials();
            return;
        }

        // Для <a.book-item> и <a.social-item> Enter по умолчанию вызывает переход —
        // никаких preventDefault не нужно.
    });

    document.body.addEventListener("click", (e) => {
        // Не перехватывать клики по интерактивным элементам внутри echoLine и по статическому fallback-меню
        if (e.target.closest('#echo-line .menu-item, #echo-line .book-item, #echo-line .social-item, #back-nav, #static-fallback a')) return;

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
window.openSocialLink = openSocialLink;

document.addEventListener('DOMContentLoaded', initPage);

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initPage();
}
