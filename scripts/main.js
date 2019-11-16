const items = {
    wardrobe: {
        color: ['red', 'yellow', 'purple', 'cyan', 'tomato', 'black', 'pink', 'maroon'],
        dimension: ['AxB', 'BxC'],
        example: ['a', 'b'],
        anotherExample: ['b', 'c']
    }
};
const currentItem = {};
const wrapper = document.querySelector('.wrapper');
let itemNumber = 1;
currentItem.name = 'wardrobe';
Object.keys(items[currentItem.name]).forEach(property => addSection(property));

function addSection(prop) {
    const section = document.createElement('section');
    const text = document.createElement('p');
    const dropDown = document.createElement('select');
    const saveButton = document.createElement('div');
    const userText = document.createElement('input');
    section.classList.add('main-section');
    text.classList.add('title');
    userText.classList.add('d-none');
    dropDown.classList.add('dropdown');
    dropDown.addEventListener('change', () => showAndHideTextField(dropDown, userText));
    saveButton.addEventListener('click', () => nextChoice({prop, value: dropDown.value, userText, saveButton}));
    saveButton.innerHTML = '<i class="fas fa-check-circle size"></i>';
    saveButton.classList.add('save-button');
    text.innerHTML = `${itemNumber < 10 ? `0${itemNumber}` : itemNumber}. ${prop[0].toUpperCase() + prop.slice(1)}`;
    Object.values(items[currentItem.name][prop]).forEach(val => {
        dropDown.options[dropDown.options.length] = new Option(val, val);
    });
    dropDown.options[dropDown.options.length] = new Option('Друго', 'other');
    section.appendChild(text);
    section.appendChild(dropDown);
    section.appendChild(userText);
    section.appendChild(saveButton);
    wrapper.appendChild(section);
    itemNumber++;
}

function addLastSection() {
    const section = document.createElement('section');
    const text = document.createElement('p');
    const userText = document.createElement('textarea');
    const sendButton = document.createElement('button');
    section.classList.add('main-section');
    text.classList.add('title');
    sendButton.innerHTML = 'Завърши';
    text.innerHTML = 'Допълнителна информация (не е задължително):';
    
    section.appendChild(text);
    section.appendChild(userText);
    section.appendChild(sendButton);
    wrapper.appendChild(section);
}

addLastSection();

function nextChoice(data) {
    const {saveButton, value, userText, prop} = data;
    value === "other" ? currentItem[prop] = userText.value : currentItem[prop] = value;
    saveButton.classList.add('clicked-button');
    setTimeout(() => saveButton.classList.remove('clicked-button'), 300);
    increaseProgress();
}

function increaseProgress() {
    const currentProgressBar = document.querySelector('.progress-bar .current-progress');
    const currentHeight = currentProgressBar.clientHeight;
    const newHeight = currentHeight + screen.availHeight / Object.keys(items[currentItem.name]).length;
    console.log(newHeight);
    //const newHeight = screen.availHeight
    // const currentHeight = 100 / Object.keys(items[currentItem.name]).length;
     currentProgressBar.style.height = newHeight + 'px';
}

function showAndHideTextField(dropDown, textField) {
    dropDown.value === 'other' ? textField.classList.remove('d-none') : textField.classList.add('d-none');
}