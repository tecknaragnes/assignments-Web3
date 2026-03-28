import { Booking } from "./booking.js";
import { renderHouse } from "./init.js";
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
const bookingDiv = document.getElementById("booking-div");
const form = document.getElementById("booking-form");
const dateInput = document.getElementById("start-date");
const nights = document.getElementById("number-nights");
const dinner = document.getElementById("dinner");
const breakfast = document.getElementById("breakfast");
const ghostWalk = document.getElementById("ghost-walk");
const callGhosts = document.getElementById("call-ghosts");
const code = document.getElementById("code");
const submitBtn = document.getElementById("submit-booking");
const errorMsg = document.getElementById("error-msg");
const booking = new Booking(houseID); // Skapas en instans av Booking när sidan laddas, och koppla den till bokningsformuläret.

form.addEventListener("input", () => {
    //uppdatera info i klassen från formuläret
    try {
        booking.numberOfNights = Number(nights.value); //try catch här + avaktivera knappen
        submitBtn.disabled = false;
        errorMsg.style.visibility = "hidden";
    } catch (error) {
        errorMsg.style.visibility = "visible";
        errorMsg.classList.add("errValid");
        errorMsg.textContent = error.message;
        bookingDiv.append(errorMsg);
        submitBtn.disabled = true;
    }
    try {
        booking.startDate = dateInput.value; //try catch här + avaktivera knappen
        submitBtn.disabled = false;
        errorMsg.style.visibility = "hidden";
    } catch (error) {
        errorMsg.style.visibility = "visible";
        errorMsg.classList.add("errValid");
        errorMsg.textContent = error.message;
        bookingDiv.append(errorMsg);
        submitBtn.disabled = true;
    }
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
    console.log("boka klickad");
    booking.validate();
})