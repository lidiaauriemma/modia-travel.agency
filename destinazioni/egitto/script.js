// ==================== SIDE PANEL: DETTAGLI METEO E ESCURSIONI ====================
// Il CSS del pannello (.side-panel, .side-panel-backdrop) è in egitto.css.
// Questo script rende interattivi marker della mappa, link "Dettagli" e CTA.

const CONTACT_EMAIL = "info@modia.travel";

// Località segnate sulla mappa
const LOCATIONS = {
  cairo: {
    label: "Il Cairo",
    title: "Il Cairo, capitale storica",
    image: "assets/cairo.webp",
    alt: "Il Cairo",
    description:
      "Tour privato guidato alle Piramidi di Giza, la Sfinge e il Museo Egizio, nel cuore di una capitale millenaria.",
    price: null,
  },
  sharm: {
    label: "Sharm El Sheikh",
    title: "Sharm El Sheikh, mare e relax",
    image: "assets/sharm.webp",
    alt: "Sharm El Sheikh",
    description:
      "Immersioni, resort esclusivi e giornate di relax sul Mar Rosso, tra barriere coralline e acque cristalline.",
    price: null,
  },
  marsa: {
    label: "Marsa Alam",
    title: "Marsa Alam, natura incontaminata",
    image: "assets/marsa-alam.webp",
    alt: "Marsa Alam",
    description:
      "Baie selvagge, barriere coralline incontaminate e spiagge di sabbia bianca lungo la costa del Mar Rosso.",
    price: null,
  },
};

// Escursioni della griglia (descrizioni allineate alla pagina)
const EXCURSIONS = {
  "ras-mohammed": {
    label: "Escursione",
    title: "Ras Mohammed",
    image: "assets/marsa-alam.webp",
    alt: "Ras Mohammed",
    description:
      "Snorkeling e immersioni nel parco nazionale marino del Mar Rosso, con soste nelle baie più spettacolari.",
    price: "€ 85 / pers.",
  },
  "il-cairo": {
    label: "Escursione",
    title: "Il Cairo",
    image: "assets/cairo.webp",
    alt: "Il Cairo",
    description:
      "Tour privato guidato alle Piramidi di Giza, la Sfinge e il Museo Egizio, con trasporto e guida dedicata.",
    price: "€ 160 / pers.",
  },
  "safari-quad": {
    label: "Escursione",
    title: "Safari in Quad",
    image: "assets/safari-quad.webp",
    alt: "Safari in Quad",
    description:
      "Avventura al tramonto nel deserto con cena beduina e spettacolo sotto le stelle.",
    price: "€ 65 / pers.",
  },
  "abu-simbel": {
    label: "Escursione",
    title: "Abu Simbel",
    image: "assets/abu-simbel.webp",
    alt: "Abu Simbel",
    description:
      "Visita ai maestosi templi di Ramses II e Nefertari scolpiti nella roccia, a sud del Lago Nasser.",
    price: "€ 190 / pers.",
  },
  luxor: {
    label: "Escursione",
    title: "Luxor",
    image: null,
    alt: "",
    description:
      "Visita ai templi di Karnak e Luxor e alle tombe nella Valle dei Re, con egittologo privato.",
    price: "€ 140 / pers.",
  },
  "crociera-nilo": {
    label: "Escursione",
    title: "Crociera sul Nilo",
    image: null,
    alt: "",
    description:
      "Navigazione di lusso tra Luxor e Aswan a bordo di una nave boutique 5 stelle, con pasti e visite incluse.",
    price: "€ 450 / pers.",
  },
};

// Pannello contatti (nav "Contatti" e CTA "Richiedi il tuo itinerario")
const CONTACT_DATA = {
  label: "Contatti",
  title: "Pianifichiamo il tuo viaggio",
  image: null,
  alt: "",
  description:
    "Raccontaci il viaggio che immagini: lo trasformiamo in un itinerario su misura, con assistenza dedicata in ogni momento del tuo Egitto.",
  price: null,
  actionText: `Scrivici a ${CONTACT_EMAIL}`,
  actionHref: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Richiesta itinerario Egitto",
  )}`,
};

(() => {
  const panel = document.getElementById("side-panel");
  if (!panel) return;

  const backdrop = document.getElementById("side-panel-backdrop");
  const closeButton = panel.querySelector(".side-panel-close");
  const label = document.getElementById("side-panel-label");
  const title = document.getElementById("side-panel-title");
  const image = document.getElementById("side-panel-image");
  const description = document.getElementById("side-panel-description");
  const price = document.getElementById("side-panel-price");
  const action = document.getElementById("side-panel-action");

  let lastTrigger = null;

  function render(data) {
    label.textContent = data.label || "Dettagli";
    title.textContent = data.title || "";
    description.textContent = data.description || "";

    if (data.image) {
      image.src = data.image;
      image.alt = data.alt || "";
      image.hidden = false;
    } else {
      image.removeAttribute("src");
      image.removeAttribute("alt");
      image.hidden = true;
    }

    if (data.price) {
      price.textContent = data.price;
      price.hidden = false;
    } else {
      price.textContent = "";
      price.hidden = true;
    }

    action.textContent = data.actionText || "Richiedi questo itinerario";
    action.href =
      data.actionHref ||
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `Richiesta itinerario Egitto - ${data.title || ""}`,
      )}`;
  }

  function openPanel(data, trigger) {
    render(data);
    lastTrigger = trigger;
    panel.classList.add("active");
    panel.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("active"));
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeButton.focus());
  }

  function closePanel() {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("active");
    backdrop.hidden = true;
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  }

  closeButton.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("active")) {
      closePanel();
    }
  });

  // Marker della mappa
  document.querySelectorAll(".map-marker[data-location]").forEach((marker) => {
    const location = LOCATIONS[marker.dataset.location];
    if (!location) return;
    marker.addEventListener("click", () => openPanel(location, marker));
  });

  // Link "Dettagli" delle escursioni
  document.querySelectorAll(".detail-link[data-excursion]").forEach((link) => {
    const excursion = EXCURSIONS[link.dataset.excursion];
    if (!excursion) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openPanel(excursion, link);
    });
  });

  // Trigger generici verso il pannello contatti
  document.querySelectorAll('[data-panel="contatti"]').forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openPanel(CONTACT_DATA, trigger);
    });
  });
})();
