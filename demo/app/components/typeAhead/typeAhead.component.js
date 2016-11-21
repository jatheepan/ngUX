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
var TypeAheadComponent = (function () {
    function TypeAheadComponent() {
        this.selectedIndex = 0;
        this.feeds = [];
        this.keyup = new core_1.EventEmitter();
    }
    TypeAheadComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.hir) {
            this.hir.subscribe(function (data) {
                _this.feeds = data;
                _this.highlightItem(0);
            });
        }
    };
    /**
     * Filter alphanumeric & backspace, up, down and enter keys.
     *
     * @param e
     */
    TypeAheadComponent.prototype.onKeyDown = function (e) {
        var keyCode = (e.which) ? e.which : e.keyCode;
        if ([40, 38, 13].indexOf(keyCode) !== -1) {
            this.highlightHandler(keyCode);
        }
    };
    /**
     * On typeahead keyup
     *
     * @param e
     */
    TypeAheadComponent.prototype.onKeyUp = function (e) {
        var _this = this;
        var key = (e.which) ? e.which : e.keyCode;
        var observer = Rx_1.Observable.create(function (observer) { return observer.next(key); });
        observer
            .filter(function (key) {
            return (key >= 48 && key <= 90) || [8, 27].indexOf(Number(key)) !== -1;
        })
            .subscribe(function (key) {
            if (key >= 48 && key <= 90 || key === 8) {
                _this.keyup.emit(_this.fieldValue);
            }
            else if (key === 27) {
                _this.resetResults();
            }
        });
    };
    /**
     * Select items by keyboard.
     *
     * @param keyCode
     */
    TypeAheadComponent.prototype.highlightHandler = function (keyCode) {
        var index = Number(this.selectedIndex), direction = (keyCode === 40) ? 'down' : (keyCode === 38) ? 'up' : null;
        if (this.feeds && this.feeds.length) {
            var incrementer = (keyCode === 38) ? -1 : (keyCode === 40) ? +1 : 0;
            if (direction === 'up') {
                if (index <= 0) {
                    index = this.feeds.length - 1;
                }
                else {
                    index += incrementer;
                }
                this.highlightItem(index);
            }
            else if (direction === 'down') {
                if (index >= (this.feeds.length - 1)) {
                    index = 0;
                }
                else {
                    index += incrementer;
                }
                this.highlightItem(index);
            }
            else {
                this.selectAnItem(this.feeds[index]);
            }
            this.selectedIndex = index;
        }
    };
    /**
     * Select one item from typeahead.
     * @param item
     */
    TypeAheadComponent.prototype.selectAnItem = function (item) {
        if (item && item.first_name) {
            this.fieldValue = item.first_name;
        }
        this.resetResults();
    };
    /**
     * Highlight item.
     *
     * @param index
     */
    TypeAheadComponent.prototype.highlightItem = function (index) {
        if (this.feeds && this.feeds.length && !isNaN(index)) {
            this.feeds.forEach(function (feed) { return feed.selected = false; });
            this.selectedIndex = index;
            this.feeds[index].selected = true;
        }
    };
    /**
     * When user click on the list item
     * emit event.
     *
     * @param data
     */
    TypeAheadComponent.prototype.onFeedClick = function (data) {
        this.selectAnItem(data);
    };
    /**
     * Remove all results.
     */
    TypeAheadComponent.prototype.resetResults = function () {
        this.feeds = [];
        this.selectedIndex = 0;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], TypeAheadComponent.prototype, "hir", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TypeAheadComponent.prototype, "keyup", void 0);
    TypeAheadComponent = __decorate([
        core_1.Component({
            selector: 'typeahead',
            templateUrl: './app/components/typeAhead/typeAhead.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TypeAheadComponent);
    return TypeAheadComponent;
}());
exports.TypeAheadComponent = TypeAheadComponent;
//# sourceMappingURL=typeAhead.component.js.map