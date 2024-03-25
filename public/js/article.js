// Function to fetch articles from Wikipedia API
function fetchArticles(searchTerm) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.query.search)
        .catch(error => {
            console.error('Error fetching articles:', error);
            return [];
        });
}

// Function to display search results
function displayArticles(articles) {
    const articlesList = document.getElementById('articles-list');
    articlesList.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.snippet}</p>
        `;
        // Add event listener to open article when clicked
        articleElement.addEventListener('click', () => {
            displayArticleContent(article.title);
            hideOtherArticles(articleElement);
        });
        articlesList.appendChild(articleElement);
    });
}

// Function to display article content
function displayArticleContent(articleTitle) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(articleTitle)}&origin=*`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pageId = Object.keys(data.query.pages)[0];
            const content = data.query.pages[pageId].extract;
            document.getElementById('article-content').innerHTML = `
                <h2>${articleTitle}</h2>
                <p>${content}</p>
            `;
            document.getElementById('article-content').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching article content:', error);
            displayErrorMessage('Error fetching article content. Please try again.');
        });
}

// Function to hide other articles when a particular article is selected
function hideOtherArticles(selectedArticle) {
    const articles = document.getElementsByClassName('article');
    Array.from(articles).forEach(article => {
        if (article !== selectedArticle) {
            article.style.display = 'none';
        }
    });
}

// Function to display error message
function displayErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

// Function to perform search
function searchArticles() {
    const searchTerm = document.getElementById('search-input').value;
    fetchArticles(searchTerm)
        .then(articles => {
            if (articles.length > 0) {
                displayArticles(articles);
                document.getElementById('error-message').style.display = 'none';
            } else {
                displayErrorMessage('No health-related articles found. Please try another search term.');
                document.getElementById('article-content').style.display = 'none';
            }
        });
}