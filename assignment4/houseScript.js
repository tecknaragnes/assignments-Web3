import { Booking } from "./booking.js";
const errorMsgSpan = document.getElementById("errorMessage");
errorMsgSpan.style.visibility = "hidden";


//---------------------------------------------------------
let houses;
try { // Använd try/catch i fetch
    const response = await fetch("houses.json");
    houses = await response.json(); //hämtas med fetch 
}
catch (err) {
    errorMsgSpan.style.visibility = "visible";
    errorMsgSpan.textContent = "Ett fel har uppstått! 👻 Spöken har fastnat någonstans på hemsidan, så försök igen senare. "
    errorMsgSpan.textContent += `(${err.message})`;
    //felmeddelande om husen inte laddas/hämtas
}


//----------------------------------------------------
const houseInfo = document.getElementById("houseInfoDiv");
const scareArray = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];

const renderHouse = (h) => {
    houseInfo.innerHTML = "";
    let index = Number(h.scareLevel) - 1;
    let wifi;
    if (h.hasWifi) {
        wifi = "WiFi finns"
    } else {
        wifi = "Inget WiFi"
    }

    houseInfo.innerHTML = `
    <span id="textArea">
        <h2>${h.name}</h2>
        <p>${h.location}</p>
        <p>${h.description}</p>
        <span class="flexObj scaryArea">
            <p class="scares">${scareArray[index]}</p>
        </span>
        <span class="flexObj">
            <p>${wifi}</p>
            <p>${h.pricePerNight} kr/natt</p>
        </span>
        <div id="map"></div>
    </span>
    <img src="img/${h.image}" alt="">`; // Visa fullständig hus-information: bild, namn, plats, beskrivning, pris, skräcknivå (text), spöktyper, WiFi-status.

    const scaryArea = document.querySelector(".scaryArea");

    for (let ghost of h.ghostTypes) { //visa de olika spökena
        const ghostP = document.createElement("p");
        ghostP.classList.add("ghost");
        ghostP.textContent = ghost;
        scaryArea.append(ghostP);
    }


    //---------------------------------------------------------
    // Här ska också integreras data från ett externt API
    let lat = h.coordinates.lat;
    let long = h.coordinates.lng;

    try {
        var map = L.map('map').setView([lat, long], 10); L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([lat, long]).addTo(map);
    } catch (err) {
        map.textContent = "Ett fel har uppstått! 👻 Spöken har fastnat någonstans på webbsidan, så försök igen senare. "
        map.textContent += `(${err.message})`;
    }

    // API-integration
    // Extern data via REST API — hämta och visa data från ett externt API med fetch(). Hantera eventuella API-fel med try/catch. Välj minst ett alternativ:
    // C — Karta: Interaktiv karta med Leaflet.js + ortsinformation via Nominatim (gratis, ingen API-nyckel)

}

let houseID;
try { // Använd try/catch
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get("id"); // Hus-id skall läsas av från URL:en.
    houseID = houses.find(h => h.id == urlId) // Använd hus-id tillsammans med Array.find() för att hitta rätt hus i datan.
    renderHouse(houseID);
}
catch (err) { // Om hus-id saknas eller är ogiltigt (dvs. inget hus med det id:t finns) ska ett tydligt felmeddelande visas i gränssnittet, tillsammans med en länk tillbaka till översiktssidan.
    errorMsgSpan.style.visibility = "visible";
    errorMsgSpan.textContent = "Ett fel har uppstått! 👻 Spöken har fastnat någonstans på hemsidan, så försök igen senare. "
    errorMsgSpan.innerHTML += `<a href="index.html">Tillbaka till startsidan</a>`; //felmeddelande om husen inte laddas/hämtas
}


//------------------------------------------------------------------
const form = document.getElementById("booking-form");
const dateInput = document.getElementById("start-date");
const nights = document.getElementById("number-nights");
const dinner = document.getElementById("dinner");
const breakfast = document.getElementById("breakfast");
const ghostWalk = document.getElementById("ghost-walk");
const callGhosts = document.getElementById("call-ghosts");
const code = document.getElementById("code");
const submitBtn = document.getElementById("submit-booking");
const booking = new Booking(houseID); // Skapas en instans av Booking när sidan laddas, och koppla den till bokningsformuläret.

form.addEventListener("input", () => {
    //uppdatera info i klassen från formuläret
    booking.numberOfNights = Number(nights.value);
    booking.startDate = dateInput.value;
    booking.addOns = {
        dinner: dinner.checked,
        breakfast: breakfast.checked,
        ghostWalk: ghostWalk.checked,
        callGhosts: callGhosts.checked
    };
    booking.campaignCode = code.value;

    booking.countPrice(); //räkna och uppdatera totalpris
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); //förhindrar sidan från att ladda om
    console.log("bokad!");
    booking.validate();
})