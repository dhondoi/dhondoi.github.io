// Fungsi untuk membuat kartu blog/proyek berdasarkan data objek baru
const creatingCardBlog = (blog, indexBadgeBtnColor) => {
  const colorPicks = [
    { badge: "bg-primary", btn: "btn-outline-primary" },
    { badge: "bg-success", btn: "btn-outline-success" },
    { badge: "bg-warning", btn: "btn-outline-warning" },
  ];
  // 1. Membuat elemen kolom paling luar (<div class="col">)
  const col = document.createElement("div");
  col.className = "col";

  // 2. Membuat elemen card (<div class="card h-100 border-0 shadow-sm hover-shadow transition">)
  const card = document.createElement("div");
  card.className = "card h-100 border-0 shadow-sm hover-shadow transition";

  // 3. Membuat elemen body (<div class="card-body">)
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // 4. Membuat elemen badge (<span class="badge bg-primary mb-2">)
  const badge = document.createElement("span");
  badge.className = `badge ${colorPicks[indexBadgeBtnColor].badge} mb-2`;
  badge.textContent = blog.category; // Mengambil blog kategori (misal: Data Science)

  // 5. Membuat judul (<h5 class="card-title">)
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = blog.title;

  // 6. Membuat deskripsi (<p class="card-text text-muted">)
  const cardText = document.createElement("p");
  cardText.className = "card-text text-muted";
  cardText.textContent = blog.desc;

  // Menyusun elemen di dalam card-body (Urutan: badge -> judul -> deskripsi)
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(badge);
  cardBody.appendChild(cardText);

  // 7. Membuat elemen footer (<div class="card-footer bg-white border-0 pt-0 pb-3">)
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer bg-white border-0 pt-0 pb-3";

  // 8. Membuat tombol tautan (<a class="btn btn-outline-primary w-100">)
  const btn = document.createElement("a");
  btn.setAttribute("href", blog.link);
  btn.setAttribute("target", "_blank");
  btn.className = `btn ${colorPicks[indexBadgeBtnColor].btn} w-100`;
  btn.textContent = "Selengkapnya";

  // Memasukkan tombol ke dalam card-footer
  cardFooter.appendChild(btn);

  // 9. Menyusun struktur utama: masukkan body dan footer ke dalam card
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  // 10. Masukkan card ke dalam kolom pembungkus
  col.appendChild(card);

  return col;
};

export const renderingBlogs = function () {
  fetch("assets/jsons/blog.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Gagal mengambil blog");
      return response.json();
    })
    .then(function (blogs) {
      const rowContainer = document.getElementById("blog-row");
      let index = 0;
      blogs.forEach(function (blog) {
        const cardBlog = creatingCardBlog(blog, index % 3);
        index += 1;
        rowContainer.appendChild(cardBlog);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
};
