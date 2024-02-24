var colors=["green","blue","yellow","red"];
var gamePattern=[];
var buttonUserClicked=[];
var started=false;
var level=0;
$(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSecunce();
        started=true;
    }
});
$(".btn").click(function () {
    var buttonUserClick= $(this).attr("id");
    buttonUserClicked.push(buttonUserClick);
    
    playSound(buttonUserClick);
    animatepress(buttonUserClick);
    cheqeanswer(buttonUserClicked.length-1);
});

function playSound(soundPlayed) {
    var audio=new Audio("sounds/"+soundPlayed+".mp3");
    audio.play();
}
function animatepress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentcolor).removeClass("pressed");
    },100);
}
function cheqeanswer(currentlevel) {
    
    if (gamePattern[currentlevel]===buttonUserClicked[currentlevel]) {
        console.log("pass");
        console.log(gamePattern);
        console.log(buttonUserClicked);
        if (gamePattern.length===buttonUserClicked.length) {
            setTimeout(function () {
                nextSecunce();
            },1000);
        }
    }else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },400);
        $("h1").text("game over , enter any key to restart");
        startedover();
    }
    
}
function nextSecunce() {
    buttonUserClicked=[];
    
    level++;
    $("h1").text("level "+level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=colors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function startedover() {
    gamePattern=[];
    level=0;
    started=false;
}
