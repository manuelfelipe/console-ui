import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberCardComponent } from './number-card.component';

describe('NumberCardComponent', () => {
  let component: NumberCardComponent;
  let fixture: ComponentFixture<NumberCardComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NumberCardComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NumberCardComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
