export const addToCart = () => {
    const addButtons = document.querySelectorAll(".addBtn");
    console.log(addButtons);
    for (let addButton of addButtons) {
        addButton.addEventListener("click", (event) => {
            console.log("Klickad");
            console.log("Jag har klickat ", event);
        })
    }
}