/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

conf = {
  background: "/HTML5Clicks/img/colony/base.png",
  clickName: "Budget",
  clickCoin: "$",
  metaPointsName: "Land",
  metaPointsCoin: "square feet",
  resetLvl1Label: "Resettlement",
  resetLvl1Hint: "Establish the colony in a different settlement",
  casualPointsName: "Science",
  casualPintsCoin: "bit",
  autoClickers:[
      {
          id:"0",
          name:"Primary Sector Land",
          icon:"",
          display:{
              img:"/HTML5Clicks/img/colony/farm.png",
              x:750, 
              y:220,    
              width:250 
          },
          description:"Agrary, livestock, woodfarms or mines.",
          cps:1
      },
      {
          id:"1",
          name:"Secondary Sector Land",
          icon:"",
          display:{ 
              img:"/HTML5Clicks/img/colony/mill.png",  
              x:445,      
              y:295,      
              width:50   
          },
          description:"",
          cps:1000
      },
      {
          id:"2",
          name:"Terciary Sector Land",
          icon:"img/singularity/computer.png",
          display:{
              img:"/HTML5Clicks/img/colony/market.png",
              x:450,
              y:250,
              width:100
          },
          description:"Markets and shops.",
          cps:100000000
      }
  ]
};

