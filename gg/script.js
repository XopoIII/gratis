// Команды терминала
const terminalCommands = {
    'help': 'Доступные команды: help, glossary, ls, cat, grep, clear, play, exit',
    'ls': 'contract_infernity.pdf  GhostKiller_stats.csv  Wolf_analysis.txt  configs/  demos/',
    'clear': '',
    'cat contract_infernity.pdf': 'ERROR: Невозможно отобразить бинарный файл contract_infernity.pdf',
    'cat GhostKiller_stats.csv': 'Player,Maps,Rating,K/D,HS%\nGhostKiller,450,1.37,1.65,62.1%\nMadMarks,362,1.43,1.78,68.3%',
    'achievements': 'Clutch Master [✓]\nPro Contract [✓]\nChampion [✓]\nIntegrity [✗]\nGOAT [✗]',
    'play': 'Запуск игры...\n\nПодождите, пока другие игроки подключатся к серверу.\n\nGhostKiller присоединился к игре.\nWolf присоединился к игре.\nZywOo присоединился к игре.\n\nИгра начнется через 5...',
    'exit': 'Выход из терминала...',
};

// DOM элементы
const historyLog = document.getElementById('history-log');
const hpValue = document.getElementById('hp-value');
const moneyValue = document.getElementById('money-value');
const fpsValue = document.getElementById('fps-value') || document.createElement('span'); // Для обратной совместимости
const matchChat = document.getElementById('match-chat');
const quoteTooltip = document.getElementById('quote-tooltip');

// Состояние
let hp = 100;
let money = 800;
let fps = 144;
let isChatVisible = false;

// Данные для графика K/D
const kdData = [
    { chapter: 1, kd: 1.8 },
    { chapter: 2, kd: 2.1 },
    { chapter: 3, kd: 1.5 },
    { chapter: 4, kd: 2.7 },
    { chapter: 5, kd: 1.9 },
    { chapter: 6, kd: 3.0 },
    { chapter: 7, kd: 2.4 }
];

// Обновление статистики игрока
function updateStats() {
    // Случайное изменение HP
    const hpChange = Math.floor(Math.random() * 20) - 5;
    hp = Math.max(1, Math.min(100, hp + hpChange));
    hpValue.textContent = hp;
    
    // Случайное изменение денег
    const moneyChange = Math.floor(Math.random() * 300) - 50;
    money = Math.max(0, money + moneyChange);
    moneyValue.textContent = money;
    
    // Случайное изменение FPS
    if (fpsValue.id === 'fps-value') {
        const fpsChange = Math.floor(Math.random() * 20) - 5;
        fps = Math.max(30, Math.min(240, fps + fpsChange));
        fpsValue.textContent = fps;
    }
    
    // Показать цитату при низком HP
    if (hp < 30 && Math.random() < 0.3) {
        showQuote();
    }
    
    setTimeout(updateStats, 5000 + Math.random() * 5000);
}

// Показать цитату
function showQuote() {
    if (!quoteTooltip) return;
    
    quoteTooltip.style.display = 'block';
    setTimeout(() => {
        quoteTooltip.style.opacity = '1';
        
        setTimeout(() => {
            quoteTooltip.style.opacity = '0';
            setTimeout(() => {
                quoteTooltip.style.display = 'none';
            }, 500);
        }, 5000);
    }, 100);
}

// Переключение чата
function toggleChat() {
    if (!matchChat) return;
    
    isChatVisible = !isChatVisible;
    matchChat.style.display = isChatVisible ? 'block' : 'none';
    addToHistory(isChatVisible ? '> чат матча открыт' : '> чат матча скрыт');
    
    // Добавляем новые сообщения в чат с задержкой
    if (isChatVisible) {
        setTimeout(addChatMessage, 3000);
    }
}

// Добавление сообщений в чат
function addChatMessage() {
    if (!matchChat || !isChatVisible) return;
    
    const messages = [
		{ name: 'Wolf', text: 'Rush B dont stop', type: 'other' },
		{ name: 'GhostKiller', text: 'Nice try noobs', type: 'enemy' },
		{ name: 'Stinger', text: 'omg so lucky', type: 'other' },
		{ name: 'MadMarks', text: 'заткнитесь и играйте', type: 'mad' },
		{ name: 'Alt', text: 'one flanking from CT', type: 'other' },
		{ name: 'ZywOo', text: 'ez for me', type: 'enemy' },
		{ name: 'MadMarks', text: '1vs3 no problem', type: 'mad' },
		{ name: 'Stinger', text: 'bro they wallbangin', type: 'other' },
		{ name: 'MadMarks', text: 'это называется "чтение игры", не ной', type: 'mad' },
		{ name: 'Alt', text: 'planting B', type: 'other' },
		{ name: 'Wolf', text: 'flash A', type: 'enemy' },
		{ name: 'MadMarks', text: 'B чисто, ставь' , type: 'mad' },
		{ name: 'GhostKiller', text: 'go save, noobs', type: 'enemy' },
		{ name: 'Stinger', text: 'lmao toxic', type: 'other' },
		{ name: 'MadMarks', text: 'я токсичный, потому что вы овощи', type: 'mad' },
		{ name: 'Alt', text: 'last mid', type: 'other' },
		{ name: 'MadMarks', text: 'ща покажу магию' , type: 'mad' },
		{ name: 'MadMarks', text: '*one tap*', type: 'mad' },
		{ name: 'Stinger', text: 'wtf', type: 'other' },
		{ name: 'GhostKiller', text: 'reported', type: 'enemy' },
		{ name: 'MadMarks', text: 'в очередь, детка', type: 'mad' }
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerHTML = `<span class="chat-name chat-name-${randomMessage.type}">${randomMessage.name}:</span> ${randomMessage.text}`;
    
    matchChat.appendChild(messageElement);
    matchChat.scrollTop = matchChat.scrollHeight;
    
    if (isChatVisible) {
        setTimeout(addChatMessage, 4000 + Math.random() * 6000);
    }
}

// Показать терминал
function showTerminal() {
    document.getElementById('terminal-window').classList.remove('hidden');
    document.getElementById('chapter-sample').classList.add('hidden');
    document.getElementById('terminal-input').focus();
    document.getElementById('chapter-button').innerText = 'Отрывок';
    addToHistory('> открыт терминал');
}

// Закрыть терминал
function closeTerminal() {
    document.getElementById('terminal-window').classList.add('hidden');
    addToHistory('> терминал закрыт');
}

// Показать/скрыть отрывок из книги
function showChapterSample() {
    const chapterSample = document.getElementById('chapter-sample');
    const terminalWindow = document.getElementById('terminal-window');
    const chapterButton = document.getElementById('chapter-button');
    
    if (chapterSample.classList.contains('hidden')) {
        chapterSample.classList.remove('hidden');
        terminalWindow.classList.add('hidden');
        chapterButton.innerText = 'Скрыть';
        addToHistory('> открыт отрывок из книги');
    } else {
        chapterSample.classList.add('hidden');
        chapterButton.innerText = 'Отрывок';
        addToHistory('> скрыт отрывок из книги');
    }
}

// Добавить сообщение в историю
function addToHistory(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const entryColor = type === 'error' ? '#ff5555' : (type === 'warning' ? '#ffaa00' : '#666');
    
    const logEntry = document.createElement('div');
    logEntry.style.color = entryColor;
    logEntry.innerHTML = `[${timestamp}] ${message}`;
    
    historyLog.appendChild(logEntry);
    historyLog.scrollTop = historyLog.scrollHeight;
}

// Обработка введенной команды в терминале
function processCommand(cmd) {
	cmd = cmd.toLowerCase();
	if (cmd === "glossary") {
		window.location.href = "/gg/glossary";
		return;
	}
    const terminalContent = document.getElementById('terminal-content');
    
    // Добавляем введенную команду в терминал
    const commandElement = document.createElement('div');
    commandElement.innerHTML = `<span class="prompt">mad@infernity:~/mad-dogs$</span> <span class="command">${cmd}</span>`;
    terminalContent.appendChild(commandElement);
    
    // Обрабатываем команду
    let result = 'Команда не распознана. Введите "help" для помощи.';
    
    // Проверяем точные совпадения
    if (terminalCommands[cmd] !== undefined) {
        result = terminalCommands[cmd];
    } 
    // Проверяем команды с параметрами
    else if (cmd.startsWith('cat ')) {
        const file = cmd.substring(4).trim();
        if (terminalCommands[`cat ${file}`]) {
            result = terminalCommands[`cat ${file}`];
        } else {
            result = `Файл '${file}' не найден.`;
        }
    }
    else if (cmd.startsWith('ls ')) {
        result = terminalCommands['ls'];
    }
    else if (cmd.startsWith('grep ')) {
        if (cmd.includes('contract_infernity.pdf')) {
            result = 'Binary file contract_infernity.pdf matches';
        } else {
            result = 'No matches found';
        }
    }
    
    // Очистка консоли
    if (cmd === 'clear') {
        terminalContent.innerHTML = '';
        result = null; // Не отображаем результат после очистки
    }
    
    // Добавляем результат выполнения команды
    if (result !== null) {
        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.innerHTML = result;
        terminalContent.appendChild(resultElement);
    }
    
    // Добавляем новую строку с приглашением к вводу
    const newPromptElement = document.createElement('div');
    newPromptElement.innerHTML = `<span class="prompt">mad@infernity:~/mad-dogs$</span> <span class="command typing"><span class="terminal-cursor">▋</span></span>`;
    terminalContent.appendChild(newPromptElement);
    
    // Прокручиваем терминал вниз
    terminalContent.scrollTop = terminalContent.scrollHeight;
    
    // Добавляем в историю
    addToHistory(`> терминал: выполнена команда "${cmd}"`);
    
    // Особая обработка для команды play
    if (cmd === 'play') {
        simulateGameStart();
    }
    
    // Особая обработка для команды exit
    if (cmd === 'exit') {
        setTimeout(() => {
            closeTerminal();
        }, 1000);
    }
}

// Симуляция запуска игры
function simulateGameStart() {
    let count = 5;
    const terminalContent = document.getElementById('terminal-content');
    const lastResult = terminalContent.lastElementChild.previousElementSibling;
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            lastResult.innerHTML = lastResult.innerHTML.replace(`${count+1}...`, `${count}...`);
        } else {
            clearInterval(countdownInterval);
            lastResult.innerHTML += `\n\nИгра началась!\nКарта: de_dust2\n\nMadMarks: "Пацаны, давайте B через шорт. Я пойду первым. Стингер за мной."`;
            
            // Добавляем эффект получения урона
            setTimeout(() => {
                hp -= 35;
                hpValue.textContent = hp;
                lastResult.innerHTML += `\n\n[Вы получили урон: -35HP]`;
                lastResult.innerHTML += `\nGhostKiller: "Первый на B-шорт!"`;
                
                setTimeout(() => {
                    lastResult.innerHTML += `\n\nMadMarks убил GhostKiller [HS]`;
                    lastResult.innerHTML += `\n+$300`;
                    money += 300;
                    moneyValue.textContent = money;
                    
                    setTimeout(() => {
                        lastResult.innerHTML += `\n\nMadMarks: "Минус один на B. Ставим бомбу!"`;
                    }, 1500);
                }, 2000);
            }, 2000);
        }
    }, 1000);
}

// Случайные сообщения в историю для атмосферы
const randomMessages = [
    'Клатч из полуфинала MadMarks vs. GhostKiller набрал 2 млн просмотров',
    'NightWolves анонсировали новый состав без GhostKiller',
    'Infernity распались после ухода ключевых игроков',
    'Команда Mad Dogs вошла в топ-5 мирового рейтинга',
    'Антон Хорш: "GG - правдивая история о том, как устроен киберспорт изнутри"',
    'Wolf публично извинился за использование нечестных методов',
    'Международная федерация киберспорта ужесточила проверки на турнирах'
];

// Добавление случайных сообщений
function addRandomMessage() {
    const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    addToHistory(`# ${message}`);
    setTimeout(addRandomMessage, 30000 + Math.random() * 60000);
}

// Код Konami и обработка пасхалок
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    // Проверяем комбинацию клавиш (Konami code)
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Активируем пасхалку
            const unlockedAchievement = document.querySelectorAll('.achievement.locked')[0];
            if (unlockedAchievement) {
                unlockedAchievement.classList.remove('locked');
                addToHistory('> достижение разблокировано: Integrity', 'warning');
            }
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
    
    // Секретная комбинация для GOAT достижения
    if (e.ctrlKey && e.altKey && e.key === 'g') {
        const goatAchievement = document.querySelectorAll('.achievement.locked');
        goatAchievement.forEach(achievement => {
            achievement.classList.remove('locked');
        });
        addToHistory('> все достижения разблокированы', 'warning');
    }
});

// Обработчик ввода в терминале
document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const cmd = this.value.trim();
                if (cmd) {
                    processCommand(cmd);
                    this.value = '';
                }
            }
        });
    }
});

// Пасхалка с никами из книги
const teamNames = [
    ['MadDogs', 'NightWolves'],
    ['Infernity', 'Vitality'],
    ['NaVi', 'GhostKiller'],
    ['MadFury', 'CastDown'],
    ['Heroic', 'Phoenix']
];

// Изменение названий команд
function changeTeamNames() {
    const team1 = document.getElementById('team1');
    const team2 = document.getElementById('team2');
    const score = document.getElementById('score');
    
    if (!team1 || !team2 || !score) return;
    
    const randomTeam = teamNames[Math.floor(Math.random() * teamNames.length)];
    team1.textContent = randomTeam[0];
    team2.textContent = randomTeam[1];
    
    const randomScore1 = Math.floor(Math.random() * 17);
    const randomScore2 = Math.floor(Math.random() * 17);
    score.textContent = `${randomScore1}:${randomScore2}`;
    
    setTimeout(changeTeamNames, 20000 + Math.random() * 30000);
}

// Инициализация страницы
function initPage() {
    // Эффект случайных повреждений и изменения денег
    updateStats();
    
    // Инициализация историй
    addToHistory('> страница загружена');
    
    // Запуск случайных сообщений
    setTimeout(addRandomMessage, 10000);
    
    // Запуск изменения названий команд
    setTimeout(changeTeamNames, 15000);
    
    // Привязываем функции к глобальному объекту window для доступа из HTML
    window.showTerminal = showTerminal;
    window.closeTerminal = closeTerminal;
    window.showChapterSample = showChapterSample;
    window.toggleChat = toggleChat;
}

// Запуск инициализации при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
