import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHighlightComponent } from './task-highlight.component';

describe('TaskHighlightComponent', () => {
  let component: TaskHighlightComponent;
  let fixture: ComponentFixture<TaskHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlightComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskHighlightComponent);
    component = fixture.componentInstance;
    component.title = 'Tache test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render provided title', () => {
    const textContent = fixture.nativeElement.querySelector('p')?.textContent?.trim();
    expect(textContent).toBe('Tache test');
  });
});
