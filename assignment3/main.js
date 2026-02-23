const response = await fetch("participants.json");
const participants = await response.json(); //fetch av deltagarna
console.log(participants);



//------------------------------------------------------
// 3. Flöde
// Direkt när sidan laddas ska JSON-filen hämtas.
// När deltagardata är tillgängligt skall du generera matcherna i den första omgången av turneringen (kvartsfinalerna) och visa dessa i användargränssnittet.
// Tips För att para ihop deltagarna i matcher, kan du loopa över deltagar-arrayen med en for-loop som hoppar två steg i taget (i += 2), och skapa en Match-instans för varje par av deltagare.
// Därefter skall användaren på något sätt avgöra vinnaren i varje match. Välj ett av följande alternativ:
// Simulera matcher — vinnaren avgörs slumpmässigt baserat på deltagarnas skillLevel (se nedan).
// Manuellt - användaren väljer vinnaren manuellt i gränssnittet (se nedan).
// När alla matcher i en runda är avgjorda, så ska nästa runda skapas automatiskt.
// Matcherna skall skapas genom att para ihop vinnarna i föregående runda — alltså vinnaren av match 1 mot vinnaren av match 2, osv.
// Tips För att få en lista med vinnare från en lista med matcher, kan du använda map() för att omvandla en lista av matcher till en lista av matchernas vinnare.
// För varje runda ska det finnas en tydlig rubrik som visar vilken runda det är (t.ex. “Kvartsfinal”, “Semifinal”, “Final”).
// Därefter skall matcherna i den nya rundan avgöras, och så vidare tills mästaren är korad i finalen.
// När finalen är avgjord, så ska det inte gå att simulera fler matcher eller välja vinnare — turneringen är över.
// Användaren ska när som helst kunna starta om turneringen från början.