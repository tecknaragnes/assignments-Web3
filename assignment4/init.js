export const scareArray = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];

const houseDiv = document.getElementById("houseDiv");

export const renderHouses = (house) => { // rendera husen på förstasidan
    houseDiv.innerHTML = "";

    for (let h of house) {
        const houseCard = document.createElement("div");
        houseCard.classList.add("houseCard");
        let index = Number(h.scareLevel) - 1;
        let wifi;
        if (h.hasWifi) {
            wifi = "WiFi finns"
        } else {
            wifi = "Inget WiFi"
        }

        houseCard.innerHTML = `
            <img src="img/${h.image}" alt="">
            <h3>${h.name}</h3>
            <p>${h.location}</p>
            <span class="flexSpan"> 
                <p class="scares">${scareArray[index]}</p>
                <p class="wifi">${wifi}</p>
            </span>
            <span class="flexSpan">
                <p>${h.pricePerNight} kr/natt</p>
                <a href="house.html?id=${h.id}">Läs mer och boka</a>
            </span>`;
        houseDiv.append(houseCard);
    }
}



//----------------------------------------------------
const houseInfo = document.getElementById("houseInfoDiv");
// const scareArray = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];

export const renderHouse = (h) => { //rendera huset på detaljsidan
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

    try { // Extern data via REST API — hämta och visa data från ett externt API med fetch(). Hantera eventuella API-fel med try/catch.
        var map = L.map('map').setView([lat, long], 10); L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([lat, long]).addTo(map);
    } catch (err) {
        map.textContent = "Ett fel har uppstått! 👻 Spöken har fastnat någonstans på webbsidan, så försök igen senare. "
        map.textContent += `(${err.message})`;
    }
}