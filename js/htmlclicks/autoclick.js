/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Autoclick () {
    this.cps = new BigNumbers().init(1);
    this.lvl = new BigNumbers().init(1);
    this.amount = new BigNumbers().init(0);
}

Autoclick.prototype.setCps = function(cps) {
    this.cps.init(cps);
    return this;
};
Autoclick.prototype.setLevel = function(lvl) {
    this.lvl.init(lvl);
    return this;
};
Autoclick.prototype.setAmount = function(amount) {
    this.amount.init(amount);
    return this;
};
Autoclick.prototype.increaseCps = function() {
    this.cps.add(new BigNumbers().init(1));
    return this;
};
Autoclick.prototype.increaseLevel = function() {
    this.lvl.add(new BigNumbers().init(1));
    return this;
};
Autoclick.prototype.increaseAmount = function() {
    this.amount.add(new BigNumbers().init(1));
    return this;
};

Autoclick.prototype.getCps = function() {return this.cps;};
Autoclick.prototype.getLevel = function() {return this.lvl;};
Autoclick.prototype.getAmount = function() {return this.amount;};

Autoclick.prototype.getClicks = function() {
    
    return this.amount.clone().times(this.cps).times(this.lvl);
};


// Buy

// Cost
Autoclick.prototype.getCost = function() {
    return new BigNumbers().init(10).times(this.cps).times(
                new BigNumbers().init(1)
                .add(this.amount.clone().into(new BigNumbers().init(10)))
            );
    //return Math.round(this.cps * 10 * (1 + this.amount/10));
};

Autoclick.prototype.generate = function(id,name,description,cps,icon) {
        this.setCps(cps);
        
        this.id = id;
        this.div = document.createElement("div");        
        this.div.id = "autoclicker"+id;
        this.div.className = "auto-clicker";
        this.div.setAttribute('onclick',"javascript:buyAutoClicker("+id+")");
        
        //Icon
        if(icon !== ""){
            var img = document.createElement("div");
            img.innerHTML = '<img src="'
                    + icon +'" alt="'
                    + name
                    + '" >';
            this.div.appendChild(img);
        }
        //Image (hidden)
        
        var info = document.createElement("div");
        info.className = "auto-clicker-info";
        
        var title = document.createElement("h2");
        title.innerHTML = name;
        info.appendChild(title);
        
        var description = document.createElement("div");
        description.innerHTML = "<p>"+description+"</p>";
        description.className = "description";
        
        var divInfo = document.createElement("div");
        divInfo.innerHTML = '<span>Cost </span><span id="autoclicker'+
                    id+'-cost">'+this.getCost().toString()+'</span>';
        description.appendChild(divInfo);
        
        divInfo = document.createElement("div");
        divInfo.innerHTML = '<span>level </span><span id="autoclicker'+
                    id+'-lvl">1</span>';
        divInfo.style = "display:none";
        description.appendChild(divInfo);
        
        divInfo = document.createElement("div");
        divInfo.innerHTML = '<span>Base CPS </span><span id="autoclicker'+
                    id+'-base-cps">'+this.getCps().toString()+'</span>';
        description.appendChild(divInfo);
        
        divInfo = document.createElement("div");
        divInfo.innerHTML = '<span>CPS </span><span id="autoclicker'+
                    id+'-cps">'+this.getClicks().toString()+'</span>';
        description.appendChild(divInfo);
        
        
        info.appendChild(description);
        
        
        divInfo = document.createElement("div");
        divInfo.innerHTML = '<span>Amount </span><span id="autoclicker'+
                   id+'-amount">0</span>';
        info.appendChild(divInfo);
        
        divInfo = document.createElement("div");
        divInfo.innerHTML = '<span>CPS </span><span id="autoclicker'+
                    id+'-percent"></span>';
        divInfo.className="autoclicker-cps";
        this.div.appendChild(divInfo);
        
        this.div.appendChild(info);
        
        return this;
};

Autoclick.prototype.refresh = function(totalCPS) {
    if (this.id !== undefined){
        document.getElementById('autoclicker'+this.id+'-lvl')
                .innerHTML = this.getLevel().toString();
        document.getElementById('autoclicker'+this.id+'-cost')
                .innerHTML = this.getCost().toString();
        document.getElementById('autoclicker'+this.id+'-base-cps')
                .innerHTML = this.getCps().toString();
        document.getElementById('autoclicker'+this.id+'-amount')
                .innerHTML = this.getAmount().toString();
        document.getElementById('autoclicker'+this.id+'-cps')
                .innerHTML = this.getClicks().toString();
        if (totalCPS !== undefined) {
            document.getElementById('autoclicker'+this.id+'-percent')
                    .innerHTML = this.getClicks()
                    .times(new BigNumbers().init(100)).
                    into(totalCPS).toString() + "%";
        }
    }
};
