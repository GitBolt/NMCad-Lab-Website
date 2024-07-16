let newsItems = [];

async function loadNewsData() {
    try {
        const response = await fetch('data/news.json');
        const rawNewsItems = await response.json();
        newsItems = rawNewsItems.filter(item => isValidDate(item.date));
        initializeFilters();
        displayNews(newsItems);
    } catch (error) {
        console.error('Error loading news data:', error);
    }
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

function initializeFilters() {
    const years = [...new Set(newsItems.map(item => new Date(item.date).getFullYear()))]
        .sort((a, b) => b - a);
    const yearFilter = document.getElementById('yearFilter');
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

function displayNews(items) {
    const newsListElement = document.getElementById('newsList');
    newsListElement.innerHTML = '';
    items.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.style.animationDelay = `${index * 0.1}s`;
        newsItem.innerHTML = `
            <div class="news-content">
                <h3>${item.title}</h3>
                <p class="publication">Published in ${item.publication}</p>
                <p class="date">${formatDate(item.date)}</p>
            </div>
        `;
        newsListElement.appendChild(newsItem);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function filterNews() {
    const yearFilter = document.getElementById('yearFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;
   
    let filteredItems = newsItems;
   
    if (yearFilter) {
        filteredItems = filteredItems.filter(item => new Date(item.date).getFullYear() == yearFilter);
    }
   
    if (monthFilter) {
        filteredItems = filteredItems.filter(item => new Date(item.date).getMonth() + 1 == monthFilter);
    }
   
    displayNews(filteredItems);
}

document.getElementById('yearFilter').addEventListener('change', filterNews);
document.getElementById('monthFilter').addEventListener('change', filterNews);

// Load news data when the page loads
loadNewsData();