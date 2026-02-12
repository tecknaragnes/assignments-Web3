import { products } from "./products.js";
// import { createCards } from "./productCards.js";

if (!localStorage.getItem("productData")) { //se om det finns sparad data i localStorage (är det tomt?)
    localStorage.setItem("productData", JSON.stringify(products)); //om det är tomt hämtar den data från products och lägger in den i localStorage
}


//----------Skapa produktkort----------
export const createCards = () => { // funktionen skapa produktkort
    const main = document.getElementById("cardContainers");
    const parsedData = JSON.parse(localStorage.getItem("productData"));
    console.log(parsedData); //just nu bara en produkt i localStorage

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
            console.log(`${product.name} klickad`); //rätt produkt
            product.count += 1; //ökar ej just nu
            // localStorage.setItem("productData", JSON.stringify(prodData));
            // renderShoppingcart();
        });

        prNbtn.append(button);
        card.append(prNbtn);
    }
};




//----------Rendera kundvagnen----------
const renderShoppingcart = () => {
    const cartList = document.getElementById("cartList"); //hitta aside/kundvagn-område

    // const data = JSON.parse(localStorage.getItem("productData")); //hämta alla objekt från localStorage
    // console.log(data); //bara en produkt???

    cartList.innerHTML = ""; //töm kundvagnen så att det inte dubbleras vid omladdning

    for (const product of data) {
        if (product.count > 0) {
            const li = document.createElement("li");
            li.classList.add("cartItem");
            const row1 = document.createElement("span");
            const h3 = document.createElement("h3");
            const price = document.createElement("p");
            row1.classList.add("topRow");
            h3.textContent = `${product.name}`;
            price.textContent = `${product.price} kr`;
            price.classList.add("price");
            row1.append(h3, price);
            li.append(row1);
            const count = document.createElement("p");
            count.textContent = `${product.count} st`;
            count.classList.add("bottomRow");
            li.append(count);
            cartList.append(li);
        }
    }
}
// renderShoppingcart();


//----------Lägg till i kundvagn----------













// const addToCart = (product) => {
//     for (let product of products) {

//         console.log("Lägg till i kundvagnen");
//         ++product.count;
//         console.log(`${product.name}, antal: ${product.count}`); //den här ökar ju på alla
//     }

// }


// const addButtons = document.querySelectorAll(".addBtn");
// for (let addBtn of addButtons) { //gå igenom alla knappar
//     addBtn.addEventListener("click", addToCart); //lyssna på klick
//     //produktloopen, sen klickhanterare inne i den
// }

//----------Töm kundvagnen----------
const emptyCart = () => {
    cartList.innerHTML = ""; //rensa kundvagnens html
    console.log("Kundvagn tömd");
}

const emptyCartBtn = document.getElementById("emptyCart"); //knapp töm kundvagn
emptyCartBtn.addEventListener("click", emptyCart);


// import { addToCart } from "./shoppingCart.js";

createCards(products); //kör funktionen