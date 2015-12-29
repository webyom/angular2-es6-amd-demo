import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, componentProxyFactory, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'main',
  templateUrl: 'js/app/main.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/crisis-center',
    name: 'CrisisCenter',
    component: componentProxyFactory({path: 'app/crisis/main'}),
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: componentProxyFactory({path: 'app/hero/main'})
  }
])
export class Main {
}

bootstrap(Main, [ROUTER_PROVIDERS]);