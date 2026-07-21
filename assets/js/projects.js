"use strict";

// Fungsi Pembantu: Mengubah Array menjadi potongan-potongan (Chunking)
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Fungsi Template Kartu HTML
function createCardHTML(project) {
  return `
        <div class="card h-100 shadow-sm">
          <img src="./assets/images/projects/${project.image}.jpg" class="card-img-top" alt="${project.title}">
          <div class="card-body">
            <h5 class="card-title">${project.title}</h5>
            <p class="card-text">${project.desc}</p>
          </div>
          <div class="card-footer bg-white border-0 pb-3">
            <a href="${project.link}" target="_blank" class="btn btn-primary w-100">Lihat Proyek</a>
          </div>
        </div>
      `;
}

// 2. Render Slider Desktop (3 Kartu per Slide)
function renderDesktopSlider(projectsData) {
  const container = document.getElementById("desktop-slider-container");
  const chunks = chunkArray(projectsData, 3);

  let slidesHTML = chunks
    .map((chunk, index) => {
      const cardsHTML = chunk
        .map(
          (project) => `
          <div class="col-lg-4">
            ${createCardHTML(project)}
          </div>
        `,
        )
        .join("");

      return `
          <div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="3000">
            <div class="row g-4">
              ${cardsHTML}
            </div>
          </div>
        `;
    })
    .join("");

  container.innerHTML = `
        <div id="projectSliderDesktop" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${slidesHTML}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#projectSliderDesktop" data-bs-slide="prev" style="width: 5%; left: -5%;">
            <span class="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#projectSliderDesktop" data-bs-slide="next" style="width: 5%; right: -5%;">
            <span class="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
          </button>
        </div>
      `;
}

// 3. Render Slider Mobile (1 Kartu per Slide)
function renderMobileSlider(projectsData) {
  const container = document.getElementById("mobile-slider-container");

  let indicatorsHTML = projectsData
    .map(
      (_, index) => `
        <button type="button" data-bs-target="#projectSliderMobile" data-bs-slide-to="${index}" class="${index === 0 ? "active" : ""} bg-dark" aria-label="Slide ${index + 1}"></button>
      `,
    )
    .join("");

  let slidesHTML = projectsData
    .map(
      (project, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <div class="mx-auto" style="max-width: 350px;">
            ${createCardHTML(project)}
          </div>
        </div>
      `,
    )
    .join("");

  container.innerHTML = `
        <div id="projectSliderMobile" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators mb-0" style="bottom: -40px;">
            ${indicatorsHTML}
          </div>
          <div class="carousel-inner pb-4">
            ${slidesHTML}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#projectSliderMobile" data-bs-slide="prev">
            <span class="carousel-control-prev-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#projectSliderMobile" data-bs-slide="next">
            <span class="carousel-control-next-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
          </button>
        </div>
      `;
}

export const renderingProjects = function () {
  fetch("assets/jsons/project.json")
    .then(function (response) {
      // Pastikan request berhasil sebelum memproses project
      if (!response.ok) {
        throw new Error("Gagal mengambil data proyek: " + response.statusText);
      }
      return response.json(); // Mengubah response menjadi object/array JavaScript
    })
    .then(function (projects) {
      renderDesktopSlider(projects);
      renderMobileSlider(projects);

      // 2. Inisialisasi ulang Bootstrap Carousel secara manual
      const desktopElement = document.getElementById("projectSliderDesktop");
      const mobileElement = document.getElementById("projectSliderMobile");

      if (desktopElement) {
        new bootstrap.Carousel(desktopElement, {
          interval: 3000,
          ride: "carousel",
        });
      }

      if (mobileElement) {
        new bootstrap.Carousel(mobileElement, {
          interval: 3000,
          ride: "carousel",
        });
      }
    })
    .catch(function (error) {
      // Menangani jika terjadi error (salah urutan folder, file tidak ketemu, dll)
      console.error("Terjadi kesalahan pada data proyek:", error);
    });
};
