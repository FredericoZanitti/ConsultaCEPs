import "./Radios.css";

export default function EscolherTipoPesquisa({ onChangeTipo }) {
  function handleChange(event) {
    onChangeTipo(event.target.value);
  }

  return (
    <div className="escolher-tipo">
      <label htmlFor="pesquisa-por-cep" className="input-label">
        Pesquisar
      </label>
      <input
        type="radio"
        className="input-radio"
        name="tipo"
        id="pesquisa-por-cep"
        value="c"
        onChange={handleChange}
      />
      <label htmlFor="pesquisa-por-cep" className="input-label">
        <div className="radio-btn"></div>
        <span className="item-radio">Por CEP</span>
      </label>
      <input
        type="radio"
        className="input-radio"
        name="tipo"
        id="pesquisa-por-endereco"
        value="e"
        onChange={handleChange}
      />
      <label htmlFor="pesquisa-por-endereco" className="input-label">
        <div className="radio-btn"></div>
        <span className="item-radio">Por Endereço</span>
      </label>
    </div>
  );
}
