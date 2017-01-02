/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Dependencies:
 *      autoclick.js
 */

var env = new Environment();

jQuery( document ).ready(function() {
    env.loadConf(conf);

    setInterval(function(){
        env.autoclik();
    }, 1000);
});

function basicClick(){
    env.mouseClick();
}

function buyAutoClicker(autoclickerid) {   
    env.buyAutoClicker(autoclickerid);
}


function resetLvl1() {
    env.resetLvl1();    
}

/* export */
 function copyToClipboard() {
     env.timestamp = new Date().getTime();
     var text = JSON.stringify(env);
     
     window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

/* import */
 function loadFromImput() {
     var text =window.prompt("Paste you saved session here", text);
     
     env.copy(JSON.parse(text));
}

/* export */
 function loadCookie() {
     var text = getCookie('html5cliks');
     
     env.copy(JSON.parse(text));
}

/* import */
 function saveCookie() {
     env.timestamp = new Date().getTime();
     var text = JSON.stringify(env);
     
     // document.cookie = "html5cliks=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
     document.cookie = "html5cliks="+text;
}

/* reset session */
 function resetCookie() {
     document.cookie = "html5cliks=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

/* suppor */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
} 


function toggleSettings() {
    var div = document.getElementById('setting-menu');
    if (div.className.match(/\bhidden\b/)) {
        div.className = div.className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
    }
    else {
        div.className += " hidden";
    }
    
}
