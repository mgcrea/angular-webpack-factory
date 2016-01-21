import template from './app.html';
import CounterComponent from './../counter/counter';

class Component {
  static controller = Component;
  constructor() {
    console.warn('in');
  }
}

export default class AppComponent extends Component {

  static $name = 'app';
  static controller = AppComponent;
  static template = template;
  static restrict = 'E';

  static $config($locationProvider) {
    $locationProvider.html5Mode(true);
  }

}

angular.module(AppComponent.name, [CounterComponent.name])
  .config(AppComponent.$config)
  .component(AppComponent.$name, AppComponent);
