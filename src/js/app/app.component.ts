import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import CrisisComponent from './crisis/crisis.component';
import componentProxyFactory from './component-proxy-factory';

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
    path: '/hero',
    name: 'Hero',
    component: componentProxyFactory({path: 'app/hero/main.component'})
  }
])
export default class AppComponent {
}
