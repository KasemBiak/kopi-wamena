var WA_NUMBER = "6285656235388";

var MENU = [
  { n: "Espresso Wamena", d: "Shot tunggal arabika Baliem, pekat dan bersih", p: 18, c: "kopi" },
  { n: "Kopi susu Baliem", d: "Espresso Wamena, susu segar, gula aren cair", p: 24, c: "kopi" },
  { n: "V60 Wamena", d: "Seduhan tangan, terasa segar dan sedikit buah", p: 28, c: "kopi" },
  { n: "Kopi tubruk Wamena", d: "Diseduh tradisional, disajikan dengan ampasnya", p: 15, c: "kopi" },
  { n: "Cokelat panas", d: "Cokelat dan susu hangat", p: 20, c: "non" },
  { n: "Teh jahe", d: "Diseduh dengan jahe segar", p: 15, c: "non" },
  { n: "Ubi bakar", d: "Ubi manis dibakar, teman minum kopi", p: 12, c: "makan" },
  { n: "Pisang goreng", d: "Digoreng saat dipesan", p: 12, c: "makan" }
];

var PICK = {
  manis:  { n: "Kopi susu Baliem", t: "Manis legit dari gula aren. Pas untuk kamu yang baru mulai mencoba kopi." },
  segar:  { n: "V60 Wamena", t: "Segar dan asam alami. Disajikan tanpa gula maupun susu agar karakter asli kopinya tetap terasa." },
  kuat:   { n: "Kopi tubruk Wamena", t: "Pekat dan kuat dengan metode seduh tradisional. Cocok untuk penikmat kopi sejati." },
  ringan: { n: "Teh jahe", t: "Hangat dan menenangkan. Pilihan tepat buat yang tidak minum kopi tapi tetap ingin bersantai." }
};

function rupiah(k) {
  return "Rp" + k + ".000";
}

function renderMenu(cat) {
  var list = document.getElementById("menuList");
  if (!list) return;
  list.innerHTML = "";
  MENU.filter(function(m) {
    return cat === "semua" || m.c === cat;
  }).forEach(function(m) {
    var li = document.createElement("li");
    li.innerHTML =
      '<span class="name">' + m.n + '<span class="desc">' + m.d + '</span></span>' +
      '<span class="price">' + rupiah(m.p) + '</span>';
    list.appendChild(li);
  });
}
renderMenu("semua");

document.querySelectorAll(".tab").forEach(function(t) {
  t.addEventListener("click", function() {
    document.querySelectorAll(".tab").forEach(function(x) {
      x.setAttribute("aria-selected", "false");
    });
    t.setAttribute("aria-selected", "true");
    renderMenu(t.dataset.cat);
  });
});

document.querySelectorAll(".chip").forEach(function(c) {
  c.addEventListener("click", function() {
    document.querySelectorAll(".chip").forEach(function(x) {
      x.setAttribute("aria-pressed", "false");
    });
    c.setAttribute("aria-pressed", "true");
    var r = PICK[c.dataset.taste];
    var resultEl = document.getElementById("result");
    if (r && resultEl) {
      resultEl.innerHTML = "<strong>" + r.n + "</strong> — " + r.t;
    }
  });
});

var burger = document.getElementById("burger");
var nav = document.getElementById("nav");
if (burger && nav) {
  burger.addEventListener("click", function() {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function(e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

var orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var nama = document.getElementById("nama").value.trim();
    var pesan = document.getElementById("pesan").value.trim();
    var text = "Halo Kopi Wamena, saya " + nama + ". Pesanan: " + pesan;
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
  });
}
