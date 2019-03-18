function solve() {
    let searchButton = document.getElementById('searchBtn');
    let searchFieldElement = document.getElementById('searchField');
    let allTdElements = Array.from(document.querySelectorAll('tbody td'));
    let allTrElements = Array.from(document.querySelectorAll('tbody tr'));

    searchButton.addEventListener('click', (event) => {
        let inputText = searchFieldElement.value;

        allTrElements.forEach(tr => {
            if (tr.className === 'select') {
                tr.classList.remove('select');
            }
        });

        allTdElements.forEach(td => {
            if (td.textContent.includes(inputText)) {
                let parent = td.parentNode;

                parent.className = 'select';
                searchFieldElement.value = '';
            }
        });
    });
}