import { renderHouses, scareArray } from "./init.js";
const errorMsgSpan = document.getElementById("errorMessage");
errorMsgSpan.style.visibility = "hidden";


//----------------------------------------------------------
let houses;
try { // Använd try/catch i fetch
    const response = await fetch("houses.json");
    houses = await response.json(); //hämtas med fetch 
}
catch (err) {
    errorMsgSpan.textContent = err.message;
    //felmeddelande om husen inte laddas/hämtas
}


//------------------------------------------------------------
let price;
let index;
let ghost;
let wifiCheck;


const filterResult = () => {
    let filtered;
    let priceFilter = price ?? 3500;
    if (price == "") {
        priceFilter = 3500;
    }
    let scareIndex = index ?? 0;

    if (ghost === "all") {
        ghost = "";
    }

    const ghostMatch = (h) => !ghost || h.ghostTypes.includes(ghost); //går igenom arrayen ghostTypes

    if (wifiCheck !== true) { //wifi alla
        filtered = houses.filter(h =>
            h.pricePerNight < priceFilter
            && h.scareLevel > scareIndex
            && ghostMatch(h)
        );
    } else { //bara de med wifi
        filtered = houses.filter(h =>
            h.pricePerNight < priceFilter
            && h.scareLevel > scareIndex
            && ghostMatch(h)
            && h.hasWifi == wifiCheck
        );
    }
    console.log(filtered);

    renderHouses(filtered);
    if (filtered.length === 0) {
        errorMsgSpan.style.visibility = "visible";
        errorMsgSpan.textContent = "Det finns inga spöken på sökningen du gjort! 👻 Testa en annan sökning istället!"; // om resultatet är tomt, visa ett felmeddelande
    } else {
        errorMsgSpan.style.visibility = "hidden";
    }
}



export const listeners = () => {
    const priceInput = document.getElementById("maxPrice");

    priceInput.addEventListener("input", () => {
        price = priceInput.value;
        filterResult();
    });


    const scareSlider = document.getElementById("scareLevel");
    const scareValue = document.getElementById("scareValue");

    scareSlider.addEventListener("input", () => {
        index = Number(scareSlider.value) - 1;
        scareValue.textContent = scareArray[index];
        filterResult();
    });


    const ghostType = document.getElementById("ghostType");

    ghostType.addEventListener("change", () => {
        ghost = ghostType.value;
        filterResult();
    })


    const wifiCheckbox = document.getElementById("wifi");

    wifiCheckbox.addEventListener("change", () => {
        wifiCheck = wifiCheckbox.checked;
        filterResult();
    })
}