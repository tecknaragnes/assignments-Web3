const makeCards = (assignments) => {
    const main = document.getElementById("main");
    for (let assignment of assignments) {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const para = document.createElement("p");
        h2.innerHTML = `<a href="${assignment.link}">${assignment.title}</a>`;
        para.innerHTML = `${assignment.description}`;
        main.append(div);
        div.append(h2);
        div.append(para);
    }
}

const resp = await fetch("assignments.json"); //hämta objekten för uppgifterna
// console.log(resp);
const assignments = await resp.json();
makeCards(assignments);