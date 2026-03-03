


//-------------------------------------------------
// Bokningsformulär
// Inne på detaljsidan, under informationen om huset, ska det finnas ett bokningsformulär där kunden kan boka sin vistelse. Bokningsformuläret skall innehålla följande fält:

// incheckningsdatum (datum, obligatoriskt, inte tidigare än dagens datum)
// antal dagar (nummer, obligatoriskt, min 1)
// Minst tre olika, frivilliga tillägg (checkboxar) som påverkar priset, t.ex. “Frukost”, “Spökvandring” och “Nattlig seans”
// Varje tillägg har en fast kostnad som läggs till totalpriset (ex. frukost = 100 kr/dag, spökvandring = 300 kr, seans = 500 kr). Du väljer själv vilka tillägg du vill, och deras priser.
// kampanjkod (text, valfritt)
// Hitta själv på en kampanjkod (ex. “GHOST20”) som ger 20% rabatt på totalpriset när den anges korrekt.
// och en “Boka”-knapp
// I anslutning till formuläret ska det finnas en dynamisk prisuppdatering som visar det totala priset baserat på det valda huset, antal dagar, valda tillägg och eventuell rabatt.
// Ändringar i formuläret skall uppdatera det totala priset i realtid, så att kunden direkt ser hur mycket deras bokning kommer att kosta baserat på valda tillägg och eventuella rabatter.
// När kunden klickar på “Boka” ska en bokningsbekräftelse visas.
// Om det finns valideringsfel i formuläret (ex. ogiltigt datum, antal dagar mindre än 1) ska dessa fångas upp och visas tydligt i gränssnittet, utan att bokningen “genomförs”.
// Bekräftelsen kan visas på samma sida under formuläret, eller i en modal — det är upp till dig.
// Bekräftelsen ska innehålla en sammanfattning av bokningen: husets namn, incheckningsdatum, antal dagar, valda tillägg, totalpris, och en tackhälsning.
// Bokningsformuläret skall hanteras av en JavaScript-klass, Booking, som modellerar en pågående bokning.

// Du definerer klassen Booking i en separat modul (t.ex. booking.js) och importerar den i detaljsidan.
// Skapas en instans av Booking när sidan laddas, och koppla den till bokningsformuläret.
// Klassen skall ha metoder för att validera datan, beräkna totalpris samt generera en bokningsbekräftelse i HTML. Om det finns valideringsfel ska dessa visas i gränssnittet