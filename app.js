document.addEventListener("DOMContentLoaded", function (event) {
    
    var playerCar = $("#playerCar");
    var road = document.querySelector('.roadContainer');
    var roadWidth = road.clientWidth;
    var lineWidth = roadWidth / 7;
    var carPosition = 4;
    
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
    
    function divGenerator (event) {
        
        $('<div class="generatedCar"></div>').insertAfter(road);
        
    };
    divGenerator();
    
    document.addEventListener("keydown", function (event) {
        var offset = lineWidth;
        var pos = playerCar.position();
        if (event.keyCode == '39') {
            if (carPosition < 6) {
                playerCar.css('left', pos.left + offset);
                carPosition++;
            }
        }
        else if (event.keyCode == '37') {
            if (carPosition != 1) {
                playerCar.css('left', pos.left - offset);
                carPosition--;
            }
        }
    });
    
    
});