"use strict";

import { renderingBlogs } from "./blogs.js";
import { renderingProjects } from "./projects.js";

(() => {
  const loadSection = async (id, file) => {
    await fetch(`sections/${file}`)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(id).innerHTML = data;
      });
  };

  // Memuat semua seksi saat halaman dimuat
  document.addEventListener("DOMContentLoaded", () => {
    loadSection("navbar", "navbar.html");
    loadSection("hero", "hero.html");
    loadSection("about", "about.html");
    loadSection("projects", "projects.html");
    loadSection("blogs", "blogs.html");
    loadSection("contact", "contact.html");

    renderingProjects();
    renderingBlogs();
  });
})();
