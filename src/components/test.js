import template from './test.html';

export default class TestComponent {

  static $name = 'test';
  static controller = TestComponent;
  static template = template;
  static restrict = 'E';

  count = 3;
  onClick(ev) {
    switch (ev.target.textContent) {
      case '+':
        this.count++;
        break;
      case '-':
        this.count--;
        break;
      default:
    }
  }

}

angular.module(TestComponent.name, [])
  .component(TestComponent.$name, TestComponent);
