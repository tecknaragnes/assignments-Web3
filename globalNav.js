const nav = document.createElement("nav");
const ul = document.createElement("ul");
const header = document.querySelector("header");
header.after(nav);
nav.prepend(ul);

const body = document.querySelector("body");
console.log(body);
const currentPage = body.dataset.currentpage; //kollar vilken sida vi är på
console.log("Current page: ", currentPage); //säger home på rätt ställe

const fillNav = (assignments) => {
    // ul.innerHTML = "";
    const homeLi = document.createElement("li"); //skapa listelement för hem
    if (currentPage == "home") { //om vi är på startsidan
        homeLi.classList.add("currentPage"); //så att det syns på nav att vi är här
        homeLi.innerHTML = `<a href="index.html">Hem</a>`;
        for (const assignment of assignments) { //loopar igenom alla uppgifter
            const li = document.createElement("li");
            li.innerHTML = `<a href=${assignment.link}>${assignment.nr}</a>`;
            ul.append(li); //lägger till listelementen i listan
        }
    }
    else if (currentPage == "wU1") { //om vi är på uppgift 1
        homeLi.innerHTML = `<a href="../index.html">Hem</a>`;
        for (const assignment of assignments) {
            const li = document.createElement("li");
            assignment.id == "wU1" ? li.classList.add("currentPage") : ""; //lägga current på rätt element
            li.innerHTML = assignment.id == "wu1" ? `<a href='index.html'>${assignment.nr}</a>` : `<a href=../${assignment.link}>${assignment.nr}</a>`; //så att länkarna blir rätt
            ul.append(li);
        }
    }
    else if (currentPage == "wU2") {
        homeLi.innerHTML = `<a href="../index.html">Hem</a>`;
        for (const assignment of assignments) {
            const li = document.createElement("li");
            assignment.id == "wU2" ? li.classList.add("currentPage") : "";
            li.innerHTML = assignment.id == "wu2" ? `<a href='index.html'>${assignment.nr}</a>` : `<a href=../${assignment.link}>${assignment.nr}</a>`;
            ul.append(li);
        }
    }
    ul.prepend(homeLi); //lägga home först


}
const resp = await fetch(currentPage == "home" ? "assignments.json" : "../assignments.json"); //hämta objekten för uppgifterna
// console.log(resp);
const assignments = await resp.json();
// console.log(assignments);
fillNav(assignments); //skapa navigationen