let assignments = []; //array för uppgifterna

const wU1 = {
    id: "wU1",
    title: "Uppgift 1 - Samlingssida för inlämningsuppgifter",
    link: "assignment1/index.html",
    description: "Skapa en landningssida för de framtida uppgifterna i kursen."
};
assignments.push(wU1);
// console.log(assignments);

const wU2 = {
    id: "wU2",
    title: "Uppgift 2 - Produktsida med kundvagn",
    link: "assignment2/index.html",
    description: "Dynamiskt skapa en produktsida som renderar produkter från objekt, och implementera en kundvagnsfunktion."
};
assignments.push(wU2);
// console.log(assignments);

// const globalNav = document.getElementById("global-nav");
// globalNav.innerHTML = `
// <li class="currentPage"><a href="index.html">Start</a></li>
// <li><a href="${wU1.link}">Uppgift 1</a></li>
// <li><a href="${wU2.link}">Uppgift 2</a></li>
// `;

const main = document.getElementById("main");
// for (let assignment of assignments) {
main.innerHTML = `
    <div>
    <h2><a href="${wU1.link}">${wU1.title}</a></h2>
    <p>${wU1.description}</p>
    </div>
    `;
main.innerHTML += `
    <div>
    <h2><a href="${wU2.link}">${wU2.title}</a></h2>
    <p>${wU2.description}</p>
    </div>
    `;
// };
//går det att loopa detta på något sätt? antar genom arrayen, men hur ska jag ta mig igenom arrayen till objekten och egenskaperna däri?


// Innehållet på landningssidan skall bestå av “kort” med korta beskrivningar av varje inlämningsuppgift, inklusive titel och länk till respektive uppgift. Dessa kort skall genereras dynamiskt med JavaScript utifrån samma datastruktur som används för navigationen.