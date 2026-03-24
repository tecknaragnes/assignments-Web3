const houseDiv = document.getElementById("houseInfoDiv");

const dateInput = document.getElementById("start-date");
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
        if (v < 0) {
            throw new Error("Du måste boka minst 1 natt.");
        }
        this.#numberOfNights = v;
    }
    get numberOfNights() {
        return this.#numberOfNights;
    }
    set startDate(d) {
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
        this.#campaignCode = c.toUpperCase(); //sträng
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

    validate() {
        // const validationMsg = document.createElement("div");
        // validationMsg.textContent = //vad som är fel
        // bookingDiv.append(validationMsg);
        // try {
        //     this.#numberOfNights;
        // } catch (err) {
        //     validationMsg.textContent = Error;
        // }

        this.generateConfirmation();
        // om inte ok:
        //kontrollerar om data är giltig (ex antal nätter>0, giltigt datum, etc. returnerar true om allt är ok, annars visa felmeddelande)
    }

    generateConfirmation() { // När kunden klickar på “Boka” ska en bokningsbekräftelse visas.
        houseDiv.innerHTML = "";
        houseDiv.classList.add("confirmation");
        houseDiv.innerHTML = `
        <h2>Bokning bekräftad!</h2>
        <p>Du har bokat ${this.#house.name} i ${this.#numberOfNights} nätter, med startdatum ${this.#startDate}.</p>
        <p>Bokningen innehåller: ${this.#addOns}</p>
        <p>Totalpris: ${this.#totalPrice} kr</p>
        <p>Tack för din beställning! Spökena väntar spänt på din ankomst! 👻</p>
        `;
        // Skapar HTML för bekräftelsen (husnamn, datum, dagar, tillägg, totalpris, tackhälsning).
    }
}

//-------------------------------------------------
// Om det finns valideringsfel i formuläret (ex. ogiltigt datum, antal dagar mindre än 1) ska dessa fångas upp och visas tydligt i gränssnittet, utan att bokningen “genomförs”.
// Bekräftelsen ska innehålla en sammanfattning av bokningen: husets namn, incheckningsdatum, antal dagar, valda tillägg, totalpris, och en tackhälsning.
// Klassen skall ha metoder för att validera datan. Om det finns valideringsfel ska dessa visas i gränssnittet
// Datum ska ändast tillåta dagens datum eller senare