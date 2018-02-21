import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UptimeInfraComponent } from './uptime-infra.component';

xdescribe('UptimeInfraComponent', () => {
  let component: UptimeInfraComponent;
  let fixture: ComponentFixture<UptimeInfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UptimeInfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UptimeInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
