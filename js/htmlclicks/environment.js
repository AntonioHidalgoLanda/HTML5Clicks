/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Environment () {
    // Constants
    this.ID_SPAN_LEVEL1_LABEL = "lvl1-label";
    this.ID_SPAN_LEVEL1_COUNT = "points-lvl1";
    this.ID_SPAN_LEVEL2_LABEL = "lvl2-label";
    this.ID_SPAN_LEVEL2_COUNT = "points-lvl2";
    this.ID_BUTTON_LEVEL1_RESET = "btn-reset-lvl1";
    this.ID_DIV_MAIN_CONTAINER = "main-container";
    this.ID_DIV_AUTOCLICKERS_CONTAINER = "autoclickers";
    this.ID_SPAN_TOTAL_CPS = "total-cps";
    
    this.META_BONUS_FRACTION = 1000;
    
    // Member variables
    this.clickCount= new BigNumber();
    this.totalClickCount= new BigNumber();
    this.mouseCount= new BigNumber().init(1);
    this.totalCPS= new BigNumber();
    this.buyMultiplier= 1;
    this.autoclicks= [];
    this.metaCount= new BigNumber();
    this.casualCount= new BigNumber();
    this.theme = new Theme();
    this.metaBonus = new BigNumber().init(1);
}

Environment.prototype.copy = function(env) {

    if (env !== undefined) {

        if ('clickCount' in env) {
            this.clickCount.copy(env.clickCount);
        }
        if ('totalClickCount' in env) {
            this.totalClickCount.copy(env.totalClickCount);
        }
        if ('mouseCount' in env) {
            this.mouseCount.copy(env.mouseCount);
        }
        if ('totalCPS' in env) {
            this.totalCPS.copy(env.totalCPS);
        }
        if ('buyMultiplier' in env) {
            this.buyMultiplier = env.buyMultiplier;
        }
        if ('metaCount' in env) {
            this.metaCount.copy(env.metaCount);
        }
        if ('casualCount' in env) {
            this.casualCount.copy(env.casualCount);
        }
        if ('metaBonus' in env) {
            this.metaBonus.copy(env.metaBonus);
        }
        if ('autoclicks' in env) {
            for (var id in env.autoclicks){
                if (this.autoclicks[id] === undefined || this.autoclicks[id] === null){
                    console.log("warning, div autoclicker"+id+" not initializated");
                }
                else {
                    this.autoclicks[id].copy(env.autoclicks[id]);
                    this.theme.displayAutoclicker(this.autoclicks[id]);
                }
            }
        }
        /* nothing to do here at the minute
        if ('theme' in env) {
        }
        */
       
        if ('timestamp' in env){
            var n = new Date().getTime();
            n -= env.timestamp;
            n = Math.floor(n/1000);
            // N2H (Nice to have) This could be improved performance wise
            while (n-- > 0){
                this.autoclik();
            }
        }
        
        // TODO: recalculate missing time offline
        this.refreshCounterLvl1()
                .refreshCounterLvl2()
                .refreshTotalCPS()
                .refreshAutoClickers();
    }
    return this;
};

// conf comes from /HTML5Clicks/config/singularityJSON.js
Environment.prototype.loadConf = function(conf) {

    document.getElementById(this.ID_SPAN_LEVEL1_LABEL).innerHTML = conf.clickName;
    document.getElementById(this.ID_SPAN_LEVEL2_LABEL).innerHTML = conf.metaPointsName;
    document.getElementById(this.ID_BUTTON_LEVEL1_RESET).innerHTML = conf.resetLvl1Label;
    document.getElementsByClassName(this.ID_DIV_MAIN_CONTAINER)[0]
            .style.backgroundImage = "url('" + conf.background + "')";
    
    this.autoclicks = this.theme.generateAutoClikers(
            this.ID_DIV_AUTOCLICKERS_CONTAINER,conf.autoClickers);
    
    return this;
};

Environment.prototype.refreshCounterLvl1 = function (){
    document.getElementById(this.ID_SPAN_LEVEL1_COUNT)
            .innerHTML = this.clickCount.toString();
    return this;
};

Environment.prototype.refreshCounterLvl2 = function (){
    document.getElementById(this.ID_SPAN_LEVEL2_COUNT)
            .innerHTML = this.metaCount.toString();
    return this;
};

Environment.prototype.refreshTotalCPS = function (){
    document.getElementById(this.ID_SPAN_TOTAL_CPS)
            .innerHTML = this.totalCPS.clone()
                    .times(this.metaBonus)
                    .toString();
    
    return this;
};

Environment.prototype.countIncrease = function (increase) {
    increase.times(this.metaBonus);
    this.clickCount.add(increase);
    this.totalClickCount.add(increase);
    this.refreshCounterLvl1();
    return this;
};

Environment.prototype.autoclik = function() {
    for(var id in this.autoclicks){
        this.countIncrease(this.autoclicks[id].getClicks());
    }
    this.refreshCounterLvl1();
    
    return this;
};

Environment.prototype.mouseClick = function (){
    this.countIncrease(this.mouseCount.clone());
    this.refreshCounterLvl1();
    return this;
};

Environment.prototype.buyAutoClicker = function (autoclickerid){
    var autoclicker = this.autoclicks[autoclickerid];
    if (this.buyMultiplier === 1){
        var cost = autoclicker.getCost();
        if (cost.lte(this.clickCount)){
            this.clickCount.add(cost.not());
            autoclicker.increaseAmount();
            
            this.theme.displayAutoclicker(autoclicker);
        }
    }
    this.refreshAutoClickers();
    
    return this;
};


Environment.prototype.refreshAutoClickers = function (){
    this.totalCPS.init(0);
    for (var id in this.autoclicks){
        var autoclicker = this.autoclicks[id];
        this.totalCPS.add(autoclicker.getClicks());
    }
    this.refreshTotalCPS();
    
    if (this.totalCPS.value > 0){
        for (var id in this.autoclicks){
            var autoclicker = this.autoclicks[id];
            autoclicker.refresh(this.totalCPS);
        }
    }
    
    return this;
};


Environment.prototype.resetLvl1 = function() {
    this.metaCount.add(this.totalClickCount.metaReduction());
    
    alert('points scraped: ' + this.totalClickCount.toString() 
            + '; R&D points: '+this.metaCount.toString());
    
    this.clickCount.init(0);
    this.totalClickCount.init(0);
    this.mouseCount.init(1);
    this.totalCPS.init(0);
    this.buyMultiplier = 1;
    
    this.refreshCounterLvl1()
            .refreshCounterLvl2()
            .refreshTotalCPS();
    
    for (var i in this.autoclicks){
        this.autoclicks[i].reset();
        this.theme.displayAutoclicker(this.autoclicks[i]);
    }
    
    this.metaBonus.init(1).add(
                this.metaCount.clone().into(new BigNumber().init(this.META_BONUS_FRACTION))
            );
    
};
