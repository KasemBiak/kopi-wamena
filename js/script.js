const WA_NUMBER = "6285244220067";

const MENU = [
  {
    n: "Espresso Wamena",
    d: "Shot tunggal arabika Baliem, pekat dan bersih",
    p: 18,
    c: "kopi",
    img: "assets/images/espresso.jpg"
  },
  {
    n: "V60 Wamena",
    d: "Seduhan tangan, terasa segar dan sedikit buah",
    p: 28,
    c: "kopi",
    img: "assets/images/kopi-v60.jpg"
  },
  {
    n: "Kopi tubruk Wamena",
    d: "Diseduh tradisional, disajikan dengan ampasnya",
    p: 15,
    c: "kopi",
    img: "assets/images/kopi-tubruk.jpg"
  },
  {
    n: "Cokelat panas",
    d: "Cokelat dan susu hangat",
    p: 20,
    c: "non",
    img: "assets/images/coklat.jpg"
  },
  {
    n: "Teh jahe",
    d: "Diseduh dengan jahe segar",
    p: 15,
    c: "non",
    img: "assets/images/jahe.jpg"
  },
  {
    n: "Ubi bakar",
    d: "Ubi manis dibakar, teman minum kopi",
    p: 12,
    c: "makan",
    img: "assets/images/ubi-bakar.jpg"
  },
  {
    n: "Pisang goreng",
    d: "Digoreng saat dipesan",
    p: 12,
    c: "makan",
    img: "assets/images/pisang-goreng.jpg"
  }
];

const PICK = {
  manis: { n: "Kopi susu Baliem", t: "Manis legit dari gula aren, pas untuk yang baru mulai minum kopi." },
  segar: { n: "V60 Wamena", t: "Segar dan asam tanpa gula dan susu, supaya karakter kopinya berasa." },
  kuat: { n: "Kopi tubruk Wamena", t: "Pekat dan kuat dengan cara seduh tradisional, cocok untuk yang sudah terbiasa minum kopi." },
  ringan: { n: "Teh jahe", t: "Hangat dan menenangkan, cocok untuk yang tidak suka kopi tapi ingin minum sesuatu." }
};

function rupiah(k) {
  return "Rp" + k + ".000";
}

function renderMenu(cat) {
  const list = document.getElementById("menuList");
  list.innerHTML = "";

  MENU
    .filter((m) => cat === "semua" || m.c === cat)
    .forEach((m) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="name">${m.n}<span class="desc">${m.d}</span></span><span class="price">${rupiah(m.p)}</span>`;
      list.appendChild(li);
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
    document.getElementById("result").innerHTML = `<strong>${r.n}</strong>${r.t}`;
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