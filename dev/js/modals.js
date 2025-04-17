/**
 * modals.js - Работа с модальными окнами
 */

// Инициализация модальных окон при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initModalEvents();
});

/**
 * Инициализация обработчиков событий для модальных окон
 */
function initModalEvents() {
    // Справочник
    const handbookButton = document.getElementById('handbook-button');
    if (handbookButton) {
        handbookButton.addEventListener('click', () => {
            showHandbookModal();
        });
    }
    
    // Закрытие модальных окон
    const closeButtons = document.querySelectorAll('.modal-close, .modal-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Закрытие модальных окон при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            });
        }
    });
    
    // Закрытие модальных окон при клике вне их содержимого
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

/**
 * Показать модальное окно справочника
 */
function showHandbookModal() {
    const modal = document.getElementById('handbook-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Анимация прогресс-бара
        animateHandbookProgress();
    }
}

/**
 * Анимация прогресс-бара в модальном окне справочника
 */
function animateHandbookProgress() {
    const progressBar = document.querySelector('#handbook-modal .progress-fill');
    const statusText = document.querySelector('#handbook-modal .status-text');
    
    if (progressBar && statusText) {
        let progress = 24; // Начальное значение
        
        // Имитация медленной загрузки
        const interval = setInterval(() => {
            progress += Math.random() * 2;
            if (progress > 30) {
                clearInterval(interval);
                statusText.textContent = `/status: прогресс загрузки: ${Math.floor(progress)}% (приостановлено)`;
                return;
            }
            
            progressBar.style.width = `${progress}%`;
            statusText.textContent = `/status: прогресс загрузки: ${Math.floor(progress)}%`;
        }, 500);
    }
}

/**
 * Показать секретное модальное окно
 */
function showSecretModal() {
    const modal = document.getElementById('secret-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Имитация загрузки секретного режима
        const loadingText = modal.querySelector('.loading-text');
        const systemText = modal.querySelector('.system-text');
        const glitchText = modal.querySelector('.glitch-text');
        
        if (loadingText && systemText && glitchText) {
            loadingText.style.opacity = '1';
            systemText.style.opacity = '0';
            glitchText.style.opacity = '0';
            
            setTimeout(() => {
                loadingText.style.opacity = '0';
                setTimeout(() => {
                    systemText.style.opacity = '1';
                    setTimeout(() => {
                        glitchText.style.opacity = '1';
                    }, 1000);
                }, 500);
            }, 2000);
        }
    }
}

/**
 * Показать кастомное модальное окно
 * @param {string} title - Заголовок модального окна
 * @param {string} content - HTML-содержимое модального окна
 * @param {Function} onClose - Функция, выполняемая при закрытии окна
 */
function showCustomModal(title, content, onClose = null) {
    // Проверяем, существует ли уже кастомное модальное окно
    let modal = document.getElementById('custom-modal');
    
    // Если нет, создаем его
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'custom-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-header">
                    <h2></h2>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="modal-button">Закрыть</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Добавляем обработчики событий для закрытия
        const closeButton = modal.querySelector('.modal-close');
        const actionButton = modal.querySelector('.modal-button');
        
        const closeModal = () => {
            modal.style.display = 'none';
            if (onClose && typeof onClose === 'function') {
                onClose();
            }
        };
        
        closeButton.addEventListener('click', closeModal);
        actionButton.addEventListener('click', closeModal);
        
        // Закрытие при клике вне содержимого
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Обновляем содержимое
    const modalTitle = modal.querySelector('.modal-header h2');
    const modalBody = modal.querySelector('.modal-body');
    
    if (modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
    }
    
    // Показываем модальное окно
    modal.style.display = 'flex';
    
    return modal;
}

/**
 * Показать подтверждающее модальное окно
 * @param {string} title - Заголовок модального окна
 * @param {string} message - Сообщение для пользователя
 * @param {Function} onConfirm - Функция, выполняемая при подтверждении
 * @param {Function} onCancel - Функция, выполняемая при отмене
 */
function showConfirmModal(title, message, onConfirm, onCancel = null) {
    // Создаем содержимое модального окна
    const content = `
        <div class="confirm-container">
            <p>${message}</p>
            <div class="confirm-buttons">
                <button class="modal-button confirm-yes">Да</button>
                <button class="modal-button confirm-no">Нет</button>
            </div>
        </div>
    `;
    
    // Показываем модальное окно
    const modal = showCustomModal(title, content);
    
    // Заменяем стандартную кнопку закрытия
    const footer = modal.querySelector('.modal-footer');
    if (footer) {
        footer.style.display = 'none';
    }
    
    // Добавляем обработчики для кнопок подтверждения
    const confirmButton = modal.querySelector('.confirm-yes');
    const cancelButton = modal.querySelector('.confirm-no');
    
    if (confirmButton && cancelButton) {
        confirmButton.addEventListener('click', () => {
            modal.style.display = 'none';
            if (onConfirm && typeof onConfirm === 'function') {
                onConfirm();
            }
        });
        
        cancelButton.addEventListener('click', () => {
            modal.style.display = 'none';
            if (onCancel && typeof onCancel === 'function') {
                onCancel();
            }
        });
    }
    
    return modal;
}

/**
 * Показать модальное окно с формой ввода
 * @param {string} title - Заголовок модального окна
 * @param {string} message - Сообщение для пользователя
 * @param {string} inputPlaceholder - Подсказка для поля ввода
 * @param {Function} onSubmit - Функция, выполняемая при отправке формы
 */
function showInputModal(title, message, inputPlaceholder, onSubmit) {
    // Создаем содержимое модального окна
    const content = `
        <div class="input-container">
            <p>${message}</p>
            <input type="text" class="modal-input" placeholder="${inputPlaceholder}" />
            <div class="input-buttons">
                <button class="modal-button input-submit">Отправить</button>
                <button class="modal-button input-cancel">Отмена</button>
            </div>
        </div>
    `;
    
    // Показываем модальное окно
    const modal = showCustomModal(title, content);
    
    // Скрываем стандартную кнопку закрытия
    const footer = modal.querySelector('.modal-footer');
    if (footer) {
        footer.style.display = 'none';
    }
    
    // Добавляем обработчики для кнопок и поля ввода
    const inputField = modal.querySelector('.modal-input');
    const submitButton = modal.querySelector('.input-submit');
    const cancelButton = modal.querySelector('.input-cancel');
    
    if (inputField && submitButton && cancelButton) {
        // Фокус на поле ввода
        setTimeout(() => {
            inputField.focus();
        }, 100);
        
        // Отправка формы
        const submitForm = () => {
            const value = inputField.value.trim();
            modal.style.display = 'none';
            if (onSubmit && typeof onSubmit === 'function') {
                onSubmit(value);
            }
        };
        
        // Обработчик для клавиши Enter
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                submitForm();
            }
        });
        
        // Обработчики для кнопок
        submitButton.addEventListener('click', submitForm);
        
        cancelButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    return modal;
}