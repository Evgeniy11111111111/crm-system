import { preloaderSvg } from "./svg.js";

export function createPreloader() {
    const preloaderBlock = document.createElement('div');
    const preloader = document.createElement('div');

    preloaderBlock.classList.add('preloader');
    preloader.classList.add('preloader__img');
    
    preloader.innerHTML = preloaderSvg;
    
    preloaderBlock.append(preloader);

    return preloaderBlock;
}