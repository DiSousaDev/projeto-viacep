import Endereco from '../models/endereco.js';
import * as requestService from '../services/request-service.js';


export async function buscarPorCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const result = await requestService.getJson(url);

    return new Endereco(result.cep, result.logradouro, null, result.localidade);
    
}

export function getErrors(endereco) {
    const errors = {};

    if (!endereco.cep || endereco.cep == "") {
        errors.cep = "*Campo requerido.";
    }

    if (!endereco.numero || endereco.numero == "") {
        errors.numero = "*Campo requerido.";
    }
    return errors;
}