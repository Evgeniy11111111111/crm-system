import { createContact } from "./contact.js";
import { btnCloseSvg } from "./svg.js";
// Функция создания формы добавления модельного окна
// (здесь только содержимое, модельное окно находиться в modalWindow);
export function modalForm() {
    const title = document.createElement('h3');
    title.classList.add('modal__title');
    title.textContent = 'Новый клиент'

    const btnClose = document.createElement('button');
    btnClose.innerHTML = btnCloseSvg;
    btnClose.classList.add('modal__btn-close', 'btn-reset');
    
    const form = document.createElement('form');
    form.classList.add('modal__form');
    
    const labelSurname = document.createElement('label');
    const containerLabelSurname = document.createElement('div');
    const surnameText = document.createElement('span')
    const requiredSurname = document.createElement('span');
    const inputSurname = document.createElement('input');
    const labelName = document.createElement('label');
    const containerLabelName = document.createElement('div');
    const nameText = document.createElement('span')
    const requiredName = document.createElement('span');
    const inputName = document.createElement('input');
    const labelLastName = document.createElement('label');
    const containerLabelLastName = document.createElement('div');
    const LastNameText = document.createElement('span');
    const inputLastName = document.createElement('input');

    labelSurname.classList.add('modal__label');
    containerLabelSurname.classList.add('modal__label-container')
    surnameText.textContent = 'Фамилия'
    requiredSurname.textContent = '*';
    requiredSurname.classList.add('modal__required-span')
    labelName.classList.add('modal__label');
    containerLabelName.classList.add('modal__label-container')
    nameText.textContent = 'Имя'
    requiredName.textContent = '*';
    requiredName.classList.add('modal__required-span');
    labelLastName.classList.add('modal__label');   
    containerLabelLastName.classList.add('modal__label-container'); 
    LastNameText.textContent = 'Отчество'

    inputSurname.classList.add('input__surname', 'input__req');
    inputName.classList.add('input__name', 'input__req')
    inputLastName.classList.add('input__lastname')
    
    const inputs = [inputSurname, inputName, inputLastName] 

    for (let input of inputs) {
        input.classList.add('modal__input');
        input.type = 'text';
        // Смещаем лабел выше от инпута
        input.addEventListener('input', () => {
            // Если в инпуте символов больше 0, тогда лейбл смещается вверх
            if (input.value.length > 0 ) {
                input.parentElement.classList.add('modal__label--active')
            } else if (input.value.length <= 0) { // Если в инпуте символов 0, тогда лейбл возвращается на свое место
                input.parentElement.classList.remove('modal__label--active')
            }
        })
    }
    
    containerLabelSurname.append(surnameText, requiredSurname);
    containerLabelName.append(nameText, requiredName);
    containerLabelLastName.append(LastNameText);
    labelSurname.append(inputSurname, containerLabelSurname);
    labelName.append(inputName, containerLabelName);
    labelLastName.append(inputLastName, containerLabelLastName);
    
    const contactBlock = document.createElement('div')
    contactBlock.classList.add('modal__contact-block');

    const contactList = document.createElement('ul');
    contactList.classList.add('modal__contact-list');

    
    const btnAddWrapper = document.createElement('div')
    btnAddWrapper.classList.add('modal__btn-add-wrapper');
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.textContent = 'Добавить контакт'
    btnAdd.classList.add('modal__btn-add-contact', 'btn-reset');
    // Функция по добавлению строки с контактами()
    btnAdd.addEventListener('click', (e) => {
        e.preventDefault()

        if (contactList.children.length < 9) {
            // Добавляем контакт в контакт лист
            const contact = createContact();
            contactList.append(contact.contact);
            // Задаем кнопке добавить контакт нижний маргин
            btnAddWrapper.classList.add('modal__btn-add-wrapper-25px');
            // Если элементов контакта больше 4 тогда, модельное окно смещается вниз
            if (contactList.children.length >= 5) {
                document.querySelector('.modal__content').style.top = '20%';
            } 
            if (window.innerWidth < 767) {
                if (contactList.children.length > 1) {
                    document.querySelector('.modal__content').style.top = '10%';
                } 
                if (contactList.children.length > 3) {
                    document.querySelector('.modal__content').style.top = '30%';
                } 
                if (contactList.children.length > 5) {
                    document.querySelector('.modal__content').style.top = '50%';
                } 
            }
        } else { // Если элементов списка больше 9, тогда создается последний контак и удаляется кнопка "Добавить контакт"
            const contact = createContact();
            contactList.append(contact.contact);
            btnAdd.disabled = true;
            btnAdd.style.display = 'none'
        }
        
    })
    btnAddWrapper.append(btnAdd);
    contactBlock.append(contactList, btnAddWrapper)
    
    const btnSave = document.createElement('button');
    btnSave.type = 'submit'
    btnSave.textContent = 'Сохранить';
    btnSave.classList.add('modal__save-btn', 'btn-reset');

    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'Отмена'
    btnCancel.classList.add('modal__cancel-btn', 'btn-reset');
    
    form.append(labelSurname, labelName, labelLastName, contactBlock, btnSave, btnCancel);
    
    return {
        btnClose,
        title,
        form,
        inputSurname,
        inputName,
        inputLastName,
        contactList,
        btnAddWrapper,
        btnAdd,
        btnSave,
        btnCancel
    }
}