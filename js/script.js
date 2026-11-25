const WA_NUMBER = "6285244220067";

const MENU = [
  {
    n: "Kopi Arabika Wamena Kraft 250g",
    d: "Kemasan standing pouch berlabel Papua Wamena dengan karakter seimbang untuk seduhan harian",
    p: 85,
    c: "kemasan",
    img: "assets/images/wamena-kraft.jpg"
  },
  {
    n: "Kopi Wamena Reserve Pack + Stok Biji",
    d: "Kemasan hitam berlabel Papua Wamena yang pas untuk stok biji sangrai maupun kebutuhan kedai",
    p: 155,
    c: "kemasan",
    img: "assets/images/wamena-toples.jpg"
  },
  {
    n: "Wamena Pour-Over Edition",
    d: "Dirancang untuk seduhan manual/filter agar karakter rasa dan aromanya tampil lebih bersih dan segar",
    p: 90,
    c: "profil",
    img: "assets/images/wamena-pourover.jpg"
  },
  {
    n: "Kopi Wamena Seduh Klasik",
    d: "Karakter rasa lebih pekat dan hangat, cocok untuk seduhan tubruk atau gelas harian",
    p: 85,
    c: "profil",
    img: "assets/images/wamena-tubruk.jpg"
  },
  {
    n: "Wamena Espresso Roast",
    d: "Sangrai dengan profil bold dan rasa kuat untuk espresso, moka pot, atau kopi susu racikan sendiri",
    p: 95,
    c: "profil",
    img: "assets/images/wamena-espresso.jpg"
  }
];

const PICK = {
  seimbang: {
    n: "Kopi Arabika Wamena 250g (Biji / Bubuk)",
    t: "Pilihan serbaguna untuk diseduh dengan berbagai metode di rumah dan mudah dikirim ke luar daerah."
  },
  segar: {
    n: "V60 Wamena — Light-Medium Roast",
    t: "Cocok jika kamu menyukai kopi dengan keasaman segar, bersih, dan aroma yang menonjol."
  },
  kuat: {
    n: "Kopi Tubruk Wamena — Medium-Dark Roast",
    t: "Pas untuk penikmat kopi pekat dengan sensasi rasa tradisional yang lebih mantap."
  },
  bold: {
    n: "Espresso Blend Wamena — Bold & Clean",
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
    .forEach((m) => {
      const li = document.createElement("li");
      li.className = "menu-item";
      li.innerHTML = `
        <img src="${m.img}" alt="${m.n}" class="menu-thumb" loading="lazy">
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

renderMenu("semua");

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