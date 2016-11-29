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

