import { Component, signal } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas: Tarefa[] = [];
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://apitarefaskorion256225.onrender.com';
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);

    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe((resultado) => {
      console.log(resultado);
      this.READ_tarefas();
    });
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe((resultado) => {
      this.arrayDeTarefas = resultado;
    });
  }

  DELETE_tarefas(tarefaAserRemovida: Tarefa) {
    const id = tarefaAserRemovida._id;

    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe((resultado) => {
      console.log(resultado);
      this.READ_tarefas();
    });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const id = tarefaAserModificada._id;

    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada).subscribe((resultado) => {
      console.log(resultado);
      this.READ_tarefas();
    });
  }
}