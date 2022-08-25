import { btnCloseSvg } from "./svg.js";
import { closeModalWindow } from "./utilitls.js";
// Функция создания модуля удаления
export function createDeleteModal() {
    const modalDelete = document.createElement('div');
    const modalDeleteContent = document.createElement('div');
    const modalDeleteCloseBtn = document.createElement('button');
    const modalDeleteTitle = document.createElement('h3');
    const modalDeleteDescr = document.createElement('p');
    const modalDeleteBtn = document.createElement('button');
    const modalDeleteCancelBtn = document.createElement('button');

    modalDelete.classList.add('delete__modal', 'modal', 'modal--active');
    modalDeleteContent.classList.add('delete__modal-content', 'modal__content');
    modalDeleteCloseBtn.classList.add('delete__close', 'btn-reset', 'modal__btn-close');
    modalDeleteTitle.classList.add('delete__title', 'modal__title');
    modalDeleteDescr.classList.add('delete__descr');
    modalDeleteBtn.classList.add('delete__btn', 'btn-reset', 'modal__save-btn');
    modalDeleteCancelBtn.classList.add('delete__btn-cancel', 'btn-reset', 'modal__cancel-btn');

    modalDeleteCloseBtn.innerHTML = btnCloseSvg;
    modalDeleteTitle.textContent = 'Удалить клиента';
    modalDeleteDescr.textContent = 'Вы действительно хотите удалить данного клиента?';
    modalDeleteBtn.textContent = 'Удалить';
    modalDeleteCancelBtn.textContent = 'Отмена';
    // Закрываем модельное окно по нажатию вне модельного окна
    document.addEventListener('click', e => {
        if (e.target === modalDelete) {
            closeModalWindow()
        }
    });
    // Закрываем модельное окно по нажатию на кнопки
    modalDeleteCloseBtn.addEventListener('click', closeModalWindow)
    modalDeleteCancelBtn.addEventListener('click', closeModalWindow);

    modalDeleteContent.append(modalDeleteCloseBtn, modalDeleteTitle, modalDeleteDescr, modalDeleteBtn, modalDeleteCancelBtn);
    modalDelete.append(modalDeleteContent);

    return {
        modalDelete,
        modalDeleteBtn
    }
}