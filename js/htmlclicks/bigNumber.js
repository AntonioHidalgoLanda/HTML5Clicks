/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function BigNumber () {
  this.value = 0;
  this.power = 0; // in milliards. 0 = 1; 1 = 1000, 2 = 1.000.000
}

BigNumber.prototype.init = function(n,base) {
    this.value = n;
    this.power = (base === undefined)? 0: base; // base || 0; another way to default values
    return this.rebase();
};

BigNumber.prototype.copy = function(bn) {
    if (bn !== undefined && 'value' in bn && 'power' in bn) {
        this.value = bn.value;
        this.power = bn.power;
        this.rebase();
    }
    return this;
};

BigNumber.prototype.clone = function() {
    var bn = new BigNumber();
    bn.value = this.value;
    bn.power = this.power;
    return bn.rebase();
};


BigNumber.prototype.not = function() {
    this.value = - this.value;
    return this.rebase();
};


BigNumber.prototype.rebase = function() {
    if (this.value === 0){
        this.power = 0;
    }
        
    while (this.value/1000>=1){
        this.value = this.value/1000;
        this.power ++;
    }
    while (this.value < 1 && this.value>0){
        this.value = this.value * 1000;
        this.power --;
    }
    return this;
};

BigNumber.prototype.toString = function() {
    var letter = "";
    switch (this.power){
        case 0:
            break;
        case 1:
            letter = "k";
            break;
        case 2:
            letter = "M";
            break;
        case 3:
            letter = "G";
            break;
        case 4:
            letter = "T";
            break;
        case 5:
            letter = "P";
            break;
        case 6:
            letter = "E";
            break;
        case 7:
            letter = "Z";
            break;
        case 8:
            letter = "Y";
            break;
        
        default:
            letter = "10^"+(this.power+3);
    }
    return this.value.toFixed(2) + " " + letter;
};


BigNumber.prototype.add = function(bn) {
    var powDiff = this.power - bn.power;
    
    if (powDiff <= 3 || powDiff >= -3){
        if (powDiff > 0){
            this.value *= Math.pow(1000,powDiff);   // This is wrong, 1000^powDiff
        }
        else if (powDiff < 0){
            this.value *= 1/Math.pow(1000,-powDiff);   // This is wrong, 1000^powDiff
        }
        this.power = bn.power;
        this.value += bn.value;
    }
    else if (powDiff < -3){
         this.power = bn.power;
         this.value = bn.value;
    }
   
    return this.rebase();
};


BigNumber.prototype.times = function(bn) {
    this.value *= bn.value;
    this.power += bn.power;
    
    return this.rebase();
};

/**
 * division.
 * 
 * @param {type} bn
 * @returns {BigNumber.prototype}
 */
BigNumber.prototype.into = function(bn) {
    this.value /= bn.value;
    this.power -= bn.power;
    
    return this.rebase();
};

// this <= bn
BigNumber.prototype.lte = function(bn){
    this.rebase();
    bn.rebase();
    
    if (this.value >= 0 && bn.value >= 0) {
        if (this.power !== bn.power) {
            return (this.power <= bn.power);
        }
        else {
            return (this.value <= bn.value);
        }
    }
    else if (this.value < 0 && bn.value < 0) {
        if (this.power !== bn.power) {
            return (this.power >= bn.power);
        }
        else {
            return (this.value >= bn.value);
        }        
    }
    else if (this.value >= 0 && bn.value < 0) {
        return false;
    }
    else{
        return true;
    }

};


BigNumber.prototype.lt = function(bn){
    this.rebase();
    bn.rebase();
    
    if (this.value >= 0 && bn.value >= 0) {
        if (this.power !== bn.power) {
            return (this.power < bn.power);
        }
        else {
            return (this.value < bn.value);
        }
    }
    else if (this.value < 0 && bn.value < 0) {
        if (this.power !== bn.power) {
            return (this.power > bn.power);
        }
        else {
            return (this.value > bn.value);
        }        
    }
    else if (this.value >= 0 && bn.value < 0) {
        return false;
    }
    else{
        return true;
    }

};


//this > bn
BigNumber.prototype.gte = function (bn){
  return  bn.lte(this);
};

//this > bn
BigNumber.prototype.gt = function (bn){
  return  bn.lt(this);
};


//this > bn
BigNumber.prototype.metaReduction = function (){
    var MIN = 3;
    var bn = new BigNumber();
    this.rebase();
    if (this.power >= MIN){
        bn.value = Math.sqrt(this.value);
        bn.power = Math.ceil((this.power - MIN)/2);
    }
  return  bn;
};



