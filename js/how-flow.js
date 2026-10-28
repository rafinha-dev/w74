"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("#como-funciona .how-flow-list");
  if (!list) return;
  const clear = () => list.querySelectorAll(".is-touch-highlighted")
    .forEach((item) => item.classList.remove("is-touch-highlighted"));
  list.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;
    clear();
    const item = event.target.closest("li");
    if (item && list.contains(item)) item.classList.add("is-touch-highlighted");
  });
  list.addEventListener("pointerup", clear);
  list.addEventListener("pointercancel", clear);
  list.addEventListener("pointerleave", clear);
});
