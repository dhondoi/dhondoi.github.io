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
  document.addEventListener("DOMContentLoaded", async () => {
    await loadSection("navbar", "navbar.html");
    await loadSection("hero", "hero.html");
    await loadSection("about", "about.html");
    await loadSection("projects", "projects.html");
    await loadSection("blogs", "blogs.html");
    await loadSection("contact", "contact.html");

    renderingProjects();
    renderingBlogs();
  });
})();
