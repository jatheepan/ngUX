"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tkmodal_1 = require('./tkmodal');
var ModalComponent = (function () {
    function ModalComponent() {
    }
    ModalComponent.prototype.alert = function (message) {
        if (message === void 0) { message = "Hello world!"; }
        var modal = new tkmodal_1.TKModal();
        modal.alert({ message: message });
    };
    ModalComponent.prototype.confirm = function (options, callback) {
        var modal = new tkmodal_1.TKModal();
        modal.confirm(options, callback);
    };
    ModalComponent.prototype.prompt = function (options, callback) {
        var modal = new tkmodal_1.TKModal();
        modal.prompt(options, callback);
    };
    ModalComponent.prototype.custom = function (options, callback) {
        var modal = new tkmodal_1.TKModal();
        modal.custom(options, callback);
    };
    ModalComponent = __decorate([
        core_1.Component({
            template: ''
        }), 
        __metadata('design:paramtypes', [])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map