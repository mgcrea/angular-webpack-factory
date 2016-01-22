import template from './counter.html';

export default class CounterComponent {

  static $name = 'counter';
  static $inject = ['$http'];
  static controller = CounterComponent;
  static template = template;
  static restrict = 'E';

  constructor($http) {
    console.warn('$http', $http);
  }

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

angular.module(CounterComponent.name, [])
  .component(CounterComponent.$name, CounterComponent);
