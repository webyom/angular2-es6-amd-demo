var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var StyleComponent = (function () {
    function StyleComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    StyleComponent.prototype.ngOnInit = function () {
        console.log(this.styleText);
        var dom = this.renderer.getNativeElementSync(this.el);
        dom.innerHTML = [
            '<style type="text/css">',
            this.styleText,
            '</style>'
        ].join('');
    };
    __decorate([
        core_1.Input('style-text'), 
        __metadata('design:type', Object)
    ], StyleComponent.prototype, "styleText", void 0);
    StyleComponent = __decorate([
        core_1.Component({
            selector: 'component-style',
            template: ''
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], StyleComponent);
    return StyleComponent;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StyleComponent;
