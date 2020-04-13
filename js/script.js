let score  =0;
let playing = false;
let trialsleft;
let step;
let action;
let fruits = ['photo1','photo2','photo3','photo4','photo5','photo6','photo7',
'photo8','photo9'];
$(function(){
    //click on start reset buuton
    $("#startreset").click(function(){
        //if we are playing
        if(playing == true){
            //reload page
            location.reload();
        }else{
            //if we are not playing
            playing = true; //game initiated
            //set score to 0
            score = 0;  //set score to 0
            $("#scorevalue").html(score);
            //show trials left
            $("#trialsleft").show();
            trialsleft = 3;
            addHearts();
            //hide game over box
            $("#gameover").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game");
            startAction();
        }

        
    })

//slice and sound of cut fruit
$("#fruit1").mouseover(()=>{
    score +=5;
    $("#scorevalue").html(score);
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();     //it return array so we use index[0]

    // stop the fruit
    clearInterval(action);
    //hide fruit
    $("#fruit1").hide("explode",500)    //slice fruit

    setTimeout(() => {
        startAction();
    }, 500);
})

//functions
function addHearts(){
    $("#trialsleft").empty();
    for(let i = 0; i< trialsleft ; i++){
        $("#trialsleft").append("<img src='img/heart.png' class='life'>");
    }
}

//start sending fruits
function startAction(){
    $("#fruit1").show();
    choosefruit();  //choose random fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()),
'top':-50});
//generate a random step 
step = 1 + Math.round(5*Math.random()); //to change step
action = setInterval(() => {
    $("#fruit1").css('top',$("#fruit1").position().top + step);

    // check if fruit is too low
    if($("#fruit1").position().top > $("#fruitcontainer").height()){
        //check if we have trials left
        if(trialsleft > 1){
            $("#fruit1").show();
            choosefruit();  //choose random fruit
            $("#fruit1").css({'left':Math.round(550*Math.random()),
            'top':-50});
            //generate a random step 
            step = 1 + Math.round(5*Math.random());
            //reduce trial by one
            trialsleft --;
            //populate trialsbox
            addHearts();
        }else{
            playing = false ; // we are not playing
            $("#startreset").html("start Game");
            $("#gameover").show();
            $("#gameover").html('<p>Game over!</p><p>your score is '+ score+'</p><audio controls autoplay><source src="video/music.mp3" type="audio/mp3"></audio>')
            $("#trialsleft").hide();
            stop();
            audio.pause();
            audio.currentTime = 0;
            
            

        }
    }
}, 10);

}

//generate a random fruit
function choosefruit(){
    $("#fruit1").attr('src','img/'+ fruits[Math.round(8*Math.random())] +'.PNG');
}

//stop create fruits
let stop = () => {
    clearInterval(action);
    $("#fruit1").hide();
}

});
