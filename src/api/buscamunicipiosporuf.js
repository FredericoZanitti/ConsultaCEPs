import axios from "axios";

export function buscarMunicipioPorUf(uf) {
  let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
  return axios.get(url);
}
