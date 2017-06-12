$(document).ready(function() {

    var playerCar = $("#playerCar");
    var road = $("#road");
    var windowHeight = $(window).height();
    var roadWidth = road.width();
    var lineWidth = roadWidth / 7;
    var carPosition = 3;
    var level = 5;
    var cars = 0;
    var score = 0;
    var canTurn = true;
    var offset = lineWidth;
    var randomCarPosition;
    var pos = playerCar.position();
    var currentCars = [];
    var playerCarHeight = playerCar.css("height");
    var turnLeftButton = $("#turnLeft");
    var turnRightButton = $("#turnRight");
    var topTenArray = [];
    var startBtn = $("#startBtn");
    var menuSection = $("#menu");
    var gameBody = $("#gameBody");
    var addScoreBtn = $("#addScoreBtn");
    var flag = 1;
    var imagesArray = [
        "/Ambulance.png",
        "/Black_viper.png",
        "/Mini_truck.png",
        "/Mini_van.png",
        "/Police.png",
        "/truck.png",
        "/Car.png",
        "/taxi.png",
        "/Ambulance.png"
    ];
    var isLineFree = [
        true,
        true,
        true,
        true,
        true,
        true
    ];

    setInterval(collision, 100);
    $(".bcgMusic")[0].volume = 0.3;

    $(window).resize(function() {
        road = $("#road");
        windowHeight = $(window).height();
        roadWidth = road.width();
        lineWidth = roadWidth / 7;
        offset = lineWidth;

    });

    turnLeftButton.on("touchstart", function(event) {
        var offset = lineWidth;
        var pos = playerCar.position();

        if (canTurn === true) {
            canTurn = false;
            if (carPosition != 0) {
                setTimeout(turnPossible, 400);
                leftTurn();
                setTimeout(forward, 330);
                playerCar.css("left", pos.left - offset);
                carPosition--;
            } else if (carPosition === 0) {
                turnPossible();
            }
        }
    });

    turnRightButton.on("touchstart", function(event) {
        var offset = lineWidth;
        var pos = playerCar.position();

        if (canTurn === true) {
            canTurn = false;
            if (carPosition < 5) {
                setTimeout(turnPossible, 400);
                playerCar.css("left", pos.left + offset);
                rightTurn();
                setTimeout(forward, 330);
                carPosition++;
            } else if (carPosition === 5) {
                turnPossible();
            }
        }
    });

    $(document).on("keydown", function turns(event) {
        var offset = lineWidth;
        var pos = playerCar.position();

        if (canTurn === true && event.keyCode == "39") {
            canTurn = false;
            if (carPosition < 5) {
                setTimeout(turnPossible, 400);
                playerCar.css("left", pos.left + offset);
                rightTurn();
                setTimeout(forward, 330);
                carPosition++;
            } else if (carPosition === 5) {
                turnPossible();
            }
        } else if (canTurn === true && event.keyCode == "37") {
            canTurn = false;
            if (carPosition != 0) {
                setTimeout(turnPossible, 400);
                leftTurn();
                setTimeout(forward, 330);
                playerCar.css("left", pos.left - offset);
                carPosition--;
            } else if (carPosition === 0) {
                turnPossible();
            }
        }
    });

    startBtn.on("click", function() {
        menuSection.css("display", "none");
        gameBody.css("visibility", "visible");
        var carGeneratorInterval = setInterval(gameEngine, 1100);
    });
    addScoreBtn.on("click", function(event) {
        event.preventDefault();
    });
    addScoreBtn.one("click", function(event) {
        event.preventDefault();
        var userNameInputValue = $("#nameInput").val();

        if (userNameInputValue.length > 11) {
            alert("Username too long!");
        } else {
            firebase.database().ref().push({
                userName: userNameInputValue,
                score: score * 10
            }, function() {
                var topScores = firebase.database().ref().orderByChild('score').limitToLast(10).on('value', function(fbdata) {
                    var myDatabaseObject = fbdata.exportVal();
                    var keys = Object.keys(myDatabaseObject);
                    var myResults = [];

                    keys.forEach(function(key) {
                        var data = myDatabaseObject[key]
                        myResults.push(data);
                    });

                    var sortedObjectsArray = myResults.sort(function(a, b) {
                        return b.score - a.score;
                    });

                    $("#gameOverSection").fadeOut("slow");
                    setTimeout(function() {
                        $("#topTenSection").removeClass("hidden").fadeIn("slow").css("display", "flex");
                    }, 800);
                    $("#gameOverSection").fadeOut("slow");
                    setTimeout(function() {
                        $("#topTenSection").removeClass("hidden").fadeIn("slow").css("display", "flex");
                    }, 800);
                    for (var i = 0; i < sortedObjectsArray.length; i++) {

                        $("#topTenScores").append("<li><h3>" + (i + 1) + ".&nbsp;" + sortedObjectsArray[i].userName + "&nbsp;:&nbsp;" + sortedObjectsArray[i].score + "</h3></li>");
                    }
                });
            });
        }
    });

    $("#playAgainBtn").one("click", function() {
        location.reload();
    });
    if (window.innerHeight > window.innerWidth) {
        function setLevel() {
            if (score <= 30 && score % 6 == 0) {
                level++;
            } else if (score <= 100 && score % 30 == 0) {
                level++;
            } else if (score <= 300 && score % 100 == 0) {
                level++;

            } else if (score > 300 && score % 200 == 0) {
                level++;
            }
        }
    } else {
        level = 4;

        function setLevel() {
            if (score <= 30 && score % 15 == 0) {
                level++;
            } else if (score <= 100 && score % 35 == 0) {
                level++;
            } else if (score <= 300 && score % 150 == 0) {
                level++;
            } else if (score > 300 && score % 250 == 0) {
                level++;
            }
        }
    }

    function clearLine(lineNumber) {
        setTimeout(function() {
            isLineFree[lineNumber] = true;
        }, 1200);
    }

    function collision() {

        for (var i = 0; i < currentCars.length; i++) {
            if (currentCars[i].data("line") == carPosition) {
                var playerCarOffset = playerCar.offset().top;

                if ((currentCars[i].offset().top + parseInt(playerCarHeight) >= parseInt(playerCarOffset) * 0.97) && (currentCars[i].offset().top - parseInt(playerCarHeight) <= 0.92 * playerCarOffset)) {
                    var crashSound = $(".crashSound")[0];
                    flag = 0;
                    crashSound.volume = 1;
                    crashSound.play();
                    $("#road").css("animation", "none");
                    currentCars = [];
                    $("#gameBody").fadeOut("slow");
                    $("#scoreToAdd").html(score * 10);
                    $("#gameOverSection").css("display", "flex");
                    $(".gameOver").fadeIn("slow");
                    setTimeout(function() {
                        $(".gameOver").fadeOut("slow");
                    }, 1600);
                    setTimeout(function() {
                        $(".yourScore").css("display", "flex");
                    }, 2200);
                }
            }
        }
    }

    function gameEngine() {
        randomCar();
    }

    function divGenerator(line) {
        return $("<div class='generatedCar animateCar' data-line='" + line + "' ></div>");
    }

    function randomCar() {
        if (cars < level) {
            var randomLinePosition = Math.floor(Math.random() * 6) + 0;
            if (flag == 0) {
                return false;
            } else if (isLineFree[randomLinePosition]) {
                var randomBackground = Math.floor(Math.random() * 9) + 0;
                var newCar = divGenerator(randomLinePosition);
                newCar.css("background-image", "url(./img" + imagesArray[randomBackground] + ")");
                newCar.css("left", ($(window).width() * 0.067 + (offset * randomLinePosition)));
                road.append(newCar);
                currentCars.push(newCar);
                cars++;
                isLineFree[randomLinePosition] = false;
                clearLine(randomLinePosition);
                setTimeout(function() {
                    recycleAgain(randomLinePosition, newCar);
                }, 6000);
            } else {
                randomCar();
            }
        }
    }

    function recycleAgain(i, car) {
        var currentRoad = $("#road");
        var randomLinePosition = Math.floor(Math.random() * 6) + 0;
        var randomBackground = Math.floor(Math.random() * 9) + 0;
        if (flag == 0) {
            return false;
        } else if (isLineFree[randomLinePosition]) {
            var random = Math.floor(Math.random() * 6) + 0;
            var myCar = car;
            console.log(car, "car " + i);
            console.log(isLineFree, "wolna linia");
            console.log(currentCars, "fury")
            console.log(myCar.data("line"), "dane")
            myCar.css("animate", "");
            myCar.css("background-image", "url(./img" + imagesArray[randomBackground] + ")").css("left", ($(window).width() * 0.067 + (offset * randomLinePosition)));
            myCar.data("line", randomLinePosition);
            score++;
            setLevel();
            $("#playerScore span").html(score * 10);
            isLineFree[randomLinePosition] = false;
            clearLine(randomLinePosition);
            setTimeout(function() {
                recycleAgain(randomLinePosition, myCar);
            }, 6000);
        } else {
            setTimeout(function() {
                recycleAgain(i, car);
            }, 20);
        }
    }

    function turnPossible() {
        canTurn = true;
    }

    function leftTurn() {
        playerCar.removeClass("turnRight");
        playerCar.addClass("turnLeft");
    }

    function rightTurn() {
        playerCar.removeClass("turnLeft");
        playerCar.addClass("turnRight");
    }

    function forward() {
        playerCar.removeClass("turnLeft turnRight");
        playerCar.addClass("Forward");
    }
});
