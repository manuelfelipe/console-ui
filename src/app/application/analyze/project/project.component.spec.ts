import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ProjectComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ProjectComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
