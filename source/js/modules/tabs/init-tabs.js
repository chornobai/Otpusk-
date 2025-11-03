import {Tabs} from './tabs.js';

let tabs;

const initTabs = () => {
  const parent = document.querySelector('.tabs--cards'); // родитель
  const elements = parent.querySelectorAll('.card-element'); // карточки
  const breakpoint = window.matchMedia('(max-width: 1023px)');

  const handleResize = () => {
    if (breakpoint.matches) {
      // <1024px — включаем табы
      parent.setAttribute('data-tabs', 'parent');
      elements.forEach(el => el.setAttribute('data-tabs', 'element'));
      if (!tabs) {
        tabs = new Tabs();
        window.tabs = tabs;
      } else {
        tabs.reInit();
      }
    } else {
      // >=1024px — убираем табы
      parent.removeAttribute('data-tabs');
      elements.forEach(el => el.removeAttribute('data-tabs'));

      // сброс высоты и активных классов
      const content = parent.querySelector('[data-tabs="content"]');
      if (content) content.style.height = null;
      elements.forEach(el => el.classList.remove('is-active'));
      const controls = parent.querySelectorAll('[data-tabs="control"]');
      controls.forEach(ctrl => ctrl.classList.remove('is-active'));
    }
  };

  breakpoint.addEventListener('change', handleResize);
  handleResize();
};

export {initTabs, tabs};
