import { useEffect } from "react";
import "./App.css";
import ConsultarCep from "./components/ConsultarCep";

function App() {
  useEffect(() => {
    //marcação default dos combos de pesquisa
    const pesq = document.getElementById("pesquisa-por-endereco");
    pesq.checked = true;
  }, []);

  return (
    <div className="App">
      <ConsultarCep />
    </div>
  );
}

export default App;
