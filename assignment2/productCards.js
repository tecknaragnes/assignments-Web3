export const createCards = (products) => { // funktionen skapa produktkort
    const main = document.getElementById("cardContainers");
    for (let product of products) { //alla produkter
        const card = document.createElement("div"); //kortet
        card.classList.add("productCard");
        card.classList.add(`${product.id}`)
        main.append(card);

        const img = document.createElement("img"); //bildelementet
        img.src = `img/${product.image}.jpg`;
        card.append(img);

        const name = document.createElement("h2"); //produktnamn
        name.textContent = product.name;
        card.append(name);

        const desc = document.createElement("p"); //produktbeskriving
        desc.textContent = product.desc;
        card.append(desc);

        const categoryBox = document.createElement("span"); //behållare för kategorier
        categoryBox.classList.add("category");
        for (let category of product.category) {
            const categories = document.createElement("span");
            const categoryP = document.createElement("p");
            categoryP.textContent = category; //kategorierna
            categoryBox.append(categories);
            categories.append(categoryP);
        }
        card.append(categoryBox);

        const prNbtn = document.createElement("span"); //behållare för pris och köp-knapp
        const price = document.createElement("p"); //pris
        price.textContent = `${product.price} kr`;
        price.classList.add("priceClass");
        prNbtn.append(price);

        const button = document.createElement("button"); //köp-knapp
        button.classList.add("addBtn");
        button.classList.add(`${product.id}`);
        button.textContent = "Lägg till i kundvagnen";

        button.addEventListener("click", () => {
            ++product.count;
            localStorage.setItem("productsData", JSON.stringify(products));
            renderShoppingcart();
        })

        prNbtn.append(button);
        card.append(prNbtn);
    }
};