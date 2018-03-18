'use strict';

// import $ from 'jquery';

var title = document.querySelector('.boards__title');
var boardSection = document.querySelector('.boards');
var minWidth = 768;
var viewportWidth = document.body.offsetWidth;


var getBoardSectionHeight = function() {
    var titleWidth = title.offsetWidth;
    var boardSectionHeight = boardSection.offsetHeight;

    if (viewportWidth >= minWidth && boardSectionHeight < titleWidth) {
      boardSection.style.height = titleWidth + 'px';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    getBoardSectionHeight();
});
