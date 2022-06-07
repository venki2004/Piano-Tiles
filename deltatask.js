
var boxNumbers = ['box1','box2','box3','box4','box5','box6','box7','box8','box9','box10','box11','box12','box13','box14','box15','box16'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".element").click(function() {

  var userChosenBox = $(this).attr("id");
  userClickedPattern.push(userChosenBox);

  playSound(userChosenBox);
  animatePress(userChosenBox);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length && level<10){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 16);
  var randomChosenBox =boxNumbers[randomNumber];
  gamePattern.push(randomChosenBox);

  $("#" + randomChosenBox).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(element);
}

function animatePress(currentBox) {
  $("#" + currentBox).addClass("pressed");
  setTimeout(function () {
    $("#" + currentBox).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
