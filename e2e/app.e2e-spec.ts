import { Ang2Page } from './app.po';

describe('ang2 App', function() {
  let page: Ang2Page;

  beforeEach(() => {
    page = new Ang2Page();
  });

  it('should have a title saying Ang2', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Ang2');
  });



});
