"use strict";

function getTopWins() {
    if (localStorage.getItem('listOfUsers') !== null) {
        var users = localStorage.getItem('listOfUsers').split(',');
        var i;
        var sortedUsers = [];
        while (users.length > 0) {
            var max = [0,0];//[id,max)]
            for (i = 0;i < users.length;i++) {
                if (users[i] !== '') {
                    if(Number(localStorage.getItem(users[i]).split(',')[6])>max[1]){
                        max = [i,Number(localStorage.getItem(users[i]).split(',')[6])];
                    }
                }

            }
            if (users[max[0]] !== '') {
                sortedUsers.push(users[max[0]]);
            }
            users.splice(max[0],1);
        }
        return sortedUsers;
    }
    else {
        return []
    }
}



function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('logout').style.visibility = 'hidden';
    window.location.reload();
}

function main() {
    var users = getTopWins();
    if (users.length > 0) {
        var lines = document.getElementById('leaderboardTable').getElementsByTagName('tr');
        var i;
        var upperLimit;
        if (users.length < 15) {
            upperLimit = users.length;
        }
        else {
            upperLimit=15;
        }
        for (i = 0;i < upperLimit;i++) {
            lines[i].getElementsByTagName('td')[1].innerHTML = users[i];
            lines[i].getElementsByTagName('td')[2].innerHTML = localStorage.getItem(users[i]).split(',')[6];
            lines[i].getElementsByTagName('td')[3].innerHTML = localStorage.getItem(users[i]).split(',')[8];
        }
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