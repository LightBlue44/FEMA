import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [id,setId] = useState('')
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

  function excluirTarefa(id) {
    let item = listaTarefa.find(n => n.codigo === id)
    axios.delete(`http://localhost:3100/tarefa/${item.codigo}`).then(() => {
      buscar()
    })
  }

  function editarTarefa(id) {
    let item = listaTarefa.find(n => n.codigo === id)
    setId(item.codigo)
    setDescricao(item.descricao)
    document.querySelector('#descricao').focus()
  } if (!id){
    return;
  }

  function salvar(event) {
    event.preventDefault();
    
    if (!descricao && !id){
      return;
    }
    
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
        
        <label className='form-label'> ID</label>
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
        <button type='submit' className='btn btn-outline-primary'>Salvar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
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