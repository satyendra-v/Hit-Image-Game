gameLength = 30;//Time
timerID = null;
var currentPos = -1;
var randomVar = -1;
var playing = false;
var numHoles = 6 * 5;
var highScore = 0;
var ranImage = ["images/birdbg.jpg","images/one.jpg","images/two.jpg"];


let click = new Audio();
click.src = "audio/left.mp3";
let crct = new Audio();
crct.src = "audio/plus.mp3";
let wrng = new Audio();
wrng.src = "audio/minus.mp3";
let tmr = new Audio();
tmr.src = "audio/timer.mp3";

/*function launchSet(){
    for(var i=1;i<31;i++){
        var board = document.createElement('span');
        board.id = "s"+i;
        board.class = "dot";
        $('set').append(board);
    }
}*/

function clearHoles() {//Setting all holes to default image.
    for (var k = 1; k <= numHoles; k++)
        document.getElementById("s" + k).src = "images/bird.jpg";
}

function stopTimer() {//Stopping timer when time is up or reset button is clicked.
    if(playing)
        clearTimeout(timerID);
}

function showTime(remTime) {//timer function 
    document.getElementById("timeNumber").innerHTML = remTime;
    if (playing) {
        if (remTime == 0) {
            clearHoles();
            stopGame();
            return;
        }
        else {
            temp = remTime - 1;
            if(temp == 5) tmr.play();
            timerID = setTimeout("showTime(temp)", 1000);
        }
    }
}

function stopGame() {//stops the game when time is up or reset button is clicked.
    stopTimer();//stops timer
    playing = false;//changing palying status
    document.getElementById("timeNumber").innerHTML = 0;//setting time to 0
    clearHoles(); //clearing holes
    display("Game Over"); 
    document.getElementById("oddImage").src = "images/gify.gif";
    alert('Game Over.\nYour score is:  ' + totalHits);
    document.getElementById("start").innerHTML = "start";
    document.getElementById("timeNumber").innerHTML = 30;
    document.getElementById("accuracyNumber").innerHTML = (totalHits/23).toFixed(2);
    if(totalHits > highScore){
        highScore = totalHits;
        document.getElementById("highScoreNumber").innerHTML = highScore;
    }
    document.getElementById("accuracyNumber").innerHTML = 0;
    document.getElementById("scoreNumber").innerHTML = 0;
}

//Invoked when start button is clicked.
function play() { 
    click.play();//Sound
    stopTimer();//Setting timer if new game started, or clear's time when stop action is occured.
    document.getElementById("start").innerHTML = "stop";//Changing button name
    if (playing){ //If we want to stop the game in middle by clicking stop button.
        stopGame();
        return;
    }
    playing = true;
    clearHoles();//initially setting all images to default one
    totalHits = 0;//score
    document.getElementById("scoreNumber").innerHTML = totalHits;
    display("Playing");
    launch();
    showTime(gameLength);
}

function display(msg) {//displays status
        document.getElementById("msg").innerHTML = msg ;
}

function launch() {//Useful to maintain random numbers to do not occur at same position.
    var launched = false;
    clearHoles();
    while (!launched) {
        myNum = random();//First image
        ran1 = random();//Second
        ran2 = random();//Third
        rand = randomImage();//odd picture
        // console.log("mynum : ",myNum);
        // console.log("ran : ",ran1);
        // console.log("rand :",rand);


        /*
            Three random numbers should be different from each other.
            Because, If we got same numbers, 
            one image will only be placed in the grid while other one is hidden under it.
        */
        if((myNum != currentPos) && (rand != randomVar) && (myNum != ran1) && (ran1 != ran2) && (myNum != ran2)){
            document.getElementById("oddImage").src = ranImage[rand];
            document.getElementById("s" + myNum).src = ranImage[rand];

            //Setting three different images for three spots in the grid
            if(rand == 0){
                document.getElementById("s" + ran1).src = ranImage[1];
                document.getElementById("s" + ran2).src = ranImage[2];
            }

            else if(rand == 1){
                document.getElementById("s" + ran1).src = ranImage[0];
                document.getElementById("s" + ran2).src = ranImage[2];
            }

            else{
                document.getElementById("s" + ran1).src = ranImage[0];
                document.getElementById("s" + ran2).src = ranImage[1];
            }

            launched = true;
            currentPos = myNum;
            randomVar = rand;
        }
    }
}

function changeImage(c) {//Invoked when any image is clicked.

    if (playing == false) {
        clearHoles();
        display("Push Start to Play");
        return;
    }

    if (currentPos != c) {//Negative click.
        wrng.play();//Error sound
        totalHits += -1;//Decrementing score
        //console.log("- : ",totalHits);

        //Updating score
        document.getElementById("scoreNumber").innerHTML = totalHits;
        document.getElementById("accuracyNumber").innerHTML = (totalHits/30).toFixed(2);
    }
    else {//Positive click.
        crct.play();//Correct sound
        totalHits += 1;//Incrementing score           
        //console.log("+ : ",totalHits);

        //Updating score
        document.getElementById("scoreNumber").innerHTML = totalHits;
        document.getElementById("accuracyNumber").innerHTML = (totalHits/30).toFixed(2);

        launch();//Again clear's the board and genrates new images
    }

}

function random() {//Random number for holes.
    return (Math.floor(Math.random() * 100 % numHoles) + 1); //+1 since we started giving ids from 1 i.e, s1,s2,s3,...
}

function randomImage(){//Random number for array of images.
    return (Math.floor(Math.random() * 100 % 3));
}


function reset(){//Invoked when reset button in clicked.
    click.play();//button sound       
    document.getElementById("start").innerHTML = "start"; 
    stopTimer();//stops timer
    clearHoles();//Clear holes
    playing=false;
    display("push start to play");
    document.getElementById("oddImage").src = "images/gify.gif";

    //All set to initial stage
    document.getElementById("timeNumber").innerHTML = 30;
    document.getElementById("accuracyNumber").innerHTML = 0.00;
    document.getElementById("scoreNumber").innerHTML = 0;
}



