import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import Angular2Demo from './angular-2-demo';

@Component({
  selector: 'main'
})

@View({
  directives: [Angular2Demo],
  template: `
    <angular-2-demo></angular-2-demo>
  `
})

export class Main {

}

bootstrap(Main);