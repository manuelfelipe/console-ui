import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllActivityComponent } from './all-activity.component';

describe('AllActivityComponent', () => {
  let component: AllActivityComponent;
  let fixture: ComponentFixture<AllActivityComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(AllActivityComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [AllActivityComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
