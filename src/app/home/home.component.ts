import { Component, inject } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  addTask(title: string) {
    this.taskService.addTask(title);
  }
  removeTask(id: number) {
    this.taskService.removeTask(id);
  }
  count = 0;
  intervalId: any;
  ngOnInit() { 
    this.intervalId = setInterval(() => {
      this.count++;
      console.log(this.count/2 + ' secondes écoulées');
    }, 500);
  }
  ngOnDestroy() {
    console.log('HomeComponent destroyed, interval arrêté');
    clearInterval(this.intervalId);
  }
}