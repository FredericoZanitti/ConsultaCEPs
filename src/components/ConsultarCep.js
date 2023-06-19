import { buscarCep } from "../api/buscarcep";
import { useEffect, useState } from "react";
import EscolherTipoPesquisa from "./EscolherTipoPesquisa";
import EscolherUF from "./EscolherUF";
import { FaCopy } from "react-icons/fa";

export default function ConsultarCep() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState([]);
  const [tipoPesquisa, setTipoPesquisa] = useState("e");

  let uf;
  let cidade;
  let rua;

  useEffect(() => {
    let inputs = document.getElementById("logradouro");

    inputs.addEventListener("input", function () {
      let texto = inputs.value; // Obtém o valor do input
      let textoMaiusculo = texto.toUpperCase(); // Converte o texto em letras maiúsculas
      inputs.value = textoMaiusculo; // Atualiza o valor do input com o texto em letras maiúsculas
    });
  }, [rua]);

  // Função para lidar com a busca do endereço
  const buscarEndereco = () => {
    let cepAPesquisar = "";
    let erro = "";

    if (tipoPesquisa === "c") {
      cepAPesquisar = cep;
      if (cep === "") erro = "Necessário informar o CEP";
    } else {
      let selectUf = document.getElementById("combobox-ufs");
      uf = selectUf.value;
      let selectCidade = document.getElementById("combobox-municipios");
      cidade = selectCidade.value;

      rua = document.getElementById("logradouro");

      if (uf === "selecionar") erro = "Necessário informar a UF";
      else if (cidade === "selecionar")
        erro = "Necessário informar a localidade";
      else if (rua.value === "")
        erro = "Necessário informar a rua, avenida, etc.";

      if (erro === "")
        cepAPesquisar = `${uf}/${cidade}/${rua.value.replace(/ /g, "+")}`;
    }

    if (cepAPesquisar !== "") {
      buscarCep(cepAPesquisar)
        .then((response) => {
          setEndereco(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else alert(erro);
  };

  // Função para atualizar o valor do CEP no estado
  const handleChangeCep = (event) => {
    setCep(event.target.value);
  };

  function onChangeTipoPesquisa(value) {
    setTipoPesquisa(value);
    limparInputs();
  }

  function limparInputs() {
    document.getElementById("logradouro").value = "";
    setCep("");
  }

  return (
    <div className="conteudo-completo">
      <div className="container-filtros">
        <EscolherTipoPesquisa onChangeTipo={onChangeTipoPesquisa} />
        <div
          className={
            tipoPesquisa === "e"
              ? "formulario-pesquisa"
              : "formulario-pesquisa formulario-pesquisa-somente-cep"
          }
        >
          <label
            htmlFor="ceppesquisado"
            className={tipoPesquisa === "c" ? "campo" : "campo visibilidade"}
          >
            CEP
          </label>
          <input
            type="text"
            value={cep}
            maxLength={9}
            id="ceppesquisado"
            onChange={handleChangeCep}
            className={
              tipoPesquisa === "c"
                ? "input-form-9"
                : "input-form-9 visibilidade"
            }
          />
          <label
            htmlFor="logradouro"
            className={tipoPesquisa === "e" ? "campo" : "campo visibilidade"}
          >
            Logradouro
          </label>
          <input
            type="text"
            id="logradouro"
            value={rua}
            maxLength={50}
            className={
              tipoPesquisa === "e"
                ? "input-form-acima2"
                : "input-form-acima2 visibilidade"
            }
          />
          <span className={tipoPesquisa === "e" ? "" : "visibilidade"}>
            <EscolherUF />
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          buscarEndereco();
        }}
      >
        Buscar
      </button>
      <hr />
      {endereco && (
        <div className="resultados-gerais">
          {Array.isArray(endereco) ? (
            endereco.map((item) => {
              return (
                <div key={item.cep} className="info-result-enderecos btn-card">
                  <p className="cep-resultado">
                    <span className="campo-resposta">CEP:</span>
                    {item.cep}
                  </p>
                  <p>
                    <span className="campo-resposta">Logradouro:</span>
                    {item.logradouro}
                  </p>
                  <p>
                    <span className="campo-resposta">Bairro:</span>
                    {item.bairro}
                  </p>
                  {item.complemento && (
                    <p>
                      <span className="campo-resposta">Complemento:</span>
                      {item.complemento}
                    </p>
                  )}
                  <p>
                    <span className="campo-resposta">Cidade:</span>
                    {item.localidade}
                  </p>
                  <p>
                    <span className="campo-resposta">Estado:</span>
                    {item.uf}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="info-result-enderecos btn-card">
              {endereco.cep && (
                <p className="cep-resultado">
                  <span className="campo-resposta">CEP:</span>
                  {endereco.cep}
                </p>
              )}
              {endereco.logradouro && (
                <p>
                  <span className="campo-resposta">Logradouro:</span>
                  {endereco.logradouro}
                </p>
              )}
              {endereco.bairro && (
                <p>
                  <span className="campo-resposta">Bairro:</span>
                  {endereco.bairro}
                </p>
              )}
              {endereco.complemento && (
                <p>
                  <span className="campo-resposta">Complemento:</span>
                  {endereco.complemento}
                </p>
              )}
              {endereco.localidade && (
                <p>
                  <span className="campo-resposta">Cidade:</span>
                  {endereco.localidade}
                </p>
              )}
              {endereco.uf && (
                <p>
                  <span className="campo-resposta">Estado:</span>
                  {endereco.uf}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
