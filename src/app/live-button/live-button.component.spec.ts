import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveButtonComponent } from './live-button.component';
import Spy = jasmine.Spy;

describe('LiveButtonComponent', () => {
  let component: LiveButtonComponent;
  let fixture: ComponentFixture<LiveButtonComponent>;

  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveButtonComponent);
    component = fixture.componentInstance;

    emitSpy = spyOn(component.liveChanged, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should toggle isLive and emit it', () => {
      expect(component.isLive).toBe(false);

      // toggled to true
      component.onClick();
      expect(component.isLive).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(true);

      // toggled to false
      component.onClick();
      expect(component.isLive).toBe(false);
      expect(emitSpy).toHaveBeenCalledWith(false);
    });
  });
});
