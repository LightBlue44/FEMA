import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

@Controller()
export class TarefaController {
  tarefaLista = [];

  @Get("/tarefa")
  listaTarefa() {
    return this.tarefaLista;
  }

  @Put("/tarefa")
  salvarTarefa(@Body() tarefa) {
    let index = this.tarefaLista.findIndex(t => t.codigo == tarefa.codigo);
    if (index >= 0){
      this.tarefaLista[index].descricao = tarefa.descricao;
    } else {
      this.tarefaLista.push(tarefa);
    }
    return "ok";
  }

  @Get("/tarefa/:codigo")
  buscarPorCodigo(@Param() parametro) {
    console.log(parametro.codigo);
    let tarefa = this.tarefaLista.find(tarefa => tarefa.codigo == parametro.codigo);
    return tarefa;
  }

  @Delete("/tarefa/:codigo")
  excluirTarefa(@Param() parametro){
    let index = this.tarefaLista.findIndex(tarefa => tarefa.codigo == parametro.codigo);
    this.tarefaLista.splice(index, 1);
    return "ok";
  }
}
