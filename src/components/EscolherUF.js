import "./Seletores.css";
import { useEffect, useState } from "react";
import { listaUfs } from "../api/listaufs";
import { buscarMunicipioPorUf } from "../api/buscamunicipiosporuf";

export default function EscolherUF() {
  const [uf, setUf] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    listarUfs();
  }, []);

  const listarUfs = () => {
    listaUfs()
      .then((resp) => {
        const sortedData = resp.data.sort((a, b) => {
          return a.sigla.localeCompare(b.sigla);
        });

        setUf(sortedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obterCidades = (uf) => {
    buscarMunicipioPorUf(uf)
      .then((resp) => {
        const sortedData = resp.data.sort((a, b) => {
          return a.nome.localeCompare(b.nome);
        });

        setCidades(sortedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelecionarUF = (event) => {
    const ufSelecionada = event.target.value;
    obterCidades(ufSelecionada); // Chame a função para obter as cidades correspondentes à UF selecionada
  };

  return (
    <div>
      <div className="seletor-uf">
        <label htmlFor="combobox-ufs" className="label-comboboxes">
          Selecionar UF
        </label>
        <select
          name="ufs"
          className="combobox-filtros"
          id="combobox-ufs"
          onChange={handleSelecionarUF}
        >
          <option value="selecionar">Selecionar</option>
          {uf.map((item) => {
            return (
              <option key={item.id} value={item.sigla}>
                {item.sigla}
              </option>
            );
          })}
        </select>
      </div>
      <div className="seletor-municipio">
        <label htmlFor="combobox-municipios" className="label-comboboxes">
          Selecionar Municípios
        </label>
        <select
          name="municipios"
          className="combobox-filtros-cidades"
          id="combobox-municipios"
        >
          <option value="selecionar">Selecionar</option>
          {cidades.map((item) => {
            return (
              <option key={item.id} value={item.nome}>
                {item.nome}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
