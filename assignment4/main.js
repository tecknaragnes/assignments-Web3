let houses;
try { // Använd try/catch i fetch
    const response = await fetch("houses.json");
    houses = await response.json(); //hämtas med fetch 
}
catch (err) {
    //felmeddelande om husen inte laddas/hämtas
}


//------------------------------------------------------------
const houseDiv = document.getElementById("houseDiv");

const renderHouses = (house) => {
    houseDiv.innerHTML = "";

    for (let h of house) {
        const houseCard = document.createElement("div");
        houseCard.classList.add("houseCard");

        houseCard.innerHTML = `
            <img src="img/${h.image}" alt="">
            <h3>${h.name}</h3>
            <p>${h.location}</p>
            <span class="flexSpan"> 
                <p>${h.scareLevel}</p>
                <p>${h.hasWifi}</p>
            </span>
            <span class="flexSpan">
                <p>${h.pricePerNight} kr/natt</p>
                <button href="house.html?id=${h.id}">Läs mer och boka</button>
            </span>`;
        houseDiv.append(houseCard);
    } //scareLevel och hasWifi ska ligga bredvid varandra, och ska göras om till text respektive symbol. Fixa ett ungefärligt samma ratio för bilderna

}
renderHouses(houses); // Alla hus ska visas när sidan laddas.



//------------------------------------------------------------
const priceSlider = document.getElementById("maxPrice");
const priceValue = document.getElementById("priceValue");

priceSlider.addEventListener("input", () => {
    priceValue.textContent = priceSlider.value;
    // filtrera med array.filter()
});


const scareSlider = document.getElementById("scareLevel");
const scareValue = document.getElementById("scareValue");
const scareArray = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];

scareSlider.addEventListener("input", () => {
    let index = Number(scareSlider.value) - 1;
    console.log(index);
    scareValue.textContent = scareArray[index];
    // händelselyssnaren funkar, men den fukkar ju lite med texten som ändrar var slidern är, så den skiftar fram och tillbaka när man drar
});


const ghostType = document.getElementById("ghostType");

ghostType.addEventListener("change", () => {
    //array.filter()
})


const wifiCheckbox = document.getElementById("wifi");

wifiCheckbox.addEventListener("change", () => {
    if (wifiCheckbox.checked) {
        //array.filter()
    } else {
        //tömma sökningen
    }
})
// Filterformulär: typ av spöke (dropdown med alla typer + “Alla typer”)
// När filterformuläret ändras ska husen filtreras i realtid utan att sidan laddas om. Använd input- eller change-event för att fånga ändringar, vilket du tycker passar bäst för varje formulärelement.
// Filtreringen görs med Array.filter() baserat på de valda kriterierna.
// Visa meddelande om inga hus matchar filtreringen, det räcker inte att visa en tom sida.


//------------------------------------------------------------
// En JS-fil per html-fil
// export/import med moduler
// Använd try/catch för att fånga fel vid fetch()-anrop och annan logik som kan misslyckas.
// Felmeddelanden ska visas i gränssnittet med tydlig visuell styling, inte bara loggas i konsolen.
// Skräcknivå ska visas som text (ex. “Mysigt”, “Lite läskigt”, “Obehagligt”, “Skräckinjagande” och “Ren terror”) baserat på scareLevel (1-5) i datan, inte som siffror.

// Översiktssidan (index.html)
// Varje hus visas med bild, namn, plats, pris per natt, skräcknivå (som text), och en “Läs mer och boka”-knapp som länkar till detaljsidan med rätt id i URL:en (t.ex. house.html?id=1).

// API-integration
// Extern data via REST API — hämta och visa data från ett externt API med fetch(). Hantera eventuella API-fel med try/catch. Välj minst ett alternativ:
// A — Väder: Aktuellt väder via Open-Meteo baserat på husets koordinater (gratis, ingen API-nyckel)
// B — Platsfoto: Foton via Flickr eller liknande baserat på platsnamn eller geo-data (gratis API-nyckel krävs)
// C — Karta: Interaktiv karta med Leaflet.js + ortsinformation via Nominatim (gratis, ingen API-nyckel)
// D — Egen idé: Har du en annan idé på relevant data att hämta via ett API? Kör på den! (kolla med läraren först bara)
// Du bestämmer själv hur och var på detaljsidan du vill visa den externa datan, men den ska vara tydligt kopplad till husets plats. Exempelvis kan väderdata visas i en “Väderprognos”-sektion, platsfoton i ett galleri, och kartan i en “Var ligger huset?”-sektion.



//to do--------------
// - try/catch
// X input/change-eventlyssnare
// X dynamiskt visa range-value
// - array.filer() för att visa sökresultat