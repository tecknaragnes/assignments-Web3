const houseDiv = document.getElementById("houseInfoDiv");

const dateInput = document.getElementById("start-date");
const today = new Date();
// console.log(today.toLocaleDateString()); //YYYY-MM-DD
const nights = document.getElementById("number-nights");
const dinner = document.getElementById("dinner");
const breakfast = document.getElementById("breakfast");
const ghostWalk = document.getElementById("ghost-walk");
const callGhosts = document.getElementById("call-ghosts");
const priceSpan = document.getElementById("final-price");

export class Booking { // Bokningsformuläret skall hanteras av en JavaScript-klass, Booking, som modellerar en pågående bokning.
    //fält för de olika egenskaperna
    #house; //från url
    #pricePerNight; //från house
    #numberOfNights; //från #number-nights
    #startDate; //från #start-date
    #addOns; //som en array/objekt, ex {dinner: true, breakfast: false, etc}
    #campaignCode; // det som skrivs i input
    #totalPrice; //fylla på priset

    constructor(house) { //argument
        this.#house = house;
        this.#pricePerNight = house.pricePerNight;
        this.#numberOfNights = Number(nights.value); //vad gör dessa nu? ska de bara vara tomma i början kanske?
        this.#startDate = dateInput.value; //denna också
        this.#addOns = { dinner: false, breakfast: false, ghostWalk: false, callGhosts: false };
        this.#campaignCode = "";
        this.#totalPrice = house.pricePerNight;
    }

    // getters och setters
    set numberOfNights(v) {
        if (v < 1) {
            throw new Error("Du måste boka minst 1 natt.");
            return;
        }
        this.#numberOfNights = v;
    }
    get numberOfNights() {
        return this.#numberOfNights;
    }
    set startDate(d) {
        if (d < today.toLocaleDateString()) { // Datum ska ändast tillåta dagens datum eller senare
            throw new Error("Du måste välja ett datum som är senare än idag.");
            return;
        }
        this.#startDate = d; //sträng
    }
    get startDate() {
        return this.#startDate;
    }
    set addOns(o) {
        this.#addOns = o; //objekt
    }
    get addOns() {
        return this.#addOns;
    }
    set campaignCode(c) {
        this.#campaignCode = c; //sträng
    }
    get campaignCode() {
        return this.#campaignCode;
    }


    countPrice() { // I anslutning till formuläret ska det finnas en dynamisk prisuppdatering som visar det totala priset baserat på det valda huset, antal dagar, valda tillägg och eventuell rabatt.
        let total = this.#pricePerNight * this.#numberOfNights; //ta pris per natt gånger antal nätter
        if (dinner.checked) {
            total += Number(dinner.value) * this.#numberOfNights;
        }
        if (breakfast.checked) {
            total += Number(breakfast.value) * this.#numberOfNights;
        }
        if (ghostWalk.checked) {
            total += Number(ghostWalk.value)
        }
        if (callGhosts.checked) {
            total += Number(callGhosts.value);
        }

        if (this.#campaignCode === "GHOST20") { //ev kampanjkod
            total = total * 0.8;
        } else if (this.#campaignCode === "FORCEGHOST") {
            total = total * 0.5;
        }

        total = Math.floor(total); // öresutjämning, neråt
        this.#totalPrice = total;
        priceSpan.innerHTML = "";
        priceSpan.textContent = this.#totalPrice; //visa pris dynamiskt i #final-price
    }

    validate() { //behövs den här? Nu har jag ju valideringen inbyggd i 
        if (this.#numberOfNights > 0
            && this.#startDate > today.toLocaleDateString()) {
            this.generateConfirmation();
        } else {
            this.showError();
            // validationMsg.textContent = error.message; //vad som är fel
        }
    }

    generateConfirmation() { // När kunden klickar på “Boka” ska en bokningsbekräftelse visas, och ska innehålla en sammanfattning av bokningen: husets namn, incheckningsdatum, antal dagar, valda tillägg, totalpris, och en tackhälsning.
        houseDiv.innerHTML = "";
        houseDiv.classList.add("confirmation");
        houseDiv.innerHTML = `
        <h2>Bokning bekräftad!</h2>
        <p>Du har bokat ${this.#house.name} i ${this.#numberOfNights} nätter, med startdatum ${this.#startDate}.</p>
        <p>Bokningen innehåller: <span id="addOnSpan"></span></p>
        <p>Totalpris: ${this.#totalPrice} kr</p>
        <p>Tack för din beställning! Spökena väntar spänt på din ankomst! 👻</p>
        `; // Skapar HTML för bekräftelsen (husnamn, datum, dagar, tillägg, totalpris, tackhälsning).

        const addOnSpan = document.getElementById("addOnSpan");
        if (dinner.checked) {
            addOnSpan.textContent += "middag";
        }
        if (breakfast.checked) {
            addOnSpan.textContent += ", fukost";
        }
        if (ghostWalk.checked) {
            addOnSpan.textContent += ", guidad spökvandring";
        }
        if (callGhosts.checked) {
            addOnSpan.textContent += ", kalla på spöken";
        }
    }
}