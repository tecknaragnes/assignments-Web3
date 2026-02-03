const nav = document.createElement("nav");
const ul = document.createElement("ul");
const header = document.querySelector("header");
header.after(nav);
nav.prepend(ul);

const fillNav = (assignments) => {
    ul.innerHTML = "";
    const homeLi = document.createElement("li");
    homeLi.innerHTML = `<a href="index.html">Hem</a>`;
    ul.append(homeLi);
    for (const assignment of assignments) {
        const li = document.createElement("li");
        li.innerHTML = `<a href=${assignment.link}>${assignment.nr}</a>`;
        ul.append(li);
    }

}
const resp = await fetch("assignments.json");
// console.log(resp);
const assignments = await resp.json();
// console.log(assignments);
fillNav(assignments);

// Det ska gå att se vilken sida man är inne på (med hjälp av klasser? .currentPage och classList remove och add)
// använda data-set (attribut) för att visa vilken sida som är aktuell???? labb4a på wt2