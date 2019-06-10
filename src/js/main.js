import objectFitImages from 'object-fit-images';
import 'simplebar';
import PerfectScrollbar from 'perfect-scrollbar';
import Inputmask from 'inputmask';

document.addEventListener('DOMContentLoaded', function() {
  // Полифилл .contains для IE 11

  if (!SVGElement.prototype.contains) {
    SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
  }

  // Полифилл для CSS свойства ObjectFit(заполнение контейнера изображением)

  objectFitImages();

  // Градиенты

  const container = document.querySelector('.notary-table-padding-wrapper');
  let ps;

  if (container) {
    ps = new PerfectScrollbar(container, {
      maxScrollbarLength: 58,
      wheelSpeed: 0.1
    });

    const gradient = document.querySelector('.notary-table-wrapper');

    container.addEventListener('ps-scroll-y', () => {
      console.log(ps.reach.y);
      if (ps.reach.y === 'start') {
        gradient.classList.add('gradient-shown');
        gradient.classList.remove('top-gradient-shown');
      } else if (ps.reach.y === null) {
        gradient.classList.add('gradient-shown');
        if (gradient.classList.contains('need-top-gradient')) {
          gradient.classList.add('top-gradient-shown');
        }
      } else if (ps.reach.y === 'end') {
        gradient.classList.remove('gradient-shown');
        if (gradient.classList.contains('need-top-gradient')) {
          gradient.classList.add('top-gradient-shown');
        }
      }
    });
  }

  // Аккордеоны

  const accordeons = Array.from(document.querySelectorAll('.tariffs-accordeon'));

  accordeons.forEach(accordeon => {
    const button = accordeon.querySelector('.tariffs-title');
    const content = accordeon.querySelector('.tariffs-accordeon-content');

    // $(content).slideUp();

    button.addEventListener('click', function(evt) {
      evt.preventDefault();
      $(content).slideToggle(400, function() {
        ps.update();
      });
      accordeon.classList.toggle('open');
    });
  });

  ps.update();

  // Маска ввода

  const phoneNumber = document.querySelector('.review-text-input--phone');

  if (phoneNumber) {
    Inputmask({ mask: '+7(999)999-99-99', clearMaskOnLostFocus: false }).mask(phoneNumber);
    console.log('Yes');
  }

  // Панель поиска


  const searchInput = document.querySelector('#q')
  const panel = document.querySelector('.search-panel-results')

  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      panel.classList.add('shown')
    })
    searchInput.addEventListener('blur', function() {
      panel.classList.remove('shown')
    })
  }

  let searchPs;
  const resultsList = document.querySelector('.search-panel-results-list');
  if (resultsList) {
    searchPs = new PerfectScrollbar(resultsList, {
      maxScrollbarLength: 58,
      wheelSpeed: 0.1,
      wheelPropagation: false
    });

    const gradient = document.querySelector('.search-panel-gradient-wrapper');

    resultsList.addEventListener('ps-scroll-y', () => {
    
      if (searchPs.reach.y === 'start') {
        gradient.classList.add('gradient-shown');
      } else if (searchPs.reach.y === null) {
        gradient.classList.add('gradient-shown');
      } else if (searchPs.reach.y === 'end') {
        gradient.classList.remove('gradient-shown');
      }
    });
  }
});
