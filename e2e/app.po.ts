import { browser, element, by } from 'protractor';

export class Ang2Page {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }
}
