document.addEventListener("DOMContentLoaded", function(event) {

    var playerCar = $("#playerCar");
    var road = document.querySelector('.roadContainer');
    var roadWidth = road.clientWidth;
    var lineWidth = roadWidth / 7;
    var carPosition = 4;
    var canTurn = true;

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

    function divGenerator(event) {

        $('<div class="generatedCar"></div>').insertAfter(road);

    };
    divGenerator();

    document.addEventListener("keydown", function(event) {
        var offset = lineWidth;
        var pos = playerCar.position();
        if (canTurn === true && event.keyCode == '39') {
            canTurn = false;
            if (carPosition < 6) {
                setTimeout(turnPossible, 400);
                playerCar.css('left', pos.left + offset);
                carPosition++;
                console.log(carPosition, canTurn);
            }
            else if (carPosition === 6) {
                turnPossible();
            }
        } else if (canTurn === true && event.keyCode == '37') {
            canTurn = false;
            if (carPosition != 1) {
                setTimeout(turnPossible, 400);
                playerCar.css({'transition' : 'rotate(20deg)'});
                playerCar.css('left', pos.left - offset);
                playerCar.css({'transition' : 'rotate(40deg)'});
                carPosition--;
                console.log(carPosition, canTurn);
            }
            else if (carPosition === 1) {
                turnPossible();
            }
        }
    });

    function turnPossible() {
        canTurn = true;
        console.log("can turn");
    }

});
