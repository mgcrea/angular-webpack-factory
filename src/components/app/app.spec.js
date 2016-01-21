/* eslint-env node, mocha */
/* global expect:false */

import AppComponent from './app.js';

describe('AppComponent', () => {
  describe('#class', () => {
    it('should properly expose a template', () => {
      expect(AppComponent.template).to.be.a('string');
    });
  });
});
