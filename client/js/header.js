import { loadClients } from "./api.js";
import { logoSvg } from "./svg.js";
import { renderListFind } from "./utilitls.js";

// Создания header
export function createHeader() {
    const header = document.createElement('header');
    const headerContainer = document.createElement('div');
    const logo = document.createElement('a');
    const searchBlock = document.createElement('div');
    const search = document.createElement('input');
    
    header.classList.add('header');
    headerContainer.classList.add('container', 'header__container', 'headder__block');
    
    logo.classList.add('header__logo');
    logo.innerHTML = logoSvg;

    searchBlock.classList.add('header__search-block');
    search.classList.add('header__search');
    search.type = 'search';
    search.placeholder = 'Введите запрос';

    let timerId;
    // Поиск в таблице
    // search.addEventListener('input', async (e) => {
    //     const value = e.target.value;
    //     // Функция запроса по просшствие времени
    //     if (timerId) {
    //         clearTimeout(timerId);
    //     }
    //     timerId = setTimeout(async () => {
    //         const getClient = await loadClients()
    //         const table = document.querySelector('table');
    //         const filtred = getClient.filter(s => s.surname.includes(value) || s.name.includes(value) || s.lastName.includes(value) || s.id.includes(value))
    //         // Отабражение таблицы
    //         renderTable(table, filtred);
    //     }, 300);
    // })

    const listFind = document.createElement('ul');
    listFind.classList.add('list-find')
    
    let currentFocus = -1;

    search.addEventListener('input', async(e) => {
        const input = e.target.value
        const getClient = await loadClients()
        const filtred = getClient.filter(s => s.surname.includes(input) || s.name.includes(input) || s.lastName.includes(input) || s.id.includes(input));
        renderListFind(listFind, filtred)
        currentFocus = -1
        if (filtred.length === 0) {
            listFind.classList.remove('active-find');
        } else {
            listFind.classList.add('active-find');
        }
        if (input.length === 0) {
            listFind.classList.remove('active-find');
        }
    })
    
    search.addEventListener('keydown', e => {
        if (e.code === 'ArrowDown') {
            currentFocus++
            if (currentFocus === -1 ) {
                currentFocus = 0
                listFind.children[currentFocus].classList.add('active-item-find')
                // keydownSearch(listFind.children[currentFocus])
            } else if (currentFocus === 0) {
                listFind.children[currentFocus].classList.add('active-item-find') 
                // keydownSearch(listFind.children[currentFocus]);
            } else if (currentFocus === listFind.children.length) {
                currentFocus = 0
                listFind.children[listFind.children.length - 1].classList.remove('active-item-find')
                listFind.children[0].classList.add('active-item-find');
                // keydownSearch(listFind.children[0])
            } else {
                listFind.children[currentFocus].classList.add('active-item-find') 
                // keydownSearch(listFind.children[currentFocus])
                listFind.children[currentFocus - 1].classList.remove('active-item-find')
                if (currentFocus === listFind.children.length) {
                    listFind.children[listFind.children.length - 1].classList.remove('active-item-find')
                    currentFocus = 0;
                }
            }
        } else if (e.code === 'ArrowUp') {
            currentFocus--

            if (currentFocus === -1) {
                currentFocus = listFind.children.length - 1
                // console.log(currentFocus);
                listFind.children[0].classList.remove('active-item-find');
                listFind.children[listFind.children.length - 1].classList.add('active-item-find');
                // keydownSearch(listFind.children[listFind.children.length - 1]);
            } else if (currentFocus === -2) {
                currentFocus = listFind.children.length -1;
                // console.log(currentFocus);
                listFind.children[0].classList.remove('active-item-find');
                listFind.children[listFind.children.length - 1].classList.add('active-item-find');
                // keydownSearch(listFind.children[listFind.children.length - 1])
            } else {
                listFind.children[currentFocus].classList.add('active-item-find');
                // keydownSearch(listFind.children[currentFocus]);
                listFind.children[currentFocus + 1].classList.remove('active-item-find')
            }
        }   
        if (e.code === 'Enter') {
            const item = document.querySelector('.active-item-find');
            search.value = '';
            console.log(item.id)
            const table = document.querySelectorAll('table tr');
            table.forEach(elem => elem.classList.remove('table-find'));
            listFind.classList.remove('active-find');
            for (let elem of table) {
                if (elem.id === item.id) {
                    elem.scrollIntoView()
                    elem.classList.add('table-find');
                }
            }
        }
    })
    
    
    searchBlock.append(search, listFind)
    headerContainer.append(logo, searchBlock);
    header.append(headerContainer);

    return header;
}