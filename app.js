document.addEventListener("DOMContentLoaded", function(event) {

    var playerCar = $("#playerCar");
    var road = $("#road");
    var windowHeight = $(window).height();
    var roadWidth = road.width();
    var lineWidth = roadWidth / 7;
    var carPosition = 3;
    var level = 6;
    var cars = 0;
    var score = 0;
    var canTurn = true;
    var offset = lineWidth;
    var randomCarPosition;
    var pos = playerCar.position();
    var currentCars = [];
    var playerCarHeight = playerCar.css('height');

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

    var isLineFree = [
        [true, 0],
        [true, 0],
        [true, 0],
        [true, 0],
        [true, 0],
        [true, 0]
    ];

    var startBtn = $('#startBtn');
    var menuSection = $('#menu');
    var gameBody = $('#gameBody');

    startBtn.on('click', function() {
        menuSection.css('display', 'none');
        gameBody.css('visibility', 'visible');
        var carGeneratorInterval = setInterval(gameEngine, 800);
    });

    setInterval(collision, 100);

    function collision() {

        for (var i = 0; i < currentCars.length; i++) {
            if (currentCars[i].data('line') == carPosition) {
                var playerCarOffset = playerCar.offset().top;

                if ((currentCars[i].offset().top + parseInt(playerCarHeight) >= playerCarOffset) && (currentCars[i].offset().top - parseInt(playerCarHeight) <= 0.92 * playerCarOffset)) {
                    console.log('Ło kierwa działa!!!');
                }
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
                collision();
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
                collision();

            } else if (carPosition === 0) {
                turnPossible();
            }
        }
    });

    function gameEngine() {
        randomCar();
        recycleCars();
    };

    function divGenerator(line) {
        return $('<div class="generatedCar animateCar" data-line="' + line + '" ></div>');
    };
    // var randomLinePosition = Math.floor(Math.random() * 6) + 0;
    // function lineChecking () {
    //     var randomLinePosition = Math.floor(Math.random() * 6) + 0;
    //     if (isLineFree[randomLinePosition][0]) {
    //         isLineFree[randomLinePosition][0] = false;
    //         return randomLinePosition;
    //     }
    //     else {
    //         lineChecking();
    //     }
    // }
    //
    // function freeLine () {
    //
    // }


    function randomCar() {
        if (cars < level) {
            var randomBackground = Math.floor(Math.random() * 9) + 0;
            var randomLinePosition = Math.floor(Math.random() * 6) + 0;
            // var randomLinePosition = lineChecking();

            var newCar = divGenerator(randomLinePosition);
            newCar.css('background-image', 'url(./img' + imagesArray[randomBackground] + ')');
            newCar.css('left', ($(window).width() * 0.067 + (offset * randomLinePosition)));
            road.append(newCar);
            currentCars.push(newCar);
            cars++;
        }

    };

    function recycleCars() {
        var allCars = $(".generatedCar");
        var currentRoad = $('#road');
        var wH = $(window).height();
        console.log('wH value : ' + wH);

        for (var i = 0; i < currentCars.length; i++) {
            console.log($(allCars[i]).css("top"));
            if ($(allCars[i]).css("top").slice(0, -2) > wH) {
                console.log("Działa");
                // var randomBackground = lineChecking();
                var randomBackground = Math.floor(Math.random() * 9) + 0;
                var randomLinePosition = Math.floor(Math.random() * 6) + 0;
                // console.log(randomLinePosition);

                // currentRoad.find(".generatedCar:nth-child("+(i+1)+")")
                //     .removeClass('animateCar')
                //     .css('background-image', 'url(./img' + imagesArray[randomBackground] + ')')
                //     .css('left', ($(window).width() * 0.067 + (offset * randomLinePosition)))
                //     // .css({"transform":"translate(88.373263.79910714285717,0)"})
                //     .addClass('animateCar')
                //     .data('line', randomLinePosition);

                var myCar = currentRoad.find(".generatedCar:nth-child(" + (i + 1) + ")");
                myCar.removeClass('animateCar');
                myCar.css('background-image', 'url(./img' + imagesArray[randomBackground] + ')')
                    .css('left', ($(window).width() * 0.067 + (offset * randomLinePosition)));
                // .css({"transform":"translate(88.373263.79910714285717,0)"})
                myCar.addClass('animateCar')
                    .data('line', randomLinePosition);
                score++;
            }
        }
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
