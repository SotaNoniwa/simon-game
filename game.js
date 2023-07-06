
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let isGameStarted = false;

let level = 0;

$(document).on("keydown", function () {
    if (!isGameStarted) {
        isGameStarted = true;
        nextSequence();
    }

    $("#level-title").text("Level " + level);
});

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log("user " + userClickedPattern);
    console.log("game " + gamePattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(".btn#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);

    // audio doesn't work without interaction
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(".btn#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $(".btn#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (currentLevel + 1 == gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }

    } else {
        console.log("wrong");

        let gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isGameStarted = false;
}