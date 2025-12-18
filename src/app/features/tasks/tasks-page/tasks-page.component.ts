import { Component, EnvironmentInjector, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../../../core/services/task';
import { TaskHighlightComponent } from '../task-highlight/task-highlight.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [AsyncPipe, TaskHighlightComponent],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent {
  taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  envInjector = inject(EnvironmentInjector);

  @ViewChild('highlightContainer', { read: ViewContainerRef }) highlightContainer!: ViewContainerRef;

  addTaskFromInput(taskInput: HTMLInputElement) {
    const title = taskInput.value.trim();
    if (!title) {
      return;
    }
    this.taskService.addTask(title);
    taskInput.value = '';
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  highlightTask(title: string) {
    if (!this.highlightContainer) {
      return;
    }
    this.highlightContainer.clear();
    const componentRef = this.highlightContainer.createComponent(TaskHighlightComponent, {
      environmentInjector: this.envInjector
    });
    componentRef.instance.title = title;
  }

  count = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
      console.log(this.count / 2 + ' secondes ecoulees');
    }, 500);
  }

  ngOnDestroy() {
    console.log('TasksPageComponent destroyed, interval arrete');
    clearInterval(this.intervalId);
  }
}
