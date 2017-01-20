document.addEventListener("DOMContentLoaded", function (event) {
    var playerCar = document.querySelector("#playerCar");
    console.log(playerCar);
    var playerCarStyle = playerCar.style.left;
    var playerCarStyleNumber = Number(playerCarStyle);
    console.log(playerCarStyle);
    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 39) {
            console.log("right");
            playerCar.style.left = (playerCarStyleNumber + 1) + "%";
        }
        else if (event.keyCode === 37) {
            console.log("left");
            playerCar.style.left = (playerCarStyleNumber - 1) + "%";
        }
    });
});