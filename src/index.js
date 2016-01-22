// import App from './containers/App';

import angular from 'angular';
import AppComponent from './containers/app/app';
import './styles/styles.less';
// import 'file?name=index.html!./index.html';
// import 'bootstrap/dist/css/bootstrap.css';

document.addEventListener('DOMContentLoaded', () => {
  angular.bootstrap(document, [AppComponent.name]);
});
