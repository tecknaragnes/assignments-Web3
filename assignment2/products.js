const products = [
    {
        "id": "bl001",
        "name": "Blyertspenna HB",
        "desc": "En blyerstpenna med mediumhårdhet.",
        "price": "29",
        "image": "img/",
        "category": ["pen", "sketch"]
    },
    {
        "id": "bp001",
        "name": "Penselpenna 001",
        "desc": "En filtspetspenna i färgen skogsgrön.",
        "price": "49",
        "image": "img/",
        "category": ["pen", "color", "brush"]
    },
    {
        "id": "br003",
        "name": "Pensel 3",
        "desc": "En pensel med mårdhår i storlek 3. Perfekt för akvarell.",
        "price": "59",
        "image": "img/",
        "category": ["color", "brush", "watercolor"]
    },
    {
        "id": "br008",
        "name": "Pensel 8",
        "desc": "En pensel med mårdhår i storlek 3. Perfekt för akvarell.",
        "price": "59",
        "image": "img/",
        "category": ["color", "brush", "watercolor"]
    },
    {
        "id": "sp051",
        "name": "Skissblock A5",
        "desc": "Ett skissblock i storlek A5. 160 g/m2. 60 ark.",
        "price": "119",
        "image": "img/",
        "category": ["sketch", "pad", "paper"]
    },
    {
        "id": "wp051",
        "name": "Akvarellblock A5",
        "desc": "Ett akvarellblock i storlek A5. 300 g/m2. 30 ark. Slät gräng.",
        "price": "129",
        "image": "img/",
        "category": ["watercolor", "pad", "paper"]
    },
    {
        "id": "wc001",
        "name": "Akvarellfärg 001",
        "desc": "Akvarellfärg i kopp med färgen magenta.",
        "price": "29",
        "image": "img/",
        "category": ["watercolor", "color"]
    },
    {
        "id": "wc015",
        "name": "Akvarellfärg 015",
        "desc": "Akvarellfärg i kopp med färgen koboltblå.",
        "price": "29",
        "image": "img/",
        "category": ["watercolor", "color"]
    }
];

const main = document.getElementById("cardContainers");
const createCards = (products) => {
    for (let product of products) {
        const card = document.createElement("div");
        const img = document.createElement("div");
        const name = document.createElement("h2");
        const desc = document.createElement("p");
        //kategorier i span?
        const price = document.createElement("p");
        const button = document.createElement("button");

        img.classList.add("imgPlaceholder");
        name.textContent = product.name;
        desc.textContent = product.desc;
        price.textContent = `${product.price} kr`;
        price.classList.add("priceClass");
        button.textContent = "Lägg till i kundvagnen";

        main.append(card);
        card.append(img);
        card.append(name);
        card.append(desc);
        // card.append(); //kategorier
        card.append(price);
        card.append(button);
    }
};
createCards(products);