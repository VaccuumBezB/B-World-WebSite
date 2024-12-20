document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const modal = document.getElementById('new-topic-modal');
    const btn = document.getElementById('new-topic-btn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('new-topic-form');

    // Загружаем темы из localStorage или используем демо-данные
    loadTopics();

    // Открываем модальное окно
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Закрываем модальное окно
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Закрываем модальное окно при клике вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Обработка отправки формы
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const category = document.getElementById('category-select').value;
        const title = document.getElementById('topic-title').value;
        const content = document.getElementById('topic-content').value;

        addNewTopic(category, title, content);
        
        // Очищаем форму и закрываем модальное окно
        form.reset();
        modal.style.display = 'none';
    }
});

function loadTopics() {
    // Пытаемся загрузить темы из localStorage
    const topics = JSON.parse(localStorage.getItem('forum-topics')) || getDemoTopics();
    
    // Отображаем темы по категориям
    Object.keys(topics).forEach(category => {
        const container = document.getElementById(`${category}-topics`);
        topics[category].forEach(topic => {
            container.appendChild(createTopicElement(topic));
        });
    });
}

function addNewTopic(category, title, content) {
    const topics = JSON.parse(localStorage.getItem('forum-topics')) || getDemoTopics();
    
    const newTopic = {
        title,
        content,
        author: 'Пользователь', // В реальном приложении здесь будет имя авторизованного пользователя
        date: new Date().toLocaleDateString(),
        replies: 0
    };

    topics[category].unshift(newTopic);
    localStorage.setItem('forum-topics', JSON.stringify(topics));

    // Добавляем новую тему в начало соответствующего контейнера
    const container = document.getElementById(`${category}-topics`);
    container.insertBefore(createTopicElement(newTopic), container.firstChild);
}

function createTopicElement(topic) {
    const div = document.createElement('div');
    div.className = 'topic';
    div.innerHTML = `
        <div class="topic-header">
            <a href="#" class="topic-title">${topic.title}</a>
            <span class="topic-meta">
                ${topic.author} • ${topic.date} • Ответов: ${topic.replies}
            </span>
        </div>
        <div class="topic-preview">${topic.content}</div>
    `;
    return div;
}

function getDemoTopics() {
    return {
        'general': [
            {
                title: 'Добро пожаловать в B-World!',
                content: 'Добро пожаловать на форум B-World! Здесь вы можете обсудить игру...',
                author: 'Администратор',
                date: '21.03.2024',
                replies: 5
            }
        ],
        'support': [
            {
                title: 'Часто задаваемые вопросы',
                content: 'Список часто задаваемых вопросов и ответов на них...',
                author: 'Модератор',
                date: '21.03.2024',
                replies: 3
            }
        ],
        'mods': [
            {
                title: 'Руководство по созданию модов',
                content: 'Базовое руководство по созданию модификаций для B-World...',
                author: 'Разработчик',
                date: '21.03.2024',
                replies: 7
            }
        ]
    };
} 