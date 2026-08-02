// ==================== METEO MALDIVE ====================
const urlMaldive =
  "https://api.open-meteo.com/v1/forecast?latitude=3.20&longitude=73.22&current_weather=true";

const meteoMaldive = document.getElementById("meteo-maldive");

if (meteoMaldive) {
  fetch(urlMaldive)
    .then((risposta) => risposta.json())
    .then((dati) => {
      const temperatura = dati.current_weather.temperature;
      meteoMaldive.innerHTML = `☀️ Meteo in diretta: <strong>${temperatura}°C</strong>`;
    })
    .catch((errore) => {
      meteoMaldive.innerHTML = "Meteo non disponibile";
      console.error("Errore Maldive:", errore);
    });
}

// ==================== METEO TOKYIO  ====================
const urlTokyo =
  "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&current_weather=true";

const meteoTokyo = document.getElementById("meteo-tokyo");

if (meteoTokyo) {
  fetch(urlTokyo)
    .then((risposta) => risposta.json())
    .then((dati) => {
      const temperatura = dati.current_weather.temperature;
      meteoTokyo.innerHTML = `☀️<strong>${temperatura}°C</strong>`;
    })
    .catch((errore) => {
      meteoTokyo.innerHTML = "Meteo non disponibile";
      console.error("Errore Tokyo:", errore);
    });
}

// ==================== METEO MAROCCO  ====================
const urlMarocco =
  "https://api.open-meteo.com/v1/forecast?latitude=3.20&longitude=73.22&current_weather=true";

const meteoMarocco = document.getElementById("meteo-marocco");

if (meteoMarocco) {
  fetch(urlMarocco)
    .then((risposta) => risposta.json())
    .then((dati) => {
      const temperatura = dati.current_weather.temperature;
      meteoMarocco.innerHTML = `☀️<strong>${temperatura}°C</strong>`;
    })
    .catch((errore) => {
      meteoMarocco.innerHTML = "Meteo non disponibile";
      console.error("Errore Marocco:", errore);
    });
}

// ==================== METEO EGITTO (IL CAIRO) ====================
const urlEgitto =
  "https://api.open-meteo.com/v1/forecast?latitude=30.06&longitude=31.25&current_weather=true";

const meteoEgitto = document.getElementById("meteo-egitto");

if (meteoEgitto) {
  fetch(urlEgitto)
    .then((risposta) => risposta.json())
    .then((dati) => {
      const temperatura = dati.current_weather.temperature;
      meteoEgitto.innerHTML = `☀️<strong>${temperatura}°C</strong>`;
    })
    .catch((errore) => {
      meteoEgitto.innerHTML = "Meteo non disponibile";
      console.error("Errore Egitto:", errore);
    });
}

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
// ==================== ANIMAZIONI AL MOVIMENTO (SCROLL) ====================
// Creiamo l'osservatore che controlla quando gli elementi entrano nello schermo
if (typeof IntersectionObserver !== "undefined") {
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
  // (escluso il side-panel di destinazioni/egitto, che è position:fixed
  // e verrebbe nascosto con opacity:0)
  const elementiDaAnimare = document.querySelectorAll(
    "section:not(.side-panel), .card, .service-card, .weather-box, .currency-card",
  );

  // Diciamo all'osservatore di iniziare a spiarle
  elementiDaAnimare.forEach((el) => {
    el.classList.add("fade-in-element"); // Diamo lo stato di partenza nascosto
    observer.observe(el);
  });
}
