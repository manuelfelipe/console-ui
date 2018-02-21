import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UptimeComponent } from './uptime.component';

xdescribe('UptimeComponent', () => {
  let component: UptimeComponent;
  let fixture: ComponentFixture<UptimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UptimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UptimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
