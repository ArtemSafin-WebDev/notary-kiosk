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
      if (ps.reach.y === null || ps.reach.y === 'start') {
        gradient.classList.add('gradient-shown')
      } else {
        gradient.classList.remove('gradient-shown')
      }
    });
  }
  
});
