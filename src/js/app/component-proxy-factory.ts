declare var require;

import {Component, DynamicComponentLoader, ElementRef} from 'angular2/core';

export default function componentProxyFactory(provider) {
  @Component({
    selector: 'component-proxy',
    template: '<div #content></div>'
  })
  class VirtualComponent {
    constructor(private loader: DynamicComponentLoader, private el: ElementRef) {
      require([provider.path], function (module) {
        var RealComponent = module.__esModule && module.default;
        if (!RealComponent) {
          if (typeof provider.provide == 'string') {
            RealComponent = module[provider.provide];
          } else {
            RealComponent = provider.provide(module);
          }
        }
        loader.loadIntoLocation(RealComponent, el, 'content');
      });
    }
  }
  return VirtualComponent;
}
