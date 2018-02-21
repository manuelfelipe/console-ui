import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyzeComponent } from './analyze.component';

describe('AnalyzeComponent', () => {
  let component: AnalyzeComponent;
  let fixture: ComponentFixture<AnalyzeComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(AnalyzeComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [AnalyzeComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
