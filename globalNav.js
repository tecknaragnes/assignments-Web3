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
    ul.innerHTML = ""; //kan den behöva sättas på igen?
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

    else {
        homeLi.innerHTML = `<a href="../index.html">Hem</a>`;
        for (const assignment of assignments) {
            const li = document.createElement("li");
            li.innerHTML = `<a href=../${assignment.link}>${assignment.nr}</a>`;
            ul.append(li);
            if (assignment.id == currentPage) { //om id:t på uppgiften är samma som den sida vi är på
                li.classList.add("currentPage"); //lägg på klassen currentPage så att det syns i nav att vi är där
            }
        }
    }

    ul.prepend(homeLi); //lägga home först


}
const resp = await fetch(currentPage == "home" ? "assignments.json" : "../assignments.json"); //hämta objekten för uppgifterna
// console.log(resp);
const assignments = await resp.json();
// console.log(assignments);
fillNav(assignments); //skapa navigationen