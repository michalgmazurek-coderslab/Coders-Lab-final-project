document.addEventListener("DOMContentLoaded", function(event) {

    var playerCar = $("#playerCar");
    var road = $("#road");
    var windowHeight = $(window).height();
    var roadWidth = road.width();
    var lineWidth = roadWidth / 7;
    var carPosition = 4;
    var level = 5;
    var cars = 0;
    var canTurn = true;
    var offset = lineWidth;
    var randomCarPosition;
    var pos = playerCar.position();
    var currentCars = [];
    var carGeneratorInterval = setInterval(gameEngine, 500);
    // console.log(roadWidth, lineWidth, offset, $(window).width());

    var imagesArray = [
        "/Ambulance.png",
        "/Black_viper.png",
        "/Mini_truck.png",
        "/Mini_van.png",
        "/Police.png",
        "/truck.png",
        "/Car.png",
        "/taxi.png",
        "/Ambulance.png",
    ];

    document.addEventListener("keydown", function(event) {
        var offset = lineWidth;
        var pos = playerCar.position();
        if (canTurn === true && event.keyCode == '39') {
            canTurn = false;
            if (carPosition < 6) {
                setTimeout(turnPossible, 400);
                playerCar.css('left', pos.left + offset);
                rightTurn();

                setTimeout(forward, 330);
                carPosition++;
                console.log(carPosition, canTurn);
            } else if (carPosition === 6) {
                turnPossible();
            }
        } else if (canTurn === true && event.keyCode == '37') {
            canTurn = false;
            if (carPosition != 1) {
                setTimeout(turnPossible, 400);
                leftTurn();
                setTimeout(forward, 330);
                playerCar.css('left', pos.left - offset);
                carPosition--;
                console.log(carPosition, canTurn);
            } else if (carPosition === 1) {
                turnPossible();
            }
        }
    });

    function gameEngine() {
        randomCar();
        recycleCars();
    };

    function divGenerator() {
        return $('<div class="generatedCar animateCar"></div>');
    };

    function randomCar() {
        if (cars < level) {
            var randomBackground = Math.floor(Math.random() * 9) + 0;
            var randomLinePosition = Math.floor(Math.random() * 6) + 0;
            var newCar = divGenerator();
            newCar.css('background-image', 'url(../img' + imagesArray[randomBackground] + ')');
            newCar.css('left', ($(window).width() * 0.067 + (offset * randomLinePosition)));
            // console.log("translate(" + $(window).width() * 0.067 + (offset * randomLinePosition) + ",0)");
            // newCar.css({"transform":"translate(" + $(window).width() * 0.067 + (offset * randomLinePosition) + ",0)"});
            newCar.css({"transform":"translate(88.373263.79910714285717,0)"});

            road.append(newCar);
            currentCars.push(newCar);
            cars++;
        }

    };

    function recycleCars() {
        var allCars = $(".generatedCar");
        var currentRoad = $('#road');
        for (var i = 0; i < currentCars.length ; i++) {

            if ($(allCars[i]).css("top").slice(0, -2) > windowHeight) {
                var randomBackground = Math.floor(Math.random() * 9) + 0;
                var randomLinePosition = Math.floor(Math.random() * 6) + 0;
                currentRoad.find(".generatedCar:nth-child("+(i+1)+")")
                    .removeClass('animateCar')
                    .css('background-image', 'url(../img' + imagesArray[randomBackground] + ')')
                    .css('left', ($(window).width() * 0.067 + (offset * randomLinePosition)))
                    // .css({"transform":"translate(88.373263.79910714285717,0)"})
                    .addClass('animateCar');

            }
        }
    }

    function turnPossible() {
        canTurn = true;
        console.log("can turn");
    };

    function leftTurn() {
        playerCar.removeClass('turnRight');
        playerCar.addClass('turnLeft');
    };

    function rightTurn() {
        playerCar.removeClass('turnLeft');
        playerCar.addClass('turnRight');
    };

    function forward() {
        playerCar.removeClass('turnLeft');
        playerCar.removeClass('turnRight')
        playerCar.addClass('Forward');
    };

});
