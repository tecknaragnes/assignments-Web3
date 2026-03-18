import { listeners } from "./filtering.js";
import { renderHouses } from "./init.js";

const errorMsgSpan = document.getElementById("errorMessage");
errorMsgSpan.style.visibility = "hidden";


//----------------------------------------------------------
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


renderHouses(houses); // Alla hus ska visas när sidan laddas.
listeners();


//------------------------------------------------------------
// Använd try/catch för att fånga fel vid fetch()-anrop och annan logik som kan misslyckas.
// Felmeddelanden ska visas i gränssnittet med tydlig visuell styling, inte bara loggas i konsolen.

// Översiktssidan (index.html)
// Varje hus visas med en “Läs mer och boka”-knapp som länkar till detaljsidan med rätt id i URL:en (t.ex. house.html?id=1).


//to do--------------
// \ try/catch (var mer kan man använda denna?)
// \ fixa länken på "läs mer"-knappen