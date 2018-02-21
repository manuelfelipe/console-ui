import { Component } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  isSidebarOpen = false;

  isSubmenuOpen = false;
  submenuContent: string;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;

    // close submenu if we closed sidebar
    if (!this.isSidebarOpen) {
      this.isSubmenuOpen = false;
    }
  }

  openSubmenu(submenuContent: string): void {
    // open sidebar if it's closed
    if (!this.isSidebarOpen) {
      this.toggleSidebar();
    }

    this.isSubmenuOpen = true;
    this.submenuContent = submenuContent;
  }

  onSubmenuOpenedChange(opened: boolean): void {
    this.isSubmenuOpen = opened;
  }
}
