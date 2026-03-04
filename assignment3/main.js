const response = await fetch("participants.json");
const participants = await response.json(); //fetch av deltagarna
// console.log(participants);
import { Match } from "./match.js"; //import av match-klassen

const matchBtn = document.getElementById("simMatch"); //knappen simulera match
const restart = document.getElementById("restart"); //knappen för att starta om matcherna
const bracket = document.getElementById("bracket"); //hitta delen där matcherna ska renderas

let matches = []; //lista med matcherna
let losers = []; //lista med förlorarna, för att kunna markera dem i html?
let winners = []; //lista med vinnarna, för att kunna para ihop dem i nästa runda
let roundCount = 0;


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
const roundSections = document.querySelectorAll(".round"); //hitta de olika sektionerna för rundorna, för att komma åt dem utanför funktionen



//-------------------------------------------------------------------
//skapa matcher------------------------------------------------------
const renderQuarterFinals = () => {
    for (let i = 0; i < participants.length; i += 2) { //gå igenom deltagare till kvartsfinalerna
        const match = new Match(participants[i], participants[i + 1]); //parar ihop deltagare i varsina matcher
        matches.push(match); //lägger till matchen i listan 
        roundSections[0].append(match.renderMatch()); //Matcherna renderas i kvartsfinalen
    }
    console.log("KvF:", matches);
}
renderQuarterFinals(); //rendera kvartsfinalerna, så att de syns på sidan vid start

const renderSemiFinals = () => {
    matches.length = 0; // tömmer listan så att tidigare matcher inte renderas i ny runda
    for (let i = 0; i < winners.length; i += 2) {
        const match = new Match(winners[i], winners[i + 1]); //parar ihop vinnarna i varsina matcher
        matches.push(match); //lägger till matchen i listan 
        roundSections[1].append(match.renderMatch()); //renderar matcherna i semifinalen
    }
    console.log("SeF:", matches);
}

const renderFinals = () => {
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
    }

    console.log("Resultat:", matches);
    console.log("Vinnare:", winners);


    //När matcherna ska "spelas" behöver de:
    // X köra compete()
    // X plocka ut vinnare och lägga dem i listan
    // - plocka ut förlorare och markera dem i html
    // X visa nästa runda
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

    // playMatches(matches[4]); //stannar på compete, fattar dock inte varför
    // playMatches(matches[5]); //generera matcherna i semifinalen, en i taget
    // console.log("Resultat efter semi:", matches);
    // console.log("Vinnare efter semi:", winners);
});

if (roundCount > 2) {
    // matchBtn. disabled true
}

restart.addEventListener("click", () => {
    bracket.innerHTML = ""; //tömmer bracket så att det inte blir dubbelt
    matches.length = 0; //tömmer listan med matcher
    console.log(matches); //fattar inte hur det funkar i konsollen, ser inte ut som att det är tomt
    winners.length = 0; //tömmer listan med vinnare
    // losers = []; //tömmer listan med förlorare
    createGameTree(); //skapa om trädet
    renderQuarterFinals(); //rendera kvartsfinalerna. Denna funkar inte just nu tho???
    console.log("Startar om turneringen")
});



//------------------------------------------------------
//to-do
// - Markera förlorare i html
// - För varje runda ska det finnas en tydlig rubrik som visar vilken runda det är (t.ex. “Kvartsfinal”, “Semifinal”, “Final”).
// - När finalen är avgjord, så ska det inte gå att simulera fler matcher eller välja vinnare — turneringen är över.
// - Användaren ska när som helst kunna starta om turneringen från början.