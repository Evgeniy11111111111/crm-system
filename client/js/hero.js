import { renderTable, sortCreated, sortFullname, sortId, sortUpdated } from "./utilitls.js";
import { arrowSvg } from "./svg.js";
import { addClientSvg } from "./svg.js";
import { createModal } from "./modelWindow.js";
import { loadClients } from "./api.js";
import { createPreloader } from "./preloader.js";

// Функция создания Hero блока
export async function createHero() {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const hero = document.createElement('div');
    
    const heroTitle = document.createElement('h2');

    const preloader = createPreloader();

    const tableContainer = document.createElement('div');
    const sortBlock = document.createElement('div');
    const sortList = document.createElement('ul');
    
    const itemID = document.createElement('li');
    const itemFullName = document.createElement('li')
    const itemDateOfCreate = document.createElement('li')
    const itemLastChanged = document.createElement('li')
    const itemContacts = document.createElement('li');
    const itemActions = document.createElement('li');

    const itemDateOfCreateText = document.createElement('p');
    const itemLastChangedText = document.createElement('p');

    const tableBlock = document.createElement('div')
    const table = document.createElement('table');
    
    section.classList.add('hero');
    hero.classList.add('hero__container');

    heroTitle.classList.add('hero__title');
    heroTitle.textContent = 'Клиенты';

    tableContainer.classList.add('hero__table-container');

    sortBlock.classList.add('hero__sort-block');
    sortList.classList.add('hero__sort-list');

    tableBlock.classList.add('table__block');
    table.classList.add('table');
    
    itemID.textContent = 'ID';
    itemID.classList.add('hero__sort-item', 'hero__id-width', 'hero__sort-item-active');

    itemFullName.textContent = 'Фамилия Имя Отчество';
    itemFullName.classList.add('hero__sort-item', 'hero__fullname-width', 'hero__fullname-item');

    itemDateOfCreate.classList.add('hero__sort-item', 'hero__date-of-creation-width');
    
    itemLastChanged.classList.add('hero__sort-item' ,'hero__last-changes-width');
    
    itemContacts.textContent = 'Контакты'
    itemContacts.classList.add('hero__sort-item', 'hero__contacts-width')
    
    itemActions.textContent = 'Действия';
    itemActions.classList.add('hero__sort-item', 'hero__actions-width')
    
    itemDateOfCreateText.textContent = 'Дата и время создания';
    itemDateOfCreateText.classList.add('hero__sort-item-date')
    itemLastChangedText.textContent = 'Последние изменения';
    itemLastChangedText.classList.add('hero__sort-item-last');

    const items = [itemID, itemFullName, itemDateOfCreateText, itemLastChangedText];
    // Добавляем элементам списка стрелочку
    for (let i = 0; i < items.length; i++) {
        const arrowSpan = document.createElement('span');
        arrowSpan.innerHTML = arrowSvg;
        items[i].append(arrowSpan);
    }
    // Накидываем элементам функцию сортировки
    sortId(itemID, items)
    sortFullname(itemFullName, items);
    sortCreated(itemDateOfCreate, items);
    sortUpdated(itemLastChanged, items);

    const spanFullname = document.createElement('span');
    spanFullname.textContent = 'А-Я';
    spanFullname.classList.add('hero__sort-item-span-fullname')
    itemFullName.append(spanFullname);
    

    const addClientBtn = document.createElement('button');
    const addClientSpan = document.createElement('span');
    const addClientText = document.createElement('span');
    addClientBtn.classList.add('add-client', 'btn-reset');
    addClientSpan.innerHTML = addClientSvg;
    addClientSpan.classList.add('add-client__svg');
    addClientText.textContent = 'Добавить клиента';
    addClientText.classList.add('add-client__text');
    // Функция открытия модельного окна;
    addClientBtn.addEventListener('click', () => { 
        const modal = createModal();
        document.body.append(modal)
        addClientBtn.disabled = true;
    });
    addClientBtn.append(addClientSpan, addClientText);

    itemDateOfCreate.append(itemDateOfCreateText);
    itemLastChanged.append(itemLastChangedText);

    sortList.append(
        itemID,
        itemFullName,
        itemDateOfCreate,
        itemLastChanged,
        itemContacts,
        itemActions
    );
    // Отабражаем таблицу
    const getClient = await loadClients();
    renderTable(table, getClient);
    
    sortBlock.append(sortList);
    tableBlock.append(preloader);
    tableBlock.append(table)
    tableContainer.append(sortBlock,tableBlock)
    hero.append(heroTitle, tableContainer, addClientBtn);
    section.append(hero);
    main.append(section);

    return main;
}