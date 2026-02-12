export const renderCards = () => { // funktionen skapa produktkort
    const parsedData = JSON.parse(localStorage.getItem("productData")); //hämta produkter från localStorage

    const main = document.getElementById("cardContainers");
    main.innerHTML = "";
    for (let product of parsedData) { //alla produkter
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
        for (let category of product.category) { //gå igenom de olika kategorierna
            const categories = document.createElement("span");
            const categoryP = document.createElement("p");
            categoryP.textContent = category; //själva kategorierna
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

        //----------Lägg till i kundvagn----------
        button.addEventListener("click", () => {
            product.count += 1; //ökar antal i localStorage
            localStorage.setItem("productData", JSON.stringify(parsedData));
            renderShoppingcart(); //renderar om kundvagnen
        });

        prNbtn.append(button);
        card.append(prNbtn);
    }
};