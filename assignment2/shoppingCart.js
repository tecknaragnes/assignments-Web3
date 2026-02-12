export const renderShoppingcart = () => {
    const cartList = document.getElementById("cartList"); //hitta aside/kundvagn-område

    const data = JSON.parse(localStorage.getItem("productData")); //hämta alla objekt från localStorage

    cartList.innerHTML = ""; //töm kundvagnen så att det inte dubbleras vid omladdning
    //värde innan här som lägger ihop alla priser i loopen och lägga i totalsum sen
    let totalPrice = 0; //starta räkning
    for (const product of data) {
        if (product.count > 0) { //skapa produkterna i kundvagnen som har fler än 0 i antal
            totalPrice += product.price * product.count; //lägg ihop pris per vara

            //skapa element i kundvagnen
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

        const totalSum = document.getElementById("totalSum");
        totalSum.textContent = ""; //tömmer kostnad så att det inte blir nya rader varje gång man lägger till produkt
        totalSum.textContent += totalPrice + " kr"; //nu blir det korrekt summa
    }
};