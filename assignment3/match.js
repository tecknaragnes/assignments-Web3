export class Match { //klass för en match
    #participant1; //privat fält för 2 deltagare
    #participant2;
    #winner; //privat fält för vinnare
    isPlayed = false; //om matchen är spelad
    matchBlock; //komma åt matchblocket utifrån


    constructor(participant1, participant2) { //två deltagare som argument
        this.#participant1 = participant1;
        this.#participant2 = participant2;
    }

    getParticipant1() { //metod för att hämta deltagarna
        return this.#participant1;
    }
    getParticipant2() {
        return this.#participant2;
    }
    getWinner() { //metod för att hämta vinnaren
        return this.#winner;
    }
    getIsPlayed() { //metod för att kolla om matchen är spelad
        return this.isPlayed;
    }

    renderMatch() { //rendera matchen på sidan
        const matchElm = document.createElement("section");
        matchElm.classList.add("match");

        matchElm.innerHTML = `
        <span class="participant1">
            <img src="${this.#participant1.image}" alt="">
            <span>
            <p class="name">${this.#participant1.name ?? "Anonym spelare"}</p>
            <p>Styrka: ${this.#participant1.skillLevel ?? "okänd"}</p>
            <p>"${this.#participant1.catchphrase ?? "???"}"</p>
            </span>
        </span>
        <p>VS.</p>
        <span class="participant2">
            <img src="${this.#participant2.image}" alt="">
            <span>
            <p class="name">${this.#participant2.name ?? "Anonym spelare"}</p>
            <p>Styrka: ${this.#participant2.skillLevel ?? "okänd"}</p>
            <p>"${this.#participant2.catchphrase ?? "???"}"</p>
            </span>
        </span>`;

        this.matchBlock = matchElm;
        return matchElm;
    }

    compete() { //metod för att avgöra vinnaren
        const skill1 = this.#participant1.skillLevel ?? 4;
        const skill2 = this.#participant2.skillLevel ?? 4; //läs ut skillevel från deltagarna
        const chance1 = skill1 / (skill1 + skill2); //omvandla till sannolikhet
        //slumpen avgör
        Math.random() < chance1 ? this.#winner = this.#participant1 : this.#winner = this.#participant2; //vinnaren är den som har högst sannolikhet
        this.isPlayed = true; //matchen är spelad
    }

    markLoser() {
        let loserBlock;
        if (this.#participant1 == this.#winner) { // spelaren som inte är Winner
            loserBlock = this.matchBlock.querySelector(".participant2"); // hitta deltagarblocket med förloraren
        }
        else { // participant 1 eller 2
            loserBlock = this.matchBlock.querySelector(".participant1"); // hitta deltagarblocket med förloraren
        }
        loserBlock.classList.add("loser"); // lägg till klassen .loser
    }
}