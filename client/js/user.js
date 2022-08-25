import { createUserContact } from "./user-contact.js";

// Создаем карточку для задания №2 'Улучшения и дополнения к заданию'
export function createUserCard(data) {
    const userContent = document.createElement('div')
    const userTitle = document.createElement('h3');
    const userTitleId = document.createElement('span')
    const userDivSurname = document.createElement('div')
    const userSurnameTitle = document.createElement('span')
    const userSurname = document.createElement('p');
    const userDivName = document.createElement('div')
    const userNameTitle = document.createElement('span')
    const userName = document.createElement('p');
    const userDivLastName = document.createElement('div')
    const userLastNameTitle = document.createElement('span')
    const userLastName = document.createElement('p');
    const userContactDiv = document.createElement('div')
    const userContact = document.createElement('ul');

    userContent.classList.add('user__content')
    userTitle.classList.add('user__title');
    userTitleId.classList.add('user__title-id');
    userDivSurname.classList.add('user__div');
    userDivName.classList.add('user__div');
    userDivLastName.classList.add('user__div');
    userSurnameTitle.classList.add('user__div-title')
    userNameTitle.classList.add('user__div-title')
    userLastNameTitle.classList.add('user__div-title')
    userSurname.classList.add('user__div-text');
    userName.classList.add('user__div-text');
    userLastName.classList.add('user__div-text');
    userContactDiv.classList.add('user__contact-div-list')
    userContact.classList.add('user__contact-list');

    userTitle.textContent = 'Клиент';
    userTitleId.textContent = 'ID: ' + data.id;
    userSurnameTitle.textContent = 'Фамилия';
    userSurname.textContent = data.surname;
    userNameTitle.textContent = 'Имя';
    userName.textContent = data.name;
    userLastNameTitle.textContent = 'Отчество';
    userLastName.textContent = data.lastName;

    for (let contact of data.contacts) {
        const newContact = createUserContact(contact.type, contact.value);
        userContact.append(newContact);
    }

    userTitle.append(userTitleId);
    userDivSurname.append(userSurnameTitle, userSurname),
    userDivName.append(userNameTitle, userName),
    userDivLastName.append(userLastNameTitle, userLastName)
    userContactDiv.append(userContact);
    userContent.append(userTitle, userDivSurname, userDivName, userDivLastName,  userContactDiv)

    return {userContent}
}

