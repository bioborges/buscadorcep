import { FiSearch } from 'react-icons/fi'
import './style.css'
import { useState } from 'react';
import api from './services/api';

function App() {

const [input, setInput] = useState('')
const [cep, setCep] = useState({});

async function handleSearch() {
  if(input === ''){
    alert("Digite algum cep!")
    return;
 }

  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data);
    setInput("");
  }catch{
    alert('Ops erro aqui.')
    setInput ("")
  }
}

  return (
    <div className="container">
        <h1 className="title">Buscar CEP</h1>

        <div className="containerInput">
          <input 
          type="text" 
          placeholder="Digite um cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />

          <button className="btnSearch" onClick={handleSearch}>
              <FiSearch size={24} color="#FFF"/>
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
            <main className='main'>
                <h2>{cep.cep}</h2>
    
                <span>{cep.logradouro}</span>
                <span>{cep.complemento}</span>
                <span>{cep.bairro}</span>
                <span>{cep.localidade}</span>
                <span>{cep.uf}</span>
            </main>
        )}
       

    </div>
  );
}

export default App;
