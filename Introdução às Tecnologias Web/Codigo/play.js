"use strict";


function singleplayer() {
    localStorage.setItem('gameMode', 'singleplayer');
}

function multiplayer() {
    localStorage.setItem('gameMode', 'multiplayer');
}

function coop() {
    localStorage.setItem('gameMode', 'coop');
}

function timeattack() {
    localStorage.setItem('gameMode', 'timeattack');
}

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('logout').style.visibility = 'hidden';
    window.location.reload();
}

function main() {
  document.getElementById('singleplayerOption').addEventListener('click', singleplayer);
  document.getElementById('multiplayerOption').addEventListener('click', multiplayer);
  document.getElementById('coopOption').addEventListener('click', coop);
  document.getElementById('timeattackOption').addEventListener('click', timeattack);
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