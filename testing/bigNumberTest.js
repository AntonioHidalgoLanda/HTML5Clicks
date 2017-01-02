/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var n1 = new BigNumber().init(700);
console.log(700);
console.log(n1);
console.log(n1.toString());

var n2 = new BigNumber().init(27,5);
console.log("27 *1000^5");
console.log(n2);
console.log(n2.toString());

var n3 = n2.clone();

n3.add(n2);
console.log("54 *1000^5");
console.log(n3);
console.log(n3.toString());

n1.power = 3;
var n4 = n1.clone();
n4.add(n2);
console.log("27 *1000^5 + 700");
console.log(n4);
console.log(n4.toString());

n4.times(n2);
console.log("(27 *1000^5 + 700) * 27 *1000^5");
console.log(n4);
console.log(n4.toString());

n3.add(n2.not());
console.log("54 *1000^5 - 27 *1000^5");
console.log(n3);
console.log(n3.toString());


    n1.init(1); // cps
    n2.init(1); //amount
    n3.init(10).times(n1).times(  
                new BigNumber().init(1)
                .add(n2.clone().into(new BigNumber().init(10))) 
            );
console.log("Cost");
console.log(n3);
console.log(n3.toString());


console.log("Cost");
console.log(n2.clone().into(10));
console.log(n2.clone().into(10).toString());



