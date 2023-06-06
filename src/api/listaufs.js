import axios from "axios";

export function listaUfs() {
  let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
  return axios.get(url);
}
