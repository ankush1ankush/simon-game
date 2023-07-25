var buttonColours=["red", "blue", "green", "yellow"];
var userPattern=[];
var gamepattern=[];
var start =false;
var level=0;
function Random(){
    var x=Math.floor(4*(Math.random()));
    return x;
}
function soundPlay(colorChosen)
{
    $("#"+colorChosen).fadeOut(150).fadeIn(150); // 
    var audio=new Audio("sounds/"+colorChosen+".mp3");
    audio.play();
}

function fadeInFadeOut(randomChosenColour)
{
    $("#"+randomChosenColour).fadeOut(150).fadeIn(150); // 
    var audio=new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();
}

function nextSequence(){
    level++;
    $("#level-title").text(`Level ${level}`)
    var colorChosen=buttonColours[Random()];
    gamepattern.push(colorChosen);
    fadeInFadeOut(colorChosen);
    soundPlay(colorChosen);
}
function animation(userColor)
{
    $("#"+userColor).addClass("pressed");// add pressed class
                    
    setTimeout(
        function(){
            $("#"+userColor).removeClass("pressed"); // remove press class
               },80);  
     audio=new Audio("sounds/"+userColor+".mp3");
     audio.play();
    
}
function checkAnswer(currentLevel)
{
    if(userPattern[currentLevel]===gamepattern[currentLevel])
    {
        if(userPattern.length===gamepattern.length)
        {
            userPattern=[];
            setTimeout(function () {
                nextSequence();
              }, 1000);

        }
    }
    else{
           $("body").addClass("red game-over");
           var wrong=new Audio("sounds/wrong.mp3");
           wrong.play();
           setTimeout(function(){
           $("body").removeClass("red game-over");

           },300)
           $("#level-title").text("Game Over, Press Any Key to Restart")
           startOver();
    }
}
function startOver(){
    start=false;
    gamepattern=[];
    level=0;
    userPattern=[];
}
$(document).keypress(function(){
    if(!start)
    {
        nextSequence();
        start=true;
    }
});
if(start===true){
$(".btn").click(
    function(event){
    var userColor=event.currentTarget.id;
    animation(userColor);
    soundPlay(userColor);
    userPattern.push(userColor);
    checkAnswer(userPattern.length-1);

    });
}

  
            
        

        
      
    

