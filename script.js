// ==================== METEO MALDIVE ====================
const urlMaldive =
  "https://api.open-meteo.com/v1/forecast?latitude=3.20&longitude=73.22&current_weather=true";

fetch(urlMaldive)
  .then((risposta) => risposta.json())
  .then((dati) => {
    const temperatura = dati.current_weather.temperature;
    document.getElementById("meteo-maldive").innerHTML =
      `☀️ Meteo in diretta: <strong>${temperatura}°C</strong>`;
  })
  .catch((errore) => {
    document.getElementById("meteo-maldive").innerHTML =
      "Meteo non disponibile";
    console.error("Errore Maldive:", errore);
  });

// ==================== METEO TOKYIO  ====================
const urlTokyo =
  "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&current_weather=true";

fetch(urlTokyo)
  .then((risposta) => risposta.json())
  .then((dati) => {
    const temperatura = dati.current_weather.temperature;
    document.getElementById("meteo-tokyo").innerHTML =
      `☀️<strong>${temperatura}°C</strong>`;
  })
  .catch((errore) => {
    document.getElementById("meteo-tokyo").innerHTML = "Meteo non disponibile";
    console.error("Errore Tokyo:", errore);
  });

// ==================== METEO MAROCCO  ====================
const urlMarocco =
  "https://api.open-meteo.com/v1/forecast?latitude=3.20&longitude=73.22&current_weather=true";

fetch(urlMarocco)
  .then((risposta) => risposta.json())
  .then((dati) => {
    const temperatura = dati.current_weather.temperature;
    document.getElementById("meteo-marocco").innerHTML =
      `☀️<strong>${temperatura}°C</strong>`;
  })
  .catch((errore) => {
    document.getElementById("meteo-marocco").innerHTML =
      "Meteo non disponibile";
    console.error("Errore Marocco:", errore);
  });

// ==================== METEO EGITTO (IL CAIRO) ====================
const urlEgitto =
  "https://api.open-meteo.com/v1/forecast?latitude=30.06&longitude=31.25&current_weather=true";

fetch(urlEgitto)
  .then((risposta) => risposta.json())
  .then((dati) => {
    const temperatura = dati.current_weather.temperature;
    document.getElementById("meteo-egitto").innerHTML =
      `☀️<strong>${temperatura}°C</strong>`;
  })
  .catch((errore) => {
    document.getElementById("meteo-egitto").innerHTML = "Meteo non disponibile";
    console.error("Errore Egitto:", errore);
  });

// ==================== CONVERTITORE DI VALUTA ====================
const inputEuro = document.getElementById("euro-amount");
const resEgitto = document.getElementById("valore-egitto");
const resMarocco = document.getElementById("valore-marocco");

if (inputEuro && resEgitto && resMarocco) {
  // Indirizzo dell'API che prende l'Euro come base
  const urlCambio = "https://open.er-api.com/v6/latest/EUR";

  // Funzione che fa il calcolo matematico
  function calcolaCambio() {
    fetch(urlCambio)
      .then((risposta) => risposta.json())
      .then((dati) => {
        // Estraiamo i tassi di cambio dal JSON dell'API
        const tassoEgitto = dati.rates.EGP;
        const tassoMarocco = dati.rates.MAD;

        // Leggiamo quanti euro ha scritto l'utente
        const euro = parseFloat(inputEuro.value) || 0;

        // Facciamo la moltiplicazione e arrotondiamo a 2 cifre decimali
        const totaleEgitto = (euro * tassoEgitto).toFixed(2);
        const totaleMarocco = (euro * tassoMarocco).toFixed(2);

        // Stampiamo il risultato nell'HTML
        resEgitto.innerHTML = `<strong>${totaleEgitto}</strong> EGP`;
        resMarocco.innerHTML = `<strong>${totaleMarocco}</strong> MAD`;
      })
      .catch((errore) => {
        resEgitto.innerHTML = "Non disponibile";
        resMarocco.innerHTML = "Non disponibile";
        console.error("Errore Cambio:", errore);
      });
  }

  // Avvia il calcolo appena si apre la pagina
  calcolaCambio();

  // Ogni volta che l'utente cambia il numero nell'input, ricalcola da solo!
  inputEuro.addEventListener("input", calcolaCambio);
}
// ==================== CARD CLICK-TO-REVEAL ====================
const cards = document.querySelectorAll(".masonry .card");
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Non chiudere se si clicca sul bottone
    if (e.target.classList.contains("btn-card")) return;
    // Chiudi le altre card aperte
    cards.forEach((c) => {
      if (c !== card) c.classList.remove("active");
    });
    card.classList.toggle("active");
  });
});

// ==================== ANIMAZIONI AL MOVIMENTO (SCROLL) ====================
// Creiamo l'osservatore che controlla quando gli elementi entrano nello schermo
const observer = new IntersectionObserver(
  (elementi) => {
    elementi.forEach((elemento) => {
      // Se l'elemento è visibile nel browser, gli diamo la classe "visible"
      if (elemento.isIntersecting) {
        elemento.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

// Selezioniamo tutte le sezioni e le card che vogliamo animare
const elementiDaAnimare = document.querySelectorAll(
  "section, .card, .service-card, .weather-box, .currency-card",
);

// Diciamo all'osservatore di iniziare a spiarle
elementiDaAnimare.forEach((el) => {
  el.classList.add("fade-in-element"); // Diamo lo stato di partenza nascosto
  observer.observe(el);
});
