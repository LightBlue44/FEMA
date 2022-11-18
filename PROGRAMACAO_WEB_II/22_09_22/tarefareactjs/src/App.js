import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [codigo,setCodigo] = useState()
  const [descricao,setDescricao] = useState('')
  const [listaTarefa,setListaTarefa] = useState([])

  useEffect(() => {
    buscar()
  }, [])

  function buscar(){
    axios.get('http://localhost:3100/tarefa').then(resultado => {
    console.log(resultado.data)
    setListaTarefa(resultado.data)
  })
  }

  function excluirTarefa(tarefa) {
    axios.delete(`http://localhost:3100/tarefa/${tarefa.codigo}`).then(() => {
      buscar()
    })
  }

  function editarTarefa(tarefa) {
    axios.get(`http://localhost:3100/tarefa/${tarefa.codigo}`).then((result) => {
      setCodigo(result.data.codigo);
      setDescricao(result.data.descricao);
    });
  }
  function salvar(event) {
    event.preventDefault();
    
    let tarefa = {
      codigo: codigo,
      descricao: descricao
    }

    // Manda os dados
    axios.put('http://localhost:3100/tarefa',tarefa).then(()=>{
      buscar()
    })
    setCodigo('')
    setDescricao('')

    console.log("tarefa", tarefa)
  }
  
    
  
  return (
    <div className='container'>

      <form onSubmit={(event) => salvar(event)}>

      <div className='mb-3'>
        
        <label className='form-label'>Código (Não altere!)</label>
        <input 
        codigo='codigo'
        type="number" 
        className='form-control' 
        value={codigo} 
        onChange={(event)=>setCodigo(event.target.value)}
        />
      
      </div>
        <div className='mb-3'>
      
          <label className='form-label'> Descrição da Tarefa</label>
          <input 
          codigo='descricao'
          type="text" 
          className='form-control' 
          value={descricao} 
          onChange={(event)=>setDescricao(event.target.value)}
          />
        
        </div>
        <button type='submit' className='btn btn-outline-primary'>Salvar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            listaTarefa.map((n,index) =>(
              <tr key={index}>
                <td>{n.codigo}</td>
                <td>{n.descricao}</td>
                <td>
                  <button type="button" className='btn btn-outline-secondary' onClick={() => editarTarefa(n.codigo)}>Editar</button>
                  <button type="button" className='btn btn-outline-danger' onClick={() => excluirTarefa(n.codigo)}>Excluir</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;