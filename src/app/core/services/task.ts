import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = [
    { id: 1, title: 'préparer un cours Angular'},
    { id: 2, title: 'relire le module RxJS' },
    { id: 3, title: 'Corriger les TPs'}
  ];

  private lastId = 3;
  
  private taskSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.taskSubject.asObservable();

  addTask(title: string) {
    const newTask = { id: ++this.lastId, title };
    this.tasks = [...this.tasks, newTask];
    this.taskSubject.next(this.tasks);
  }
  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== this.lastId);
    this.lastId--;
    this.taskSubject.next(this.tasks);
  }
}
