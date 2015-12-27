import {Component, View} from 'angular2/core';

@Component({
  selector: 'angular-2-demo'
})

@View({
  templateUrl: 'js/app/angular-2-demo.html'
})

export default class Angular2Demo {

  constructor() {
    console.info('Angular2Demo Component Mounted Successfully');
  }

}
