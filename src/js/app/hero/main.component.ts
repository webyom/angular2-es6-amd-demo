import {Component} from 'angular2/core';
import StyleComponent from '../style.component';

@Component({
  templateUrl: 'js/app/hero/main.html',
  directives: [StyleComponent]
})
export default class HeroListComponent {
  styleText = require('./main.less').render();
}