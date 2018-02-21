import { Dashboardv2Page } from './app.po';

describe('dashboardv2 App', () => {
  let page: Dashboardv2Page;

  beforeEach(() => {
    page = new Dashboardv2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
