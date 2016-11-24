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
var Rx_1 = require('rxjs/Rx');
var home_service_1 = require('./home.service');
var HomeComponent = (function () {
    function HomeComponent(_service) {
        var _this = this;
        this._service = _service;
        this.modal = new modal_component_1.ModalComponent();
        this.suggestions = Rx_1.Observable.create(function (observer) {
            _this.suggestionsObserver = observer;
        });
    }
    /**
     * Get alert modal.
     */
    HomeComponent.prototype.onAlertClick = function () {
        this.modal.alert('The message goes here..');
    };
    /**
     * Get confirm modal.
     */
    HomeComponent.prototype.onConfirmClick = function () {
        this.modal.confirm({ message: 'You cool with that..?' }, function (value) { return console.info(value); });
    };
    HomeComponent.prototype.onPromptModalClick = function () {
        this.modal.prompt({ message: 'The awesome question' }, function (value) { return console.info(value); });
    };
    /**
     * Get custom modal.
     */
    HomeComponent.prototype.onCustomModalClick = function () {
        this.modal.custom({
            message: 'This is a custom message modal',
            buttons: [
                { label: 'Apple', value: 'apple' },
                { label: 'Mango', value: 'mango' },
                { label: 'Orange', value: 'orange' }
            ]
        }, function (value) { return console.log(value); });
    };
    /**
     * On tag input change.
     *
     * @param string
     */
    HomeComponent.prototype.onTagKeyUp = function (string) {
        var _this = this;
        if (typeof string === 'string') {
            if (string.length) {
                this._service
                    .getDictionary()
                    .subscribe(function (data) {
                    var regex = new RegExp(string, 'gi');
                    data = data.filter(function (item) { return regex.test(item.name); });
                    _this.suggestionsObserver.next(data);
                });
            }
            else {
                this.suggestionsObserver.next([]);
            }
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './app/home/home.component.html',
            providers: [home_service_1.HomeService]
        }), 
        __metadata('design:paramtypes', [home_service_1.HomeService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map