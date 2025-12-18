// tasks-page.ts

import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskHighlight } from '../task-highlight/task-highlight.component';

@Component({ ... })
export class TasksPageComponent {
  @ViewChild('highlightContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  highlight(task: Task) {
    // Efface le contenu précédent
    this.container.clear();
    
    // Crée le composant TaskHighlight
    const ref = this.container.createComponent(TaskHighlight);
    
    // Passe les données au composant
    ref.instance.title = task.title;
  }
}