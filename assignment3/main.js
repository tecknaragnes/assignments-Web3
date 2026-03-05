const response = await fetch("participants.json");
const participants = await response.json(); //fetch av deltagarna
// console.log(participants);
import { Match } from "./match.js"; //import av match-klassen

const matchBtn = document.getElementById("simMatch"); //knappen simulera match
const restart = document.getElementById("restart"); //knappen för att starta om matcherna
const bracket = document.getElementById("bracket"); //hitta delen där matcherna ska renderas
const headers = document.getElementById("headers"); //sektionen för rubrikerna kvarts-, semi- och final

let matches = []; //lista med matcherna
let losers = []; //lista med förlorarna, för att kunna markera dem i html?
let winners = []; //lista med vinnarna, för att kunna para ihop dem i nästa runda
let roundCount = 0; //räknare för vilken runda vi är i


//--------------------------------------------------------------
//setup---------------------------------------------------------
const createGameTree = () => {
    const quarterFinals = document.createElement("section");
    quarterFinals.classList.add("round");

    const semiFinals = document.createElement("section");
    semiFinals.classList.add("round");

    const finals = document.createElement("section");
    finals.classList.add("round");

    bracket.append(quarterFinals, semiFinals, finals);
}
createGameTree(); //skapar tomma columner för de olika rundorna
let roundSections = document.querySelectorAll(".round"); //hitta de olika sektionerna för rundorna, för att komma åt dem utanför funktionen



//------------------------------------------------------------------
//skapa matcher------------------------------------------------------
const renderQuarterFinals = () => {
    const headerQF = document.createElement("h3");
    headerQF.textContent = "Kvartsfinal";
    headers.append(headerQF);

    for (let i = 0; i < participants.length; i += 2) { //gå igenom deltagare till kvartsfinalerna
        const match = new Match(participants[i], participants[i + 1]); //parar ihop deltagare i varsina matcher
        matches.push(match); //lägger till matchen i listan 
        roundSections[0].append(match.renderMatch()); //Matcherna renderas i kvartsfinalen
    }
    console.log("KvF:", matches);
    console.log(matches[0].matchBlock); //nu kommer jag åt hela matchblocket i alla fall! Men hur väljer jag ut en specifik deltagare?---------------------------------------s
}
renderQuarterFinals(); //rendera kvartsfinalerna, så att de syns på sidan vid start

const renderSemiFinals = () => {
    const headerSF = document.createElement("h3");
    headerSF.textContent = "Semifinal";
    headers.append(headerSF);

    matches.length = 0; // tömmer listan så att tidigare matcher inte renderas i ny runda
    for (let i = 0; i < winners.length; i += 2) {
        const match = new Match(winners[i], winners[i + 1]); //parar ihop vinnarna i varsina matcher
        matches.push(match); //lägger till matchen i listan 
        roundSections[1].append(match.renderMatch()); //renderar matcherna i semifinalen
    }
    console.log("SeF:", matches);
}

const renderFinals = () => {
    const headerF = document.createElement("h3");
    headerF.textContent = "Final";
    headers.append(headerF);

    const match = new Match(winners[0], winners[1]); //parar ihop vinnarna i varsina matcher
    matches.length = 0; // tömmer listan så att tidigare matcher inte renderas i ny runda
    matches.push(match); //lägger till matchen i listan
    roundSections[2].append(match.renderMatch()); //renderar matcherna i finalen
}



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
    roundSections = document.querySelectorAll(".round");
    renderQuarterFinals(); //rendera kvartsfinalerna
    console.log("Startar om turneringen")
});
