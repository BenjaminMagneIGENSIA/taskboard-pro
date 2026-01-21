import { ChangeDetectionStrategy, Component, EnvironmentInjector, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { TaskService } from '../../../core/services/task';
import { TaskHighlightComponent } from '../task-highlight/task-highlight.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, TaskHighlightComponent],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  trackByTaskId(index: number, task: { id: number }) {
    return task.id;
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
}
