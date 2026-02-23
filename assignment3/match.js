class Match { //klass för en match
    #participant; //privat fält för 2 deltagare
    #winner; //privat fält för vinnare

    constructor(participants) { //två deltagare som argument
        this.#participant = participants;
        //ska jag göra två stycken av detta?
    }

    getParticipants() { //metod för att hämta deltagarna
        return this.#participant;
    }
    getWinner() { //metod för att hämta vinnaren
        return this.#winner;
    }
    getIsPlayed() { //metod för att kolla om matchen är spelad
        let isPlayed; //isPlayed ska vara med, men osäker än hur jag ska använda
    }

    renderGameTree() {

    }
}



//----------------------------------------------------------
// 2. Matcher
// Varje deltagare i JSON-datan är ett vanligt objekt — det behövs ingen klass för dem. Däremot har en match ett tydligt tillstånd som förändras: den har två deltagare, den kan spelas, och den har en vinnare. Det gör den till en bra kandidat för en klass.

// 2.1 Matchklassen
// Du skall använda en klass för att representera en match mellan två deltagare.
// Klassen ska ha följande struktur:
// En konstruktor som tar två deltagare som argument.
// Privata fält (#) för de två deltagarna och vinnaren — de ska inte kunna ändras utifrån.
// Getters för att läsa deltagarna, vinnaren, och om matchen är spelad (isPlayed).
// En metod för att skapa och returnera ett html-element som representerar matchen och kan användas för att rendera den i DOM:en.
// Exakt hur en match ska se ut är upp till dig, det beror också lite på om du väljer att simulera resultatet eller låta användaren välja vinnare manuellt.
// Tips: Det kan vara en bra idé att i klassen hålla redan på elementet som representerar matchen i DOM:en, så att du enkelt kan uppdatera det när matchen spelats. All logik som har med matchens tillstånd att göra bör finnas i klassen.

// 2.2 Visuell representation av matchen
// Varje match ska visas som ett kort eller block i gränssnittet, där båda deltagarnas alla egenskaper syns (namn, bild, skillLevel och catchphrase).
// Hänsyn behövs för att vissa deltagare har ofullständig data — använd ?? för att ge saknade värden ett standardvärde i rendering.
// När en match är spelad, ska det tydligt markeras i gränssnittet vilken av deltagarna som vann. Förloraren kan tonas ned eller markeras på något sätt.