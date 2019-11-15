function addNewChoice(property, propertyContainer) {
    let neededContents = 0;
    const elements = items[currentItemType][property];
    const goBack = document.querySelector('.main-container .go-back');
    const goNext = document.querySelector('.main-container .go-next'); 

    if (property === 'color') {
        addBlocks();
    }
    else if (property === 'dimension') {
        addDropdown();
    }

    function addBlocks() {
        const contents = createContents('blocks', true);
        const [maxBlocksForContent, maxBlocksForRow] = config('blocks');
        let currentContent = contents.shift();
        let currentRow = document.createElement('div');
        let rows = 1;
        currentRow.classList.add('row', 'row1');
        currentContent.children[0].appendChild(currentRow);
        elements.forEach((element, index) => {
            // add new row on every first element
                if (index && index % maxBlocksForRow === 0) {
                // change the content if needed
                    if (index && index % maxBlocksForContent === 0) {
                        currentContent = contents.shift();
                        rows = 1;
                        currentRow = addNewRow(currentContent.children[0], 0);
                    }
                    else {
                        currentRow = addNewRow(currentRow.parentElement, rows);
                        rows++;
                    }
                }
                //create and add color block:
                const elementBlock = document.createElement('div');
                elementBlock.classList.add('block', `${property}-block`);
                elementBlock.style.background = element;
                elementBlock.dataset.value = element;
                elementBlock.dataset.type = 'block';
                currentRow.appendChild(elementBlock);
                const propertyIndex = Object.keys(items[currentItemType]).indexOf('color');
                elementBlock.addEventListener('click', () => nextChoice(propertyIndex + 1, elementBlock));                
        });
    }

    function addDropdown() {
        const currentContent = document.createElement('div');
        const select = document.createElement('select');
        currentContent.classList.add(`${property}-content`);
        propertyContainer.appendChild(currentContent);
        select.classList.add(`${property}-select`);
        currentContent.appendChild(select);
        
        elements.forEach(element => {
            select.options[select.options.length] = new Option(element, element);
        });
    }

    function createContents(elementsType, hasRows) {
        const maxElements = config(elementsType)[0];
        neededContents = Math.ceil(elements.length / maxElements);
        //create and append the contents:
        const contents = [];
        for (let i = 0; i < neededContents; i++) {
                const content = document.createElement('div');
                contents.push(content);
                content.classList.add(`${property}-content`, `${property}-content${i + 1}`);
                propertyContainer.appendChild(content);
                //add rows if required:
                if (hasRows) {
                    const rows = document.createElement('div');
                    rows.classList.add('rows');
                    content.appendChild(rows);
                }
        }
        return contents;
    }

    function addNewRow(whereToAppend, index) {
        const newRow = document.createElement('div');
        newRow.classList.add('row', `row${index + 1}`);
        whereToAppend.appendChild(newRow);
        return newRow;
    } 

    function setupPropertyContainer() {
            if (neededContents > 1) {
                goBack.classList.remove('d-n');
                goNext.classList.remove('d-n');
            }
            propertyContainer.style.gridTemplateColumns = `repeat(${neededContents}, 100%)`;
    }
    setupPropertyContainer();

    const choiceIndex = Object.keys(items[currentItemType]).indexOf(property);
    options_html[choiceIndex] = document.querySelector('.main-container').innerHTML;;
    
}

