/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function openMenu(evt, menuName) {
  var i, x, tablinks, menu;
  
  x = document.getElementsByClassName("html5clicks-menu");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" html5clicks-tab-selected", "");
  }
  menu = document.getElementById(menuName);
  menu.style.display = "block";
  menu.parentNode.style.display = "table";
  evt.currentTarget.className += " html5clicks-tab-selected";
}

function hideMenu(evt, containerID){
  var menu = document.getElementById(containerID);
  menu.style.display = (menu.style.display === "none")? "table" : "none";
  
}
