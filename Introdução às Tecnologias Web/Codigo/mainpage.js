"use strict";

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('logout').style.visibility = 'hidden';
    window.location.reload();
}

function main() {
    if (localStorage.getItem('currentUser') !== null) {
        document.getElementById('logout').style.visibility = 'visible';
        document.getElementById('logout').addEventListener('click', logout);
        document.getElementById('menu2').style.backgroundImage = 'url("../Multimedia/Menu_NoHover_Profile.png")';
        document.getElementById('menu2').addEventListener('mouseover', function(){document.getElementById('menu2').style.backgroundImage = 'url("../Multimedia/Menu_Hover_Profile.png")';});
        document.getElementById('menu2').addEventListener('mouseout', function(){document.getElementById('menu2').style.backgroundImage = 'url("../Multimedia/Menu_NoHover_Profile.png';});
    }
    else{
        document.getElementById('menu2').style.backgroundImage = 'url("../Multimedia/Menu_NoHover_2.png")';
        document.getElementById('menu2').addEventListener('mouseout', function(){document.getElementById('menu2').style.backgroundImage = 'url("../Multimedia/Menu_NoHover_2.png")';});
        document.getElementById('menu2').addEventListener('mouseover', function(){document.getElementById('menu2').style.backgroundImage = 'url("../Multimedia/Menu_Hover_2.png")';});

    }

}



document.addEventListener('DOMContentLoaded', function(event){main()});