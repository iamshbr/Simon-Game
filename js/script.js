var randomColor = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userChosenColor = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var color = $(this).attr("id");
  userChosenColor.push(color);
  $("." + color).addClass("pressed");
  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }, 100);
  makeSound(color);
  checkAnswer(userChosenColor.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomGameColor = randomColor[randomNumber];
  gamePattern.push(randomGameColor);
  animateButton(randomGameColor);
  makeSound(randomGameColor);
  level++;
  $("#levelText").text("Level " + level);
}

function animateButton(colorName) {
  $("#" + colorName)
    .fadeOut(100)
    .fadeIn(100);
}

function makeSound(soundName) {
  var audio = new Audio("sounds/" + soundName + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenColor[currentLevel]) {
    if (gamePattern.length === userChosenColor.length) {
      setTimeout(function () {
        nextSequence();
        userChosenColor = [];
      }, 1000);
    }
  } else {
    $("#levelText").text("Game Over, Press Any Key to Restart");
    makeSound("wrong");
    gamePattern = [];
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
  }
}
