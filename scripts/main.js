const items_buttons = document.querySelectorAll('.category .category-item');
const wrapper_div = document.querySelector('.wrapper');
const currentItem = {};
const items = {
    wardrobe: {
        color: ['red', 'yellow', 'purple', 'cyan', 'tomato', 'black', 'pink', 'maroon'],
        dimension: ['AxB', 'BxC']
    }
}
const options_html = {};
let currentType;

function createNewItem() {
    currentType = this.dataset.item;
    const properties = [...Object.keys(items[currentType])];
    currentItem.type = currentType;
    currentItem.properties = properties;
    wrapper_div.innerHTML += choicesContainer_html;
    const goBack = document.querySelector('.progress-info .go-back');
    const goNext = document.querySelector('.progress-info .go-next');
    goBack.addEventListener('click', changeChoices);
    goNext.addEventListener('click', changeChoices);
    nextChoice(0, currentType);

}

function updateChoiceStep(currentIndex) {
    const progress_span = document.querySelector('span.progress-text');
    const currentItem = currentIndex + 1;
    const length = Object.keys(items[currentType]).length;
    progress_span.innerHTML = `${currentItem} of ${length}`;
    choiceArrowState(currentItem, length);
}

function setNewProperty(property, value) {
    currentItem[property] = value;
}

function choiceArrowState(item, length) {
    const goBack = document.querySelector('.progress-info .go-back');
    const goNext = document.querySelector('.progress-info .go-next');

    item <= 1 ? goBack.classList.add('disabled') : goBack.classList.remove('disabled');
    item >= length || Object.keys(options_html).length < length ?
        goNext.classList.add('disabled') :
        goNext.classList.remove('disabled');
}

function nextChoice(index, element) {
    //get the index for the next property
    const property = [...Object.keys(items[currentType])][index];
    //set the previous property with value to the current item
    if (index > 0) {
        const property = Object.keys(items[currentType])[index - 1];
        const value = element.dataset.value;
        setNewProperty(property, value);
    }
    // check if all the properties are chosen and if so, call function to output the result
    if (!property) {
        finishChoosing();
        return;
    }
    const propertyContainer = document.querySelector('.property-container');
    propertyContainer.innerHTML = '';
    addNewChoice(property, propertyContainer);
    updateChoiceStep(index);
}
function changeChoices() {
    if (this.classList.value.includes('disabled')) return;
    const mainContainer = document.querySelector('.main-container');
    const currentIndex = Number(document.querySelector('.progress-info .progress-text').innerHTML.split(" of ")[0]);
    const direction = this.classList[0].substring(3);
    console.log(currentItem);
    direction === 'back' ?
        mainContainer.innerHTML = options_html[currentIndex - 2] :
        mainContainer.innerHTML = options_html[currentIndex];
    console.log(currentItem);
    updateChoiceStep(direction === 'back' ? currentIndex - 2 : currentIndex);

}

function finishChoosing() {

}

items_buttons.forEach(button => button.addEventListener('click', createNewItem));
