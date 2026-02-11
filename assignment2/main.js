import { products } from "./products.js";
import { createCards } from "./productCards.js";

if (!localStorage.getItem("productData")) { //se om det finns sparad data i localStorage (är det tomt?)
    localStorage.setItem("productData", JSON.stringify(products)); //om det är tomt hämtar den data från products och lägger in den i localStorage
}


//----------Skapa produktkort----------
createCards(products); //kör funktionen


//----------Rendera kundvagnen----------
const renderShoppingcart = () => {
    const cartList = document.getElementById("cartList"); //hitta aside/kundvagn-område

    const data = JSON.parse(localStorage.getItem("productData")); //hämta alla objekt från localStorage

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