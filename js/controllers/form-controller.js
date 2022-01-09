import Endereco from '../models/endereco.js';
import * as enderecoService from '../services/endereco-service.js';
import * as listController from '../controllers/list-controller.js';

function State() {

    this.endereco = new Endereco();

    this.btnSalvar = null;
    this.btnLimpar = null;

    this.inputCep = null;
    this.inputLogradouro = null;
    this.inputNumero = null;
    this.inputCidade = null;

    this.errorCep = null;
    this.errorNumero = null;
}

const state = new State();

export function init() {

    state.btnSalvar = document.forms.newAdress.btnSalvar; 
    state.btnLimpar = document.forms.newAdress.btnLimpar; 

    state.inputCep = document.forms.newAdress.cep;
    state.inputLogradouro = document.forms.newAdress.logradouro;
    state.inputNumero = document.forms.newAdress.numero;
    state.inputCidade = document.forms.newAdress.cidade;

    state.errorCep = document.querySelector('[data-error="cep"]'); 
    state.errorNumero = document.querySelector('[data-error="numero"]');
    
    state.inputNumero.addEventListener('change', handleImputNumberChange);
    state.inputNumero.addEventListener('keyup', handleInputNumberKeyup);
    state.btnLimpar.addEventListener('click', handleBtnLimparClick);
    state.btnSalvar.addEventListener('click', handleBtnSalvarClick);
    state.inputCep.addEventListener('change', handleInputCepChange);

}

function handleImputNumberChange(event) {
    if(event.target.value == ""){
        setFormError("numero", "*Campo requerido.");
    } else {
        setFormError("numero", "");
    }

}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}

function handleBtnLimparClick(event) {
    event.preventDefault();
    limparFormulario();
}

function limparFormulario() {
    state.inputCep.value = "";
    state.inputLogradouro.value = "";
    state.inputNumero.value = "";
    state.inputCidade.value = "";

    setFormError("cep", "");
    setFormError("numero", "");

    state.endereco = new Endereco();

    state.inputCep.focus();
}

function handleBtnSalvarClick(event) {
    event.preventDefault();

    const errors = enderecoService.getErrors(state.endereco);
    const keys = Object.keys(errors);

    if(keys.length > 0) {
        keys.forEach(key => {
            setFormError(key, errors[key]);
        });
    } else {
        listController.addCard(state.endereco);
        limparFormulario();
    }
}

async function handleInputCepChange(event) {
    const cep = event.target.value;
    
    try {
        const endereco = await enderecoService.buscarPorCep(cep);
        state.inputCidade.value = endereco.cidade;
        state.inputLogradouro.value = endereco.logradouro;
        state.endereco = endereco;

        setFormError("cep", "");
        state.inputNumero.focus();
    } catch (e) {
        state.inputLogradouro.value = "";
        state.inputNumero.value = "";
        state.inputCidade.value = "";
        setFormError("cep", "Informe um CEP válido.");
    }

}

function handleInputNumberKeyup(event){
    state.endereco.numero = event.target.value;
  }