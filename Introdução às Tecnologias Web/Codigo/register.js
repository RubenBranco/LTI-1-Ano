"use strict";

if (localStorage.getItem('currentUser') !== null) {
    window.location.replace('./UserPage.html');
}

function storeUser() {
    // User Database as a csv line of the following format(context[id] from .split(','))
    // firstname[0],lastname[1],birthDate[2],email[3],username[4],password[5], gamesWon[6], gamesLost[7],WLRatio[8]
    var i;
    var firstName = document.getElementById('Register_firstname').value;
    var lastName = document.getElementById('Register_lastname').value;
    var birthDate = document.getElementById('Register_birthdate').value;
    var email = document.getElementById('Register_email').value;
    var username = document.getElementById('Login_Username').value;
    var password = document.getElementById('Login_Password').value;
    var userInfo = firstName + ',' + lastName + ',' + birthDate + ',' + email + ',' + username + ',' + password + ',0,0,0%';
    var emptyCheck = false;
    var userInfoSplit = userInfo.split(',');
    for (i = 0;i < userInfoSplit.length;i++) {
        if (userInfoSplit[i] === '') {
            emptyCheck = true;
        }
    }
    if (!emptyCheck) {
        if (localStorage.getItem('listOfUsers') === null || localStorage.getItem('listOfUsers').split(',').indexOf(username) === -1) {
            localStorage.setItem(username, userInfo);
            localStorage.setItem('currentUser', username);
            if (localStorage.getItem('listOfUsers') === null) {
                localStorage.setItem('listOfUsers', username);
            }
            else {
                localStorage.setItem('listOfUsers', localStorage.getItem('listOfUsers') + ',' + username);
            }
            location.replace('./UserPage.html')
        }
        else {
            if (document.getElementById('warning') !== null) {
                document.getElementById('LoginBox').removeChild(document.getElementById('warning'));
            }
            username = '';
            var div = document.createElement('div');
            div.setAttribute('class', 'w3-panel w3-red');
            div.setAttribute('id', 'warning');
            div.appendChild(document.createElement('p').appendChild(document.createTextNode("This username is already taken. Please choose another one.")));
            document.getElementById('LoginBox').appendChild(div);
        }
    }
    else {
        if (document.getElementById('warning') !== null) {
            document.getElementById('LoginBox').removeChild(document.getElementById('warning'));
        }
        var div = document.createElement('div');
        div.setAttribute('class', 'w3-panel w3-red');
        div.setAttribute('id', 'warning');
        div.appendChild(document.createElement('p').appendChild(document.createTextNode("You forgot to fill in an option. They are all required.")));
        document.getElementById('LoginBox').appendChild(div);
    }
}

function main() {
    if (localStorage.getItem('currentUser') === null) {
        document.getElementById('aRegister').addEventListener("click", storeUser);
    }
    else { // Mantemos aqui para o caso de algo correr e o DOMLoad seja feito primeiro e precisarmos de fazer o redirect por aqui
        window.location.replace('./UserPage.html');
    }
}

document.addEventListener("DOMContentLoaded",function(event){main()});