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