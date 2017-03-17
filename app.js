document.addEventListener("DOMContentLoaded", function (event) {
    var playerCar = document.querySelector("#playerCar");
    console.log(playerCar);
    var playerCarStyle = playerCar.style.left;
    var playerCarStyleNumber = Number(playerCarStyle);
    
    console.log(playerCarStyle);
    
     var addLeft = function(x) {
        playerCar.css()("left", (playerCarStyle + x) + "vw");
        
    };
    
    
    document.addEventListener("keydown", function (event) {
        var offset = 12;
        var pos = $("#playerCar").position();
        console.log(pos);
        if(event.keyCode == '39') {    
            $("#playerCar").css('left', pos.left + offset);
        }
        else if(event.keyCode == '37') {
            $("#playerCar").css('left',pos.left - offset);
        }
        else if(event.keyCode == '38') {
            $("#playerCar").css('top',pos.top - offset);
        }
        else if(event.keyCode == '40') {
            $("#playerCar").css('top',pos.top + offset);
        }
    
    });
});