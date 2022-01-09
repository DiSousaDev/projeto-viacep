function State() {
    this.listSection = null;
}

const state = new State();

export function init() {
    state.listSection = document.querySelector("#list-section");
}

export function addCard(endereco) {
    const card = createCard(endereco);
    state.listSection.appendChild(card);
}

function createCard(endereco) {

    const div = document.createElement("div");
    div.classList.add("card-list-item");

    const h3 = document.createElement("h3");
    h3.innerHTML = endereco.cidade;

    const line = document.createElement("p");
    line.classList.add("end-rua");
    line.innerHTML = `${endereco.logradouro}, ${endereco.numero}`;

    const cep = document.createElement("p");
    cep.classList.add("end-cep");
    cep.innerHTML = endereco.cep;

    div.appendChild(h3);
    div.appendChild(line);
    div.appendChild(cep);

    return div;

}