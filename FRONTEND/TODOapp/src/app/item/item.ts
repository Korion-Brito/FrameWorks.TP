import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  emEdicao = false;

  @Input() tarefa: Tarefa = new Tarefa('', false);

  @Output() remover = new EventEmitter<Tarefa>();
  @Output() modificaTarefa = new EventEmitter<Tarefa>();

  DELETE_tarefas() {
    this.remover.emit(this.tarefa);
  }

  UPDATE_tarefa() {
    this.modificaTarefa.emit(this.tarefa);
  }
}