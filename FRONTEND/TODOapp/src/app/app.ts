import { Component, OnInit, signal } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  apiURL: string = 'https://apitarefaskorion256225.onrender.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    if (!descricaoNovaTarefa.trim()) return;

    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);

    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa)
      .subscribe(() => {
        this.READ_tarefas();
      });
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`)
      .subscribe((resultado) => {
        this.arrayDeTarefas.set(resultado);
      });
  }

  DELETE_tarefas(tarefaAserRemovida: Tarefa) {
    const id = tarefaAserRemovida._id;

    this.http.delete(`${this.apiURL}/api/delete/${id}`)
      .subscribe(() => {
        this.READ_tarefas();
      });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const id = tarefaAserModificada._id;

    this.http.patch(`${this.apiURL}/api/update/${id}`, tarefaAserModificada)
      .subscribe(() => {
        this.READ_tarefas();
      });
  }
}