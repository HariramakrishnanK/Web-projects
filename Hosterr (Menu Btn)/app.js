'use strict'

const menuBtn = document.querySelector(".menu");
const menu = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
  const isMenuOpen = menuBtn.getAttribute("aria-expanded") === "true";

  if (isMenuOpen) {
    menuClosing();
    menu.addEventListener("animationend", menuClose);
  }
  else menuOpen();
})

function menuOpen(){
  menuBtn.setAttribute("aria-expanded", "true");
  menu.setAttribute('data-state', "open");
}

function menuClosing(){
  menu.setAttribute('data-state', "closing");
  menuBtn.setAttribute("aria-expanded", "false");
}

function menuClose(){
  menu.setAttribute('data-state', "close");
  menu.removeEventListener("animationend", menuClose);
}