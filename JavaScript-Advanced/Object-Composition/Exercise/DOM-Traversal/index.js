function solve(selector) {
    let htmlElement = [document.querySelector(selector)];
    let counter = 0;

    let maxDeepElement = getMaxDeepElement(htmlElement);

    highlightElements(maxDeepElement, counter);

    function highlightElements(maxDeepElement, count) {
        for (let i = 0; i <= count; i++) {
            maxDeepElement.classList.add('highlight');
            count--;
            return highlightElements(maxDeepElement.parentNode, count);
        }
    }


    function getMaxDeepElement(array) {
        let hasChildren = array.filter(x => x.childElementCount > 0);

        if (hasChildren.length > 0) {
            let childrenArray = [].concat(...hasChildren.map(x => Array.from(x.children)));
            counter++;

            return getMaxDeepElement(childrenArray);
        } else {
            return array[0];
        }
    }
}

