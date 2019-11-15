const items = {
    wardrobe: {
        color: ['red', 'yellow', 'purple', 'cyan', 'tomato', 'black', 'pink', 'maroon'],
        dimension: ['AxB', 'BxC']
    }
};
const currentItem = {};
const wrapper = document.querySelector('.wrapper');
let itemNumber = 1;
currentItem.name = 'wardrobe';
Object.keys(items[currentItem.name]).forEach(property => addSection(property));

function addSection(prop) {
    const section = document.createElement('section');
    const progress = document.createElement('div');
    const options = document.createElement('div');
    const text = document.createElement('p');
    text.classList.add('choice-text');
    const dropDown = document.createElement('select');
    const nextButton = document.createElement('button');
    const userText = document.createElement('input');
    userText.classList.add('d-none');
    dropDown.addEventListener('change', () => showAndHideTextField(dropDown, userText));
    nextButton.addEventListener('click', () => nextChoice(prop, dropDown.value, userText));
    nextButton.innerHTML = 'Next';
    text.innerHTML = `${itemNumber < 10 ? `0${itemNumber}` : itemNumber}. ${prop}`;
    Object.values(items[currentItem.name][prop]).forEach(val => {
        dropDown.options[dropDown.options.length] = new Option(val, val);
    });
    dropDown.options[dropDown.options.length] = new Option('Друго', 'other');
    options.appendChild(text);
    options.appendChild(dropDown);
    options.appendChild(userText);
    options.appendChild(nextButton);
    section.appendChild(progress);
    section.appendChild(options);
    wrapper.appendChild(section);
    itemNumber++;
}

function addLastSection() {
    const section = document.createElement('section');
    const label = document.createElement('label');
    const userText = document.createElement('textarea');
    const sendButton = document.createElement('button');
    sendButton.innerHTML = 'Завърши';
    label.innerHTML = 'Допълнителна информация (не е задължително):';
    
    section.appendChild(label);
    section.appendChild(userText);
    section.appendChild(sendButton);
    wrapper.appendChild(section);
}

addLastSection();

function nextChoice(prop, value, userText) {
    value === "other" ? currentItem[prop] = userText.value : currentItem[prop] = value;
}

function showAndHideTextField(dropDown, textField) {
    dropDown.value === 'other' ? textField.classList.remove('d-none') : textField.classList.add('d-none');
}