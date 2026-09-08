/* =========================================================
   ANDHRA GREEN FLORA NURSERY — vanilla JS version
   No React, no Babel, no build step. Plain HTML strings,
   DOM updates, and inline event handlers.
   Design language: hand-tagged nursery signage.
========================================================= */

const NURSERY = {
  name: "Andhra Green Flora Nursery",
  phone: "+91 75691 65497",
  phoneRaw: "917569165497",
  whatsappNote: "Tell us the plant names and quantities. We will confirm stock and delivery.",
};

/* ---------- tiny helpers ---------- */
function escapeAttr(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- icon svg generators (replace lucide-react) ---------- */
function iconSvg(pathD, opts = {}) {
  const { size = 18, color = "currentColor", strokeWidth = 2, viewBox = "0 0 24 24", extra = "" } = opts;
  return `<svg width="${size}" height="${size}" viewBox="${viewBox}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${extra || `<path d="${pathD}"/>`}</svg>`;
}
const leafIcon = (size = 18, color = "currentColor") =>
  iconSvg("M11 20A7 7 0 0 1 4 13c0-5 4-9 9-9 5 0 8 3 8 8a7 7 0 0 1-7 7c-1.5 0-3-.5-4-1.5M4 13c4 0 8-4 9-9", { size, color });
const basketIcon = (size = 18, color = "currentColor") =>
  iconSvg(null, { size, color, extra: `<path d="M5 9h14l-1.4 9.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.8L5 9Z"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/>` });
const plusIcon = (size = 18, color = "currentColor") => iconSvg("M12 5v14M5 12h14", { size, color });
const minusIcon = (size = 18, color = "currentColor") => iconSvg("M5 12h14", { size, color });
const xIcon = (size = 18, color = "currentColor") => iconSvg("M18 6 6 18M6 6l12 12", { size, color });
const checkIcon = (size = 18, color = "currentColor") => iconSvg("M20 6 9 17l-5-5", { size, color });
const arrowLeftIcon = (size = 18, color = "currentColor") => iconSvg("M19 12H5M12 19l-7-7 7-7", { size, color });
const treeIcon = (size = 15, color = "currentColor") =>
  iconSvg(null, { size, color, extra: `<path d="M12 2 7 9h2l-4 6h4l-3 5h12l-3-5h4l-4-6h2L12 2Z"/><path d="M12 22v-4"/>` });
const flowerIcon = (size = 15, color = "currentColor") =>
  iconSvg(null, {
    size, color,
    extra: `<circle cx="12" cy="12" r="2.5"/><path d="M12 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3ZM12 16a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3ZM4.9 6.9A3 3 0 0 1 9 6.9a3 3 0 0 1 0 4.2 3 3 0 0 1-4.1 0 3 3 0 0 1 0-4.2ZM15 12.9a3 3 0 0 1 4.1 0 3 3 0 0 1 0 4.2 3 3 0 0 1-4.1 0 3 3 0 0 1 0-4.2ZM4.9 17.1a3 3 0 0 1 0-4.2 3 3 0 0 1 4.1 0 3 3 0 0 1 0 4.2 3 3 0 0 1-4.1 0ZM15 6.9a3 3 0 0 1 4.1 0 3 3 0 0 1 0 4.2 3 3 0 0 1-4.1 0 3 3 0 0 1 0-4.2Z"/>`,
  });
const sproutIcon = (size = 15, color = "currentColor") =>
  iconSvg(null, { size, color, extra: `<path d="M7 20h10M12 20v-8"/><path d="M12 12C12 7 8 5 4 5c0 4 2 8 8 7Z"/><path d="M12 12c0-4 3-7 8-7 0 4-1.5 7.5-8 7Z"/>` });
const searchIcon = (size = 16, color = "currentColor") =>
  iconSvg(null, { size, color, extra: `<circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/>` });
const whatsAppIcon = (size = 18, color = "currentColor") =>
  iconSvg(null, {
    size, color, viewBox: "0 0 24 24",
    extra: `<path d="M20.5 12.1A8.5 8.5 0 0 1 7.4 19.3L4 20.5l1.3-3.3A8.5 8.5 0 1 1 20.5 12.1Z" stroke-width="1.6"/><path d="M9.2 8.8c.2-.5.3-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.7.6 1.8s0 .3-.2.5c-.1.2-.3.3-.4.5s-.2.3 0 .6c.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.3 2.5 1.5.3.1.5.1.7 0 .2-.1.8-.9 1-1.2.1-.3.3-.2.5-.1l1.6.8c.2.1.4.2.4.3 0 .5-.2 1.3-1 1.7-.7.4-1.6.4-2.6.1-2.6-.8-4.7-2.5-6.2-4.8-1.1-1.7-1.4-3.2-1.5-3.7 0-1 .6-1.9 1.3-2.2Z" stroke-width="1.6"/>`,
  });

const CATEGORIES = [
  { id: "fruit", label: "Fruit Plants", iconFn: treeIcon, tint: "#A8502E" },
  { id: "flower", label: "Flowering Plants", iconFn: flowerIcon, tint: "#E2932B" },
  { id: "decor", label: "Decorative Plants", iconFn: sproutIcon, tint: "#52803B" },
];

/* ---------- illustrated plant art (SVG strings) ---------- */
function potSvg(color = "#A8502E") {
  return `<path d="M33,74 L67,74 L61,96 L39,96 Z" fill="${color}"/><rect x="30" y="69" width="40" height="7" rx="2" fill="${color}"/>`;
}

function plantArtSvg({ kind, canopy = "#52803B", accent = "#A8502E", potColor = "#A8502E" } = {}) {
  const trunk = `<rect x="47" y="52" width="6" height="20" fill="#6B4A2E"/>`;
  switch (kind) {
    case "tree-round":
      return `<svg viewBox="0 0 100 100" width="100%" height="100%">${trunk}<ellipse cx="50" cy="40" rx="28" ry="24" fill="${canopy}"/><circle cx="38" cy="34" r="4.5" fill="${accent}"/><circle cx="58" cy="28" r="4.5" fill="${accent}"/><circle cx="50" cy="48" r="4.5" fill="${accent}"/><circle cx="64" cy="44" r="4.5" fill="${accent}"/>${potSvg(potColor)}</svg>`;
    case "papaya": {
      const leaves = [0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="50" cy="30" rx="20" ry="8" fill="${canopy}" transform="rotate(${a} 50 30)"/>`).join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="47" y="30" width="6" height="42" fill="#6B4A2E"/>${leaves}<ellipse cx="43" cy="46" rx="5" ry="8" fill="${accent}"/><ellipse cx="57" cy="50" rx="5" ry="8" fill="${accent}"/><ellipse cx="50" cy="58" rx="5" ry="8" fill="${accent}"/>${potSvg(potColor)}</svg>`;
    }
    case "bush-bloom": {
      const petals = [0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-11" rx="7" ry="12" fill="${accent}" transform="rotate(${a})"/>`).join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%">${trunk}<ellipse cx="50" cy="46" rx="24" ry="20" fill="${canopy}"/><g transform="translate(50,34)">${petals}<circle r="4" fill="#FBF7EE"/></g>${potSvg(potColor)}</svg>`;
    }
    case "climber": {
      const dots = [[40, 55], [55, 44], [38, 32], [52, 20], [44, 12]]
        .map(([x, y]) => `<g transform="translate(${x},${y})"><path d="M0,-6 L6,0 L0,6 L-6,0 Z" fill="${accent}"/><path d="M0,-6 L6,0 L0,6 L-6,0 Z" fill="${accent}" transform="rotate(90) scale(0.8)" opacity="0.8"/></g>`)
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50,72 C30,60 62,50 40,38 C60,28 34,20 48,10" stroke="#4A6B36" stroke-width="3" fill="none"/>${dots}${potSvg(potColor)}</svg>`;
    }
    case "pompom": {
      const blobs = [[44, 44, 10], [56, 38, 12], [50, 52, 9]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}"/><circle cx="${x}" cy="${y}" r="${r * 0.55}" fill="#F4C15C"/>`)
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M42,74 L44,50 M50,74 L50,44 M58,74 L56,50" stroke="#4A6B36" stroke-width="3" fill="none"/>${blobs}${potSvg(potColor)}</svg>`;
    }
    case "vine-star": {
      const flowers = [[42, 52], [52, 40], [40, 30], [50, 18]]
        .map(([x, y]) => {
          const petals = [0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-4" rx="2" ry="4" fill="#FBF7EE" transform="rotate(${a})"/>`).join("");
          return `<g transform="translate(${x},${y})">${petals}<circle r="1.6" fill="${accent}"/></g>`;
        })
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50,74 C34,62 60,54 40,44 C58,36 36,26 50,14" stroke="#4A6B36" stroke-width="3" fill="none"/>${flowers}${potSvg(potColor)}</svg>`;
    }
    case "spike": {
      const buds = [24, 30, 36, 42, 48, 54].map((y, i) => `<ellipse cx="${49 + (i % 2 === 0 ? -6 : 6)}" cy="${y}" rx="6" ry="3.4" fill="${accent}"/>`).join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="46" cy="70" rx="14" ry="6" fill="${canopy}"/><ellipse cx="56" cy="72" rx="12" ry="5" fill="${canopy}"/><rect x="47.5" y="18" width="3" height="54" fill="#4A6B36"/>${buds}${potSvg(potColor)}</svg>`;
    }
    case "rose":
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50,74 L50,32" stroke="#4A6B36" stroke-width="3" fill="none"/><path d="M50,54 L60,50 M50,44 L40,40" stroke="#4A6B36" stroke-width="2.5" fill="none"/><ellipse cx="60" cy="50" rx="6" ry="4" fill="${canopy}" transform="rotate(20 60 50)"/><ellipse cx="40" cy="40" rx="6" ry="4" fill="${canopy}" transform="rotate(-20 40 40)"/><g transform="translate(50,20)"><circle r="12" fill="${accent}"/><circle r="8.4" fill="#C25A3A"/><circle r="4.8" fill="#8F3A26"/></g>${potSvg(potColor)}</svg>`;
    case "vine-heart": {
      const leaves = [[34, 44], [26, 34], [62, 38], [70, 28], [46, 20]]
        .map(([x, y]) => `<path d="M0,-6 C4,-10 9,-6 6,0 C4,6 0,9 0,9 C0,9 -4,6 -6,0 C-9,-6 -4,-10 0,-6 Z" fill="${canopy}" transform="translate(${x},${y}) scale(1.1)"/>`)
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M45,72 C30,66 26,54 34,44" stroke="#4A6B36" stroke-width="3" fill="none"/><path d="M55,72 C70,64 72,50 62,38" stroke="#4A6B36" stroke-width="3" fill="none"/>${leaves}${potSvg(potColor)}</svg>`;
    }
    case "palm": {
      const fronds = [-55, -25, 0, 25, 55]
        .map((a) => {
          const lines = [6, 12, 18, 24].map((d) => `<line x1="${d * 1.05}" y1="${-d * 0.9}" x2="${d * 1.05 + 6}" y2="${-d * 0.9 - 4}" stroke="${canopy}" stroke-width="3"/>`).join("");
          return `<g transform="translate(50,46) rotate(${a})"><path d="M0,0 C10,-6 24,-14 30,-24" stroke="#4A6B36" stroke-width="2.5" fill="none"/>${lines}</g>`;
        })
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="47" y="46" width="6" height="26" fill="#6B4A2E"/>${fronds}${potSvg(potColor)}</svg>`;
    }
    case "blade": {
      const blades = [[40, 0.9, "#3D5C2C"], [47, 1.05, canopy], [54, 0.95, "#3D5C2C"], [61, 0.85, canopy]]
        .map(([x, s, c]) => `<path d="M${x},74 C${x - 6},50 ${x - 2},28 ${x + 1},14 C${x + 5},28 ${x + 8},50 ${x + 5},74 Z" fill="${c}" transform="scale(${s}) translate(${x * (1 / s - 1)},0)"/>`)
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%">${blades}${potSvg(potColor)}</svg>`;
    }
    case "fern": {
      const groups = [-60, -35, -12, 12, 35, 60]
        .map((a) => {
          const ticks = [8, 16, 24, 32]
            .map((d) => `<line x1="-1" y1="${-d}" x2="-7" y2="${-d - 3}" stroke="${canopy}" stroke-width="2"/><line x1="1" y1="${-d}" x2="7" y2="${-d - 3}" stroke="${canopy}" stroke-width="2"/>`)
            .join("");
          return `<g transform="translate(50,70) rotate(${a})"><path d="M0,0 C4,-14 2,-28 -2,-40" stroke="#4A6B36" stroke-width="1.6" fill="none"/>${ticks}</g>`;
        })
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%">${groups}${potSvg(potColor)}</svg>`;
    }
    case "broadleaf": {
      const leaves = [[40, 55, -20, canopy], [58, 50, 15, accent], [50, 40, -5, canopy]]
        .map(([x, y, a, c]) => `<g transform="translate(${x},${y}) rotate(${a})"><path d="M0,20 C-10,10 -10,-14 0,-24 C10,-14 10,10 0,20 Z" fill="${c}"/><line x1="0" y1="18" x2="0" y2="-20" stroke="#FBF7EE" stroke-width="1.2" opacity="0.6"/></g>`)
        .join("");
      return `<svg viewBox="0 0 100 100" width="100%" height="100%">${leaves}${potSvg(potColor)}</svg>`;
    }
    default:
      return `<svg viewBox="0 0 100 100" width="100%" height="100%">${trunk}<ellipse cx="50" cy="42" rx="24" ry="20" fill="${canopy}"/>${potSvg(potColor)}</svg>`;
  }
}

/* Renders a photo if the product has one, else the illustrated icon.
   If the photo URL fails to load, it swaps itself for the icon. */
function plantThumbHTML(product, potColor, size = 160) {
  if (product.image) {
    const artJson = escapeAttr(JSON.stringify({ ...product.art, potColor }));
    return `<img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)}" data-art='${artJson}' onerror="handleImgError(this)" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block" />`;
  }
  return `<div style="width:${size}px;height:${size}px">${plantArtSvg({ ...product.art, potColor })}</div>`;
}
window.handleImgError = function (img) {
  try {
    const art = JSON.parse(img.getAttribute("data-art"));
    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.innerHTML = plantArtSvg(art);
    img.replaceWith(wrapper);
  } catch (e) {
    /* ignore */
  }
};

/* ---------- product data ---------- */
/* Add or change a photo for any plant by editing its "image" url below.
   Leave image: "" to keep the illustrated icon. No prices are stored —
   this catalogue is inquiry-only; customers send their plant list in
   and get pricing/availability back by phone or WhatsApp.

   TO ADD A NEW PLANT: just add one line with name, image, and cat —
   everything else fills in automatically. Example:
     { name: "Ashoka Tree", image: "https://example.com/ashoka.jpg", cat: "decor" },
   cat must be one of: "fruit", "flower", "decor". */
const PRODUCTS_RAW = [
  { id: "f1", cat: "fruit", name: "Banganapalli Mango", note: "Grafted mango, fruits in 2–3 years, sweet and fragrant", image: "https://images.jdmagicbox.com/quickquotes/images_main/banganapalli-mango-plant-2221178714-z7tmnglh.jpg", art: { kind: "tree-round", canopy: "#3D6B2E", accent: "#E2932B" } },
  { id: "f2", cat: "fruit", name: "Allahabad Safeda Guava", note: "Sweet, heavy-yielding guava with soft white flesh", image: "https://www.blueberrybotanicals.in/cdn/shop/files/allahabad-safeda-guava-grafted-plant-psidium-guajava-allahabad-safeda-white-flesh-guava-tree-india-show-fruits-as-well.png?v=1785690650", art: { kind: "tree-round", canopy: "#5A8A3E", accent: "#C9D97A" } },
  { id: "f3", cat: "fruit", name: "Pomegranate (Bhagwa)", note: "Compact pomegranate, deep red juicy arils", image: "https://plantaeroot.com/wp-content/uploads/2025/09/Untitled-design-91.png", art: { kind: "tree-round", canopy: "#4C7A3D", accent: "#C1382B" } },
  { id: "f4", cat: "fruit", name: "Mosambi Sweet Lime", note: "Juicy sweet citrus, low-maintenance grower", image: "https://dukaan.b-cdn.net/700x700/webp/730950/570a0a01-8039-4174-b518-9bf54edfe5fb/mosambi-plant-500x500-bd94f198-5976-4fd9-b781-4fc2d4322765.png", art: { kind: "tree-round", canopy: "#598A3F", accent: "#D9E06B" } },
  { id: "f5", cat: "fruit", name: "Papaya (Red Lady)", note: "Fast-growing dwarf papaya, fruits within a year", image: "https://i.ebayimg.com/images/g/ExIAAOSwE85nohZC/s-l400.jpg", art: { kind: "papaya", canopy: "#4C7A3D", accent: "#E2932B" } },
  { id: "f6", cat: "fruit", name: "Sapota (Chikoo)", note: "Shade-loving tree, sweet grainy brown fruit", image: "https://media.vyaparify.com/vcards/products/125902/product_1738080409_67990099a31d5.png", art: { kind: "tree-round", canopy: "#4A6B36", accent: "#8F6B3E" } },
  { id: "f7", cat: "fruit", name: "Grape", note: "Climbing vine, sweet seedless grape bunches", image: "https://cdn-image.blitzshopdeck.in/ShopdeckCatalogue/tr:f-webp,w-600,fo-auto/659e177dd1fb7720da83da3e/media/Seedless_Red_Grapes_Plant_Thai_Verity_1705128479318_m74nnfayliry29r.jpg", art: { kind: "tree-round", canopy: "#4A6B36", accent: "#8F6B3E" } },
  { id: "l1", cat: "flower", name: "Hibiscus (Mandara)", note: "Everyday pooja flower, blooms almost year-round", image: "https://m.media-amazon.com/images/I/61A1fcIuXNL._AC_UF1000,1000_QL80_.jpg", art: { kind: "bush-bloom", canopy: "#4C7A3D", accent: "#C1382B" } },
  { id: "l2", cat: "flower", name: "Bougainvillea", note: "Vigorous climber, vivid papery pink bracts", image: "https://nurserylive.com/cdn/shop/products/nurserylive-g-bougainvillea-pink-plant.jpg?v=1634214812&width=800", art: { kind: "climber", canopy: "#4A6B36", accent: "#C23B7A" } },
  { id: "l3", cat: "flower", name: "Marigold (Banthi)", note: "Festival favourite, bright orange-yellow pompom blooms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_C-Wt227zFQKAKEJNEfxanOP3C6UKDoyDLZ7KfcPyRA&s=10", art: { kind: "pompom", canopy: "#4A6B36", accent: "#E2932B" } },
  { id: "l4", cat: "flower", name: "Mallika Jasmine", note: "Fragrant white jasmine, opens in the evening", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVX-TLXj3d0y7fJc2QUsH4nQFMHaHmLKb5WA0GwNZyzvUWpmqFWb5Pyiw&s=10", art: { kind: "vine-star", canopy: "#4A6B36", accent: "#FBF7EE" } },
  { id: "l5", cat: "flower", name: "Kanakambaram", note: "Andhra pooja classic, orange tubular flower spikes", image: "https://cdn.shopify.com/s/files/1/0614/3993/4657/files/ChatGPT_Image_Jul_5_2025_04_43_49_PM.png?v=1751714054", art: { kind: "spike", canopy: "#4A6B36", accent: "#E2932B" } },
  { id: "l6", cat: "flower", name: "Rose (Desi Gulab)", note: "Hardy repeat-blooming garden rose", image: "https://d1311wbk6unapo.cloudfront.net/NushopCatalogue/tr:f-webp,w-600,fo-auto/6899b292317e68f10eac31c2/cat_img/englishrose01_1778074917896_5ayg0tonfa21w4c.jpg", art: { kind: "rose", canopy: "#4C7A3D", accent: "#B5502C" } },
  { id: "l7", cat: "flower", name: "Pink Tabebuia", note: "Flowering tree, showy pink trumpet blossoms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCf_1CtMCX-XyT1V-C3FG2O701bBoTuAGocxmQlIPadktgu0cF9j5-kVQ&s=10", art: { kind: "rose", canopy: "#4C7A3D", accent: "#B5502C" } },
  { id: "l8", cat: "flower", name: "Frangipani", note: "Fragrant waxy flowers, classic temple tree", image: "https://agroalive.com/wp-content/uploads/2026/06/991e89c3-7b2e-4362-a089-c2ea1f3e724.jpeg", art: { kind: "rose", canopy: "#4C7A3D", accent: "#B5502C" } },
  { id: "l9", cat: "flower", name: "Wild jasmine", note: "Fragrant climbing jasmine, smaller white flowers", image: "https://strapi.myplantin.com/large_main_50556ddc-c77a-4ed0-92ed-00b0bf0826aa.webp", art: { kind: "rose", canopy: "#4C7A3D", accent: "#B5502C" } },
  { id: "d1", cat: "decor", name: "Slender Lady Palm", note: "Clumping, shade-tolerant indoor palm", image: "https://www.thespruce.com/thmb/el0A9miz8P6eGRLDEg68-g57QBE=/2953x0/filters:no_upscale():max_bytes(150000):strip_icc()/KaraRileyLadyPalm-2-ca810cf96f4b46cbb2ff9ce2ba6a279a.jpg", art: { kind: "vine-heart", canopy: "#4C7A3D" } },
  { id: "d2", cat: "decor", name: "Butterfly Palm", note: "Air-purifying areca palm, feathery fronds", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3GN-lQkKZdIWgP40-ygw0fcAugHmciCmhXu2B0vqs3Pf0is6jYWKDYPQ_&s=10", art: { kind: "palm", canopy: "#4C7A3D" } },
  { id: "d3", cat: "decor", name: "Snake Plant", note: "Near-indestructible, upright striped leaves", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOHhTmbRgZLQ259ZvdUMnWN1CD_FYMJncMzBzCTf_cwwdyfFFhdtn1FPF&s=10", art: { kind: "blade", canopy: "#52803B" } },
  { id: "d4", cat: "decor", name: "Date Palm", note: "Tall feather palm, drought tolerant", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO183HDgfTHNbktkA8BXi21sazArK8vWY86IpSvj2ZFafn3lGsKc8bepZ7&s=10", art: { kind: "fern", canopy: "#5A8A3E" } },
  { id: "d5", cat: "decor", name: "Coconut Palm", note: "Classic tall palm, needs open full sun", image: "https://m.media-amazon.com/images/I/711mNFM1kJL._AC_UF1000,1000_QL80_.jpg", art: { kind: "broadleaf", canopy: "#4C7A3D", accent: "#C1382B" } },
  { id: "d6", cat: "decor", name: "Foxtail Palm", note: "Bushy plume-like fronds, ornamental palm", image: "https://www.della.in/wp-content/uploads/2024/05/FOX-TAIL-PALM-_-1-copy.jpg", art: { kind: "broadleaf", canopy: "#4C7A3D", accent: "#E2932B" } },
  { id: "d7", cat: "decor", name: "Hurricane Palm", note: "Fast-growing, wind-tolerant tropical palm", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2JTiJY7Rmm2skL4fwXtPPy3dk015fxH1JHVuRGzjmV3T8atp_0GsiXsw&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d8", cat: "decor", name: "Betel Nut Palm", note: "Slim tall palm, traditional betel nut source", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUKzt-a-lxIzhc4tyLO-zJmHi01_OzI2cHOmgX3DAB7CYq4qwuim7tU8&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d9", cat: "decor", name: "Fern Tree", note: "Large feathery fronds, suits shaded gardens", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSjTclB3P52cl4zi7cz7D-016ShvBnINXOzPpVuktS5RPGGGGOeEbFEzq0&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d10", cat: "decor", name: "Sakura Tree", note: "Ornamental flowering tree, pink spring blooms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeZPjCfCJ7_o59yb4I_Hrbmt1QtuWXwEZkBLaBF7IT3n6IUrBdM21ZJv_&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d11", cat: "decor", name: "Olive Tree", note: "Silvery-green foliage, slow-growing ornamental", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlzYawWU1wVbc2yxuGg0u9saryRGdO1-WMYdromFIwVuP2uLXiKRUF8M&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d12", cat: "decor", name: "Coral Tree", note: "Flowering tree with bright red-orange blooms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCiKoRnl7cf_mB09J7tC9n9zfxdPoNJCaHxy4KC7Oqauana6h3d699mSnP&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d13", cat: "decor", name: "Umbrella Tree", note: "Glossy variegated leaves, easy-care indoor plant", image: "https://plantncr.com/cdn/shop/files/variegated-schefflera-umbrella-plant-6-inch-png.png?v=1776186741&width=533", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d14", cat: "decor", name: "Flamboyant (Gulmohar)", note: "Flame tree, brilliant red-orange summer blooms", image: "https://www.gardenia.net/wp-content/uploads/2023/04/sjtxBsNZNlwEmGCzWSRRrshE55Tc5e3DEdDA3Yug.webp", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d15", cat: "decor", name: "Bottle Brush", note: "Red brush-like flower spikes, attracts birds", image: "https://nurserylive.com/cdn/shop/products/nurserylive-seeds-callistemon-citrinus-bottle-brush-seeds.jpg?v=1634215333&width=800", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d16", cat: "decor", name: "Yellow Bells", note: "Bright yellow trumpet flowers, fast growing", image: "https://krisikart.com/wp-content/uploads/2026/01/61BtjC2fwkL._SX569_.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d17", cat: "decor", name: "Fish Pole Bamboo", note: "Slender clumping bamboo, jointed green canes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ2QXOLO-5-FycYmjiBrYRmgy78qKxt51sH-99nMRZSuhVpxUovnhlEE0&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d18", cat: "decor", name: "Buddha Bamboo", note: "Ornamental bamboo with swollen, rounded nodes", image: "https://m.media-amazon.com/images/I/61MkKFgenHL.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d19", cat: "decor", name: "Cupressus Sempervirens", note: "Tall narrow conifer, ideal for formal hedges", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Z8TPIEB2F5384a3riOCLEtnEzom2w2uubHACQ-XAO1obwSYqnZYA93A&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d20", cat: "decor", name: "Ficus Microcarpa (Bonsai)", note: "Compact bonsai fig with aerial roots", image: "https://m.media-amazon.com/images/I/61zmmAQ6IgL._AC_UF1000,1000_QL80_.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d21", cat: "decor", name: "Common Oleander", note: "Hardy flowering shrub, pink or white blooms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSRVYmUzi-VM476MYxxd1S8W-av5t5pgIKnEWdsb9nEeNn30X1Wpc8mU&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d22", cat: "decor", name: "Calathea Lutea", note: "Broad paddle-shaped patterned leaves", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuIUjYJh1h_wLeN8c6P2xY9y7Ss0qu3uboAKMqRdPfoRaO12oD3QEPPNE&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d23", cat: "decor", name: "Elephant's Ear Tree", note: "Large shade tree with a broad spreading canopy", image: "https://cdn.shopify.com/s/files/1/0620/5092/6710/files/types-of-elephant-ears5.jpg?v=1765083619", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d24", cat: "decor", name: "Heliconia (Yellow)", note: "Tropical bird-of-paradise style yellow bracts", image: "https://nurserynisarga.in/wp-content/uploads/2025/08/d2.webp", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d25", cat: "decor", name: "Peacock Flower", note: "Fiery orange-red frilled flower clusters", image: "https://nurserynisarga.in/wp-content/uploads/2024/04/peacock.webp", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d26", cat: "decor", name: "Yellow Sanchezia", note: "Bold yellow-veined variegated foliage shrub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRnTqaPillvtBIWL-mtt98o1t217JuOERGIFGGx7DgkkvCtiW1GjZEVY&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d27", cat: "decor", name: "Lacy Tree Philodendron", note: "Deeply lobed, glossy dark-green leaves", image: "https://gardenerspath.com/wp-content/uploads/2026/01/Tree-Philodendron.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d28", cat: "decor", name: "Pandanus Sanderi", note: "Variegated screw pine, spiky rosette leaves", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShtLeDnGgmHAiLqPFoazaPRRHiI87lvFVY_ZJNV_N5J47RmX0LbocR8ss&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d29", cat: "decor", name: "Pseuderanthemum Reticulatum", note: "Colourful net-veined ornamental foliage", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOP5dxxmsTtRmk4WzCnCuAYgX9zV5Z1e_-21oJmyBDKcBPo-JR6RFzFw&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d30", cat: "decor", name: "Ixora (Red)", note: "Clustered red flowers, compact hedging shrub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzYp8WQnyyfN_3aF0PcoFB64cEzZNMv6-LGTBNqJE64w&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d31", cat: "decor", name: "Poison Bulb", note: "Large strap leaves, white spider-like flowers", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpijfcrfbCXKhRZA7-aXZgWJqWKW3Pl-8U29YHya3m7FyISZCVTka8hrs&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d32", cat: "decor", name: "Giant Spider Lily", note: "Fragrant white spidery flower clusters", image: "https://m.media-amazon.com/images/I/61ItrNAHdVL._AC_UF1000,1000_QL80_.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d33", cat: "decor", name: "Croton", note: "Bold multicolour red-green-yellow leaves", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyFO7NKDhR_Z54Y9g3b4pD77M3bZdD9OGLM1UiitPiCEUzTugw5UWQKbC7&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d35", cat: "decor", name: "Fire Bush", note: "Tubular orange-red flowers, attracts butterflies", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROeCtt7i7jAE1xi8D0sRif9xlgOlZ_qLXFNAIgrj12bA&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d36", cat: "decor", name: "Acalypha (Macafeana)", note: "Copper-bronze speckled ornamental foliage", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyJGTOiq-0tXOs7zwi3nUDBLEcUKLPYbfASOL6VPF_DXdGTSIsrbrPEEk&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d37", cat: "decor", name: "Schefflera Arboricola", note: "Compact glossy umbrella-leaf houseplant", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROAH0UqrCn7qd4bJUVFvy3wBAVgDC0DLPNY4tNWbesCw&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d38", cat: "decor", name: "Aralia", note: "Delicate, lacy ornamental foliage shrub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUUyw4Cjh-2t_7adxBy4hwBKAtl0Puhu32m6nmc_geN_tiW77692vVvaQ&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d39", cat: "decor", name: "Duranta Erecta (Green)", note: "Fast-growing hedge shrub with small berries", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWgfIZ1p7KD4HlCIzzMTkoeA5RAwEgA1rSV5yHeEgJo0p-2pLtcZm19ggj&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d40", cat: "decor", name: "Bridal Bouquet", note: "Clusters of white star-shaped flowers", image: "https://m.media-amazon.com/images/I/71HUK6JWlEL._AC_UF1000,1000_QL80_.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d41", cat: "decor", name: "Pleomele Reflexa", note: "Yellow-striped spiral foliage, easy indoor plant", image: "https://m.media-amazon.com/images/I/51nsrRlnGFL._AC_UF1000,1000_QL80_.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d42", cat: "decor", name: "Ficus Nuda", note: "Glossy green foliage, easy shade tree", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgm-qA3Ckr3hfcGHsYlie0BVbLouv0d5T974I3vdcmQYi3cdUJoc4AxVbX&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d43", cat: "decor", name: "Ti Plant", note: "Colourful maroon-pink strappy leaves", image: "https://greengardennursery.in/wp-content/uploads/2024/10/DSC_0109-rotated.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d44", cat: "decor", name: "Agave Attenuata", note: "Soft-spined rosette succulent, drought tolerant", image: "https://www.thetutuguru.com.au/wp-content/uploads/2026/06/AGAVE-ATTENUATA-BLUE-AGAVE-IN-GARDEN-BED.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d45", cat: "decor", name: "Furcraea Gigantea", note: "Large sword-like succulent rosette", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS01SgwJF30fONa3E9PTPeXOATRXAiD4pTGF0nmrlIe49CPr252whPzeKNC&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d47", cat: "decor", name: "Schefflera Variegata", note: "Variegated umbrella-leaf ornamental shrub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJ017d6v2exI91Rqh8yUnq1uJr7l6o37sgVSmrPdgm3AiRlVnp-8NNgY&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d48", cat: "decor", name: "Catharanthus Roseus", note: "Hardy flowering periwinkle groundcover", image: "https://nurserylive.com/cdn/shop/files/nurserylive-plants-vinca-cathara.jpg?v=1751757436&width=800", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d49", cat: "decor", name: "Turnera Ulmifolia (White)", note: "Cheerful five-petaled white flowers", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZc9KvfUK36_IBgLza_51IDLDo2YS9lNijuiwNu2iiNHC79ffhN98tyw&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d50", cat: "decor", name: "Turnera Ulmifolia (Yellow)", note: "Cheerful five-petaled yellow flowers", image: "https://www.picturethisai.com/wiki-image/1080/154089012712177672.jpeg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d51", cat: "decor", name: "Pentas Lanceolata (Pink)", note: "Star-shaped pink clusters, attracts butterflies", image: "https://greenorchid.co.in/wp-content/uploads/2020/12/pentas-lanceolata.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d52", cat: "decor", name: "Pentas Lanceolata (Red)", note: "Star-shaped red clusters, attracts butterflies", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2vanihSSwuY4JJyBtOwicIfFhe7tVT7kPnHsVtYZwe6GRatLYShS-6Gs&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d53", cat: "decor", name: "Tabernaemontana (Dwarf)", note: "Crepe-like double white flowers", image: "https://5.imimg.com/data5/SELLER/Default/2025/2/490373339/XK/SS/JM/37156743/img-20250219-110031395-500x500.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d54", cat: "decor", name: "Plumbago Capensis", note: "Soft blue clustered flowers, climbing shrub", image: "https://nurserylive.com/cdn/shop/files/plumbago.jpg?v=1751758642&width=800", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d55", cat: "decor", name: "Ophiopogon Japonicus", note: "Dense grass-like ground cover (mondo grass)", image: "https://m.media-amazon.com/images/I/71JTJczoXAL._AC_UF350,350_QL80_.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d56", cat: "decor", name: "Philodendron Xanadu", note: "Deeply lobed, compact clumping foliage", image: "https://nurserylive.com/cdn/shop/products/nurserylive-plants-philodendron-xanadu-green-plant-16969189458060.jpg?v=1634225942&width=800", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d57", cat: "decor", name: "Lantana Camara (Yellow)", note: "Clustered multicolour flowers, hardy shrub", image: "https://manbhawannursery.in/cdn/shop/files/LaltanaPlantyellow.png?v=1763267680", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d58", cat: "decor", name: "Allamanda Cathartica", note: "Bright yellow trumpet-shaped flowers", image: "https://m.media-amazon.com/images/I/51EffZLNQcL._AC_UF1000,1000_QL80_.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d59", cat: "decor", name: "Mandevilla (Pink)", note: "Glossy climbing vine, pink trumpet blooms", image: "https://organicplantcentre.in/wp-content/uploads/2025/01/MondavillaPink-Flower-Plant.jpg", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d60", cat: "decor", name: "Bougainvillea (White)", note: "Vigorous climber, white papery bracts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9AHIgTdiXd-XJtjBJbxIgQFbwNbq3hMg7LkUZtBXmxWdBqEa6qHZ6daU&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d61", cat: "decor", name: "Bougainvillea (Red)", note: "Vigorous climber, deep red papery bracts", image: "https://nurserynisarga.in/wp-content/uploads/2026/01/Dense-Pothos-Plants-Pack-of-6-18.webp", art: { kind: "palm", canopy: "#3D6B2E" } },
  { id: "d62", cat: "decor", name: "Mexican Grass", note: "Fine-textured ornamental lawn grass", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaveL57hJDe12Ec3pxZ9gsaFC8J8WLmyPEeT_KYYyvKJb9yFM0zOyEUQw&s=10", art: { kind: "palm", canopy: "#3D6B2E" } },

  /* 👇 Add new plants here — just name, image, and cat. Everything else fills in automatically. */
];

function normalizeProduct(p, idx) {
  const catTint = (CATEGORIES.find((c) => c.id === p.cat) || {}).tint || "#52803B";
  const slug = (p.name || "plant").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: p.id || `auto-${idx}-${slug}-${Date.now().toString(36)}`,
    cat: p.cat,
    name: p.name,
    note: p.note || "",
    image: p.image || "",
    art: p.art || { kind: "default", canopy: catTint, accent: catTint },
  };
}
const PRODUCTS = PRODUCTS_RAW.map((p, i) => normalizeProduct(p, i));

const CUSTOM_PRODUCTS_KEY = "agf_custom_products";
const OWNER_KEY = "agf_owner_unlocked";
const OWNER_PIN = "RAM";

function loadCustomProducts() {
  try {
    const raw = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function saveCustomProducts(list) {
  try {
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(list));
  } catch (e) {
    /* storage unavailable — plant still shows for this session */
  }
}

const TAG_ROTATIONS = ["-2.2deg", "1.6deg", "-1deg", "2deg", "-1.6deg", "1.1deg"];

/* ---------- app state ---------- */
const state = {
  cart: {},
  drawerOpen: false,
  view: "shop",
  activeCat: "all",
  query: "",
  orderNo: null,
  form: { name: "", phone: "" },
  customProducts: loadCustomProducts(),
  addOpen: false,
  addForm: { name: "", image: "", cat: "flower" },
  isOwner: (() => {
    try { return localStorage.getItem(OWNER_KEY) === "yes"; } catch (e) { return false; }
  })(),
  loginOpen: false,
  pinInput: "",
  pinError: false,
};

/* ---------- derived data ---------- */
function allProducts() { return [...PRODUCTS, ...state.customProducts]; }
function cartItemsList() {
  return Object.entries(state.cart)
    .map(([id, qty]) => {
      const p = allProducts().find((pp) => pp.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);
}
function cartCount() { return cartItemsList().reduce((s, i) => s + i.qty, 0); }
function filteredProducts() {
  const q = state.query.trim().toLowerCase();
  return allProducts().filter((p) => {
    const catOk = state.activeCat === "all" || p.cat === state.activeCat;
    const qOk = !q || p.name.toLowerCase().includes(q) || (p.note || "").toLowerCase().includes(q);
    return catOk && qOk;
  });
}
function whatsappHref(text) { return `https://wa.me/${NURSERY.phoneRaw}?text=${encodeURIComponent(text)}`; }
function cartWhatsAppText() {
  const lines = cartItemsList().map((i) => `• ${i.name} × ${i.qty}`);
  return [
    `Hello ${NURSERY.name}, I'd like to enquire about:`,
    ...lines,
    state.form.name ? `Name: ${state.form.name}` : "",
    state.form.phone ? `Phone: ${state.form.phone}` : "",
  ].filter(Boolean).join("\n");
}

/* ---------- actions (all on window, called from inline handlers) ---------- */
window.addToCart = function (id) { state.cart[id] = (state.cart[id] || 0) + 1; render(); };
window.decFromCart = function (id) {
  if (!state.cart[id]) return;
  state.cart[id] -= 1;
  if (state.cart[id] <= 0) delete state.cart[id];
  render();
};
window.removeFromCart = function (id) { delete state.cart[id]; render(); };
window.openDrawer = function () { state.drawerOpen = true; render(); };
window.closeDrawer = function () { state.drawerOpen = false; render(); };
window.setActiveCatAndView = function (cat) { state.view = "shop"; state.activeCat = cat; render(); };
window.setView = function (v) { state.view = v; render(); window.scrollTo({ top: 0, behavior: "smooth" }); };
window.goCheckoutFromDrawer = function () { state.drawerOpen = false; state.view = "checkout"; render(); };
window.setQuery = function (v) { state.query = v; renderGrid(); };
window.setFormName = function (v) { state.form.name = v; };
window.setFormPhone = function (v) { state.form.phone = v; };
window.submitCheckout = function (e) {
  e.preventDefault();
  if (!state.form.name || !state.form.phone) return false;
  state.orderNo = "AGF" + Math.floor(1000 + Math.random() * 9000);
  state.view = "confirmed";
  render();
  return false;
};
window.startOver = function () {
  state.cart = {};
  state.form = { name: "", phone: "" };
  state.view = "shop";
  state.drawerOpen = false;
  render();
};
window.setAddName = function (v) { state.addForm.name = v; };
window.setAddImage = function (v) { state.addForm.image = v; };
window.setAddCat = function (cat) { state.addForm.cat = cat; render(); };
window.openAddModal = function () { state.addOpen = true; render(); };
window.closeAddModal = function () { state.addOpen = false; render(); };
window.submitAddPlant = function (e) {
  e.preventDefault();
  if (!state.addForm.name.trim()) return false;
  const item = normalizeProduct(
    { name: state.addForm.name.trim(), image: state.addForm.image.trim(), cat: state.addForm.cat },
    PRODUCTS.length + state.customProducts.length
  );
  state.customProducts.push(item);
  saveCustomProducts(state.customProducts);
  const usedCat = state.addForm.cat;
  state.addForm = { name: "", image: "", cat: usedCat };
  state.addOpen = false;
  state.view = "shop";
  state.activeCat = usedCat;
  render();
  return false;
};
window.openLogin = function () { state.loginOpen = true; state.pinError = false; state.pinInput = ""; render(); };
window.closeLogin = function () { state.loginOpen = false; render(); };
window.setPin = function (v) { state.pinInput = v; };
window.submitOwnerPin = function (e) {
  e.preventDefault();
  if (state.pinInput === OWNER_PIN) {
    state.isOwner = true;
    try { localStorage.setItem(OWNER_KEY, "yes"); } catch (e) {}
    state.loginOpen = false;
    state.pinInput = "";
    state.pinError = false;
  } else {
    state.pinError = true;
  }
  render();
  return false;
};
window.ownerLogout = function () {
  state.isOwner = false;
  try { localStorage.removeItem(OWNER_KEY); } catch (e) {}
  render();
};

/* ---------- render: header ---------- */
function headerHTML() {
  const cCount = cartCount();
  const navBtns = CATEGORIES.map(
    (c) => `<button onclick="setActiveCatAndView('${c.id}')" style="color:${state.view === "shop" && state.activeCat === c.id ? "#E2932B" : "#FBF7EE"}" class="hover:opacity-80">${escapeAttr(c.label)}</button>`
  ).join("");
  return `
  <header style="background:#1F3D2A" class="sticky top-0 z-30 shadow-md">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
      <div class="flex items-center gap-2">
        ${leafIcon(26, "#E2932B")}
        <span class="agf-display text-lg md:text-xl" style="color:#FBF7EE">Andhra Green Flora Nursery</span>
      </div>
      <nav class="hidden md:flex items-center gap-6 agf-display text-sm">${navBtns}</nav>
      <button onclick="openDrawer()" class="agf-btn relative flex items-center gap-2 px-3 py-2 rounded" style="background:#E2932B;color:#1F3D2A">
        ${basketIcon(18)}
        <span class="hidden sm:inline">List</span>
        ${cCount > 0 ? `<span class="absolute -top-2 -right-2 rounded-full text-xs w-5 h-5 flex items-center justify-center" style="background:#A8502E;color:#FBF7EE">${cCount}</span>` : ""}
      </button>
    </div>
    <div class="max-w-6xl mx-auto px-5 pb-3 flex justify-end">
      <a href="https://wa.me/${NURSERY.phoneRaw}" target="_blank" rel="noreferrer" class="agf-display flex items-center gap-1.5 text-xs" style="color:#C9D5C0">
        ${whatsAppIcon(13)} ${escapeAttr(NURSERY.phone)}
      </a>
    </div>
  </header>`;
}

/* ---------- render: shop view + grid ---------- */
function shopViewHTML() {
  const catBtns = CATEGORIES.map(
    (c) => `
    <button onclick="setActiveCatAndView('${c.id}')" class="agf-btn px-4 py-2 rounded-full text-sm flex items-center gap-1.5"
      style="background:${state.activeCat === c.id ? c.tint : "#FBF7EE"};color:${state.activeCat === c.id ? "#FBF7EE" : "#1F3D2A"};border:2px solid ${c.tint}">
      ${c.iconFn(15)} ${escapeAttr(c.label)}
    </button>`
  ).join("");
  return `
  <main class="max-w-6xl mx-auto px-5 pb-24">
    <section class="pt-10 pb-8 text-center">
      <p class="agf-hand text-2xl" style="color:#A8502E">— healthy plants, delivered across All over India —</p>
      <h1 class="agf-display font-bold leading-tight" style="font-size:clamp(2rem, 5vw, 3.2rem);color:#1F3D2A">
        Fruit, flower &amp; decor plants,<br /> grown healthy in India.
      </h1>
      <p class="max-w-xl mx-auto mt-4 text-sm" style="color:#6B5D48">
        An online-only nursery — no storefront to visit. Browse our stock, build a list of what you'd like, and send it to us. We'll confirm pricing, availability, and delivery over WhatsApp or a phone call.
      </p>
      <div class="max-w-md mx-auto mt-6 relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2" style="color:#6B5D48">${searchIcon(16)}</span>
        <input id="search-input" value="${escapeAttr(state.query)}" oninput="setQuery(this.value)" placeholder="Search mango, jasmine, palm…"
          class="agf-input w-full pl-10 pr-3 py-2.5 rounded-full text-sm" style="background:#FBF7EE;border:2px solid #B5A481" />
      </div>
      <div class="flex justify-center gap-3 mt-6 flex-wrap">
        <button onclick="setActiveCatAndView('all')" class="agf-btn px-4 py-2 rounded-full text-sm"
          style="background:${state.activeCat === "all" ? "#1F3D2A" : "#FBF7EE"};color:${state.activeCat === "all" ? "#FBF7EE" : "#1F3D2A"};border:2px solid #1F3D2A">
          All Plants
        </button>
        ${catBtns}
      </div>
    </section>
    <div id="product-grid">${gridHTML()}</div>
  </main>`;
}

function gridHTML() {
  const filtered = filteredProducts();
  if (filtered.length === 0) {
    return `<p class="text-center py-16 text-sm" style="color:#6B5D48">No plants match that search. Try another name or pick a category.</p>`;
  }
  const cards = filtered
    .map((p, idx) => {
      const cat = CATEGORIES.find((c) => c.id === p.cat) || { tint: "#52803B" };
      const rot = TAG_ROTATIONS[idx % TAG_ROTATIONS.length];
      const qty = state.cart[p.id] || 0;
      const qtyControls =
        qty === 0
          ? `<button onclick="addToCart('${p.id}')" class="agf-btn w-full mt-3 py-1.5 rounded text-xs" style="background:#52803B;color:#FBF7EE">Add to list</button>`
          : `<div class="flex items-center justify-between mt-3 rounded overflow-hidden" style="border:2px solid #52803B">
               <button onclick="decFromCart('${p.id}')" class="p-1.5" style="color:#52803B">${minusIcon(14)}</button>
               <span class="agf-display text-sm font-bold" style="color:#1F3D2A">${qty}</span>
               <button onclick="addToCart('${p.id}')" class="p-1.5" style="color:#52803B">${plusIcon(14)}</button>
             </div>`;
      return `
      <div class="agf-tag pt-1 pb-4 px-3" style="transform:rotate(${rot})">
        <div class="agf-string"></div>
        <div class="agf-hole"></div>
        <div class="mt-2 rounded-md overflow-hidden flex items-center justify-center" style="height:190px;background:${cat.tint}14">
          ${plantThumbHTML(p, cat.tint, 170)}
        </div>
        <h3 class="agf-display font-bold text-sm mt-3 leading-snug" style="color:#1F3D2A">${escapeAttr(p.name)}</h3>
        <p class="text-xs mt-1" style="color:#6B5D48">${escapeAttr(p.note)}</p>
        ${qtyControls}
      </div>`;
    })
    .join("");
  return `<section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9 pt-4">${cards}</section>`;
}
function renderGrid() {
  const el = document.getElementById("product-grid");
  if (el) el.innerHTML = gridHTML();
}

/* ---------- render: checkout / confirmed ---------- */
function checkoutViewHTML() {
  const items = cartItemsList();
  const itemsHTML =
    items.length === 0
      ? `<p class="text-sm" style="color:#6B5D48">No plants added yet.</p>`
      : items.map((i) => `<div class="flex justify-between text-sm py-0.5"><span>${escapeAttr(i.name)}</span><span>× ${i.qty}</span></div>`).join("");
  return `
  <main class="max-w-xl mx-auto px-5 py-10">
    <button onclick="setView('shop')" class="agf-display flex items-center gap-1 text-sm mb-6" style="color:#1F3D2A">${arrowLeftIcon(16)} Back to shop</button>
    <h2 class="agf-display font-bold text-2xl mb-1" style="color:#1F3D2A">Send your plant list</h2>
    <p class="text-sm mb-6" style="color:#6B5D48">We're online-only — no showroom to visit. Leave your name and number and we'll call or WhatsApp you back with pricing, stock, and delivery details.</p>
    <form onsubmit="return submitCheckout(event)" class="space-y-4">
      <div>
        <label class="text-xs agf-display font-bold" style="color:#1F3D2A">Full name</label>
        <input value="${escapeAttr(state.form.name)}" oninput="setFormName(this.value)" required class="w-full mt-1 px-3 py-2 rounded" style="background:#FBF7EE;border:2px solid #B5A481" />
      </div>
      <div>
        <label class="text-xs agf-display font-bold" style="color:#1F3D2A">Phone number</label>
        <input value="${escapeAttr(state.form.phone)}" oninput="setFormPhone(this.value)" required type="tel" class="w-full mt-1 px-3 py-2 rounded" style="background:#FBF7EE;border:2px solid #B5A481" />
      </div>
      <div class="rounded-lg p-4 mt-2" style="background:#FBF7EE;border:2px dashed #B5A481">
        <p class="agf-display font-bold text-sm mb-2" style="color:#1F3D2A">Your list</p>
        ${itemsHTML}
      </div>
      <button type="submit" ${items.length === 0 ? "disabled" : ""} class="agf-btn w-full py-3 rounded-lg text-sm mt-2" style="background:${items.length === 0 ? "#B5A481" : "#A8502E"};color:#FBF7EE">Send inquiry</button>
      <a href="${whatsappHref(cartWhatsAppText())}" target="_blank" rel="noreferrer" class="agf-btn w-full py-3 rounded-lg text-sm flex items-center justify-center gap-2" style="background:#1F3D2A;color:#FBF7EE">${whatsAppIcon(16)} Or send this list on WhatsApp</a>
    </form>
  </main>`;
}

function confirmedViewHTML() {
  const items = cartItemsList();
  const itemsHTML = items.map((i) => `<div class="flex justify-between text-sm py-1"><span>${escapeAttr(i.name)}</span><span>× ${i.qty}</span></div>`).join("");
  const firstName = (state.form.name || "").split(" ")[0] || "";
  return `
  <main class="max-w-xl mx-auto px-5 py-16 text-center">
    <div class="stamp">INQUIRY SENT</div>
    <h2 class="agf-display font-bold text-2xl mt-6" style="color:#1F3D2A">Thank you, ${escapeAttr(firstName)}!</h2>
    <p class="mt-2 text-sm" style="color:#6B5D48">Reference <span class="agf-display font-bold">${escapeAttr(state.orderNo || "")}</span>. We'll call ${escapeAttr(state.form.phone)} shortly to confirm pricing, stock, and delivery.</p>
    <div class="rounded-lg p-4 mt-6 text-left" style="background:#FBF7EE;border:2px solid #B5A481">${itemsHTML}</div>
    <button onclick="startOver()" class="agf-btn mt-8 px-5 py-2.5 rounded" style="background:#52803B;color:#FBF7EE">Continue browsing</button>
  </main>`;
}

/* ---------- render: drawer / modals / footer ---------- */
function drawerHTML() {
  if (!state.drawerOpen) return "";
  const items = cartItemsList();
  const itemsHTML =
    items.length === 0
      ? `<p class="text-sm mt-8 text-center" style="color:#6B5D48">Your list is empty. Go add a plant or two.</p>`
      : items
          .map(
            (i) => `
      <div class="flex items-center gap-3 rounded-lg p-3" style="background:#FBF7EE">
        <div class="overflow-hidden rounded" style="width:56px;height:56px;flex-shrink:0">${plantThumbHTML(i, "#A8502E", 56)}</div>
        <div class="flex-1">
          <p class="agf-display font-bold text-sm" style="color:#1F3D2A">${escapeAttr(i.name)}</p>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="decFromCart('${i.id}')" class="p-1 rounded" style="border:1.5px solid #52803B;color:#52803B">${minusIcon(12)}</button>
            <span class="text-sm font-bold w-4 text-center">${i.qty}</span>
            <button onclick="addToCart('${i.id}')" class="p-1 rounded" style="border:1.5px solid #52803B;color:#52803B">${plusIcon(12)}</button>
          </div>
        </div>
        <button onclick="removeFromCart('${i.id}')" class="text-xs underline self-start" style="color:#6B5D48">remove</button>
      </div>`
          )
          .join("");
  return `
  <div class="fixed inset-0 z-40 flex justify-end">
    <div class="absolute inset-0" style="background:rgba(31,61,42,0.45)" onclick="closeDrawer()"></div>
    <div class="relative w-full max-w-sm h-full flex flex-col" style="background:#E8DCC3">
      <div class="flex items-center justify-between px-5 py-4" style="background:#1F3D2A">
        <h3 class="agf-display font-bold" style="color:#FBF7EE">Your list</h3>
        <button onclick="closeDrawer()" style="color:#FBF7EE">${xIcon(20)}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-4 space-y-3">${itemsHTML}</div>
      ${items.length > 0 ? `
      <div class="px-5 py-4" style="border-top:2px dashed #B5A481">
        <button onclick="goCheckoutFromDrawer()" class="agf-btn w-full py-3 rounded-lg text-sm flex items-center justify-center gap-2" style="background:#A8502E;color:#FBF7EE">${checkIcon(16)} Send this list</button>
      </div>` : ""}
    </div>
  </div>`;
}

function addModalHTML() {
  if (!(state.addOpen && state.isOwner)) return "";
  const catBtns = CATEGORIES.map(
    (c) => `
    <button type="button" onclick="setAddCat('${c.id}')" class="agf-btn flex-1 py-2 rounded text-xs flex items-center justify-center gap-1"
      style="background:${state.addForm.cat === c.id ? c.tint : "#FBF7EE"};color:${state.addForm.cat === c.id ? "#FBF7EE" : "#1F3D2A"};border:2px solid ${c.tint}">
      ${c.iconFn(13)} ${escapeAttr(c.label.replace(" Plants", ""))}
    </button>`
  ).join("");
  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div class="absolute inset-0" style="background:rgba(31,61,42,0.5)" onclick="closeAddModal()"></div>
    <form onsubmit="return submitAddPlant(event)" class="relative w-full max-w-sm rounded-xl p-5" style="background:#E8DCC3;border:2px solid #B5A481">
      <div class="flex items-center justify-between mb-4">
        <h3 class="agf-display font-bold text-lg" style="color:#1F3D2A">Add a plant</h3>
        <button type="button" onclick="closeAddModal()" style="color:#1F3D2A">${xIcon(20)}</button>
      </div>
      <label class="text-xs agf-display font-bold" style="color:#1F3D2A">Plant name</label>
      <input value="${escapeAttr(state.addForm.name)}" oninput="setAddName(this.value)" required placeholder="e.g. Ashoka Tree" class="w-full mt-1 mb-3 px-3 py-2 rounded" style="background:#FBF7EE;border:2px solid #B5A481" />
      <label class="text-xs agf-display font-bold" style="color:#1F3D2A">Image URL</label>
      <input value="${escapeAttr(state.addForm.image)}" oninput="setAddImage(this.value)" placeholder="https://example.com/photo.jpg" class="w-full mt-1 mb-1 px-3 py-2 rounded" style="background:#FBF7EE;border:2px solid #B5A481" />
      <p class="text-xs mb-3" style="color:#6B5D48">Leave blank to use a plain icon instead of a photo.</p>
      <label class="text-xs agf-display font-bold" style="color:#1F3D2A">Category</label>
      <div class="flex gap-2 mt-1 mb-4">${catBtns}</div>
      <button type="submit" class="agf-btn w-full py-2.5 rounded-lg text-sm" style="background:#52803B;color:#FBF7EE">Add to shop</button>
    </form>
  </div>`;
}

function loginModalHTML() {
  if (!state.loginOpen) return "";
  return `
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div class="absolute inset-0" style="background:rgba(31,61,42,0.5)" onclick="closeLogin()"></div>
    <form onsubmit="return submitOwnerPin(event)" class="relative w-full max-w-xs rounded-xl p-5" style="background:#E8DCC3;border:2px solid #B5A481">
      <div class="flex items-center justify-between mb-4">
        <h3 class="agf-display font-bold text-lg" style="color:#1F3D2A">Owner login</h3>
        <button type="button" onclick="closeLogin()" style="color:#1F3D2A">${xIcon(20)}</button>
      </div>
      <label class="text-xs agf-display font-bold" style="color:#1F3D2A">PIN</label>
      <input value="${escapeAttr(state.pinInput)}" oninput="setPin(this.value)" type="password" autofocus class="w-full mt-1 mb-2 px-3 py-2 rounded" style="background:#FBF7EE;border:2px solid ${state.pinError ? "#C1382B" : "#B5A481"}" />
      ${state.pinError ? `<p class="text-xs mb-2" style="color:#C1382B">Incorrect PIN, try again.</p>` : ""}
      <button type="submit" class="agf-btn w-full py-2.5 rounded-lg text-sm mt-2" style="background:#A8502E;color:#FBF7EE">Log in</button>
    </form>
  </div>`;
}

function floatingAddButtonHTML() {
  if (!state.isOwner) return "";
  return `
  <button onclick="openAddModal()" title="Add a plant" class="agf-btn fixed z-40 flex items-center justify-center"
    style="bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:#A8502E;color:#FBF7EE;box-shadow:0 6px 16px rgba(43,33,24,0.35)">
    ${plusIcon(26)}
  </button>`;
}

function footerHTML() {
  const ownerLink = state.isOwner
    ? `<button onclick="ownerLogout()" class="underline mt-1 inline-block" style="color:#6B5D48">Owner mode on · Log out</button>`
    : `<button onclick="openLogin()" class="underline mt-1 inline-block" style="color:#6B5D48">Owner login</button>`;
  return `
  <footer class="text-center py-6 text-xs" style="color:#6B5D48">
    Andhra Green Flora Nursery · Online-only · Order via list or WhatsApp · ${escapeAttr(NURSERY.phone)}
    <br/>
    ${ownerLink}
  </footer>`;
}

/* ---------- master render ---------- */
function render() {
  let mainHTML = "";
  if (state.view === "shop") mainHTML = shopViewHTML();
  else if (state.view === "checkout") mainHTML = checkoutViewHTML();
  else if (state.view === "confirmed") mainHTML = confirmedViewHTML();

  document.getElementById("root").innerHTML = `
    <div style="font-family:'Work Sans', sans-serif;background:#E8DCC3;min-height:100vh;color:#2B2118">
      ${headerHTML()}
      ${mainHTML}
      ${drawerHTML()}
      ${floatingAddButtonHTML()}
      ${addModalHTML()}
      ${footerHTML()}
      ${loginModalHTML()}
    </div>`;
}

document.addEventListener("DOMContentLoaded", render);