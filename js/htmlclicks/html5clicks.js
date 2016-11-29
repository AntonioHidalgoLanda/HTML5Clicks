/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Dependencies:
 *      autoclick.js
 */

//settings
var settings = {
    notation:"none"
    };

// environment/game vars

var env ={
        clickCount: new BigNumbers(),
        mouseClick: new BigNumbers().init(1),
        buyMultiplier: 1,
        autoclicks: []
    };

jQuery( document ).ready(function() {
    theme = new Theme();

    // conf comes from /HTML5Clicks/config/singularityJSON.js
    document.getElementById("lvl1-label").innerHTML = conf.clickName;
    document.getElementsByClassName("main-container")[0]
            .style.backgroundImage = "url('" + conf.background + "')";
    
    env.autoclicks=theme.generateAutoClikers("autoclickers",conf.autoClickers);

    setInterval(function(){ 
        //code goes here that will be run every 5 seconds.
        for(var id in env.autoclicks){
            env.clickCount.add(env.autoclicks[id].getClicks());
        }
        document.getElementById("points-lvl1")
                .innerHTML = env.clickCount.toString();
    }, 1000);
});

function basicClick(){
    env.clickCount.add(env.mouseClick);
    document.getElementById("points-lvl1")
            .innerHTML = env.clickCount.toString();
}


function buyAutoClicker(autoclickerid) {
    var autoclicker = env.autoclicks[autoclickerid];
    if (env.buyMultiplier === 1){
        var cost = autoclicker.getCost();
        if (cost.lte(env.clickCount)){
            
            if ((autoclicker.getAmount().value === 0) &&
                    (conf.autoClickers[autoclickerid].display.img !== "")) {
                
                var display = document.createElement("img");
                display.className = "auto-clicker-display";
                display.id = "auto-clicker-display" + autoclickerid;
                display.src = conf.autoClickers[autoclickerid].display.img;
                display.style.left = conf.autoClickers[autoclickerid].display.x + "px";
                display.style.bottom = conf.autoClickers[autoclickerid].display.y + "px";
                display.style.width = conf.autoClickers[autoclickerid].display.width + "px";
                document.getElementsByClassName("main-container")[0]
                        .appendChild(display);
            }
            
            env.clickCount.add(cost.not());
            autoclicker.increaseAmount();
            
            console.log(autoclicker);
        }
    }
    refreshAutoClickers();
}

function refreshAutoClickers(){
    var totalCps = new BigNumbers();
    for (var id in env.autoclicks){
        var autoclicker = env.autoclicks[id];
        totalCps.add(autoclicker.getClicks());
    }
    
    document.getElementById("total-cps")
            .innerHTML = totalCps.toString();
    
    if (totalCps.value > 0){
        for (var id in env.autoclicks){
            var autoclicker = env.autoclicks[id];
            autoclicker.refresh(totalCps);
        }
    }
    
    
}

