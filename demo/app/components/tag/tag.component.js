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
var Rx_1 = require('rxjs/Rx');
var TagComponent = (function () {
    function TagComponent() {
        this.items = [];
        this.content = '';
        this.selectedIndex = 0;
        this.keyup = new core_1.EventEmitter();
    }
    /**
     * On initialize subscribe to suggestions.
     */
    TagComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.suggestions) {
            this.suggestions.subscribe(function (data) {
                _this.items = data;
                _this.highlightItem(0);
            });
        }
    };
    /**
     * When user type emit event.
     * @param e
     */
    TagComponent.prototype.onKeyUp = function (e) {
        var _this = this;
        var keyCode = (e.which) ? e.which : e.keyCode;
        Rx_1.Observable.create(function (observer) { return observer.next(keyCode); })
            .filter(function (keyCode) {
            return (keyCode >= 48 && keyCode <= 90) || [8, 27].indexOf(Number(keyCode)) !== -1;
        })
            .subscribe(function (keyCode) {
            if (keyCode >= 48 && keyCode <= 90 || keyCode === 8) {
                _this.keyup.emit(_this.getCurrentText(e.target.innerText));
            }
            else if (keyCode === 27) {
                _this.resetResults();
            }
        });
    };
    /**
     * Filter alphanumeric & backspace, up, down and enter keys.
     *
     * @param e
     */
    TagComponent.prototype.onKeyDown = function (e) {
        var keyCode = (e.which) ? e.which : e.keyCode;
        if ([40, 38].indexOf(keyCode) !== -1) {
            e.preventDefault();
            this.highlightHandler(keyCode);
        }
        else if (keyCode === 13 && this.items.length) {
            e.preventDefault();
            this.selectAnItem(this.items[this.selectedIndex]);
        }
    };
    /**
     * Select items by keyboard.
     *
     * @param keyCode
     */
    TagComponent.prototype.highlightHandler = function (keyCode) {
        var index = Number(this.selectedIndex), direction = (keyCode === 40) ? 'down' : (keyCode === 38) ? 'up' : null;
        if (this.items.length) {
            var incrementer = (keyCode === 38) ? -1 : (keyCode === 40) ? +1 : 0;
            if (direction === 'up') {
                if (index <= 0) {
                    index = this.items.length - 1;
                }
                else {
                    index += incrementer;
                }
                this.highlightItem(index);
            }
            else if (direction === 'down') {
                if (index >= (this.items.length - 1)) {
                    index = 0;
                }
                else {
                    index += incrementer;
                }
                this.highlightItem(index);
            }
            this.selectedIndex = index;
        }
    };
    /**
     * Select one item from typeahead.
     * @param item
     */
    TagComponent.prototype.selectAnItem = function (item) {
        if (item && item.name) {
            this.content += item.name; // TODO replace current word with..
        }
        this.resetResults();
    };
    /**
     * Highlight item.
     *
     * @param index
     */
    TagComponent.prototype.highlightItem = function (index) {
        if (this.items && this.items.length && !isNaN(index)) {
            this.items.forEach(function (item) { return item.selected = false; });
            this.selectedIndex = index;
            this.items[index].selected = true;
        }
    };
    /**
     * Returns last word.
     * @param text
     * @returns {any}
     */
    TagComponent.prototype.getCurrentText = function (text) {
        return text;
    };
    /**
     * Remove all suggestions.
     */
    TagComponent.prototype.resetResults = function () {
        this.items = [];
        this.selectedIndex = 0;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], TagComponent.prototype, "suggestions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TagComponent.prototype, "keyup", void 0);
    TagComponent = __decorate([
        core_1.Component({
            selector: 'tag',
            templateUrl: '../app/components/tag/tag.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TagComponent);
    return TagComponent;
}());
exports.TagComponent = TagComponent;
//# sourceMappingURL=tag.component.js.map