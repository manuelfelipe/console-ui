import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NamespaceLogsSearchComponent } from './namespace-logs-search.component';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../../../testing/mocks/activated-route.mock';
import Spy = jasmine.Spy;

describe('NamespaceLogsSearchComponent', () => {
  let component: NamespaceLogsSearchComponent;
  let fixture: ComponentFixture<NamespaceLogsSearchComponent>;

  let route: ActivatedRoute;
  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceLogsSearchComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceLogsSearchComponent],
        providers: [
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          FormBuilder,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    route.params = Observable.of({
      namespace: 'console-server',
    });

    route.queryParams = Observable.of({
      q: 'status 500',
      since: '1512536281999',
      to: '1512536282999'
    });

    fixture = TestBed.createComponent(NamespaceLogsSearchComponent);

    component = fixture.componentInstance;
    emitSpy = spyOn(component.search, 'emit');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init form with initial values from queryParams', () => {
      expect(component.formGroup.value.namespace).toBe('console-server');
      expect(component.formGroup.value.searchText).toBe('status 500');
      expect(component.formGroup.value.sinceDate.getTime()).toBe(1512536281999);
      expect(component.formGroup.value.toDate.getTime()).toBe(1512536282999);
    });
  });

  describe('emitSearch', () => {
    it('should emit with searchText', (done) => {
      // still 0 because it debounces
      expect(emitSpy.calls.count()).toBe(0);

      // after 200ms, it emitted
      setTimeout(() => {
        expect(emitSpy.calls.count()).toBe(1);
        expect(emitSpy).toHaveBeenCalledWith({
          namespace: 'console-server',
          searchText: 'status 500',
          since: 1512536281999,
          to: 1512536282999,
        });

        done();
      }, 200);
    });

    it('should emit with searchText', (done) => {
      // manually patch form's namespace's value
      component.formGroup.patchValue({ searchText: 'status 200' });

      // still 0 because it debounces
      expect(emitSpy.calls.count()).toBe(0);

      // after 200ms, it emitted
      setTimeout(() => {
        // we patched twice, but because of debounce, it emitted once only
        expect(emitSpy.calls.count()).toBe(1);

        expect(emitSpy).toHaveBeenCalledWith({
          namespace: 'console-server',
          searchText: 'status 200',
          since: 1512536281999,
          to: 1512536282999,
        });

        done();
      }, 200);
    });
  });

  describe('onSinceDateSelect', () => {
    it('should do nothing if sinceDate < toDate', () => {
      expect(component.formGroup.value.toDate.getTime()).toBe(1512536282999);

      component.onSinceDateSelect(new Date(1512536281999));
      expect(component.formGroup.value.toDate.getTime()).toBe(1512536282999);
    });

    it('should change toDate to later than sinceDate', () => {
      expect(component.formGroup.value.toDate.getTime()).toBe(1512536282999);

      component.onSinceDateSelect(new Date(1512536283999));
      expect(component.formGroup.value.toDate.getTime()).toBeGreaterThan(1512536283999);
    });
  });

  describe('onToDateSelect', () => {
    it('should do nothing if toDate > sinceDate', () => {
      expect(component.formGroup.value.sinceDate.getTime()).toBe(1512536281999);

      component.onToDateSelect(new Date(1512536283999));
      expect(component.formGroup.value.sinceDate.getTime()).toBe(1512536281999);
    });

    it('should change sinceDate to earlier than toDate', () => {
      expect(component.formGroup.value.sinceDate.getTime()).toBe(1512536281999);

      component.onToDateSelect(new Date(1512536280999));
      expect(component.formGroup.value.sinceDate.getTime()).toBeLessThan(1512536280999);
    });
  });
});
