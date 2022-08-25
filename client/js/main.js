import { createHeader } from "./header.js"
import { createHero } from "./hero.js"

(async () => {
    // Добавляем Header и Hero в body
    const header = createHeader();
    const hero = await createHero();

    document.body.append(header, hero);

    window.onload = () => {
        const preloader = document.querySelector('.preloader');

        const table = document.querySelector('.table');
        table.classList.add('table__active');

        const addBtn = document.querySelector('.add-client');
        addBtn.classList.add('add-client__active');

        preloader.classList.add('preloader--not-active')
    }
})();