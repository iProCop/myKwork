// Portfolio data - добавляйте проекты здесь локально
// Для добавления нового проекта скопируйте объект ниже и заполните своими данными
const portfolioData = [
    {
        id: 1,
        name: 'Стомотологическая поликлиника',
        url: 'https://test13.ru/', // Замените на URL вашего готового сайта
        image: 'website.png', // URL изображения (можно загрузить скриншот на imgur.com или другой хостинг)
        description: 'Пример сайта, созданного на WordPress с использованием Elementor. Современный дизайн, адаптивная верстка.',
        tags: ['WordPress', 'Elementor', 'Адаптивный дизайн']
    }
    // Добавьте здесь новые проекты:
    // {
    //     id: 2,
    //     name: 'Название проекта',
    //     url: 'https://yoursite.com',
    //     image: 'https://example.com/screenshot.jpg',
    //     description: 'Описание вашего проекта',
    //     tags: ['WordPress', 'Elementor', 'E-commerce']
    // },
];

// Load portfolio
function loadPortfolio() {
    renderPortfolio();
}

// Render portfolio cards
function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    grid.innerHTML = '';

    if (portfolioData.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">Портфолио пусто. Добавьте первый проект!</p>';
        return;
    }

    portfolioData.forEach(project => {
        const card = createPortfolioCard(project);
        grid.appendChild(card);
    });
}

// Create portfolio card element
function createPortfolioCard(project) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'portfolio-card-image';
    
    if (project.image) {
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.name;
        img.onerror = function() {
            this.style.display = 'none';
            imageContainer.innerHTML = '<div class="portfolio-card-placeholder">🌐</div>';
        };
        imageContainer.appendChild(img);
    } else {
        imageContainer.innerHTML = '<div class="portfolio-card-placeholder">🌐</div>';
    }
    
    const content = document.createElement('div');
    content.className = 'portfolio-card-content';
    
    const title = document.createElement('h3');
    title.className = 'portfolio-card-title';
    title.textContent = project.name;
    
    const description = document.createElement('p');
    description.className = 'portfolio-card-description';
    description.textContent = project.description || 'Описание проекта';
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'portfolio-card-tags';
    
    if (project.tags && project.tags.length > 0) {
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'portfolio-card-tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }
    
    const link = document.createElement('a');
    link.className = 'portfolio-card-link';
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = 'Посмотреть сайт <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
    
    content.appendChild(title);
    content.appendChild(description);
    if (project.tags && project.tags.length > 0) {
        content.appendChild(tagsContainer);
    }
    content.appendChild(link);
    
    card.appendChild(imageContainer);
    card.appendChild(content);
    
    // Add click handler to open link
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            window.open(project.url, '_blank', 'noopener,noreferrer');
        }
    });
    
    return card;
}


// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
});
