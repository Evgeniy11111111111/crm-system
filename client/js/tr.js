import { deleteClient, loadClients } from "./api.js";
import { createDeleteModal } from "./modal-Delete.js";
import { createEditModal } from "./modalEdit.js";
import { closeModalWindow, createContactIcon, renderTable, showDate, showTime } from "./utilitls.js";

// Функция создания tr для таблицы
export function createTr (data) {
    const tr = document.createElement('tr');
    
    const tdID = document.createElement('td');
    const tdFullName = document.createElement('td')
    const tdLink = document.createElement('a');
    const tdDateOfCreate = document.createElement('td')
    const tdLastChanged = document.createElement('td')
    const tdContacts = document.createElement('td');
    const tdActions = document.createElement('td');

    const surname = document.createElement('span');
    const name = document.createElement('span');
    const midname = document.createElement('span'); 

    const dateOfCreateWrapper = document.createElement('div');
    const lastChangedWrapper = document.createElement('div');

    const dateOfCreate = document.createElement('span');
    const lastChanged = document.createElement('span');
    const dateOfCreateTime = document.createElement('span');
    const lastChangedTime = document.createElement('span');

    const contactlist = document.createElement('ul')
    
    const btnWrapper = document.createElement('div');
    const changeBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    tr.classList.add('table__tr', 'table__tr--active');
    tr.id = data.id

    
    tdID.textContent = data.id.substr(0, 6);
    tdID.classList.add('hero__id-width', 'table__td', 'table__td-client-id');
    
    tdFullName.classList.add('hero__fullname-width', 'table__td');
    tdLink.href = `user.html?${data.id}`
    tdLink.classList.add('table__td-link');
    surname.textContent = data.surname;
    surname.classList.add('table__td-fullname-span')
    name.textContent = data.name;
    name.classList.add('table__td-fullname-span')    
    midname.textContent = data.lastName;
    midname.classList.add('table__td-fullname-span');

    tdFullName.append(tdLink);
    tdLink.append(surname, name, midname);

    tdDateOfCreate.classList.add('hero__date-of-creation-width', 'table__td');
    dateOfCreateWrapper.classList.add('table__td-date-wrapper')
    dateOfCreate.textContent = showDate(data.createdAt);
    dateOfCreate.classList.add('table__td-client-date')
    dateOfCreateTime.textContent = showTime(data.createdAt);
    dateOfCreateTime.classList.add('table__td-client-time');
    dateOfCreateWrapper.append(dateOfCreate, dateOfCreateTime);
    tdDateOfCreate.append(dateOfCreateWrapper);

    tdLastChanged.classList.add('hero__last-changes-width', 'table__td');
    lastChangedWrapper.classList.add('table__td-date-wrapper');
    lastChanged.textContent = showDate(data.updatedAt);
    lastChanged.classList.add('table__td-client-date');
    lastChangedTime.textContent = showTime(data.updatedAt)
    lastChangedTime.classList.add('table__td-client-time');
    lastChangedWrapper.append(lastChanged, lastChangedTime);
    tdLastChanged.append(lastChangedWrapper);

    tdContacts.classList.add('hero__contacts-width', 'table__td');
    contactlist.classList.add('table__contact-list');
    // Перебераем контакты из списка контактов
    for (const contact of data.contacts) {
        createContactIcon(contact.type, contact.value, contactlist);
    }
    // Если список ссылок контактов больше 5 то скрываем не нужные нам ссылки
    if (contactlist.children.length > 5) {
        const items = contactlist.querySelectorAll('.table__contact-item');
        for (let i = 0; i < items.length; i++) {
            if (i > 3) { 
                items[i].style.display = 'none';
            }
        }
        // Создаем кнопку которая по нажатию открыет скрытые ссылки
        const contactItem = document.createElement('li');
        contactItem.classList.add('table__contact-item');
        const contactBtn = document.createElement('button');
        contactBtn.classList.add('table__contact-btn', 'btn-reset');
        contactBtn.textContent = '+' + (items.length - 4) ;
        contactItem.append(contactBtn);
        contactlist.append(contactItem);
        contactBtn.addEventListener('click', () => {
            contactBtn.remove();
            contactItem.remove();
            for (let elem of items) {
                elem.style.display = 'block';
            }
        })
    }
    
    tdContacts.append(contactlist);
    
    tdActions.classList.add('hero__actions-width', 'table__td')
    btnWrapper.classList.add('table__actions-wrapper')
    changeBtn.textContent = 'Изменить'
    changeBtn.classList.add('table__change-btn', 'btn-reset', 'table__actions-btn');
    deleteBtn.textContent = 'Удалить'
    deleteBtn.classList.add('table__delete-btn', 'btn-reset', 'table__actions-btn');

    // Вызываем модельное окно удаления, и после нажатия на кнопку "Удалить", клиент удаляется
    deleteBtn.addEventListener('click', () => {
        const deleteModal = createDeleteModal()
        document.body.append(deleteModal.modalDelete);
        deleteModal.modalDeleteBtn.addEventListener('click', async () => {
            await deleteClient(tr.id);
            closeModalWindow();
            const table = document.querySelector('table');
            const getClient = await loadClients();
            renderTable(table, getClient);
            const search = document.querySelector('.header__search');
            search.value = ''
        })
    })
    // Вызываем модельное окно "Изменить"
    changeBtn.addEventListener('click', () => {
        const editModal = createEditModal(data)
        document.body.append(editModal.modal)
    })


    btnWrapper.append(changeBtn, deleteBtn)
    tdActions.append(btnWrapper);
    
    tr.append(
        tdID,
        tdFullName,
        tdDateOfCreate,
        tdLastChanged,
        tdContacts,
        tdActions
    )




    return {
        tr,
        changeBtn,
        deleteBtn
    }
}