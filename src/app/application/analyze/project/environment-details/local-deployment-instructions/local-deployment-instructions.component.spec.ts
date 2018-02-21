import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalDeploymentInstructionsComponent } from './local-deployment-instructions.component';

describe('LocalDeploymentInstructionsComponent', () => {
  let component: LocalDeploymentInstructionsComponent;
  let fixture: ComponentFixture<LocalDeploymentInstructionsComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(LocalDeploymentInstructionsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [LocalDeploymentInstructionsComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeploymentInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
