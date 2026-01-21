import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  standalone: true,
  template: `
    <div class="task-highlight">
      <h3>Tache mise en avant</h3>
      <p>{{ title }}</p>
    </div>
  `,
  styleUrls: ['./task-highlight.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHighlightComponent {
  @Input() title = '';
}
