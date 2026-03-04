export class Match { //klass för en match
    #participant1; //privat fält för 2 deltagare
    #participant2;
    #winner; //privat fält för vinnare
    // loser; //förloraren, för att kunna markera den i html, kanske inte behövs? Kanske kan kolla i renderMatch istället vem som är förlorare och ge den klassen .loser där? kan man göra ngt med html här?
    isPlayed = false; //om matchen är spelad

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
        return this.isPlayed; //isPlayed ska vara med, men osäker än hur jag ska använda
    }

    renderMatch() { //rendera matchen på sidan
        const matchElm = document.createElement("section");
        matchElm.classList.add("match");
        matchElm.innerHTML = `
        <span class="participant">
        <img src="${this.#participant1.image}" alt="">
        <span>
        <p class="name">${this.#participant1.name ?? "Anonym spelare"}</p>
        <p>Skill Level: ${this.#participant1.skillLevel ?? "okänd"}</p>
        <p>"${this.#participant1.catchphrase ?? "???"}"</p>
        </span>
        </span>
        <p>VS.</p>
        <span class="participant">
        <img src="${this.#participant2.image}" alt="">
        <span>
        <p class="name">${this.#participant2.name ?? "Anonym spelare"}</p>
        <p>Skill Level: ${this.#participant2.skillLevel ?? "okänd"}</p>
        <p>"${this.#participant2.catchphrase ?? "???"}"</p>
        </span>
        </span>`;

        return matchElm;
    }

    compete() { //metod för att avgöra vinnaren
        const skill1 = this.#participant1.skillLevel ?? 4;
        const skill2 = this.#participant2.skillLevel ?? 4; //läs ut skillevel från deltagarna
        const chance1 = skill1 / (skill1 + skill2);//omvandla till sannolikhet
        //slumpen avgör
        Math.random() < chance1 ? this.#winner = this.#participant1 : this.#winner = this.#participant2; //vinnaren är den som har högst sannolikhet
        this.isPlayed = true; //matchen är spelad
    }
}


//----------------------------------------------------------
// Getters för att läsa deltagarna, vinnaren, och om matchen är spelad (isPlayed).

// Tips: Det kan vara en bra idé att i klassen hålla redan på elementet som representerar matchen i DOM:en, så att du enkelt kan uppdatera det när matchen spelats. All logik som har med matchens tillstånd att göra bör finnas i klassen.

// När en match är spelad, ska det tydligt markeras i gränssnittet vilken av deltagarna som vann. Förloraren kan tonas ned eller markeras på något sätt.