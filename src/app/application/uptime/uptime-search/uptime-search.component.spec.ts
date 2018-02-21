import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UptimeSearchComponent } from './uptime-search.component';

xdescribe('UptimeSearchComponent', () => {
  let component: UptimeSearchComponent;
  let fixture: ComponentFixture<UptimeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UptimeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UptimeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
