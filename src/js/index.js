'use strict';

import $ from 'jquery';
import 'slick-carousel';
import _ from 'lodash';

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

var $status = $('.boards__slider-counter');
var $slickElement = $('.boards__slider-items');

$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + slick.slideCount);
});

$slickElement.slick({
  dots: false,
  infinite: true,
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



document.addEventListener("DOMContentLoaded", function() {

  var toggler = document.getElementById('toggler');
  var mainNav = document.querySelector('.main-nav');
  var headerSocial = document.querySelector('.page-header__social');
  var headerPromoText = document.querySelector('.page-header__promo');
  var main = document.querySelector('.main');
  var mainNavHeight;

  var getMainNavHeight = function() {
    mainNavHeight = mainNav.offsetHeight;
    return mainNavHeight;
  }

  function mainNavVisibleToggle(event) {
    event.preventDefault();
    getMainNavHeight();
    toggler.classList.toggle('toggler--close');
    mainNav.classList.toggle('main-nav--active');
    headerPromoText.classList.toggle('page-header__promo--transformed');

    var mainTranslateValue = mainNavHeight - 250;
    var mainTranslateStringValue = 'translateY' + '(' + mainTranslateValue + 'px' + ')';

    var socialTranslateValue = mainNavHeight - 50;
    var socialTranslateStringValue = 'translate' + '(' + '-50%' + ',' + socialTranslateValue + 'px' + ')';

    if (toggler.classList.contains('toggler--close')) {
      toggler.setAttribute('aria-pressed', 'true');
      main.style.transform = mainTranslateStringValue;
      headerSocial.style.transform = socialTranslateStringValue;
      headerSocial.style.opacity = '1';
      console.log(mainTranslateStringValue);
    } else {
      toggler.setAttribute('aria-pressed', 'false');
      console.log(mainNavHeight);
      main.style.transform = 'translateY(0px)';
      headerSocial.style.transform = 'translate(-50%, 0px)';
      headerSocial.style.opacity = '0';
    }
  }

  if (toggler) {
    toggler.addEventListener('click', mainNavVisibleToggle);
  }

  window.addEventListener('resize', _.throttle(getMainNavHeight, 100));

});
