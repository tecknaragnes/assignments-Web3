const errorMsgSpan = document.getElementById("erroeMessage");


//----------------------------------------------------------
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
// let filterResult = houses; //just nu går det att filtrera åt ena hållet, men inte andra
const filterBase = houses;
let priceFilter;
let scareFilter;
let ghostFilter;
let wifiFilter;


const filterResult = () => {
    //samla de olika filtrerade listorna och kalla på filtret vid händelselyssnare
    //borde göra en variabel att stoppa in i renderHuoses-funktionen 
    // renderHouses();
    // om resultatet är tomt, visa ett felmeddelande
}


const priceSlider = document.getElementById("maxPrice");
const priceValue = document.getElementById("priceValue");

priceSlider.addEventListener("input", () => {
    const price = Number(priceSlider.value);
    priceValue.textContent = price;
    priceFilter = houses.filter(h => h.pricePerNight < price);
    filterResult();
});


const scareSlider = document.getElementById("scareLevel");
const scareValue = document.getElementById("scareValue");
const scareArray = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];

scareSlider.addEventListener("input", () => {
    let index = Number(scareSlider.value) - 1;
    scareValue.textContent = scareArray[index];
    scareFilter = houses.filter(h => h.scareLevel > index);
    filterResult();
    // händelselyssnaren funkar, men den fukkar ju lite med texten som ändrar var slidern är, så den skiftar fram och tillbaka när man drar
});


const ghostType = document.getElementById("ghostType");

ghostType.addEventListener("change", () => {
    let ghost = ghostType.value;
    ghostFilter = filterResult.filter(h => h.ghostTypes == ghost); //detta funkar inte, må ha med att ghostTypes är en array. Hur ska jag gå igenom den?
    // console.log(filterResult);
    filterResult();
})


const wifiCheckbox = document.getElementById("wifi");

wifiCheckbox.addEventListener("change", () => {
    if (wifiCheckbox.checked) {
        wifiFilter = filterResult.filter(h => h.hasWifi == true);
        filterResult();
    } else {
        filterResult();
    }
})

// När filterformuläret ändras ska husen filtreras i realtid utan att sidan laddas om. Använd input- eller change-event för att fånga ändringar, vilket du tycker passar bäst för varje formulärelement.
// Visa meddelande om inga hus matchar filtreringen, det räcker inte att visa en tom sida.


//------------------------------------------------------------
// En JS-fil per html-fil
// export/import med moduler
// Använd try/catch för att fånga fel vid fetch()-anrop och annan logik som kan misslyckas.
// Felmeddelanden ska visas i gränssnittet med tydlig visuell styling, inte bara loggas i konsolen.
// Skräcknivå ska visas som text (ex. “Mysigt”, “Lite läskigt”, “Obehagligt”, “Skräckinjagande” och “Ren terror”) baserat på scareLevel (1-5) i datan, inte som siffror.

// Översiktssidan (index.html)
// Varje hus visas med bild, namn, plats, pris per natt, skräcknivå (som text), och en “Läs mer och boka”-knapp som länkar till detaljsidan med rätt id i URL:en (t.ex. house.html?id=1).


//to do--------------
// \ try/catch
// X input/change-eventlyssnare
// X dynamiskt visa range-value
// \ array.filer() för att visa sökresultat