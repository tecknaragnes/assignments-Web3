//---------Produkterna----------
import { products } from "./products.js";
//----------Skapa produktkort----------
import { renderCards } from "./productCards.js";
//----------Rendera kundvagnen----------
import { renderShoppingcart } from "./shoppingCart.js";

if (!localStorage.getItem("productData")) { //se om det finns sparad data i localStorage (är det tomt?)
    localStorage.setItem("productData", JSON.stringify(products)); //om det är tomt hämtar den data från products och lägger in den i localStorage
}


//----------Töm kundvagnen----------
const emptyCart = () => {
    localStorage.setItem("productData", JSON.stringify(products));
    renderShoppingcart(); //Tömmer, men sen när man klickar på ny produkt kommer alla in igen med sina förra antal
    renderCards();
}

const emptyCartBtn = document.getElementById("emptyCart"); //knapp töm kundvagn
emptyCartBtn.addEventListener("click", emptyCart);



renderShoppingcart(); //kalla på funktionen som skapar kundvagnen
renderCards(products); //kör funktionen som skapar korten