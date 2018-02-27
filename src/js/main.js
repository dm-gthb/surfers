'use strict';

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



// если about__description будет больше чем ....
// (так что about станет ощщутимо больше чем 640px высоты)
// то

// устанавливаем для about фиксированную высоту (например 640) и увечиваем margin-bottom




// document.addEventListener("DOMContentLoaded", function() {
//   var boardsScriptInner = document.getElementById("boards-template").innerHTML;
//   var compileBoardListTemplate = Handlebars.compile(boardsScriptInner);

//   $.ajax("./data/boards.json").done(function(data){
//     $('.board').html(compileBoardListTemplate(data));
//     console.log(compileBoardListTemplate(data));
//   });
// })





