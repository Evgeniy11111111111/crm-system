import { arrowContactSvg, contactDeleteSvg } from "./svg.js";
import { onePhoneInput, onePhoneKeyDown } from "./utilitls.js";
// Создаем элемент листа для контактов
export function createContact() {
    const contact = document.createElement('li');
    const select = document.createElement('div');
    const selectHeader = document.createElement('div');
    const selectCurrent = document.createElement('span');
    const selectIcon = document.createElement('span');
    const selectBody = document.createElement('div');
    const selectPhone = document.createElement('div');
    const selectAdditionalPhone = document.createElement('div');
    const selectEmail = document.createElement('div');
    const selectVk = document.createElement('div');
    const selectFacebook = document.createElement('div');
    const contactInput = document.createElement('input');

    contact.classList.add('contact');
    select.classList.add('contact__select');
    selectHeader.classList.add('contact__select-header');
    selectCurrent.classList.add('contact__select-current');
    selectIcon.classList.add('contact__select-icon');
    selectBody.classList.add('contact__select-body');
    selectPhone.classList.add('contact__select-item');
    selectAdditionalPhone.classList.add('contact__select-item');
    selectEmail.classList.add('contact__select-item');
    selectFacebook.classList.add('contact__select-item');
    selectVk.classList.add('contact__select-item');
    selectFacebook.classList.add('contact__select-item');
    contactInput.classList.add('contact__input');

    selectCurrent.textContent = 'Телефон';
    selectIcon.innerHTML = arrowContactSvg
    selectPhone.textContent = 'Телефон';
    selectAdditionalPhone.textContent = 'Доп. телефон';
    selectEmail.textContent = 'Email';
    selectVk.textContent = 'Vk';
    selectFacebook.textContent = 'Facebook';

    contactInput.placeholder = 'Введите данные контакта';
    contactInput.type = 'text';

    selectHeader.append(selectCurrent, selectIcon)
    selectBody.append(selectPhone, selectAdditionalPhone, selectEmail, selectVk, selectFacebook);
    select.append(selectHeader, selectBody);
    contact.append(select, contactInput);


    // Открываем и закрываем селект 
    selectHeader.addEventListener('click', () => {
        const selectActive = document.querySelectorAll('.is--active');
        select.classList.toggle('is--active');
        selectActive.forEach(elem => {
            elem.classList.remove('is--active');
        });
    });
    
    
    const selectItems = [selectPhone, selectAdditionalPhone, selectEmail, selectVk, selectFacebook];
    
    // Перебераем список селекта
    selectItems.forEach(item => {
        // Убираем из списка выбранный элемент
        if (selectCurrent.textContent === item.textContent) {
            item.style.display = 'none';

            // Если элемент списка селекта равен элементу списка телефон
            if (item === selectPhone) {
                // Навешиваем тип инпута на инпут
                contactInput.type = 'tel'
                // Навешиваем маску на инпут телефона
                contactInput.addEventListener('input', onePhoneInput)
                contactInput.addEventListener('keydown', onePhoneKeyDown)
            } else if (item === selectEmail) { // В пративном случаее удаляем маску
                contactInput.type = 'email'
                contactInput.removeEventListener('input', onePhoneInput);
                contactInput.removeEventListener('input', onePhoneKeyDown);
            } else {
                contactInput.type = 'text'
                contactInput.removeEventListener('input', onePhoneInput);
                contactInput.removeEventListener('input', onePhoneKeyDown);
            }
        }
        // Накидываем обработчики событий на все элементы списка
        item.addEventListener('click', () => {
            // Заменеям элемент на выбранный из списка
            selectCurrent.textContent = item.textContent;
            if (item === selectPhone) {
                contactInput.type = 'tel';
                contactInput.addEventListener('input', onePhoneInput)
                contactInput.addEventListener('input', onePhoneKeyDown)
            } else if (item === selectEmail) {
                contactInput.type = 'email';
                contactInput.removeEventListener('input', onePhoneInput);
                contactInput.removeEventListener('input', onePhoneKeyDown);
            } else {
                contactInput.type = 'text';
                contactInput.removeEventListener('input', onePhoneInput);
                contactInput.removeEventListener('input', onePhoneKeyDown);
            }
            // Убираем из списка выбранный элемент
            if (selectCurrent.textContent === item.textContent) {
                selectItems.forEach(item => {
                    if (item.style.display === 'none') {
                        item.style.display = 'block';
                    }
                })
                item.style.display = 'none';
            }
            // Закрываем селект
            if (select.classList.contains('is--active')) {
                select.classList.remove('is--active');
            }
        })
    })
    // Закрываем селект по нажатию вне модельного окна
    document.addEventListener('click', (e) => {
        if (!e.target.matches('.contact__select, .contact__select *')) {
            if (select.classList.contains('is--active')) {
                select.classList.remove('is--active');
            }
        }
    })
    // Создаем кнопку удаления
    const contactDelete = document.createElement('button');
    contactDelete.type = 'button';
    contactDelete.classList.add('contact__delete');
    contactDelete.innerHTML = contactDeleteSvg
    // Создаем тултип для кнопки удаления
    const contactDeleteTooltip = document.createElement('span');
    contactDeleteTooltip.classList.add('contact__tooltip');
    contactDeleteTooltip.textContent =  'Удалить контакт';

    contactDelete.append(contactDeleteTooltip);
    // Накидываем на кнопку удаления обработчик событий
    contactDelete.addEventListener('click', (e) => {
        // Удаление контакта
        e.preventDefault();
        contact.remove();
        // Задаем кнопке добавить контакт стандартный стиль
        const btnAddWrapper = document.querySelector('.modal__btn-add-wrapper');
        const contactList = document.querySelector('.modal__contact-list');
        // Если элементов списка контактов нет, тогда возврщаем модельному окну стандартный вид
        if (contactList.children.length <= 0) {
            btnAddWrapper.classList.remove('modal__btn-add-wrapper-25px')
        } 

        // Если элементов списка контактов меньше 5-ти, тогда модельное окно ставим по центру
        if (contactList.children.length < 5) {
            document.querySelector('.modal__content').style.top = '0%'
        } 
        // Если элементов списка контактов меньше 10-ти, тогда кнопку добавить контак делаем активной
        if (contact.children.length < 10) {
            document.querySelector('.modal__btn-add-contact').disabled = false;            
            document.querySelector('.modal__btn-add-contact').style.display = 'block';
        }
        if (window.innerWidth < 767) {
            if (contactList.children.length < 1) {
                document.querySelector('.modal__content').style.top = '0%';
            } 
            if (contactList.children.length < 4) {
                document.querySelector('.modal__content').style.top = '30%';
            } 
            if (contactList.children.length > 5) {
                document.querySelector('.modal__content').style.top = '50%';
            } 
        }
    })
    contactInput.addEventListener('input', () => {
        // Добавляем в инпуту кнопку удаления
        contactInput.style.width = '240px';
        if (window.innerWidth < 767) {
            contactInput.style.width = '133px'
        }
        contact.append(contactDelete);
    });


    return {
        contact,
        select,
        selectItems,
        selectPhone,
        selectEmail,
        selectAdditionalPhone,
        selectVk,
        selectFacebook,
        selectCurrent,
        contactInput,
        contactDelete
    }
}