function solve() {
    let createTitleElement = document.getElementById('createTitle');
    let title = createTitleElement.value;
    let createContentElement = document.getElementById('createContent');
    let content = createContentElement.value;

    if (title !== '' && content !== '') {
        let titleElement = document.createElement('h3');
        titleElement.textContent = title;
        let contentElement = document.createElement('p');
        contentElement.textContent = content;

        let articleElement = document.createElement('article');
        articleElement.appendChild(titleElement);
        articleElement.appendChild(contentElement);

        let articlesElement = document.getElementById('articles');
        articlesElement.appendChild(articleElement);

        createTitleElement.value = '';
        createContentElement.value = '';
    }
}