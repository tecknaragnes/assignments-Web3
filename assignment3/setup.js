const response = await fetch("participants.json");
const participants = await response.json(); //fetch av deltagarna
// console.log(participants);
import { Match } from "./match.js"; //import av match-klassen

const headers = document.getElementById("headers"); //sektionen för rubrikerna kvarts-, semi- och final
const bracket = document.getElementById("bracket"); //hitta delen där matcherna ska renderas

export let matches = []; //lista med matcherna
export let winners = []; //lista med vinnarna, för att kunna para ihop dem i nästa runda


export const createGameTree = () => {
    const quarterFinals = document.createElement("section");
    quarterFinals.classList.add("round");

    const semiFinals = document.createElement("section");
    semiFinals.classList.add("round");

    const finals = document.createElement("section");
    finals.classList.add("round");

    bracket.append(quarterFinals, semiFinals, finals);
}

let roundSections = document.querySelectorAll(".round"); //hitta de olika sektionerna för rundorna, för att komma åt dem utanför funktionen



//------------------------------------------------------------------
//skapa matcher------------------------------------------------------
export const renderQuarterFinals = () => {
    roundSections = document.querySelectorAll(".round");
    const headerQF = document.createElement("h3");
    headerQF.textContent = "Kvartsfinal";
    headers.append(headerQF);

    for (let i = 0; i < participants.length; i += 2) { //gå igenom deltagare till kvartsfinalerna
        const match = new Match(participants[i], participants[i + 1]); //parar ihop deltagare i varsina matcher
        matches.push(match); //lägger till matchen i listan 
        roundSections[0].append(match.renderMatch()); //Matcherna renderas i kvartsfinalen
    }
    console.log("KvF:", matches);
}


export const renderSemiFinals = () => {
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

export const renderFinals = () => {
    const headerF = document.createElement("h3");
    headerF.textContent = "Final";
    headers.append(headerF);

    const match = new Match(winners[0], winners[1]); //parar ihop vinnarna i varsina matcher
    matches.length = 0; // tömmer listan så att tidigare matcher inte renderas i ny runda
    matches.push(match); //lägger till matchen i listan
    roundSections[2].append(match.renderMatch()); //renderar matcherna i finalen
}