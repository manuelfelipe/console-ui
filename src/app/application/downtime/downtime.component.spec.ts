import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DowntimeComponent } from './downtime.component';

xdescribe('DowntimeComponent', () => {
  let component: DowntimeComponent;
  let fixture: ComponentFixture<DowntimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowntimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
