const items = {
    wardrobe: {
        color: ['red', 'yellow', 'purple', 'cyan', 'tomato', 'black', 'pink', 'maroon'],
        dimension: ['AxB', 'BxC'],
        example: ['a', 'b'],
        anotherExample: ['b', 'c'],
    }
};
const currentItem = {};
const wrapper = document.querySelector('.main-wrapper');
let itemNumber = 1;
let activeColumnIndex = 0;
currentItem.name = 'wardrobe';

function addMainOptions() {
    const mainWrapper = document.querySelector('.main-wrapper');
    Object.keys(items[currentItem.name]).forEach((property, index) => addChoiceCols(property, index));
}

function addChoiceCols(property, index) {
    const currentCol = document.createElement('div');
    const tab = newTab();
    tab.dataset.col = index;
    const tabText = newTabText();
    const optionContent = newOptionContent(property, index);
    
    currentCol.classList.add('col');
    currentCol.appendChild(tab);
    tab.appendChild(tabText);
    currentCol.appendChild(tab);
    currentCol.appendChild(optionContent);
    wrapper.appendChild(currentCol);
    if (itemNumber === 1) currentCol.classList.add('opened-col');
    tab.addEventListener('click', clickTab);
    itemNumber++;
}

function newTab() {
    const tab = document.createElement('div');
    tab.classList.add('tab');
    return tab;
}

function newTabText() {
    const text = document.createElement('span');
    text.classList.add('step');
    text.innerHTML = itemNumber;
    return text;
}

function newOptionContent(property, index) {
    const optionContent = document.createElement('div');
    // the dropdown have to been added before the other info input text field but created after it
    const otherInfo = newOtherInfo();
    const dropDown = newDropDown(property, otherInfo);
    optionContent.classList.add('option-content');
    optionContent.appendChild(newInfoText(property, index));
    optionContent.appendChild(dropDown);
    optionContent.appendChild(otherInfo);
    optionContent.appendChild(newSaveButton(index));
    return optionContent;
}

function newInfoText(property, index) {
    const infoText = document.createElement('p');
    const propertyName = Object.keys(items[currentItem.name])[index];
    infoText.innerHTML = `${index + 1}.${propertyName}:`;
    return infoText;
}



function newDropDown(property, otherInfo) {
    const dropDown = document.createElement('select');
    dropDown.classList.add('dropdown');
    
    Object.values(items[currentItem.name][property]).forEach(val => {
        dropDown.options[dropDown.options.length] = new Option(val, val);
    });
    dropDown.options[dropDown.options.length] = new Option('Друго', 'other');
    dropDown.addEventListener('change', () => showAndHideTextField(dropDown, otherInfo));

    return dropDown;
}

function newOtherInfo() {
    const textField = document.createElement('input');
    textField.type = 'text';
    textField.classList.add('other-info', 'd-none');
    return textField;
}

function newSaveButton(index) {
    const saveButton = document.createElement('div');
    saveButton.dataset.col = index + 1;
    saveButton.classList.add('save-button');
    saveButton.innerHTML = '<i class="fas fa-check-circle size"></i>';
    saveButton.addEventListener('click', clickButton);
    return saveButton;
}

addMainOptions();

function clickButton() {
    // get the current option content
    const optionContent = [...wrapper.children[this.dataset.col - 1].children]
                                .find(child => [...child.classList].includes('option-content'));
    const dropDown = [...optionContent.children]
                                .find(child => [...child.classList].includes('dropdown'));
    const moreInfo = [...optionContent.children]
                                .find(child => [...child.classList].includes('other-info'));
    setNewProperty(dropDown, moreInfo);
    clickTab.call(this);
}
function clickTab() {
    const columns = wrapper.children;
    const newColumnIndex = +this.dataset.col;
    columns[activeColumnIndex].classList.remove('opened-col');
    if (newColumnIndex >= Object.keys(items[currentItem.name]).length) return;
    columns[newColumnIndex].classList.add('opened-col');
    activeColumnIndex = newColumnIndex;
}

function setNewProperty(dropDown, input) {
    const property = Object.keys(items[currentItem.name])[activeColumnIndex];
    console.log(dropDown);
    dropDown.value === 'other' ? currentItem[property] = input.value : currentItem[property] = dropDown.value;
    console.log(currentItem);
}

function showAndHideTextField(dropDown, textField) {
    dropDown.value === 'other' ? textField.classList.remove('d-none') : textField.classList.add('d-none');
}