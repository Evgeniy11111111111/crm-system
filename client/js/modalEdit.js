import { deleteClient, loadClients, pathcClients } from "./api.js";
import { createContact } from "./contact.js";
import { modalForm } from "./modal-form.js";
import { closeModalWindow, onePhoneInput, onePhoneKeyDown, renderTable } from "./utilitls.js";
import { createValidate } from "./validate.js";
// Функция создания модельного окна "Изменить"
export function createEditModal(data) {
    const form = modalForm();
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const titleId = document.createElement('span');

    modal.classList.add('modal', 'modal--active', 'edit__modal');
    modalContent.classList.add('modal__content', 'edit__modal-content');
    titleId.classList.add('modal__title-id');
    form.btnCancel.classList.add('modal__btn-delete')

    titleId.textContent = 'ID: ' + data.id.substr(0, 6);
    form.title.textContent = 'Изменить данные';
    form.btnCancel.textContent = 'Удалить клиента';

    form.inputSurname.value = data.surname;
    form.inputName.value = data.name;
    form.inputLastName.value = data.lastName;

    const inputs = [form.inputSurname, form.inputName, form.inputLastName];
    for (let input of inputs) {
        if (input.value.length > 0) {
            input.parentElement.classList.add('modal__label--active')
        } 
    }
    // Перебераем контакты, и добавляем их в список контактов
    for (const contact of data.contacts) {
        const newContact = createContact();

        newContact.selectCurrent.textContent = contact.type;
        newContact.contactInput.value = contact.value

        newContact.contactInput.style.width = '240px';
        if (window.innerWidth < 767) {
            newContact.contactInput.style.width = '133px'
        }

        newContact.selectItems.forEach(item => {
            if (newContact.selectCurrent.textContent === item.textContent) {
                newContact.selectItems.forEach(item => {
                    if (item.style.display === 'none') {
                        item.style.display = 'block';
                    }
                })
                item.style.display = 'none';
                
                if (item === newContact.selectPhone) {
                    newContact.contactInput.type = 'tel';
                    newContact.contactInput.addEventListener('input', onePhoneInput);
                    newContact.contactInput.addEventListener('keydown', onePhoneKeyDown)
                } else if (item === newContact.selectEmail) {
                    newContact.contactInput.type = 'email';
                    newContact.contactInput.removeEventListener('input', onePhoneInput);
                    newContact.contactInput.removeEventListener('keydown', onePhoneKeyDown);
                } else {
                    newContact.contactInput.type = 'text';
                    newContact.contactInput.removeEventListener('input', onePhoneInput);
                    newContact.contactInput.removeEventListener('keydown', onePhoneKeyDown);
                }
            }
        })

        newContact.contact.append(newContact.contactDelete);
        form.contactList.append(newContact.contact);
    }
    // Если элементов списка больше 9, тогда создается последний контак и удаляется кнопка "Добавить контакт"
    if (form.contactList.children.length === 10) {
        form.btnAdd.disabled = true;
        form.btnAdd.style.display = 'none';
        // Если элементов контакта больше 4 тогда, модельное окно смещается вниз
        if (form.contactList.children.length >= 5) {
            modalContent.style.top = '20%';
        }
        if (window.innerWidth < 767) {
            if (form.contactList.children.length > 1) {
                modalContent.style.top = '10%';
            } 
            if (form.contactList.children.length > 3) {
                modalContent.style.top = '30%';
            } 
            if (form.contactList.children.length > 5) {
                modalContent.style.top = '50%';
            } 
        }
    }

    if (form.contactList.children.length > 0) {
        form.btnAddWrapper.classList.add('modal__btn-add-wrapper-25px');
    }
    // Закрываем модельное окно по нажатию вне модельного окна
    document.addEventListener('click', e => {
        if (e.target === modal) {
            closeModalWindow()
        }
    });
    // Закрываем модельное окно по нажатию на кнопки
    form.btnClose.addEventListener('click', closeModalWindow);

    // Изменяем данные клиента
    form.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let error = createValidate(form.form);

        if (error === 0) {
            const contactType = document.querySelectorAll('.contact__select-current');
            const contactValue = document.querySelectorAll('.contact__input');
            let contacts = [];
            let client = {};
    
            for (let i = 0; i < contactType.length; i++) {
                contacts.push({
                    type: contactType[i].textContent,
                    value: contactValue[i].value
                });
            }
            
            client.surname = form.inputSurname.value;
            client.name = form.inputName.value;
            client.lastName = form.inputLastName.value;
            client.contacts = contacts;
    
            await pathcClients(data.id, client);
            closeModalWindow();
            const table = document.querySelector('table');
            const getClient = await loadClients();
            renderTable(table, getClient)
            const search = document.querySelector('.header__search');
            search.value = ''
        }
    });

    // Удаляем данные клиента
    form.btnCancel.addEventListener('click', async () => {
        await deleteClient(data.id);
        closeModalWindow();
        const table = document.querySelector('table');
        const getClient = await loadClients();
        renderTable(table, getClient);
    })

    form.title.append(titleId);
    modalContent.append(form.btnClose ,form.title, form.form);
    modal.append(modalContent);

    return {
        modal
    }
}