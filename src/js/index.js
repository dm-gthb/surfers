'use strict';

import $ from 'jquery';
import 'slick-carousel';
// import Flickity from 'flickity';

// var title = document.querySelector('.boards__title');
// var boardSection = document.querySelector('.boards');
// var minWidth = 768;
// var viewportWidth = document.body.offsetWidth;


// var getBoardSectionHeight = function() {
//     var titleWidth = title.offsetWidth;
//     var boardSectionHeight = boardSection.offsetHeight;

//     if (viewportWidth >= minWidth && boardSectionHeight < titleWidth) {
//       boardSection.style.height = titleWidth + 'px';
//     }
// };

// document.addEventListener('DOMContentLoaded', () => {
//     getBoardSectionHeight();
// });


$('.boards__slider-items').slick({
  dots: false,
  infinite: false,
  draggable: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: $('.boards__slider-pointer--prev'),
  nextArrow: $('.boards__slider-pointer--next')
});

$('.team__slider-items').slick({
  mobileFirst: true,
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: $('.team__slider-pointer--prev'),
  nextArrow: $('.team__slider-pointer--next'),
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    }
  ]
});


 $('.board__img-container-to-show').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  fade: true,
  asNavFor: '.board__images-preview'
});

$('.board__images-preview').slick({
  mobileFirst: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.board__img-container-to-show',
  dots: false,
  arrows: false,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        vertical: true
      }
    }
  ]
});

