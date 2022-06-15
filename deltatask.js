var boxNumbers = ['box1','box2','box3','box4','box5','box6','box7','box8','box9','box10','box11','box12','box13','box14','box15','box16'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener('keypress',function() {
  if (!started) {
    document.querySelector("#level-title").innerHTML =  "Level " + level ;
    nextSequence();
    started = true;
  }
});


for(var i=1 ; i< 17; i++){
  document.querySelector('#box' + i ).addEventListener('click',function() {
    var userChosenBox = this.getAttribute('id');
    console.log(userChosenBox);
    userClickedPattern.push(userChosenBox); 
  
    playSound();
    animatePress(userChosenBox);
  
    checkAnswer(userClickedPattern.length-1);
  });
}



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length && level<10){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      
      document.body.classList.add("game-over");
      document.querySelector("#level-title").innerHTML =  "Game Over, Press Any Key to Restart";

      setTimeout(function() {
        document.body.classList.remove("game-over");
      }, 200);

      startOver();

      
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").innerHTML =  "Level " + level;
  var randomNumber = Math.floor(Math.random() * 16);
  var randomChosenBox = boxNumbers[randomNumber];
  gamePattern.push(randomChosenBox);

  var temp = document.querySelector("#" + randomChosenBox);
  temp.style.backgroundColor = "red";
  setTimeout(function(){
    temp.style.backgroundColor = "rgb(235, 71, 6)"
  },1000);
  playSound();
}

function animatePress(currentBox) {
  document.querySelector("#" + currentBox).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + currentBox).classList.remove("pressed");
  }, 100);
}

function playSound(sound) {
  var audio = new Audio("sounds/element.mp3");
  audio.play();
}

function startOver() {
  level = 0;
  //gamePattern = [];
  started = false;
}


