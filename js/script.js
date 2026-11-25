const WA_NUMBER = "6285244220067";

const MENU = [
  {
    n: "Kopi Arabika Wamena Kraft (250g)",
    d: "Kemasan standing pouch dengan karakter seimbang untuk seduhan harian",
    p: 85,
    c: "kemasan",
    img: "assets/img/wamena-kraft.jpg"
  },
  {
    n: "Kopi Arabika Wamena Reserve Pack (500g)",
    d: "Kemasan dengan isi lebih banyak, cocok untuk stok kopi harian di rumah atau untuk dibagikan ke teman dan keluarga",
    p: 155,
    c: "kemasan",
    img: "assets/img/wamena-toples.jpg"
  },
  {
    n: "Wamena Pour-Over Edition",
    d: "Dirancang untuk seduhan manual atau filter agar karakter rasa dan aromanya tampil lebih bersih dan segar",
    p: 90,
    c: "profil",
    img: "assets/img/wamena-pourover.jpg"
  },
  {
    n: "Kopi Wamena Seduh Klasik",
    d: "Karakter rasa lebih pekat dan hangat, cocok untuk seduhan tubruk",
    p: 85,
    c: "profil",
    img: "assets/img/wamena-tubruk.jpg"
  },
  {
    n: "Wamena Espresso Roast",
    d: "Sangrai dengan profil bold dan rasa kuat untuk espresso, moka pot, atau kopi susu racikan sendiri",
    p: 95,
    c: "profil",
    img: "assets/img/wamena-espresso.jpg"
  }
];

const PICK = {
  seimbang: {
    n: "Kopi Arabika Wamena Kraft (250g)",
    t: "Pilihan serbaguna untuk diseduh dengan berbagai metode di rumah dan mudah dikirim ke luar daerah."
  },
  segar: {
    n: "Wamena Pour-Over Edition",
    t: "Cocok jika kamu menyukai kopi dengan keasaman segar, bersih, dan aroma yang menonjol."
  },
  kuat: {
    n: "Kopi Wamena Seduh Klasik",
    t: "Pas untuk penikmat kopi pekat dengan sensasi rasa tradisional yang lebih mantap."
  },
  bold: {
    n: "Wamena Espresso Roast",
    t: "Direkomendasikan untuk kamu yang suka karakter kopi tebal dan kuat."
  }
};

function rupiah(k) {
  return "Rp" + k + ".000";
}

function arahkanKePesan(namaProduk) {
  const inputPesan = document.getElementById("pesan");
  const inputNama = document.getElementById("nama");
  const bagianKontak = document.getElementById("kontak");

  if (inputPesan) {
    inputPesan.value = `1 ${namaProduk}`;
  }
  if (bagianKontak) {
    bagianKontak.scrollIntoView({ behavior: "smooth" });
  }
  if (inputNama) {
    setTimeout(() => inputNama.focus(), 350);
  }
}

function renderMenu(cat) {
  const list = document.getElementById("menuList");
  list.innerHTML = "";

  MENU
    .filter((m) => cat === "semua" || m.c === cat)
    .forEach((m, index) => {
      const li = document.createElement("li");
      li.className = "menu-item";
      const loadMode = index === 0 ? "eager" : "lazy";
      li.innerHTML = `
        <img src="${m.img}" alt="${m.n}" class="menu-thumb" loading="${loadMode}" decoding="async">
        <div class="menu-body">
          <div class="menu-head">
            <span class="name">${m.n}</span>
            <span class="price">${rupiah(m.p)}</span>
          </div>
          <span class="desc">${m.d}</span>
          <button type="button" class="btn btn-sm pesan-btn" data-produk="${m.n}">Pesan sekarang</button>
        </div>
      `;
      list.appendChild(li);
    });

  list.querySelectorAll(".pesan-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      arahkanKePesan(btn.dataset.produk);
    });
  });
}

async function siapkanGambarProduk(daftarMenu) {
  if (!Array.isArray(daftarMenu) || daftarMenu.length === 0) return;

  const urls = [...new Set(daftarMenu.map((item) => item.img).filter(Boolean))];

  if ("caches" in window) {
    try {
      const cache = await caches.open("kopi-wamena-img-v1");
      await Promise.all(
        urls.map(async (url) => {
          const sudahAda = await cache.match(url);
          if (!sudahAda) {
            const res = await fetch(url);
            if (res.ok) await cache.put(url, res);
          }
        })
      );
    } catch (_) {
      // Abaikan jika browser membatasi Cache API pada mode tertentu
    }
  }

  urls.forEach((url) => {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  });
}

renderMenu("semua");
siapkanGambarProduk(MENU);

document.querySelectorAll(".tab").forEach((t) => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((x) => x.setAttribute("aria-selected", "false"));
    t.setAttribute("aria-selected", "true");
    renderMenu(t.dataset.cat);
  });
});

document.querySelectorAll(".chip").forEach((c) => {
  c.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", "false"));
    c.setAttribute("aria-pressed", "true");
    const r = PICK[c.dataset.taste];
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = `
      <strong>${r.n}</strong>
      <p>${r.t}</p>
      <button type="button" class="btn btn-sm" id="pesanRekomendasi">Pesan varian ini</button>
    `;
    document.getElementById("pesanRekomendasi").addEventListener("click", () => {
      arahkanKePesan(r.n);
    });
  });
});

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
});

["aboutWaLink", "contactWaLink"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = `https://wa.me/${WA_NUMBER}`;
});

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  const text = `Halo Kopi Wamena, saya ${nama}. Pesanan: ${pesan}`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});