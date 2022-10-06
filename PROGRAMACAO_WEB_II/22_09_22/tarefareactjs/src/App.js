import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [id,setId] = useState('')
  const [descricao,setDescricao] = useState('')
  const [listaTarefa,setListaTarefa] = useState([])

  // Quando inicia a pagina chama os dados do servidor
  useEffect(() => {
    buscar()
  }, [])

  // Retorna os dados do servidor
  function buscar(){
    axios.get('http://localhost:3100/tarefa').then(resultado => {
    console.log(resultado.data)
    setListaTarefa(resultado.data)
  })
  }

  // Identifica o id e chama o back para excluir
  function excluirTarefa(id) {
    let item = listaTarefa.find(n => n.codigo === id)
    axios.delete(`http://localhost:3100/tarefa/${item.codigo}`).then(() => {
      buscar()
    })
  }

  // Coloca os dados do id e descrição nos inputs para editar
  function editarTarefa(id) {
    let item = listaTarefa.find(n => n.codigo === id)
    setId(item.codigo)
    setDescricao(item.descricao)
    document.querySelector('#descricao').focus()
  }

  // Salva um novo usuário no Backend
  function salvar(event) {
    event.preventDefault();
    
    let tarefa = {
      codigo:id,
      descricao:descricao
    }

    // Manda os dados
    axios.put('http://localhost:3100/tarefa',tarefa).then(()=>{
      buscar()
    })
    setId('')
    setDescricao('')

    console.log("tarefa", tarefa)
  }
    
  
  return (
    <div className='container'>

      <form onSubmit={(event) => salvar(event)}>

      <div className='mb-3'>
        
        <label className='form-label'> Id</label>
        <input 
        id='id'
        type="number" 
        className='form-control' 
        value={id} 
        onChange={(event)=>setId(event.target.value)}
        />
      
      </div>
        <div className='mb-3'>
      
          <label className='form-label'> Descrição da Tarefa</label>
          <input 
          id='descricao'
          type="text" 
          className='form-control' 
          value={descricao} 
          onChange={(event)=>setDescricao(event.target.value)}
          />
        
        </div>
        <button type='submit' className='btn btn-primary'>Salvar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
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
                  <button type="button" className='btn btn-info' onClick={() => editarTarefa(n.codigo)}>Editar</button>
                  <button type="button" className='btn btn-danger' onClick={() => excluirTarefa(n.codigo)}>Excluir</button>
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