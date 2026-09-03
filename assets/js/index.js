"use strict";

import { renderingBlogs } from "./blogs.js";
import { renderingProjects } from "./projects.js";

(() => {
  const disableScroll = (e) => {
    e.preventDefault();
  };
  // Mencegah gerakan scroll
  window.addEventListener("wheel", disableScroll, { passive: false });
  window.addEventListener("touchmove", disableScroll, { passive: false });
  
  const loadSection = async (id, file) => {
    await fetch(`sections/${file}`)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(id).innerHTML = data;
      });
  };

  // Memuat semua seksi saat halaman dimuat
  document.addEventListener("DOMContentLoaded", async () => {
    await loadSection("loading-modal", "loading-modal.html");
    document.getElementById("loading-modal").classList.add("loaded");
    await loadSection("navbar", "navbar.html");
    await loadSection("hero", "hero.html");
    await loadSection("about", "about.html");
    await loadSection("projects", "projects.html");
    await loadSection("blogs", "blogs.html");
    await loadSection("contact", "contact.html");

    renderingProjects();
    renderingBlogs();

    // Aktifkan pemblokiran
    // particle.js
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load(
      "particles-js",
      "./assets/jsons/particle.json",
      function () {
        console.log("callback - particles.js config loaded");
        setTimeout(function () {
          document.getElementById("loading-modal").remove();
          window.removeEventListener("wheel", disableScroll);
          window.removeEventListener("touchmove", disableScroll);
        }, 500);
      },
    );
  });
})();
