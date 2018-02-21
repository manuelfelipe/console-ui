import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DowntimeSearchComponent } from './downtime-search.component';

xdescribe('DowntimeSearchComponent', () => {
  let component: DowntimeSearchComponent;
  let fixture: ComponentFixture<DowntimeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowntimeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowntimeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
