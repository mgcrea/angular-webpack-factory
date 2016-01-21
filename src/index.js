// import App from './containers/App';

import angular from 'angular';
import AppComponent from './components/app/app';
import './styles/styles.css';
import 'file?name=index.html!./index.html';
import 'bootstrap/dist/css/bootstrap.css';

document.addEventListener('DOMContentLoaded', () => {
  angular.bootstrap(document, [AppComponent.name]);
});
