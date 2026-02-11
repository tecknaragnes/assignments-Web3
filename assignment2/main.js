import { products } from "./products.js";

if (!localStorage.getItem("productData")) { //se om det finns sparad data i localStorage (är det tomt?)
    localStorage.setItem("productData", JSON.stringify(products)); //om det är tomt hämtar den data från products och lägger in den i localStorage
}


//----------Skapa produktkort----------
const main = document.getElementById("cardContainers");
const createCards = (products) => { // funktionen skapa produktkort
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
        button.textContent = "Lägg till i kundvagnen";
        prNbtn.append(button);
        card.append(prNbtn);
    }
};
createCards(products); //kör funktionen


//----------Rendera kundvagnen----------
const renderShoppingcart = () => {
    const cartList = document.getElementById("cartList"); //hitta aside/kundvagn-område

    const data = JSON.parse(localStorage.getItem("productData")); //hämta alla objekt från localStorage

    cartList.innerHTML = ""; //töm kundvagnen så att det inte dubbleras vid omladdning


}
renderShoppingcart();


//----------Lägg till i kundvagn----------
const addToCart = () => {
    console.log("Lägg till i kundvagnen");
    //for-of och använd ++${this.count}?
}

const addButtons = document.querySelectorAll(".addBtn");
for (let addBtn of addButtons) { //gå igenom alla knappar
    addBtn.addEventListener("click", addToCart); //lyssna på klick
}


//----------Töm kundvagnen----------
const emptyCart = () => {
    cartList.innerHTML = ""; //rensa kundvagnens html
    console.log("Kundvagn tömd");
}

const emptyCartBtn = document.getElementById("emptyCart"); //knapp töm kundvagn
emptyCartBtn.addEventListener("click", emptyCart);


// import { addToCart } from "./shoppingCart.js";