import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SitespeedCronjobReportsListComponent } from './sitespeed-cronjob-reports-list.component';

describe('SitespeedCronjobReportsListComponent', () => {
  let component: SitespeedCronjobReportsListComponent;
  let fixture: ComponentFixture<SitespeedCronjobReportsListComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(SitespeedCronjobReportsListComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [SitespeedCronjobReportsListComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitespeedCronjobReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
