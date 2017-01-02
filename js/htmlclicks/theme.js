/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Dependencies
 * 
 *      Autoclick.js
 */


function Theme () {
  this.clickName = "Total clicks";
  this.clickCoin = "clicks";
  this.metaPointsName = "Total meta-points";
  this.metaPointsCoin = "points";
  
}

/**
 * Generates HTML in the div autoclikersDivID, and returns autoclickers
 * @param string autoclikersDivID
 * @param [autoclick]: autoclickers
 * {
          id:"0",
          name:"Social Network Bot",
          icon:"",
          image:"",
          description:"Machine processes which emulate social network accounts and attract more followers.",
          cps:1
      }
 * @returns array with auto clickers.
 */
Theme.prototype.generateAutoClikers = function(autoclikersDivID, autoclickers) {
    var autoclicks = [];
    
    for (var autoclickid in autoclickers){
        var autoclick = autoclickers[autoclickid];
        
        autoclicks[autoclick.id] = new Autoclick().generate(
                autoclick.id,
                autoclick.name,
                autoclick.description,
                autoclick.cps,
                autoclick.icon);
        
        var div = autoclicks[autoclick.id].div;
        if (div !== undefined){
        document.getElementById(autoclikersDivID).appendChild(div);
        }
               
    }
    return autoclicks;
};

Theme.prototype.displayAutoclicker = function(autoclicker) {
    var display = document.getElementById('auto-clicker-display'+autoclicker.id);
    var buildingLevel = this.displayAutoclickerLevel(autoclicker.getAmount());
    if (buildingLevel > 0){
        if (conf.autoClickers[autoclicker.id].display.img !== "") {
            if (display === undefined || display === null){
                display = document.createElement("img");
                display.className = "auto-clicker-display";
                display.id = "auto-clicker-display" + autoclicker.id;
                
                document.getElementsByClassName("main-container")[0]
                        .appendChild(display);
            }
            display.src = conf.autoClickers[autoclicker.id].display.img;
            display.style.left = conf.autoClickers[autoclicker.id].display.x + "px";
            display.style.bottom = conf.autoClickers[autoclicker.id].display.y + "px";
            display.style.width = conf.autoClickers[autoclicker.id].display.width + "px";
            
        }
    }
    else {
        if (display !== undefined && display !== null){
            display.remove();
        }
    }
    return this;
};      


Theme.prototype.displayAutoclickerLevel = function(bigNumber) {
    bigNumber.rebase();
    
    if (bigNumber.value > 0){
        return bigNumber.power + 1;
    }
    else {
        return 0;
    }
};