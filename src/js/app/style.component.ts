import {Component, Input, Renderer, ElementRef} from 'angular2/core';

@Component({
  selector: 'component-style',
  template: ''
})
export default class StyleComponent {
  @Input() styleText;

  constructor(private el: ElementRef, private renderer: Renderer) {
  }
  ngOnInit() {
    var dom = this.renderer.getNativeElementSync(this.el);
    dom.innerHTML = [
      '<style type="text/css">',
      this.styleText,
      '</style>'
    ].join('');
  }
}
