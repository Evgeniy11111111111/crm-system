// Функция создания тултипа для ссылок в таблице
export function createTooltip(type, value) {
    const tooltip = document.createElement('span');
    const tooltipType = document.createElement('span');
    const tooltipLink = document.createElement('a')


    tooltip.classList.add('tooltip');
    tooltipType.classList.add('tooltip__type');
    tooltipLink.classList.add('tooltip__link');

    tooltipType.textContent = type
    tooltipLink.textContent = value;
    tooltip.append(tooltipType ,tooltipLink);
    
    return {
        tooltip,
        tooltipType,
        tooltipLink
    }
}