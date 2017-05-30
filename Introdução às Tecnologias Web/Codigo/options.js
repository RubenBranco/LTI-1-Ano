"use strict";

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('logout').style.visibility = 'hidden';
    window.location.reload();
}

function aClick() {
    var difficulty = document.getElementById('difficulty')[document.getElementById('difficulty').selectedIndex].value;
    var theme = document.getElementById('theme')[document.getElementById('theme').selectedIndex].value;
    localStorage.setItem('theme', theme);
    switch(difficulty) {
        case 'Easy':
            localStorage.setItem('Difficulty',10);
            break;
        case 'Intermediate':
            localStorage.setItem('Difficulty',8);
            break;
        case 'Hard':
            localStorage.setItem('Difficulty',6);
            break;
    }
    if (localStorage.getItem('gameMode') === 'timeattack') {
        localStorage.setItem('timeAttackTime',String(document.getElementById('timeAttack')[document.getElementById('timeAttack').selectedIndex].value));
    }
}

function main() {
    document.getElementById('playButton').addEventListener("click", aClick);
    if (localStorage.getItem('gameMode') === 'timeattack') {
        var div = document.getElementById('altSelectOptions');
        div.appendChild(document.createTextNode('Choose Time Countdown: '));
        var select = document.createElement('select');
        select.setAttribute('id', 'timeAttack');
        var thirtySeconds = document.createElement('option');
        var fifteenSeconds = document.createElement('option');
        var tenSeconds = document.createElement('option');
        thirtySeconds.appendChild(document.createTextNode('30 seconds'));
        thirtySeconds.setAttribute('value','30');
        fifteenSeconds.appendChild(document.createTextNode('15 seconds'));
        fifteenSeconds.setAttribute('value','15');
        tenSeconds.appendChild(document.createTextNode('10 seconds'));
        tenSeconds.setAttribute('value','10');
        select.appendChild(thirtySeconds);
        select.appendChild(fifteenSeconds);
        select.appendChild(tenSeconds);
        div.appendChild(select);
    }
    if (localStorage.getItem('currentUser') !== null) {
        document.getElementById('logout').style.visibility = 'visible';
        document.getElementById('logout').addEventListener('click', logout);
        document.getElementById('loginOrUser').innerHTML = 'Profile';
        document.getElementById('loginOrUser').href = './UserPage.html'
    }
    else {
        document.getElementById('loginOrUser').innerHTML = 'Login';
        document.getElementById('loginOrUser').href = './login.html'
    }
}

document.addEventListener("DOMContentLoaded", function(event){main()});