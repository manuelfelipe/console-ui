import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationComponent } from './application.component';

describe('ApplicationComponent', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ApplicationComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ApplicationComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleSidebar', () => {
    component.toggleSidebar();
  });

  describe('openSubmenu', () => {
    it('should leave sidebar open if opened', () => {
      component.isSidebarOpen = true;
      component.openSubmenu('home');

      expect(component.isSubmenuOpen).toBe(true);
      expect(component.submenuContent).toBe('home');
    });

    it('should open sidebar if closed', () => {
      component.isSidebarOpen = false;
      component.openSubmenu('home');

      expect(component.isSubmenuOpen).toBe(true);
      expect(component.submenuContent).toBe('home');
    });
  });

  describe('onSubmenuOpenedChange', () => {
    it('should set submenu to false', () => {
      component.isSubmenuOpen = true;
      component.onSubmenuOpenedChange(false);

      expect(component.isSubmenuOpen).toBe(false);
    });

    it('should set submenu to true', () => {
      component.isSubmenuOpen = false;
      component.onSubmenuOpenedChange(true);

      expect(component.isSubmenuOpen).toBe(true);
    });

    it('should set submenu to true, even when already true', () => {
      component.isSubmenuOpen = true;
      component.onSubmenuOpenedChange(true);

      expect(component.isSubmenuOpen).toBe(true);
    });
  });
});
