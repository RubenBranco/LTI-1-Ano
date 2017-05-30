"use strict";

if (localStorage.getItem('currentUser') !== null) {
    location.replace('./UserPage.html');
}

function verify() {
    var username = document.getElementById('Login_Username').value;
    var password = document.getElementById('Login_Password').value;
    if (document.getElementById('warning') !== null) {
        document.getElementById('loginBox').removeChild(document.getElementById('warning'));
    }
    if (localStorage.getItem(username) !== null) {
        if (localStorage.getItem(username).split(',')[5] === password) {
            localStorage.setItem('currentUser', username);
            location.replace('./UserPage.html');
        }
        else{
            var div = document.createElement('div');
            div.setAttribute('class', ' w3-panel w3-red');
            div.setAttribute('id', 'warning');
            div.appendChild(document.createElement('p').appendChild(document.createTextNode("You have entered an invalid password")));
            document.getElementById('loginBox').insertBefore(div, document.getElementById("createAccount"));
        }
    }
    else {
        var div = document.createElement('div');
        div.setAttribute('id', 'warning');
        div.setAttribute('class', 'w3-panel w3-red');
        div.appendChild(document.createElement('p').appendChild(document.createTextNode("That username doesn't exist, please create a new account!")));
        document.getElementById('loginBox').insertBefore(div, document.getElementById('createAccount'));
    }
}


function main() {
    if (localStorage.getItem('currentUser') === null) {
        document.getElementById('loginButton').addEventListener('click', verify);
    }
    else { // Mantemos aqui para o caso de algo correr e o DOMLoad seja feito primeiro e precisarmos de fazer o redirect por aqui
        location.replace('./UserPage.html');
    }
}


document.addEventListener("DOMContentLoaded", function(event){main()});