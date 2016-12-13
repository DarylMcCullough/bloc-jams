var animatePoints = function() {

    var points = document.getElementsByClassName('point');

    var revealFirstPoint = function() {
        points[0].style.opacity = 1;
        points[0].style.transform = "scaleX(1) translateY(0)";
        points[0].style.msTransform = "scaleX(1) translateY(0)";
        points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
        points[0].style.backgroundColor = "blue";
        var title = points[0].getElementsByTagName("h5");
        title = title[0];
        title.style.fontSize = "60px";
    };

    var revealSecondPoint = function() {
        points[1].style.opacity = 1;
        points[1].style.transform = "scaleX(1) translateY(0)";
        points[1].style.msTransform = "scaleX(1) translateY(0)";
        points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    var revealThirdPoint = function() {
        points[2].style.opacity = 1;
        points[2].style.transform = "scaleX(1) translateY(0)";
        points[2].style.msTransform = "scaleX(1) translateY(0)";
        points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    revealFirstPoint();
    revealSecondPoint();
    revealThirdPoint();

};