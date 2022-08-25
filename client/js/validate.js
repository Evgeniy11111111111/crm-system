import { replaceInput } from "./utilitls.js";
// Валидация
export function createValidate(form) {
    let error = 0; // переменая с количеством ошибок
    const requiredInput = document.querySelectorAll('.input__req');
    const inputLastName = document.querySelector('.input__lastname')
    const contactInputs = document.querySelectorAll('.contact__input');
    const contactInputsTel = document.querySelectorAll('.contact__input[type=tel]')
    const contactInputEmail = document.querySelectorAll('.contact__input[type=email]')

    // Валидация обязательных полей
    for (let i = 0; i < requiredInput.length; i++) {
        const input = requiredInput[i];
        formRemoveError(input); 
        // проверка на количество сиволов в инпуте и на русские символы
        if (input.value.length <= 3 || inputTest(input)) {
            formAddError(input);
            // Если инпут не прошел валидацию количество ошибок увеличивается на одну
            error++;
        }
    }
    // Валидация на отчество
    formRemoveError(inputLastName);
    if (inputTest(inputLastName)) {
        formAddError(inputLastName);
        error++;
    }
    // Валидация на контакты
    for (let input of contactInputs) {
        formRemoveError(input)
        if (input.value.length <= 3) {
            formAddError(input);
            error++;
        }
    }
    // Валидация на инпут телефона
    for (let input of contactInputsTel) {
        formRemoveError(input);
        const replaceValue = replaceInput(input.value);
        if (replaceValue.length < 11) {
            formAddError(input);
            error++;
        }
    }

    // Валидация на инпут email
    for (let input of contactInputEmail) {
        formRemoveError(input);
        if (input.value.length <= 8 || emailTest(input)) {
            formAddError(input);
            error++;
        }
    }
    // Возвращаем количество ошибов
    return error; 
}

// Добавляем класс error
function formAddError (input) {
    input.classList.add('error');
}

// Удаляем класс error
function formRemoveError (input) {
    input.classList.remove('error');
}

// Проврка на русские буквы
function inputTest(input) {
    return /[^а-яА-ЯёЁ]+$/g.test(input.value)
}
// Проверка на email
function emailTest(input) {
    return /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/g.test(input.value);
}