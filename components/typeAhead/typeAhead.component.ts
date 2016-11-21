import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'typeahead',
    templateUrl: './app/shared/typeAhead/typeAhead.component.html'
})

export class TypeAheadComponent implements OnInit {
    private fieldValue: String;
    private selectedIndex: Number = 0;
    private feeds: any = [];
    @Input() hir: Observable<any>;
    @Output() keyup = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
        if(this.hir) {
            this.hir.subscribe(
                data => {
                    this.feeds = data;
                    this.highlightItem(0);
                }
            );
        }
    }

    /**
     * Filter alphanumeric & backspace, up, down and enter keys.
     *
     * @param e
     */
    onKeyDown(e) {
        let keyCode:any = (e.which) ? e.which : e.keyCode;

        if([40, 38, 13].indexOf(keyCode) !== -1) {
            this.highlightHandler(keyCode);
        }
    }
    /**
     * On typeahead keyup
     *
     * @param e
     */
    onKeyUp(e) {
        let key: any = (e.which) ? e.which : e.keyCode;
        let observer = Observable.create(observer => observer.next(key));

        observer
            .filter((key: Number) => {
                return (key >= 48 && key <= 90) || [8, 27].indexOf(Number(key)) !== -1;
            })
            .subscribe((key) => {
                if(key >= 48 && key <= 90 || key === 8) {
                    this.keyup.emit(this.fieldValue);
                }
                else if(key === 27){
                    this.resetResults();
                }
            });
    }

    /**
     * Select items by keyboard.
     *
     * @param keyCode
     */
    highlightHandler(keyCode) {
        let index = Number(this.selectedIndex),
            direction = (keyCode === 40) ? 'down' : (keyCode === 38) ? 'up' : null;

        if(this.feeds && this.feeds.length) {
            let incrementer = (keyCode === 38) ? -1 : (keyCode === 40) ? +1 : 0;

            if(direction === 'up') {
                if(index <= 0) {
                    index = this.feeds.length - 1;
                }
                else {
                    index += incrementer;
                }
                this.highlightItem(index);
            }
            else if(direction === 'down') {
                if(index >= (this.feeds.length - 1)) {
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
    }

    /**
     * Select one item from typeahead.
     * @param item
     */
    selectAnItem(item) {
        if(item && item.first_name) {
            this.fieldValue = item.first_name;
        }

        this.resetResults();
    }

    /**
     * Highlight item.
     *
     * @param index
     */
    highlightItem(index) {
        if(this.feeds && this.feeds.length && !isNaN(index)) {
            this.feeds.forEach(feed => feed.selected = false);
            this.selectedIndex = index;
            this.feeds[index].selected = true;
        }
    }

    /**
     * When user click on the list item
     * emit event.
     *
     * @param data
     */
    onFeedClick(data) {
        this.selectAnItem(data);
    }

    /**
     * Remove all results.
     */
    resetResults() {
        this.feeds = [];
        this.selectedIndex = 0;
    }
}