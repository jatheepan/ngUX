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
var modal_component_1 = require('../components/modal/modal.component');
var HomeComponent = (function () {
    function HomeComponent() {
        this.modal = new modal_component_1.ModalComponent();
    }
    HomeComponent.prototype.onAlertClick = function () {
        this.modal.alert('The message goes here..');
    };
    HomeComponent.prototype.onConfirmClick = function () {
        var _this = this;
        this.modal.confirm({ message: 'You cool with that..?' }, function (value) {
            var message = (value === true) ? 'Thank you' : 'That\'s okay.';
            setTimeout(_this.modal.alert.bind(null, message), 400);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './app/home/home.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map