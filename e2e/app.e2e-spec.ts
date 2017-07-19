import { Quickstart2Page } from './app.po';

describe('quickstart2 App', () => {
  let page: Quickstart2Page;

  beforeEach(() => {
    page = new Quickstart2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
