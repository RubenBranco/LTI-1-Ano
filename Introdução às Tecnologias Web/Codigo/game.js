"use strict";
var score = 0;
var sizeOfGuess = 4;
var numGuessesBackup;
var numGuesses;
var gameWon = false;
var timer;
var timeAttackTimer;
var username;
var generatedCombination = {};
var userCombination = {};
var theme = localStorage.getItem("theme");
var hole;
var firstBallPick;
var secondBallPick;
var thirdBallPick;
var fourthBallPick;
var fifthBallPick;
var endTransitionEffect;
var firstPlay = false;

function logout() {
    if (confirm("Are you sure you want to logout? You will lose all progress and it will reload the page.")) {
        localStorage.removeItem("currentUser");
        $("#logout").css('visibility','hidden');
        window.location.reload();
    }
}

function generateRandomCombination(size){
    var i;
    var choice = [];
    var choiceOptions;
    switch(theme) {
        case "standardTheme":
            choiceOptions = ["RedBall.png", "RoseBall.png", "BlueBall.png", "GreenBall.png", "YellowBall.png"];
            break;
        case "sportsTheme":
            choiceOptions = ["sports_basket.png", "sports_football.png", "sports_jetski.png", "sports_running.png", "sports_sim.png"];
            break;
        case "programmingTheme":
            choiceOptions = ["programming_cs.png", "programming_php.png", "programming_html.png", "programming_python.png", "programming_ruby.png"];
            break;
        case "socialTheme":
            choiceOptions = ["social_face.png", "social_gplus.png", "social_ig.png", "social_twitter.png", "social_YouTube.png"];
            break;
    }
    for (i=0;i<size;i++) {
        var id = Math.floor(Math.random() * choiceOptions.length);
        choice.push(choiceOptions[id]);
        choiceOptions.splice(id,1);
    }
    return choice;
}

function objectBuilder(size) {
    var i;
    var combination = generateRandomCombination(size);
    var combinationObject = {};
    for (i = 1;i <= size;i++) {
        combinationObject[i] = combination[i-1];
    }
    return combinationObject;
}

function objectAppender(color, buttonid) {
    if(generatedCombination.hasOwnProperty(4)) {
        var board = document.getElementById("boardBody");
        var boardLines = board.getElementsByTagName("tr");
        var boardColumn = boardLines[numGuesses*2 - 2].getElementsByTagName("td");
        if (userCombination.hasOwnProperty(3)) {
            userCombination[4] = color;
            boardColumn[3].style.background = 'url("../Multimedia/' + userCombination[4] + '") no-repeat left center';
        }
        else if (userCombination.hasOwnProperty(2)) {
            userCombination[3] = color;
            boardColumn[2].style.background = 'url("../Multimedia/' + userCombination[3] + '") no-repeat left center';
        }
        else if (userCombination.hasOwnProperty(1)) {
            userCombination[2] = color;
            boardColumn[1].style.background = 'url("../Multimedia/' + userCombination[2] + '") no-repeat left center';
        }
        else {
            userCombination[1] = color;
            boardColumn[0].style.background = 'url("../Multimedia/' + userCombination[1] + '") no-repeat left center';
            if (numGuesses === numGuessesBackup && firstPlay === false){
                timer = setInterval(timerFunction,1000);
                if (localStorage.getItem("gameMode") === "timeattack") {
                    timeAttackTimer = setInterval(timeAttack,1000);
                }
                firstPlay = true;
            }
        }
        document.getElementById(buttonid).style.visibility = "hidden";
        return runGame();
    }
    else {
        if (generatedCombination.hasOwnProperty(3)) {
            generatedCombination[4] = color;
            var pickBalls = document.getElementById("pickBar").getElementsByTagName("img");
            var ball;
            for (ball = 0;ball < pickBalls.length;ball++) {
                document.getElementById(pickBalls[ball].getAttribute("id")).style.visibility = "visible";
            }
            document.getElementById("pickSection").removeChild(document.getElementById("pickCombMp"));
        }
        else if (generatedCombination.hasOwnProperty(2)) {
            generatedCombination[3] = color;
            document.getElementById(buttonid).style.visibility = "hidden";
        }
        else if (generatedCombination.hasOwnProperty(1)) {
            generatedCombination[2] = color;
            document.getElementById(buttonid).style.visibility = "hidden";
        }
        else {
            generatedCombination[1] = color;
            document.getElementById(buttonid).style.visibility = "hidden";
        }
    }
}

function endTransition(){
    $("#boardBody").css({'filter':'blur(0px)','transition':'all 0.5s ease-out'});
    $("#gameStatusLine").remove();
    clearInterval(endTransitionEffect);
}

function runGame() {
    var ball=0;
    if (userCombination.hasOwnProperty(sizeOfGuess) && numGuesses > 0) {
        var i;
        var rightGuesses = 0;
        var deslocadas = 0;
        var help = 2;
        var help2 = 0;
        var j=0;
        var board = document.getElementById("boardBody");
        var boardLines = board.getElementsByTagName("tr");
        var boardColumn = boardLines[numGuesses*2 - 2].getElementsByTagName("td");
        for (var elem in userCombination) {
            if (userCombination[elem] === generatedCombination[elem]) {
                rightGuesses += 1;
            }
            else {
                for (var elem2 in generatedCombination) {
                    if (userCombination[elem] === generatedCombination[elem2]) {
                        deslocadas += 1;
                    }
                }
            }
        }
        if (localStorage.getItem("gameMode") === "coop") {
            if (numGuesses%2 === 0 ) {
                $("#coopPlayer1").text(String(Number($("#coopPlayer1").text())+rightGuesses));
                $("#coopHeader").text("Turn: Player 2");
            }
            else {
                $("#coopPlayer2").text(String(Number($("#coopPlayer2").text())+rightGuesses));
                $("#coopHeader").text("Turn: Player 1");
            }
        }
        numGuesses -= 1;
        document.getElementById("blackPins").innerHTML = String(Number(document.getElementById("blackPins").innerHTML) + rightGuesses);
        document.getElementById("whitePins").innerHTML = String(Number(document.getElementById("whitePins").innerHTML) + deslocadas);
        if (localStorage.getItem("gameMode") === "timeattack") {
            clearInterval(timeAttackTimer);
            $("#timeAttackTimer").text(localStorage.getItem('timeAttackTime'));
            timeAttackTimer = setInterval(timeAttack,1000);
        }
        if (rightGuesses===sizeOfGuess) {
            clearInterval(timer);
            if (localStorage.getItem("gameMode") === "timeattack") {
                clearInterval(timeAttackTimer);
            }
            if (numGuesses+1 === numGuessesBackup) {
                score += Math.round((400*(1+(numGuesses+1/numGuessesBackup)))/Math.log(2+getTimeSeconds()));
            }
            else {
                score += Math.round((20*(1+(numGuesses+1/numGuessesBackup)))/Math.log(2+getTimeSeconds()));
            }
            gameWon=true;
            var ball;
            var pickBalls = document.getElementById("pickBar").getElementsByTagName("img");
            for (ball = 0;ball < pickBalls.length;ball++) {
                document.getElementById(pickBalls[ball].getAttribute("id")).style.visibility = "hidden";
            }
            for (i = 0;i < 2;i++) {
                boardColumn[6-help].style.background = 'url("../Multimedia/black.png") no-repeat left center';
                help--
            }
            var boardColumn2 = boardLines[numGuesses*2+1].getElementsByTagName("td");
            for (i = 0;i < 2;i++) {
                boardColumn2[help2].style.background = 'url("../Multimedia/black.png") no-repeat left center';
                help2++
            }
            if (localStorage.getItem("currentUser") !== null) {
                endGame();
            }
            var gameStatus;
            if (gameWon) {
                gameStatus = "You have won!"
            }
            else {
                gameStatus = "You have lost."
            }
            $("#boardBody").css({'filter':'blur(5px)','transition':'all 0.5s ease-out'});
            $("#gameBoardDiv").append('<p style="font-family:Bebas,Roboto;font-size:40px" id="gameStatusLine" class="w3-display-middle">' + gameStatus + '</p>');
            endTransitionEffect = setInterval(endTransition, 4000);
            document.getElementById("rightCombDiv").style.visibility = "visible";
            var board = document.getElementById("boardBody2");
            var boardLines = board.getElementsByTagName("tr");
            if (generatedCombination.hasOwnProperty(4)) {
                boardLines[0].getElementsByTagName("td")[0].style.background = 'url("../Multimedia/'+generatedCombination[1]+'") no-repeat left center';
                boardLines[0].getElementsByTagName("td")[1].style.background = 'url("../Multimedia/'+generatedCombination[2]+'") no-repeat left center';
                boardLines[0].getElementsByTagName("td")[2].style.background = 'url("../Multimedia/'+generatedCombination[3]+'") no-repeat left center';
                boardLines[0].getElementsByTagName("td")[3].style.background = 'url("../Multimedia/'+generatedCombination[4]+'") no-repeat left center';
            }
        }
        else if (numGuesses === 0) {
            clearInterval(timer);
            if (localStorage.getItem("currentUser") !== null) {
                endGame();
            }
            if (localStorage.getItem("gameMode") === "timeattack") {
                clearInterval(timeAttackTimer);
            }
            score += Math.round((10*(1+(numGuesses+1/numGuessesBackup)))/Math.log(2+getTimeSeconds()));
            var ball;
            var pickBalls = document.getElementById("pickBar").getElementsByTagName("img");
            for (ball = 0;ball < pickBalls.length;ball++) {
                document.getElementById(pickBalls[ball].getAttribute("id")).style.visibility = "hidden";
            }
            for (i = 0;i < 2;i++) {
                boardColumn[6-help].style.background = 'url("../Multimedia/white.png") no-repeat left center';
                help--
            }
            var boardColumn2 = boardLines[numGuesses*2+1].getElementsByTagName("td");
            for (i = 0;i < 2;i++) {
                boardColumn2[help2].style.background = 'url("../Multimedia/white.png") no-repeat left center';
                help2++
            }
            var gameStatus;
            if (gameWon) {
                gameStatus = "You have won!"
            }
            else {
                gameStatus = "You have lost."
            }
            $("#boardBody").css({'filter':'blur(5px)','transition':'all 0.5s ease-out'});
            $("#gameBoardDiv").append('<p style="font-family:Bebas,Roboto;font-size:40px" id="gameStatusLine" class="w3-display-middle">' + gameStatus + '</p>');
            endTransitionEffect = setInterval(endTransition, 4000);
            document.getElementById("rightCombDiv").style.visibility = "visible";
            var board = document.getElementById("boardBody2");
        var boardLines = board.getElementsByTagName("tr");
        if (generatedCombination.hasOwnProperty(4)) {
            boardLines[0].getElementsByTagName("td")[0].style.background = 'url("../Multimedia/'+generatedCombination[1]+'") no-repeat left center';
            boardLines[0].getElementsByTagName("td")[1].style.background = 'url("../Multimedia/'+generatedCombination[2]+'") no-repeat left center';
            boardLines[0].getElementsByTagName("td")[2].style.background = 'url("../Multimedia/'+generatedCombination[3]+'") no-repeat left center';
            boardLines[0].getElementsByTagName("td")[3].style.background = 'url("../Multimedia/'+generatedCombination[4]+'") no-repeat left center';
        }
        }
        else {
            var limit = rightGuesses+deslocadas;
            for (i = 0;i < limit;i++) {
                if (i < 2) {
                    if (rightGuesses > 0) {
                        boardColumn[6-help].style.background = 'url("../Multimedia/black.png") no-repeat left center';
                        help--;
                        rightGuesses--;
                    }
                    else if (deslocadas > 0) {
                        boardColumn[6-help].style.background = 'url("../Multimedia/white.png") no-repeat left center';
                        help--;
                        deslocadas--;
                    }
                }
                else {
                    var boardColumn2 = boardLines[numGuesses*2+1].getElementsByTagName("td");
                    if (rightGuesses > 0){
                        boardColumn2[help2].style.background = 'url("../Multimedia/black.png") no-repeat left center';
                        help2++;
                        rightGuesses--;
                    }
                    else if (deslocadas > 0){
                        boardColumn2[help2].style.background = 'url("../Multimedia/white.png") no-repeat left center';
                        help2++;
                        deslocadas--;
                    }
                }
            }
            score += Math.round((10*(1+(numGuesses+1/numGuessesBackup)))/Math.log(2+getTimeSeconds()));
        }
        for (var elem3 in userCombination) {
            delete userCombination[elem3]
        }
        $("#numGuesses").text(String(numGuesses));
        $("#score").text(String(score));
        $("#avgTime").text(String((getTimeSeconds()/(numGuessesBackup-numGuesses)).toFixed(2)));
        if (numGuesses > 0 && gameWon === false) {
            var pickBalls = document.getElementById("pickBar").getElementsByTagName("img");
            for (ball = 0;ball < pickBalls.length;ball++) {
                document.getElementById(pickBalls[ball].getAttribute("id")).style.visibility = "visible";
            }
        }

    }


}

function timerFunction() {
    var time = $("#time").text();
    var splitTime = time.split(":");
    var seconds = splitTime[1];
    var minutes = splitTime[0];
    if (seconds[0] === "0") {
        seconds = Number(seconds[1]);
    }
    else {
        seconds = Number(seconds);
    }
    if (minutes[0] === "0") {
        minutes = Number(minutes[1]);
    }
    else {
        minutes = Number(minutes);
    }
    seconds+=1;
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    if (seconds < 10) {
        seconds = "0" + String(seconds)
    }
    if (minutes < 10) {
        minutes = "0" + String(minutes)
    }
    $("#time").text(minutes + ":" + seconds);
}

function reset() {
    numGuesses = numGuessesBackup;
    score = 0;
    var j;
    var i;
    var ball;
    $("#numGuesses").text(String(numGuesses));
    $("#score").text(String(score));
    $("#time").text("00:00");
    $("#avgTime").text("00:00");
    $("#blackPins").text("0");
    $("#whitePins").text("0");
    var lines = document.getElementById("boardBody").getElementsByTagName("tr");
    for (j = 0;j < lines.length;j += 2) {
        var rows = lines[j].getElementsByTagName("td");
        for (i = 0;i < rows.length;i++) {
            if (i < 4) {
                rows[i].style.background = 'url("../Multimedia/'+hole+'") no-repeat left center';
            }
            else {
                rows[i].style.background = "none";
            }
        }
    }
    for (j = 1;j < lines.length;j += 2) {
        var rows = lines[j].getElementsByTagName("td");
        rows[0].style.background = "none";
        rows[1].style.background = "none";
    }
    userCombination = {};
    generatedCombination = {};
    var pickBalls = document.getElementById("pickBar").getElementsByTagName("img");
    for (ball = 0;ball < pickBalls.length;ball++) {
        document.getElementById(pickBalls[ball].getAttribute("id")).style.visibility = "visible";
    }
    clearInterval(timer);
    if (localStorage.getItem('gameMode') === 'timeattack') {
        clearInterval(timeAttackTimer);
        $("#timeAttackTimer").text(localStorage.getItem("timeAttackTime"));
    }
    if (localStorage.getItem('gameMode') === 'coop') {
        $("#coopHeader").text("Turn: Player 1");
        $("#coopPlayer1").text("0");
        $("#coopPlayer2").text("0");
    }
    if (localStorage.getItem('gameMode') === 'multiplayer') {
        if (document.getElementById("pickCombMp") !== null) {
            document.getElementById("pickSection").removeChild(document.getElementById("pickCombMp"));
        }
        var div = document.createElement("div");
        div.setAttribute("id","pickCombMp");
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("Choose a Code (Code-Maker)"));
        p.setAttribute("style","padding-left:20%");
        div.appendChild(p);
        document.getElementById("pickSection").appendChild(div);
    }
    if (localStorage.getItem('gameMode') !== 'multiplayer') {
        generatedCombination = objectBuilder(sizeOfGuess);
    }
    $("#rightCombDiv").css("visibility","hidden");
    gameWon = false;
    firstPlay = false;

}

function undo() {
    if (userCombination.hasOwnProperty(3)) {
        var color = userCombination[3];
        var boardLine = document.getElementById('boardBody').getElementsByTagName('tr')[numGuesses*2-2].getElementsByTagName('td')[2].style.background = 'url("../Multimedia/' + hole + '") no-repeat left center';
        var button;
        if (color === firstBallPick) {
            button = "BlueBallbutton";
        }
        else if (color === secondBallPick) {
            button = 'RedBallbutton';
        }
        else if (color === thirdBallPick) {
            button = 'RoseBallbutton';
        }
        else if (color === fourthBallPick) {
            button = 'GreenBallbutton';
        }
        else {
            button = 'YellowBallbutton';
        }
        document.getElementById(button).style.visibility = 'visible';
        delete userCombination[3]
    }
    else if (userCombination.hasOwnProperty(2)) {
        var color = userCombination[2];
        var boardLine = document.getElementById('boardBody').getElementsByTagName('tr')[numGuesses*2-2].getElementsByTagName('td')[1].style.background = 'url("../Multimedia/' + hole + '") no-repeat left center';
        var button;
        if (color === firstBallPick) {
            button = "BlueBallbutton";
        }
        else if (color === secondBallPick) {
            button = 'RedBallbutton';
        }
        else if (color === thirdBallPick) {
            button = 'RoseBallbutton';
        }
        else if (color === fourthBallPick) {
            button = 'GreenBallbutton';
        }
        else {
            button = 'YellowBallbutton';
        }
        document.getElementById(button).style.visibility = 'visible';
        delete userCombination[2]
    }
    else if (userCombination.hasOwnProperty(1)) {
        var color = userCombination[1];
        var boardLine = document.getElementById('boardBody').getElementsByTagName('tr')[numGuesses*2-2].getElementsByTagName('td')[0].style.background = 'url("../Multimedia/' + hole + '") no-repeat left center';
        var button;
        if (color === firstBallPick) {
            button = "BlueBallbutton";
        }
        else if (color === secondBallPick) {
            button = 'RedBallbutton';
        }
        else if (color === thirdBallPick) {
            button = 'RoseBallbutton';
        }
        else if (color === fourthBallPick) {
            button = 'GreenBallbutton';
        }
        else {
            button = 'YellowBallbutton';
        }
        document.getElementById(button).style.visibility = 'visible';
        delete userCombination[1]
    }
}

function getTimeSeconds() {
    var timeSplit = document.getElementById('time').innerHTML.split(':');
    var timeInSeconds = 0;
    if (timeSplit[0][0] === '0') {
        timeInSeconds += Number(timeSplit[0][1])*60;
    }
    else {
        timeInSeconds += Number(timeSplit[0])*60;
    }
    if (timeSplit[1][0] === '0') {
        timeInSeconds += Number(timeSplit[1][1]);
    }
    else {
        timeInSeconds += Number(timeSplit[1]);
    }
    return timeInSeconds;
}

function generateTable(size) {
    var tableBody = document.getElementById('boardBody');
    var i=0;
    var j=0;
    var k=0;
    for (i = 0;i < size;i++) {
        var newLine = document.createElement('tr');
        for (j = 0;j < 4;j++) {
            var newRow = document.createElement('td');
            var rowClass;
            switch(theme) {
                case 'standardTheme':
                    rowClass = 'PlayerPlayBar';
                    hole = 'Hole.png';
                    break;
                case 'programmingTheme':
                    rowClass = 'tableProgramming';
                    hole = 'programming_hole.png';
                    break;
                case 'socialTheme':
                    rowClass = 'tableSocial';
                    hole = 'social_hole.png';
                    break;
                case 'sportsTheme':
                    rowClass = 'tableSports';
                    hole = 'sports_hole.png';
                    break;
            }
            newRow.setAttribute('rowspan','2');
            newRow.setAttribute("class",rowClass);
            newLine.appendChild(newRow);
        }
        newLine.appendChild(document.createElement('td'));
        newLine.appendChild(document.createElement('td'));
        var secondLine = document.createElement('tr');
        for (k = 0;k < 2;k++) {
            secondLine.appendChild(document.createElement('td'));
        }
        tableBody.appendChild(newLine);
        tableBody.appendChild(secondLine);
    }
    numGuessesBackup=size;
    numGuesses=size;
}

function endGame() {
    var userInfo = localStorage.getItem(localStorage.getItem('currentUser')).split(',');
    var newWins;
    var newLoss;
    var newWLRatio;
    var newUserInfo = '';
    var i;
    if (gameWon) {
        newWins = Number(userInfo[6])+1;
        newLoss = Number(userInfo[7]);
        newWLRatio = newWins/(newWins+newLoss);
    }
    else {
        newWins = Number(userInfo[6]);
        newLoss = Number(userInfo[7])+1;
        newWLRatio = newWins/(newWins+newLoss);
    }
    for (i = 0;i < userInfo.length;i++) {
        if (i === 6) {
            newUserInfo += String(newWins)+',';
        }
        else if (i === 7) {
            newUserInfo += String(newLoss)+',';
        }
        else if (i === 8) {
            newUserInfo += String(Math.round((newWLRatio*100)*100)/100)+'%';
        }
        else {
            newUserInfo += userInfo[i]+',';
        }
    }
    localStorage.setItem(localStorage.getItem('currentUser'), newUserInfo);
}

function timeAttack() {
    var seconds = Number(document.getElementById('timeAttackTimer').innerHTML);
    if (seconds > 0 && userCombination.hasOwnProperty(4) === false) {
        seconds--;
        document.getElementById('timeAttackTimer').innerHTML = String(seconds);
    }
    else if (seconds === 0 && userCombination.hasOwnProperty(4) === false) {
        var ball;
        var pickBalls = document.getElementById('pickBar').getElementsByTagName('img');
        for (ball = 0;ball < pickBalls.length;ball++) {
            document.getElementById(pickBalls[ball].getAttribute('id')).style.visibility = 'hidden';
        }
        clearInterval(timeAttackTimer);
        clearInterval(timer);
        var gameStatus;
        if (gameWon) {
            gameStatus = "You have won!"
        }
        else {
            gameStatus = "You have lost."
        }
        $("#boardBody").css({'filter':'blur(5px)','transition':'all 0.5s ease-out'});
        $("#gameBoardDiv").append('<p style="font-family:Bebas,Roboto;font-size:40px" id="gameStatusLine" class="w3-display-middle">' + gameStatus + '</p>');
        endTransitionEffect = setInterval(endTransition, 4000);
        endGame();
    }
}

function pickBarSetup() {
    switch(theme) {
        case 'standardTheme':
            document.getElementById('BlueBallbutton').src = '../Multimedia/BlueBall.png';
            document.getElementById('RedBallbutton').src = '../Multimedia/RedBall.png';
            document.getElementById('RoseBallbutton').src = '../Multimedia/RoseBall.png';
            document.getElementById('GreenBallbutton').src = '../Multimedia/GreenBall.png';
            document.getElementById('YellowBallbutton').src = '../Multimedia/YellowBall.png';
            firstBallPick = 'BlueBall.png';
            secondBallPick = 'RedBall.png';
            thirdBallPick = 'RoseBall.png';
            fourthBallPick = 'GreenBall.png';
            fifthBallPick = 'YellowBall.png';
            break;
        case 'sportsTheme':
            document.getElementById('BlueBallbutton').src = '../Multimedia/sports_basket.png';
            document.getElementById('RedBallbutton').src = '../Multimedia/sports_football.png';
            document.getElementById('RoseBallbutton').src = '../Multimedia/sports_jetski.png';
            document.getElementById('GreenBallbutton').src = '../Multimedia/sports_running.png';
            document.getElementById('YellowBallbutton').src = '../Multimedia/sports_sim.png';
            firstBallPick = 'sports_basket.png';
            secondBallPick = 'sports_football.png';
            thirdBallPick = 'sports_jetski.png';
            fourthBallPick = 'sports_running.png';
            fifthBallPick = 'sports_sim.png';
            break;
        case 'programmingTheme':
            document.getElementById('BlueBallbutton').src = '../Multimedia/programming_cs.png';
            document.getElementById('RedBallbutton').src = '../Multimedia/programming_html.png';
            document.getElementById('RoseBallbutton').src = '../Multimedia/programming_python.png';
            document.getElementById('GreenBallbutton').src = '../Multimedia/programming_php.png';
            document.getElementById('YellowBallbutton').src = '../Multimedia/programming_ruby.png';
            firstBallPick = 'programming_cs.png';
            secondBallPick = 'programming_html.png';
            thirdBallPick = 'programming_python.png';
            fourthBallPick = 'programming_php.png';
            fifthBallPick = 'programming_ruby.png';
            break;
        case 'socialTheme':
            document.getElementById('BlueBallbutton').src = '../Multimedia/social_face.png';
            document.getElementById('RedBallbutton').src = '../Multimedia/social_ig.png';
            document.getElementById('RoseBallbutton').src = '../Multimedia/social_YouTube.png';
            document.getElementById('GreenBallbutton').src = '../Multimedia/social_gplus.png';
            document.getElementById('YellowBallbutton').src = '../Multimedia/social_twitter.png';
            firstBallPick = 'social_face.png';
            secondBallPick = 'social_ig.png';
            thirdBallPick = 'social_YouTube.png';
            fourthBallPick = 'social_gplus.png';
            fifthBallPick = 'social_twitter.png';
            break;
    }

}

function onloadFunction() {
    if (localStorage.getItem('currentUser') !== null) {
        document.getElementById('logout').style.visibility = 'visible';
        document.getElementById('logout').addEventListener('click', logout);
    }

    var difficulty = localStorage.getItem('Difficulty');
    if (difficulty==='10') {
        generateTable(10);
    }
    else if (difficulty === '8') {
        generateTable(8);
    }
    else if (difficulty === '6') {
        generateTable(6);
    }
    else {
        generateTable(10);
    }
    var gameMode = localStorage.getItem('gameMode');
    pickBarSetup();
    document.getElementById("BlueBallbutton").addEventListener("click", function () {objectAppender(firstBallPick, 'BlueBallbutton');});
    document.getElementById("RedBallbutton").addEventListener("click", function () {objectAppender(secondBallPick, 'RedBallbutton');});
    document.getElementById("RoseBallbutton").addEventListener("click", function () {objectAppender(thirdBallPick, 'RoseBallbutton');});
    document.getElementById("GreenBallbutton").addEventListener("click", function () {objectAppender(fourthBallPick, 'GreenBallbutton');});
    document.getElementById("YellowBallbutton").addEventListener("click", function () {objectAppender(fifthBallPick, 'YellowBallbutton');});
    if (gameMode === 'singleplayer' || gameMode === 'coop' || gameMode === 'timeattack') {
        generatedCombination = objectBuilder(sizeOfGuess);
    }
    if(gameMode === 'timeattack'){
        var line = document.getElementById('timeAttackTimerLine');
        line.style.visibility = 'visible';
        document.getElementById('timeAttackTimerTable').style.visibility = 'visible';
        var newrow = document.createElement('td');
        newrow.appendChild(document.createTextNode(localStorage.getItem('timeAttackTime')));
        newrow.setAttribute('id','timeAttackTimer');
        line.appendChild(newrow);
    }
    if (gameMode === 'multiplayer') {
        var div = document.createElement("div");
        div.setAttribute("id","pickCombMp");
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("Choose a Code (Code-Maker)"));
        p.setAttribute("style","padding-left:20%");
        div.appendChild(p);
        document.getElementById("pickSection").appendChild(div);
    }
    if(gameMode === 'coop'){
        $("#coopPlace").css('visibility','visible');
        $("#coopHeader").text('Turn: Player 1');
    }
    document.getElementById('reset').addEventListener("click", reset);
    document.getElementById('undo').addEventListener("click", undo);
    document.getElementById("numGuesses").innerHTML = String(numGuesses);
    document.getElementById("score").innerHTML = String(score);
    if (localStorage.getItem('currentUser') !== null) {
        username = localStorage.getItem('currentUser');
    }
    else {
        username = prompt('What is your nickname?');
    }
    document.getElementById('username').innerHTML = username;

}

document.addEventListener("DOMContentLoaded", function(event){onloadFunction()});
