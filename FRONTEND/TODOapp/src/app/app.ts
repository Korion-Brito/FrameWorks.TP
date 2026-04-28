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

  arrayDeTarefas: Tarefa[] = [];
  apiURL: string = 'https://apitarefaskorion256225.onrender.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.READ_tarefas();
  }
   READ_tarefas() {
  console.log("CHAMOU GET");

  this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`)
    .subscribe((resultado) => {
      console.log("RETORNO:", resultado);
      this.arrayDeTarefas = resultado;
    });
}

  CREATE_tarefa(descricaoNovaTarefa: string) {
    if (!descricaoNovaTarefa.trim()) return;

    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);

    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(() => {
      this.READ_tarefas();
    });
  }

 

  DELETE_tarefas(tarefaAserRemovida: Tarefa) {
    const id = tarefaAserRemovida._id;

    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(() => {
      this.READ_tarefas();
    });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const id = tarefaAserModificada._id;

    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada).subscribe(() => {
      this.READ_tarefas();
    });
  }
}