import { Body, Controller, Get, Param, Put } from '@nestjs/common';

@Controller()
export class TarefaController {

  tarefaList = [];

  @Get('tarefa')
  listaTarefa() {
    const tarefa1 = {nome: 'tarefa 01'}
    const tarefa2 = {nome: 'tarefa 02'}
    return [tarefa1, tarefa2];
  }

  @Get("/tarefa/:id")
  apenasUmaTarefa( @Param() params){
    console.log ('params', params.id)
    return {nome: 'Tarefa 02'}
  }

  @Put("tarefa")
    receberTarefa(@Body() tarefa){
      console.log('tarefa', tarefa)
      tarefa.id = Math.random().toString(36).substring(2);
      return tarefa;
  }
}
