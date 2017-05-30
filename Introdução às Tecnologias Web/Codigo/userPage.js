"use strict";


function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('logout').style.visibility = 'hidden';
    window.location.replace('./login.html')
}

function changeUserDetails() {
    if (document.getElementById('newPassword').value !== '') {
        var userInfo = localStorage.getItem(localStorage.getItem('currentUser')).split(',');
        var i;
        userInfo[5] = document.getElementById('newPassword').value;
        var newUserInfo = '';
        for (i = 0;i < userInfo.length;i++) {
            if (i === userInfo.length - 1) {
                newUserInfo += userInfo[i];
            }
            else {
                newUserInfo+= userInfo[i]+',';
            }
        }
        localStorage.setItem(localStorage.getItem('currentUser'), newUserInfo);
    }
    if (document.getElementById('newEmail').value !== '') {
        var userInfo = localStorage.getItem(localStorage.getItem('currentUser')).split(',');
        var i;
        userInfo[3] = document.getElementById('newEmail').value;
        var newUserInfo = '';
        for(i = 0;i < userInfo.length;i++) {
            if ( i === userInfo.length - 1) {
                newUserInfo += userInfo[i];
            }
            else {
                newUserInfo+= userInfo[i]+',';
            }
        }
        localStorage.setItem(localStorage.getItem('currentUser'),newUserInfo);
    }
    location.reload();
}

function main() {
    var userInfo = localStorage.getItem(localStorage.getItem('currentUser')).split(',');
    document.getElementById('username').innerHTML = userInfo[4];
    document.getElementById('firstName').innerHTML = userInfo[0];
    document.getElementById('lastName').innerHTML = userInfo[1];
    document.getElementById('birthDate').innerHTML = userInfo[2];
    document.getElementById('statsGamesWon').innerHTML = userInfo[6];
    document.getElementById('statsGamesLost').innerHTML = userInfo[7];
    document.getElementById('statsWLRatio').innerHTML = userInfo[8];
    if (localStorage.getItem('currentUser') !== null) {
        document.getElementById('logout').style.visibility = 'visible';
        document.getElementById('logout').addEventListener('click', logout);
    }
    else {
        window.location.replace('./login.html');
    }
    document.getElementById('changeUser').addEventListener('click', changeUserDetails);
}

document.addEventListener("DOMContentLoaded", function(event){main()});