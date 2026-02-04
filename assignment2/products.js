const products = [
    {
        "id": "bl001",
        "name": "Blyertspenna HB",
        "desc": "En blyerstpenna med mediumhårdhet.",
        "price": "29",
        "image": "img/",
        "category": ["Pen", "Sketch"]
    },
    {
        "id": "bp001",
        "name": "Penselpenna 001",
        "desc": "En filtspetspenna i färgen skogsgrön.",
        "price": "49",
        "image": "img/",
        "category": ["Pen", "Color", "Brush"]
    },
    {
        "id": "br003",
        "name": "Pensel 3",
        "desc": "En pensel med mårdhår i storlek 3. Perfekt för akvarell.",
        "price": "59",
        "image": "img/",
        "category": ["Color", "Brush", "Watercolor"]
    },
    {
        "id": "br008",
        "name": "Pensel 8",
        "desc": "En pensel med mårdhår i storlek 3. Perfekt för akvarell.",
        "price": "59",
        "image": "img/",
        "category": ["Color", "Brush", "Watercolor"]
    },
    {
        "id": "sp051",
        "name": "Skissblock A5",
        "desc": "Ett skissblock i storlek A5. 160 g/m2. 60 ark.",
        "price": "119",
        "image": "img/",
        "category": ["Sketch", "Pad", "Paper"]
    },
    {
        "id": "wp051",
        "name": "Akvarellblock A5",
        "desc": "Ett akvarellblock i storlek A5. 300 g/m2. 30 ark. Slät gräng.",
        "price": "129",
        "image": "img/",
        "category": ["Watercolor", "Pad", "Paper"]
    },
    {
        "id": "wc001",
        "name": "Akvarellfärg 001",
        "desc": "Akvarellfärg i kopp med färgen magenta.",
        "price": "29",
        "image": "img/",
        "category": ["Watercolor", "Color"]
    },
    {
        "id": "wc015",
        "name": "Akvarellfärg 015",
        "desc": "Akvarellfärg i kopp med färgen koboltblå.",
        "price": "29",
        "image": "img/",
        "category": ["Watercolor", "Color"]
    }
];

const main = document.getElementById("cardContainers");
const createCards = (products) => {
    for (let product of products) {
        const card = document.createElement("div");
        card.classList.add("productCard");
        main.append(card);

        const img = document.createElement("div");
        img.classList.add("imgPlaceholder");
        card.append(img);

        const name = document.createElement("h2");
        name.textContent = product.name;
        card.append(name);

        const desc = document.createElement("p");
        desc.textContent = product.desc;
        card.append(desc);

        const categoryBox = document.createElement("span");
        categoryBox.classList.add("category");
        for (let category of product.category) {
            const categories = document.createElement("span");
            const categoryP = document.createElement("p");
            categoryP.textContent = category;
            categoryBox.append(categories);
            categories.append(categoryP);
        }
        card.append(categoryBox);

        const prNbtn = document.createElement("span");
        const price = document.createElement("p");
        price.textContent = `${product.price} kr`;
        price.classList.add("priceClass");
        prNbtn.append(price);

        const button = document.createElement("button");
        button.textContent = "Lägg till i kundvagnen";
        prNbtn.append(button);
        card.append(prNbtn);
    }
};
createCards(products);