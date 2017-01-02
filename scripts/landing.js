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
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener('scroll', function(event) {
        console.log(event);
        console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + " pixels");
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);   
         }
    });
 });