import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [tabelaTipo, setTabelaTipo] = useState([]);
  const [tabelaMarca, setTabelaMarca] = useState([]);
  const [tabelaModelo, setTabelaModelo] = useState([]);
  const [tabelaAno, setTabelaAno] = useState([])
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("")
  const [isMarca, setIsMarca] = useState(false)
  const [isAno, setIsAno] = useState(false)
  const [isModelo, setIsModelo] = useState(false)
  const [isResult, setIsResult] = useState(false)



  useEffect(() => {
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`)
      .then((res) => res.json())
      .then((data) => {
        setTabelaTipo(data);
        setIsMarca(true);
      })
      .catch((error) => console.error(error));
  }, [tipo]);


  useEffect(() => {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos`
    )
      .then((res) => res.json())
      .then((data) => {
        setTabelaMarca(data.modelos);
        setIsModelo(true);
      })
      .catch((error) => console.error(error));
  }, [marca]);

  useEffect(() => {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos`
    )
      .then((res) => res.json())
      .then((data) => {
        setTabelaModelo(data);
        setIsAno(true);
      })
      .catch((error) => console.error(error));
  }, [modelo]);

  useEffect(() => {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTabelaAno(data);
        setIsResult(true);
        console.log(data)
      })
      .catch((error) => console.error(error));
  }, [ano]);


  return (
    <div className="App">

      <div className="conteiner">
        <h1>TABELA FIPE</h1>

        <h2>Escolha o veículo</h2>
        <select id="Veiculo" onChange={(event) => setTipo(event.target.value)}>

          <option value="selecione" hidden> Selecione o tipo do veículo</option>
          <option value="carros">Carros</option>
          <option value="motos">Motos</option>
          <option value="caminhoes">Caminhões</option>
        </select>


        {isMarca && (

          <select id="Marca" onChange={(event) => setMarca(event.target.value)}>

            <option value="Selecione" hidden> Selecione a marca</option>

            {tabelaTipo.length !== null &&
              tabelaTipo.map((tabelaTipo) => (
                <option key={tabelaTipo.codigo} value={tabelaTipo.codigo}>
                  {tabelaTipo.nome}
                </option>
              ))}
          </select>
        )}

        {isModelo && (

          <select id="Modelo" onChange={(event) => setModelo(event.target.value)}>
            <option value="Selecione" hidden> Selecione o modelo</option>

            {tabelaMarca.length !== null &&
              tabelaMarca.map((tabelaMarca) => (
                <option key={tabelaMarca.codigo} value={tabelaMarca.codigo}>
                  {tabelaMarca.nome}
                </option>
              ))}
          </select>)}

        {isAno && (

          <select id="Ano" onChange={(event) => setAno(event.target.value)}>
            <option value="Selecione" hidden> Selecione o Ano</option>

            {tabelaModelo.length !== null &&
              tabelaModelo.map((tabelaModelo) => (
                <option key={tabelaModelo.codigo} value={tabelaModelo.codigo}>
                  {tabelaModelo.nome}
                </option>
              ))}
          </select>)}


        {isResult && (
          <div className="resultado">
            <ul>
              <li>Marca: {tabelaAno.Marca}</li>
              <li>Modelo: {tabelaAno.Modelo}</li>
              <li>Ano mdelo: {tabelaAno.AnoModelo}</li>
              <li>Valor: {tabelaAno.Valor}</li>   
              <li>Combustivel: {tabelaAno.Combustivel}</li>
              <li>Sigla do Combustivel: {tabelaAno.SiglaCombustivel}</li>
              <li>Codigo Tabela Fipe: {tabelaAno.CodigoFipe}</li>
              <li>Mês Referencia: {tabelaAno.MesReferencia}</li>
            </ul>
          </div>)}
      </div>
      <button class="add-button">Instalar Tabela FIPE</button>
    </div>
  );
}

export default App;