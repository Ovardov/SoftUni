function getArticleGenerator(articles) {

    return function () {
        if (articles.length > 0) {
            let pElement = document.createElement('p');
            pElement.textContent = articles.shift();

            let articleElement = document.createElement('article');
            articleElement.appendChild(pElement);

            document.getElementById('content').appendChild(articleElement);
        }
    }
}

