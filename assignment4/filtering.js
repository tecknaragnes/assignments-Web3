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
    let priceFilter = price ?? 3000;
    if (price == "") {
        priceFilter = 3000;
    }
    let scareIndex = index ?? 0;
    // console.log("Spöke", ghost);

    if (wifiCheck !== true) {
        filtered = houses.filter(h =>
            h.pricePerNight < priceFilter
            && h.scareLevel > scareIndex
            // && h.ghostType == ghost
        );
    } else {
        filtered = houses.filter(h =>
            h.pricePerNight < priceFilter
            && h.scareLevel > scareIndex
            // && h.ghostType == ghost
            && h.hasWifi == wifiCheck
        );
    }

    renderHouses(filtered);
    if (filtered == "") {
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