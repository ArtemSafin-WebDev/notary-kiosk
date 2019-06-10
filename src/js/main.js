import objectFitImages from 'object-fit-images';
import 'simplebar';
import PerfectScrollbar from 'perfect-scrollbar';

document.addEventListener('DOMContentLoaded', function() {
  // Полифилл .contains для IE 11

  if (!SVGElement.prototype.contains) {
    SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
  }

  // Полифилл для CSS свойства ObjectFit(заполнение контейнера изображением)

  objectFitImages();

  const container = document.querySelector('.notary-table-padding-wrapper');

  if (container) {
    const ps = new PerfectScrollbar(container, {
      maxScrollbarLength: 58,
      wheelSpeed: 0.1
    });


    const gradient = document.querySelector('.notary-table-wrapper')

    container.addEventListener('ps-scroll-y', () => {
      console.log(ps.reach.y)
      if (ps.reach.y === 'start') {
        gradient.classList.add('gradient-shown')
        gradient.classList.remove('top-gradient-shown')
      } else if (ps.reach.y === null) {
        gradient.classList.add('gradient-shown')
        if (gradient.classList.contains('need-top-gradient')) {
          gradient.classList.add('top-gradient-shown')
        }
      } else if (ps.reach.y === 'end') {
        gradient.classList.remove('gradient-shown')
        if (gradient.classList.contains('need-top-gradient')) {
          gradient.classList.add('top-gradient-shown')
        }
      }

    });
  }
  
});
