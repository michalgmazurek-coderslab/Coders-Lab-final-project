document.addEventListener("DOMContentLoaded", function(event) {

    var playerCar = $("#playerCar");
    var road = $("#road");
    var windowHeight = $(window).height();
    var roadWidth = road.width();
    var lineWidth = roadWidth / 7;
    var carPosition = 3;
    var level = 5;
    var cars = 0;
    var canTurn = true;
    var offset = lineWidth;
    var randomCarPosition;
    var pos = playerCar.position();
    var currentCars = [];
    var carGeneratorInterval = setInterval(gameEngine, 500);
    setInterval(collision, 100);
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

    function collision() {
        // var currentRoad = $('#road');
        // console.log(pos);
        for (var i = 0; i < currentCars.length-1; i++) {
            // console.log(currentCars);
            if (currentCars[i].data('line') === carPosition) {
                console.log(carPosition);
                console.log("Możliwa Kolizja!!")
            }
        }

    }

    document.addEventListener("keydown", function(event) {
        var offset = lineWidth;
        var pos = playerCar.position();
        if (canTurn === true && event.keyCode == '39') {
            canTurn = false;
            if (carPosition < 5) {
                setTimeout(turnPossible, 400);
                playerCar.css('left', pos.left + offset);
                rightTurn();
                setTimeout(forward, 330);
                carPosition++;
                // collision();
                // console.log(carPosition);
            } else if (carPosition === 5) {
                turnPossible();
            }
        } else if (canTurn === true && event.keyCode == '37') {
            canTurn = false;
            if (carPosition != 0) {
                setTimeout(turnPossible, 400);
                leftTurn();
                setTimeout(forward, 330);
                playerCar.css('left', pos.left - offset);
                carPosition--;
                // console.log(carPosition);
                // collision();

            } else if (carPosition === 0) {
                turnPossible();
            }
        }
    });

    function gameEngine() {
        randomCar();
        // collision();
        recycleCars();
    };

    function divGenerator(line) {
        return $('<div class="generatedCar animateCar" data-line="'+line+'" ></div>');
    };

    function randomCar() {
        if (cars < level) {
            var randomBackground = Math.floor(Math.random() * 9) + 0;
            var randomLinePosition = Math.floor(Math.random() * 6) + 0;
            // console.log(randomLinePosition);
            var newCar = divGenerator(randomLinePosition);
            newCar.css('background-image', 'url(../img' + imagesArray[randomBackground] + ')');
            newCar.css('left', ($(window).width() * 0.067 + (offset * randomLinePosition)));

            // console.log("translate(" + $(window).width() * 0.067 + (offset * randomLinePosition) + ",0)");
            // newCar.css({"transform":"translate(" + $(window).width() * 0.067 + (offset * randomLinePosition) + ",0)"});
            // newCar.css({"transform":"translate(88.373263.79910714285717,0)"});
            // console.log(newCar);
            road.append(newCar);
            currentCars.push(newCar);
            cars++;
            // collision();
        }

    };

    function recycleCars() {
        var allCars = $(".generatedCar");
        var currentRoad = $('#road');
        for (var i = 0; i < currentCars.length ; i++) {

            if ($(allCars[i]).css("top").slice(0, -2) > windowHeight) {
                var randomBackground = Math.floor(Math.random() * 9) + 0;
                var randomLinePosition = Math.floor(Math.random() * 6) + 0;
                // console.log(randomLinePosition);

                currentRoad.find(".generatedCar:nth-child("+(i+1)+")")
                    .removeClass('animateCar')
                    .css('background-image', 'url(../img' + imagesArray[randomBackground] + ')')
                    .css('left', ($(window).width() * 0.067 + (offset * randomLinePosition)))
                    // .css({"transform":"translate(88.373263.79910714285717,0)"})
                    .addClass('animateCar')
                    .data('line', randomLinePosition);
            }
        }
        // collision();
    }

    function turnPossible() {
        canTurn = true;
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
