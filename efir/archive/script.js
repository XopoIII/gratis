document.addEventListener('DOMContentLoaded', () => {
    // Загрузка данных
    let termLogData = null;
    let filteredTerms = [];
    let activeCategory = 'all';
    let searchQuery = '';
    
    async function loadTermLogData() {
        try {
            const response = await fetch('termlog.json');
            console.log(response);
            termLogData = await response.json();
            
            // Объединяем термины и аномалии в единый массив для отображения
            filteredTerms = [
                ...termLogData.termLog.map(term => ({ ...term, type: 'term' })),
                ...termLogData.realityAnalysis.map(anomaly => ({ ...anomaly, type: 'anomaly' }))
            ];
            
            renderTermList();
            renderTerms();
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            document.getElementById('termsList').innerHTML = 'Ошибка загрузки данных. Пожалуйста, попробуйте позже.';
        }
    }
    
    // Функция для форматирования ID термина
    function formatTermId(id, isAnomaly = false) {
        if (isAnomaly) {
            return id; // Для аномалий оставляем оригинальный ID (например, "Δ-PHANTOM-01")
        } else {
            return `ТЕРМИН_${id.padStart(3, '0')}`; // Для обычных терминов добавляем префикс
        }
    }
    
    // Распознавание ID термина из поискового запроса
    function extractTermIdFromSearch(query) {
        // Проверяем, соответствует ли запрос формату "ТЕРМИН_XXX"
        const termMatch = query.match(/ТЕРМИН_(\d+)/i);
        if (termMatch && termMatch[1]) {
            return termMatch[1]; // Возвращаем только цифровую часть
        }
        return null;
    }
    
    // Рендеринг списка всех терминов
    function renderTermList() {
        const termsList = document.getElementById('termsList');
        termsList.innerHTML = '';
        
        // Проверяем, есть ли в поисковом запросе формат ТЕРМИН_XXX
        const searchedTermId = extractTermIdFromSearch(searchQuery);
        
        // Фильтрация по категории и поисковому запросу
        const displayTerms = filteredTerms.filter(term => {
            // Фильтр по категории
            if (activeCategory !== 'all') {
                if (activeCategory === 'anomaly' && term.type !== 'anomaly') return false;
                if (activeCategory === 'standard' && term.type !== 'term') return false;
            }
            
            // Фильтр по поисковому запросу
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                
                // Если ищем по формату ТЕРМИН_XXX
                if (searchedTermId) {
                    return term.id === searchedTermId;
                }
                
                const nameMatch = term.name && term.name.toLowerCase().includes(query);
                const objectMatch = term.object && term.object.toLowerCase().includes(query);
                const idMatch = term.id.toLowerCase().includes(query);
                const descMatch = term.extraFields && term.extraFields.Описание && 
                                 term.extraFields.Описание.toLowerCase().includes(query);
                const eventMatch = term.extraFields && term.extraFields.Событие && 
                                  term.extraFields.Событие.toLowerCase().includes(query);
                
                return nameMatch || objectMatch || idMatch || descMatch || eventMatch;
            }
            
            return true;
        });
        
        // Создание списка терминов
        if (displayTerms.length === 0) {
            termsList.innerHTML = '<div class="no-terms-message">Соответствующих записей не найдено</div>';
            return;
        }
        
        // Сортировка терминов по ID
        displayTerms.sort((a, b) => a.id.localeCompare(b.id));
        
        displayTerms.forEach(term => {
            const isAnomaly = term.type === 'anomaly';
            const termItem = document.createElement('div');
            termItem.className = `term-list-item ${isAnomaly ? 'anomaly' : ''}`;
            termItem.dataset.id = term.id;
            
            const formattedId = formatTermId(term.id, isAnomaly);
            
            termItem.innerHTML = `
                <span class="term-list-id">${formattedId}</span>
                <span class="term-list-name">${isAnomaly ? term.object : term.name}</span>
            `;
            
            termItem.addEventListener('click', () => {
                // Активировать текущий элемент списка
                document.querySelectorAll('.term-list-item').forEach(item => {
                    item.classList.remove('active');
                });
                termItem.classList.add('active');
                
                // Открыть детали термина
                openTermDetails(term);
            });
            
            termsList.appendChild(termItem);
        });
    }
    
    // Рендеринг карточек терминов
    function renderTerms() {
        const termsContainer = document.getElementById('termsContainer');
        termsContainer.innerHTML = '';
        
        // Проверяем, есть ли в поисковом запросе формат ТЕРМИН_XXX
        const searchedTermId = extractTermIdFromSearch(searchQuery);
        
        // Используем те же фильтры, что и для списка
        const displayTerms = filteredTerms.filter(term => {
            if (activeCategory !== 'all') {
                if (activeCategory === 'anomaly' && term.type !== 'anomaly') return false;
                if (activeCategory === 'standard' && term.type !== 'term') return false;
            }
            
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                
                // Если ищем по формату ТЕРМИН_XXX
                if (searchedTermId) {
                    return term.id === searchedTermId;
                }
                
                const nameMatch = term.name && term.name.toLowerCase().includes(query);
                const objectMatch = term.object && term.object.toLowerCase().includes(query);
                const idMatch = term.id.toLowerCase().includes(query);
                const descMatch = term.extraFields && term.extraFields.Описание && 
                                 term.extraFields.Описание.toLowerCase().includes(query);
                const eventMatch = term.extraFields && term.extraFields.Событие && 
                                  term.extraFields.Событие.toLowerCase().includes(query);
                
                return nameMatch || objectMatch || idMatch || descMatch || eventMatch;
            }
            
            return true;
        });
        
        // Создание карточек терминов
        if (displayTerms.length === 0) {
            termsContainer.innerHTML = `
                <div class="no-terms-message">
                    <p>Соответствующих записей не найдено.</p>
                    <p>Попробуйте изменить параметры поиска.</p>
                </div>
            `;
            return;
        }
        
        displayTerms.forEach(term => {
            const isAnomaly = term.type === 'anomaly';
            const termCard = document.createElement('div');
            termCard.className = `term-card ${isAnomaly ? 'anomaly' : ''}`;
            termCard.dataset.id = term.id;
            
            // Форматируем ID
            const formattedId = formatTermId(term.id, isAnomaly);
            
            // Описание для отображения (первые 100 символов)
            let description = '';
            if (isAnomaly) {
                description = term.extraFields && term.extraFields.Событие 
                    ? term.extraFields.Событие.substring(0, 100) + '...'
                    : 'Нет данных';
            } else {
                description = term.extraFields && term.extraFields.Описание
                    ? term.extraFields.Описание.substring(0, 100) + '...'
                    : 'Нет данных';
            }
            
            termCard.innerHTML = `
                <div class="term-card-header">
                    <div class="term-card-indicator"></div>
                    <h3 class="term-card-title">${isAnomaly ? term.object : term.name}</h3>
                </div>
                <div class="term-card-content">
                    <div class="term-card-id">${formattedId}</div>
                    <p class="term-card-description">${description}</p>
                    <div class="term-card-footer">
                        <span class="term-card-status">${isAnomaly ? term.status : term.category}</span>
                        <span class="term-card-link">Подробнее →</span>
                    </div>
                </div>
            `;
            
            termCard.addEventListener('click', () => {
                // Активировать соответствующий элемент в списке
                document.querySelectorAll('.term-list-item').forEach(item => {
                    item.classList.remove('active');
                });
                const listItem = document.querySelector(`.term-list-item[data-id="${term.id}"]`);
                if (listItem) {
                    listItem.classList.add('active');
                    // Прокрутить к активному элементу в списке
                    listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Открыть детали термина
                openTermDetails(term);
            });
            
            termsContainer.appendChild(termCard);
        });
    }
    
    // Открытие модального окна с деталями термина
    function openTermDetails(term) {
        const modal = document.getElementById('termModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        const isAnomaly = term.type === 'anomaly';
        const formattedId = formatTermId(term.id, isAnomaly);
        
        // Заголовок
        modalTitle.textContent = isAnomaly ? term.object : term.name;
        
        // Формирование контента
        let content = `
            <div class="term-details-header">
                <div class="term-details-id">${formattedId}</div>
                <div class="term-details-status ${isAnomaly ? 'anomaly' : ''}">${isAnomaly ? term.status : term.category}</div>
                ${isAnomaly ? `<div class="term-details-timepoint">${term.timepoint}</div>` : ''}
            </div>
        `;
        
        // Дополнительные поля
        if (term.extraFields) {
            content += '<div class="term-details-fields">';
            
            for (const [key, value] of Object.entries(term.extraFields)) {
                if (value && value.trim()) {
                    content += `
                        <div class="term-details-field">
                            <div class="term-field-name">${key}</div>
                            <div class="term-field-value">${value}</div>
                        </div>
                    `;
                }
            }
            
            content += '</div>';
        }
        
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }
    
    // Закрытие модального окна
    function closeTermDetails() {
        const modal = document.getElementById('termModal');
        modal.classList.remove('active');
    }
    
    // Очистка поискового поля
    function clearSearch() {
        document.getElementById('searchInput').value = '';
        searchQuery = '';
        renderTermList();
        renderTerms();
        
        // Скрываем кнопку очистки
        document.getElementById('clearSearchBtn').style.display = 'none';
    }
    
    // Обработка изменения категории
    function handleCategoryChange(e) {
        const button = e.target;
        if (!button.classList.contains('category-button')) return;
        
        // Обновление активной категории
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        activeCategory = button.dataset.category;
        renderTermList();
        renderTerms();
    }
    
    // Обработка поискового запроса с debounce
    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), timeout);
        };
    }
    
    function handleSearch() {
        searchQuery = document.getElementById('searchInput').value.trim();
        
        // Показываем или скрываем кнопку очистки поиска
        const clearBtn = document.getElementById('clearSearchBtn');
        if (searchQuery) {
            clearBtn.style.display = 'block';
        } else {
            clearBtn.style.display = 'none';
        }
        
        renderTermList();
        renderTerms();
    }
    
    const debouncedSearch = debounce(handleSearch);
    
    // Курсор времени
    function initTimeCursor() {
        const timeCursor = document.getElementById('timeCursor');
        if (!timeCursor) return;
        
        let lastMoveTime = 0;
        const throttleMs = 16; // ~60fps
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMoveTime < throttleMs) return;
            
            lastMoveTime = now;
            timeCursor.style.left = `${e.clientX}px`;
            timeCursor.style.top = `${e.clientY}px`;
            
            if (timeCursor.style.opacity !== '1') {
                timeCursor.style.opacity = '1';
            }
        });
        
        let cursorTimeout;
        document.addEventListener('mousemove', () => {
            if (cursorTimeout) {
                clearTimeout(cursorTimeout);
            }
            
            cursorTimeout = setTimeout(() => {
                timeCursor.style.opacity = '0';
            }, 5000);
        });
        
        // Эффект наведения на интерактивные элементы
        document.addEventListener('mouseenter', e => {
            if (e.target.matches('.term-card, .term-list-item, .category-button, .search-box, .header-link, .term-modal-close, #clearSearchBtn')) {
                timeCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                timeCursor.style.border = '2px solid rgba(74, 168, 255, 0.7)';
                timeCursor.style.boxShadow = '0 0 10px rgba(74, 168, 255, 0.3)';
            }
        }, true);
        
        document.addEventListener('mouseleave', e => {
            if (e.target.matches('.term-card, .term-list-item, .category-button, .search-box, .header-link, .term-modal-close, #clearSearchBtn')) {
                timeCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                timeCursor.style.border = '2px solid rgba(74, 168, 255, 0.3)';
                timeCursor.style.boxShadow = 'none';
            }
        }, true);
    }
    
    // Добавление кнопки очистки поиска
    function addClearSearchButton() {
        const searchContainer = document.querySelector('.search-container');
        
        // Создаем кнопку
        const clearButton = document.createElement('button');
        clearButton.id = 'clearSearchBtn';
        clearButton.className = 'clear-search-btn';
        clearButton.innerHTML = '×';
        clearButton.style.display = 'none'; // Изначально скрыта
        
        // Добавляем в контейнер
        searchContainer.appendChild(clearButton);
        
        // Добавляем обработчик события
        clearButton.addEventListener('click', clearSearch);
    }
    
    // Инициализация всех компонентов
    function init() {
        // Добавляем кнопку очистки поиска
        addClearSearchButton();
        
        // Загружаем данные
        loadTermLogData();
        
        // Инициализируем обработчики событий
        document.querySelector('.categories-container').addEventListener('click', handleCategoryChange);
        document.getElementById('searchInput').addEventListener('input', debouncedSearch);
        document.getElementById('modalClose').addEventListener('click', closeTermDetails);
        
        // Закрытие модального окна при клике вне его области
        document.getElementById('termModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeTermDetails();
            }
        });
        
        // Закрытие по клавише Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('termModal').classList.contains('active')) {
                closeTermDetails();
            }
        });
        
        // Инициализируем курсор времени
        initTimeCursor();
    }
    
    // Запускаем инициализацию
    init();
});