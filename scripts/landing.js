var pointsArray = document.getElementsByClassName('point');

var animatePoints = function() {
    var revealPoint = function() {
        $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
         });
    };
    
    $.each($('.point'), revealPoint);
};

$(window).load(function() {
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    //var sellingPoints = document.getElementsByClassName('selling-points')[0];
    //var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
     $(window).scroll(function(event) {
         if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
         }
     });
    
 });