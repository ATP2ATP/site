(function () {
  "use strict";

  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;

  // Mark the nav as JS-enabled and reveal the toggle button. The button
  // ships with the `hidden` attribute in markup, and the collapsing CSS
  // is scoped to .site-nav.js — so if this script never runs (blocked,
  // fails, JS off), the full link list just stays visible. Nothing here
  // is required for the nav to work, only for it to collapse on mobile.
  nav.classList.add("js");
  toggle.hidden = false;

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    var open = nav.classList.contains("is-open");
    if (open && !nav.contains(event.target) && event.target !== toggle) {
      closeMenu();
    }
  });

  // If the window is resized past the mobile breakpoint while the menu
  // is open, reset it so it doesn't get stuck open at desktop widths.
  var mq = window.matchMedia("(min-width: 48rem)");
  mq.addEventListener("change", function (event) {
    if (event.matches) closeMenu();
  });
})();
