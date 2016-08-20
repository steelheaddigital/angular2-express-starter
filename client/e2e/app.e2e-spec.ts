import { ClientPage } from './app.po';

describe('client App', function() {
  let page: ClientPage;

  beforeEach(() => {
    page = new ClientPage();
  });

  it('should display Home Page', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Home Page');
  });
});
