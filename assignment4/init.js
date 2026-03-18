export const scareArray = ["Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];

const houseDiv = document.getElementById("houseDiv");

export const renderHouses = (house) => {
    houseDiv.innerHTML = "";

    for (let h of house) {
        const houseCard = document.createElement("div");
        houseCard.classList.add("houseCard");
        let index = Number(h.scareLevel) - 1;
        let wifi;
        if (h.hasWifi) {
            wifi = "WiFi finns"
        } else {
            wifi = "Inget WiFi"
        }

        houseCard.innerHTML = `
            <img src="img/${h.image}" alt="">
            <h3>${h.name}</h3>
            <p>${h.location}</p>
            <span class="flexSpan"> 
                <p class="scares">${scareArray[index]}</p>
                <p class="wifi">${wifi}</p>
            </span>
            <span class="flexSpan">
                <p>${h.pricePerNight} kr/natt</p>
                <a href="house.html?id=${h.id}">Läs mer och boka</a>
            </span>`;
        houseDiv.append(houseCard);
    } // hasWifi ska göras om till symbol eller text
}