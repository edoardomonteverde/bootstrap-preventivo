
/* Array per memorizzare i preventivi */
const elencoPreventivi = [];

/* Funzione nominata per calcolare il preventivo */
function calcolaPreventivo() {
    const nome = document.getElementById('nome').value.trim();
    const cognome = document.getElementById("cognome").value.trim();
    const email = document.getElementById("email").value.trim();
    const tipoLavoro = document.getElementById("tipoLavoro").value;
    const codicePromozionale = document.getElementById("codicePromozionale").value.trim().toUpperCase();
    const privacyPolicy = document.getElementById('privacyPolicy');
    const validCodes = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

     // Variabili singole per i prezzi orari
     const prezzoBackend = 20.50;
     const prezzoFrontend = 15.30;
     const prezzoAnalisi = 33.60;

     /* Variabile per le ore di lavore */
    const oreLavoro = 10;

    /* Verifica del checkbox della privacy */
    if (!privacyPolicy.checked) {
        alert("Devi accettare la Privacy Policy per calcolare il preventivo");
        return;
    }

    /* Verifica dei campi obbligatori */
    if(!nome || !cognome || !email || !tipoLavoro) {
        alert ("Tutti i campi obbligatori devono essere compilati");
        return;
    }

    /* Calcolo del prezzo orario in base al tipo di lavoro */
    let prezzoOrario;
    if (tipoLavoro === "backend") {
        prezzoOrario = prezzoBackend;
    } else if (tipoLavoro === "frontend") {
        prezzoOrario = prezzoFrontend;
    }else if (tipoLavoro === "analisi"){
        prezzoOrario = prezzoAnalisi
    }
    else {
        alert("Tipo di lavoro non valido")
    }

    /* Calcolo del prezzo finale */   
    let prezzoFinale = oreLavoro * prezzoOrario;

    /* Applicazione codice promozionale se presente */
    if (validCodes.includes(codicePromozionale)) {
        prezzoFinale *= 0.75;
    } else if (codicePromozionale) {
        alert('Codice promozionale non valido.');
    }

    // Divide il prezzo in parte intera e decimale
     const prezzoVisualizzato = prezzoFinale.toFixed(2);
     const partiPrezzo = prezzoVisualizzato.split('.');
     const parteIntera = partiPrezzo[0];
     const parteDecimale = partiPrezzo[1];

     // Mostra il prezzo finale
     document.getElementById("prezzoFinale").innerHTML = `<span class="fw-bold">&euro; ${parteIntera}</span><span class="text-muted">,${parteDecimale}</span>`;
    
     // Salva i dati nel profilo
     const preventivo = {
        nome,
        cognome,
        email,
        tipoLavoro,
        prezzoFinale: prezzoFinale.toFixed(2)
    };

    elencoPreventivi.push(preventivo)
    console.log('Preventivo salvato:', preventivo);
    
}

document.getElementById('calcolaPreventivo').addEventListener('click', calcolaPreventivo);