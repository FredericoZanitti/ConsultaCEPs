import axios from "axios";

export function buscarCep(cep) {
  let url = `https://viacep.com.br/ws/${cep}/json/`;
  return axios.get(url);
}
