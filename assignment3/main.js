import { createGameTree, renderQuarterFinals, renderSemiFinals, renderFinals, matches, winners } from "./setup.js";

const matchBtn = document.getElementById("simMatch"); //knappen simulera match
const restart = document.getElementById("restart"); //knappen för att starta om matcherna
const bracket = document.getElementById("bracket"); //hitta delen där matcherna ska renderas
const headers = document.getElementById("headers"); //sektionen för rubrikerna kvarts-, semi- och final

let roundCount = 0; //räknare för vilken runda vi är i

createGameTree(); //skapar tomma columner för de olika rundorna
renderQuarterFinals(); //rendera kvartsfinalerna, så att de syns på sidan vid start

//-----------------------------------------------------------------
//generera matcher ------------------------------------------------
const playMatches = () => {
    ++roundCount;
    console.log("Runda, index:", roundCount);
    winners.length = 0; //tömmer vinnar-listan

    for (let match of matches) {
        match.compete(); //tävla, utse vinnare 
        winners.push(match.getWinner()); // skriva över vinnarna i listan
        match.markLoser();
    }

    console.log("Resultat:", matches);
    console.log("Vinnare:", winners);
}

//--------------------------------------------------------------
//klick-hanterare------------------------------------------------
matchBtn.addEventListener("click", () => {
    playMatches(); //spela matcherna

    if (roundCount == 1) {
        renderSemiFinals();
    }
    else if (roundCount == 2) {
        renderFinals();
    }
    if (roundCount > 2) {
        matchBtn.disabled = true; //kan inte simulera fler matcher när finalen är avgjord
    }
});

restart.addEventListener("click", () => {
    bracket.innerHTML = ""; //tömmer bracket så att det inte blir dubbelt
    headers.innerHTML = ""; //tömmer rubrikerna
    matches.length = 0; //tömmer listan med matcher
    winners.length = 0; //tömmer listan med vinnare
    roundCount = 0;
    matchBtn.disabled = false; //aktiverar knappen igen

    createGameTree(); //skapa om trädet
    // let roundSections = document.querySelectorAll(".round");
    renderQuarterFinals(); //rendera kvartsfinalerna
    console.log("Startar om turneringen")
});
