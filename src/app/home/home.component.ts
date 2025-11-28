import { Component } from '@angular/core';
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
  tasks$!: ReturnType<TaskService['getTasks']>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
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