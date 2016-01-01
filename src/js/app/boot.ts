import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import AppComponent from './app.component';
import StyleComponent from './style.component';
import componentProxyFactory from './component-proxy-factory';

export {StyleComponent, componentProxyFactory};

bootstrap(AppComponent, [ROUTER_PROVIDERS]);