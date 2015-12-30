import {Component} from 'angular2/core';
import {RouteConfig, componentProxyFactory, ROUTER_DIRECTIVES} from 'angular2/router';
import CrisisComponent from './crisis/crisis.component';

@Component({
  selector: 'main',
  templateUrl: 'js/app/app.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/crisis-center',
    name: 'CrisisCenter',
    component: CrisisComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: componentProxyFactory({path: 'app/hero/main.component'})
  }
])
export default class AppComponent {
}
