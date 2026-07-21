"use strict";

// Fungsi Pembantu: Mengubah Array menjadi potongan-potongan (Chunking)
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Fungsi Template Kartu Blog HTML
function createBlogCardHTML(blog) {
  return `
    <div class="card h-100 border-0 shadow-sm hover-shadow transition">
      <div class="card-body">
        <h5 class="card-title">${blog.title}</h5>
        <span class="badge ${blog.badgeClass} mb-2">${blog.category}</span>
        <p class="card-text text-muted">${blog.desc}</p>
      </div>
      <div class="card-footer bg-white border-0 pt-0 pb-3">
        <a href="${blog.link}" target="_blank" class="btn ${blog.btnClass} w-100">Selengkapnya</a>
      </div>
    </div>
  `;
}

// 1. Render Slider Desktop Blog (3 Kartu per Slide)
function renderDesktopBlogSlider(blogsData) {
  const container = document.getElementById("desktop-blog-container");
  if (!container) return;

  const chunks = chunkArray(blogsData, 3);

  let slidesHTML = chunks
    .map((chunk, index) => {
      const cardsHTML = chunk
        .map(
          (blog) => `
          <div class="col-lg-4">
            ${createBlogCardHTML(blog)}
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
    <div id="blogSliderDesktop" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${slidesHTML}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#blogSliderDesktop" data-bs-slide="prev" style="width: 5%; left: -5%;">
        <span class="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#blogSliderDesktop" data-bs-slide="next" style="width: 5%; right: -5%;">
        <span class="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

// 2. Render Slider Mobile Blog (1 Kartu per Slide)
function renderMobileBlogSlider(blogsData) {
  const container = document.getElementById("mobile-blog-container");
  if (!container) return;

  let indicatorsHTML = blogsData
    .map(
      (_, index) => `
      <button type="button" data-bs-target="#blogSliderMobile" data-bs-slide-to="${index}" class="${index === 0 ? "active" : ""} bg-dark" aria-label="Slide ${index + 1}"></button>
    `,
    )
    .join("");

  let slidesHTML = blogsData
    .map(
      (blog, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="3000">
        <div class="mx-auto" style="max-width: 350px;">
          ${createBlogCardHTML(blog)}
        </div>
      </div>
    `,
    )
    .join("");

  container.innerHTML = `
    <div id="blogSliderMobile" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators mb-0" style="bottom: -40px;">
        ${indicatorsHTML}
      </div>
      <div class="carousel-inner pb-4">
        ${slidesHTML}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#blogSliderMobile" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#blogSliderMobile" data-bs-slide="next">
        <span class="carousel-control-next-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

export const renderingBlogs = function () {
  fetch("assets/jsons/blog.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Gagal mengambil blog");
      return response.json();
    })
    .then(function (blogs) {
      renderDesktopBlogSlider(blogs);
      renderMobileBlogSlider(blogs);

      // Inisialisasi ulang Bootstrap Carousel secara manual
      const desktopElement = document.getElementById("blogSliderDesktop");
      const mobileElement = document.getElementById("blogSliderMobile");

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
      console.error("Error:", error);
    });
};
