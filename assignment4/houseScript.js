const errorMsgSpan = document.getElementById("errorMessage");
const scareArray = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];
import { Booking } from "./booking.js";
errorMsgSpan.style.visibility = "hidden";


// för att få rätt hus på sidan
// const response = await fetch(`house.html?id=?${house.id}`);
// if (!response.ok) {
//     throw new Error("Sökningen misslyckades");
// };
// return response.json();
// Hus-id skall läsas av från URL:en. (labb7a)
// Använd hus-id tillsammans med Array.find() för att hitta rätt hus i datan.
// Om hus-id saknas eller är ogiltigt (dvs. inget hus med det id:t finns) ska ett tydligt felmeddelande visas i gränssnittet, tillsammans med en länk tillbaka till översiktssidan.

let houses;
try { // Använd try/catch i fetch
    const response = await fetch("houses.json");
    houses = await response.json(); //hämtas med fetch 
}
catch (err) {
    errorMsgSpan.style.visibility = "visible";
    errorMsgSpan.textContent = err.message;
    //felmeddelande om husen inte laddas/hämtas
}


//----------------------------------------------------
const houseInfo = document.getElementById("houseInfoDiv");

const renderHouse = (h) => {
    houseInfo.innerHTML = "";
    let index = Number(h.scareLevel) - 1;

    houseInfo.innerHTML = `
    <span id="textArea">
        <h2>${h.name}</h2>
        <p>${h.location}</p>
        <p>${h.description}</p>
        <span class="flexObj scaryArea">
            <p class="scares">${scareArray[index]}</p>
        </span>
        <span class="flexObj">
            <p>${h.hasWifi}</p>
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

    // Här ska också integreras data från ett externt API
    let lat = h.coordinates.lat;
    let long = h.coordinates.lng;
    var map = L.map('map').setView([lat, long], 10); L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([lat, long]).addTo(map);
    // API-integration
    // Extern data via REST API — hämta och visa data från ett externt API med fetch(). Hantera eventuella API-fel med try/catch. Välj minst ett alternativ:
    // C — Karta: Interaktiv karta med Leaflet.js + ortsinformation via Nominatim (gratis, ingen API-nyckel)

}
renderHouse(houses[1]);

const form = document.getElementById("booking-form");
form.addEventListener("change", () => {

})