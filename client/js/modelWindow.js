import { loadClients, postClients } from "./api.js";
import { modalForm } from "./modal-form.js";
import { closeModalWindow, renderTable } from "./utilitls.js";
import { createValidate } from "./validate.js";
// Функция создания модельного окна
export function createModal() {
    const form = modalForm();
    const modal = document.createElement('div');
    const modalContent = document.createElement('div') 
    
    modal.classList.add('modal', 'modal--active');
    modalContent.classList.add('modal__content')

    modalContent.append(form.btnClose ,form.title ,form.form);
    modal.append(modalContent)
    // Добаляем клиента
    form.form.addEventListener('submit', async e => {
        e.preventDefault()
        // Функция валидации
        let error = createValidate(form.form);
        // Если ошибок нет, тогда всё нормально и контак заносится в таблицу
        if (error === 0) {
            const contactType = document.querySelectorAll('.contact__select-current');
            const contactValue = document.querySelectorAll('.contact__input');
            let contacts = [];
            let client = {};
            // Добавляем в массив контактов данные из контакт инпутов
            for (let i = 0; i < contactType.length; i++) {
                contacts.push({
                    type: contactType[i].textContent,
                    value: contactValue[i].value
                });
            }
            // Добавляем в объект клиент, данные из всех инпутов
            client.surname = form.inputSurname.value;
            client.name = form.inputName.value;
            client.lastName = form.inputLastName.value;
            client.contacts = contacts;
            // Добавляем данные на сервер
            await postClients(client);
            // Закрываем модельное окно
            closeModalWindow()
            const table = document.querySelector('table');
            // Получаем данные с сервера
            const getClient = await loadClients();
            // Отабражаем данные в таблицу
            renderTable(table, getClient);   
        }

    })

    // Закрываем модельное окно с анимацией по кнопке
    form.btnClose.addEventListener('click', closeModalWindow)

    // Закрываем модельное окно с анимацией кликая не по модельному окну
    document.addEventListener('click', e => {
        if (e.target === modal) {
            closeModalWindow()
        }
    })
    return modal

    
}


