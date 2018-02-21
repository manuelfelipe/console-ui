import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SitespeedCronjobsComponent } from './sitespeed-cronjobs.component';

describe('SitespeedCronjobsComponent', () => {
  let component: SitespeedCronjobsComponent;
  let fixture: ComponentFixture<SitespeedCronjobsComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(SitespeedCronjobsComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [SitespeedCronjobsComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitespeedCronjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
