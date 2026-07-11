// Fungsi untuk membuat kartu proyek beserta kolom pembungkusnya
const creatingCardProject = function (project) {
  // 1. Membuat elemen kolom paling luar (<div class="col-md-4">)
  const col = document.createElement("div");
  col.className = "col-md-4";

  // 2. Membuat elemen card (<div class="card h-100 shadow-sm">)
  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm";

  // 3. Membuat elemen gambar (<img>)
  const img = document.createElement("img");
  img.setAttribute("src", `assets/images/projects/${project.image}.jpg`);
  img.className = "card-img-top";
  img.setAttribute("alt", project.title);

  // 4. Membuat elemen body (<div class="card-body">)
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // 5. Membuat judul (<h5 class="card-title">)
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = project.title;

  // 6. Membuat deskripsi (<p class="card-text">)
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = project.desc;

  // Memasukkan judul dan teks ke dalam card-body
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);

  // 7. Membuat elemen footer (<div class="card-footer bg-white border-0 pb-3">)
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer bg-white border-0 pb-3";

  // 8. Membuat tombol tautan (<a>)
  const btn = document.createElement("a");
  btn.setAttribute("href", project.link);
  btn.setAttribute("target", "_blank");
  btn.className = "btn btn-primary w-100";
  btn.textContent = "Lihat Proyek";

  // Memasukkan tombol ke dalam card-footer
  cardFooter.appendChild(btn);

  // 9. Menyusun struktur: masukkan gambar, body, dan footer ke dalam card
  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  // 10. Terakhir, masukkan objek card ke dalam kolom pembungkus (col)
  col.appendChild(card);

  return col;
};

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
      // Target elemen pembungkus utama di HTML (misalnya: <div class="row" id="proyek-row"></div>)
      const rowContainer = document.getElementById("project-row");
      // Looping untuk merender semua data
      projects.forEach((project) => {
        const contanerProject = creatingCardProject(project);
        rowContainer.appendChild(contanerProject);
      });
    })
    .catch(function (error) {
      // Menangani jika terjadi error (salah urutan folder, file tidak ketemu, dll)
      console.error("Terjadi kesalahan pada data proyek:", error);
    });
};
