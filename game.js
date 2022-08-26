var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];
var gameStarted = false;
var level = 0;
var curWaitDuration = 0;
const fadeDuration = 120;
//var randomChosenColour;

$(document).on("keypress", function () {
    if(!gameStarted){
        $("#level-title").text("Level 0");
        nextSequence();
        gameStarted = true;
    }
});


$("div.btn").on("click", function (evt) {
    onColourClicked(evt);
});

function nextSequence(){
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    gamePattern.forEach(
        function (colour, index) {
        setTimeout(() => {
            playNextColour(colour);
        },  curWaitDuration * index);
    });
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern= [];
}

function playNextColour(colour){
    $("#"+colour). fadeOut(fadeDuration).fadeIn(fadeDuration);
    playSound(colour);
}

function onColourClicked(evt) {
    var userChosenColour = evt.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    //Detecting if the order was right
    var patternLenght = userClickedPattern.length

    
        if(userChosenColour==gamePattern[patternLenght-1]){
            //Continue the game or if everything was correct, advance
            if(userClickedPattern.length==gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },500);
            }
        }
        else{
            gameOver();
        }
    
}


function playSound(colour){
    var audio = new Audio('sounds/'+colour+'.mp3');
    audio.onloadedmetadata = function(){
        curWaitDuration = audio.duration*1000;
        audio.play();
    }

}

function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function(){
        $('#'+currentColour).removeClass("pressed");
    },100);
}

function gameOver(){
    new Audio('sounds/wrong.mp3').play();
    $("#level-title").html('You Lost!</br>Press Any Key to Restart');
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false;
    $('body').addClass("game-over");
    setTimeout(function(){
        $('body').removeClass("game-over");
    },200);
}