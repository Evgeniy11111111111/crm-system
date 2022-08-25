import { additionalPhoneSvg, fbSvg, mailSvg, phoneSvg, vkSvg } from "./svg.js";
import { createTooltip } from "./tooltip.js";
import { createTr } from "./tr.js";
import { loadClients } from "./api.js";
import { createUserCard } from "./user.js";

// Функция отображения таблицы
export function renderTable(table, data) {
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const client = createTr(data[i]);
        table.append(client.tr)
    }
}
// Функция модельного окна
export function closeModalWindow() {
    const modal = document.querySelector('.modal')
    modal.classList.add('modal--not-active');
    document.querySelector('.modal__content').classList.add('modal--not-active');
    setInterval(() => {
        modal.remove();
    }, 300) 
    document.querySelector('.add-client').disabled = false
}
// Функция отабражения даты
export function showDate(data) {
    const newDate = new Date(data);
    
    const correctDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }

    const result = newDate.toLocaleString("ru", correctDate);
    return result
}
// Функция отабражения времени
export function showTime(data) {
    const newTime = new Date(data);

    const correctTime = {
        hour: 'numeric',
        minute: 'numeric'
    }

    const result = newTime.toLocaleString("ru", correctTime);
    return result;
}
// Создаем ссылку контакта клиента
export function createContactIcon( type, value, list) {
    const contactItem = document.createElement('li') 
    contactItem.classList.add('table__contact-item');
    const link = document.createElement('a');
    let tooltip = createTooltip(type + ': ', value); // тултип
    link.href = value.trim(); 
    link.name = type
    let svg;
    switch (type) {
        // Если тип равен телефону изменяем тултип
        case 'Телефон':
            tooltip = createTooltip('', value);
            link.href = `tel:${replaceInput(value)}` // для href добавляем тип телефон, и образаем все лишнее пробелы, скобки и тире
            link.classList.add('table__contact-item-phone');
            // Добавляем иконку
            svg = phoneSvg;
            break;
        case 'Доп. телефон':
            tooltip.tooltipType.style.width = '92px'
            svg = additionalPhoneSvg;
            break;
        case 'Email':
            link.href = `mailto:${value.trim()}`
            svg = mailSvg;
            break;
        case 'Vk':
            svg = vkSvg;
            break;
        case 'Facebook':
            svg = fbSvg;
            break;
        default:
            break;
    }
    link.innerHTML = svg;
    link.append(tooltip.tooltip);
    link.classList.add('table__td-client-link')
    contactItem.append(link)
    list.append(contactItem)
}
// Создаем регулярку для телефона инпут
export function replaceInput(value) {
    return value.replace(/[^+\d]/g, '');
}
// Функция сортировки имени
export async function sortFullname(btn, items) {
    let flag = true;
    btn.addEventListener('click', async () => {
        if (flag) {
            for (let elem of items) {
                elem.classList.remove('hero__sort-item-active');
            }
            btn.classList.add('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => {
                if (a.surname > b.surname) {
                    return 1
                } else if (a.surname < b.surname) {
                    return -1
                } else if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else if (a.lastName > b.lastName) {
                    return 1
                } else if (a.lastName < b.lastName) {
                    return -1
                }
                return 0
            })
            const table = document.querySelector('table');
            renderTable(table, sorting);
        } else {
            btn.classList.remove('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => {
                if (a.surname < b.surname) {
                    return 1
                } else if (a.surname > b.surname) {
                    return -1
                } else if (a.name < b.name) {
                    return 1
                } else if (a.name > b.name) {
                    return -1
                } else if (a.lastName < b.lastName) {
                    return 1
                } else if (a.lastName > b.lastName) {
                    return -1
                }
                return 0
            })
            const table = document.querySelector('table');
            renderTable(table, sorting);
        }
        flag = !flag;

    });
}
// Функция сортировки id
export async function sortId(btn, items) {
    let flag = true;
    if (btn.classList.contains('hero__sort-item-active')) {
        flag = false
        btn.addEventListener('click', sort);
    } else {
        btn.addEventListener('click', sort);
    }

    async function sort() {
        if (flag) {
            for (let elem of items) {
                elem.classList.remove('hero__sort-item-active');
            }
            btn.classList.add('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => a.id > b.id ? 1 : -1);
            const table = document.querySelector('table');
            renderTable(table, sorting);
        } else {
            btn.classList.remove('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => a.id < b.id ? 1 : -1);
            const table = document.querySelector('table');
            renderTable(table, sorting);
        }
        flag = !flag
    }

}
// Функция сортировки создания клиента
export async function sortCreated(btn, items) {
    let flag = true;
    btn.addEventListener('click', async () => {
        if (flag) {
            for (let elem of items) {
                elem.classList.remove('hero__sort-item-active');
            }
            btn.classList.add('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
            const table = document.querySelector('table');
            renderTable(table, sorting);
        } else {
            btn.classList.remove('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1);
            const table = document.querySelector('table');
            renderTable(table, sorting);
        }
        flag = !flag
    });
}
// Функция сортировки измения клиента
export async function sortUpdated(btn, items) {
    let flag = true;
    btn.addEventListener('click', async () => {
        if (flag) {
            for (let elem of items) {
                elem.classList.remove('hero__sort-item-active');
            }
            btn.classList.add('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1);
            const table = document.querySelector('table');
            renderTable(table, sorting);
        } else {
            btn.classList.remove('hero__sort-item-active')
            const getClients = await loadClients();
            const sorting = getClients.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1);
            const table = document.querySelector('table');
            renderTable(table, sorting);
        } 
        flag = !flag
    });
}
//  Функция отабражения для задания №2 'Улучшения и дополнения к заданию'
export async function renderUser(div, data) {
    div = '';
    const user = createUserCard(data);
    div.append(user);
}
// Создания регулярки для маски телефона
function getInputNumberValue(input) {
    return input.value.replace(/\D/g, '');
}
// Создание маски телефона
// ! Я её взял из интернета, поэтому половину функций не совсем понимаю
export function onePhoneInput(e) {
    let input = e.target;
    let inputNumberValue = getInputNumberValue(input);
    let formattedInputValue = '';
    let selectionStart = input.selectionStart
    // Если в инпут введены симовлы не соответсвующие регулярки, то значение инпута становится пустым
    if (!inputNumberValue) return input.value = ''
    // В этой части я не совсем понимаю что происходит
    if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumberValue
        }   
        return
    }
    
    if (['7', '8', '9'].includes(inputNumberValue[0])) {
        // Если первая цифра девять, тогда мы заменяем первую цифру на 7 и девятку делаем второй цифрой
        if (inputNumberValue[0] == '9') inputNumberValue = '7' + inputNumberValue;
        // Если первая цифра 7, тогда значение инпута начинается с +7, если первая цифра 8, тогда значение начинается с 8
        let firstSymbol = (inputNumberValue[0] == '8') ? '8' : '+7';
        formattedInputValue = firstSymbol + ' ';
        // Если в инпуте больше одной цифры добавляем скобку открытия и так далее
        if (inputNumberValue.length > 1) {
            formattedInputValue += '(' + inputNumberValue.substring(1, 4)
        }
        if (inputNumberValue.length >= 5) {
            formattedInputValue += ') ' + inputNumberValue.substring(4, 7)
        }
        if (inputNumberValue.length >= 8) {
            formattedInputValue += '-' + inputNumberValue.substring(7, 9)
        } 
        if (inputNumberValue.length >= 10) {
            formattedInputValue += '-' + inputNumberValue.substring(9, 11);
        }
    } else { //Если вводимое число не 7, 8 или 9 тогда добавляем +и добавляем введеное число
        formattedInputValue = '+' + inputNumberValue;
    }
    input.value = formattedInputValue

}
// Функция удаления цифр инпута
export function onePhoneKeyDown (e) {
    let input = e.target;
    if (e.keyCode == 8 && getInputNumberValue(input).length == 1) {
        input.value = '';
    }
}

export function renderListFind(list, data) {
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const li = autocompleteItem(data[i]);
        list.append(li)
    }
}


function autocompleteItem(data) {
    const li = document.createElement('li');
    const surname = document.createElement('span')
    const name = document.createElement('span')
    const lastname = document.createElement('span')

    li.classList.add('item-find')

    li.id = data.id
    surname.textContent = data.surname + ' ';
    name.textContent = data.name + ' ';
    lastname.textContent = data.lastName;

    li.append(surname, name, lastname);

    li.addEventListener('click', async () => {
        const table = document.querySelectorAll('table tr');
        table.forEach(elem => elem.classList.remove('table-find'));
        const search = document.querySelector('.header__search');
        const listFind = document.querySelector('.list-find');
        search.value = '';
        listFind.classList.remove('active-find'); 
        for (let elem of table) {
            if(elem.id === li.id) {                
                elem.scrollIntoView()
                elem.classList.add('table-find');
                console.log(elem);
            }
        }
        
        console.log(table);                
    })

    return li
}