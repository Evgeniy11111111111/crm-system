// Функция создания контакта для №2 задания 'Улучшения и дополнения к заданию'
export function createUserContact(type, value) {
    const itemUserContent = document.createElement('li');
    const itemUserContactType = document.createElement('span');
    const itemUserContactValue = document.createElement('a');

    itemUserContent.classList.add('user__contact-item');
    itemUserContactType.classList.add('user__contact-type');
    itemUserContactValue.classList.add('user__contact-value');

    itemUserContactType.textContent = type;
    itemUserContactValue.textContent = value;
    itemUserContactValue.href = value.trim();

    if (itemUserContactType.textContent === 'Телефон') {
        itemUserContactValue.href = `tel:${value.trim()}`
    } else if (itemUserContactType.textContent === 'Email') {
        itemUserContactValue.href = `mailto:${value.trim()}`
    }

    itemUserContent.append(itemUserContactType, itemUserContactValue);

    return itemUserContent
}