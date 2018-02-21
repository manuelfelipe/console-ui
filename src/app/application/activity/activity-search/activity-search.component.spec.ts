import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivitySearchComponent } from './activity-search.component';
import Spy = jasmine.Spy;

describe('ActivitySearchComponent', () => {
  let component: ActivitySearchComponent;
  let fixture: ComponentFixture<ActivitySearchComponent>;

  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ActivitySearchComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ActivitySearchComponent],
        providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySearchComponent);

    component = fixture.componentInstance;
    emitSpy = spyOn(component.search, 'emit');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set `isNamespaceDisabled to true if namespace provided', () => {
      component.namespace = 'console-server';
      component.ngOnInit();

      expect(component['isNamespaceDisabled']).toBe(true);
    });

    it('should init form with initial namespace value', () => {
      component.namespace = 'console-server';
      component.ngOnInit();

      expect(component.formGroup.value.namespace).toBe('console-server');
      expect(component.formGroup.value.user).toBeNull();
      expect(component.formGroup.value.since).toBeNull();
      expect(component.formGroup.value.to).toBeNull();
    });
  });

  describe('onSearch', () => {
    it('should emit with default namespace if any', () => {
      component.namespace = 'console-server';
      component.ngOnInit();

      // manually patch form's namespace's value
      component.formGroup.patchValue({ namespace: 'cloudevents' });
      component.onSearch();

      expect(emitSpy).toHaveBeenCalledWith({
        namespace: 'console-server',
        user: null,
        since: '',
        to: '',
      });
    });

    it('should emit with patched namespace if none', () => {
      component.namespace = null;
      component.ngOnInit();

      component.formGroup.patchValue({ namespace: 'cloudevents' });
      component.onSearch();

      expect(emitSpy).toHaveBeenCalledWith({
        namespace: 'cloudevents',
        user: null,
        since: '',
        to: '',
      });
    });

    it('should emit with formatted `since` and `to`', () => {
      component.namespace = 'console-server';
      component.ngOnInit();

      component.formGroup.patchValue({ since: {
        year: 2017,
        month: 4,
        day: 12,
      }});

      component.formGroup.patchValue({ to: {
        year: 2017,
        month: 6,
        day: 27,
      }});

      component.formGroup.patchValue({ user: 'mmassou1' });

      component.onSearch();

      expect(emitSpy).toHaveBeenCalledWith({
        namespace: 'console-server',
        user: 'mmassou1',
        since: '2017-4-12',
        to: '2017-6-27',
      });
    });
  });
});
