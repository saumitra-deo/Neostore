import { NeostoreAdminPage } from './app.po';

describe('neostore-admin App', () => {
  let page: NeostoreAdminPage;

  beforeEach(() => {
    page = new NeostoreAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
