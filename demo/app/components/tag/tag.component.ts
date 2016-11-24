import {Component, Input, Output, EventEmitter, Renderer, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'tag',
    templateUrl: '../app/components/tag/tag.component.html'
})

export class TagComponent implements OnInit {
    private items: any = [];
    private content: any = '';
    private selectedIndex: Number = 0;
    @Input() suggestions: Observable<any>;
    @Output() keyup = new EventEmitter<any>();

    constructor(private renderer: Renderer) {

    }
    /**
     * On initialize subscribe to suggestions.
     */
    ngOnInit() {
        if(this.suggestions) {
            this.suggestions.subscribe(
                data => {
                    this.items = data;
                    this.highlightItem(0);
                }
            );
        }
    }

    /**
     * When user type emit event.
     * @param e
     */
    onKeyUp(e) {
        let keyCode: any = (e.which) ? e.which : e.keyCode;

        Observable.create(observer => observer.next(keyCode))
            .filter(keyCode => {
                return (keyCode >= 48 && keyCode <= 90) || [8, 27].indexOf(Number(keyCode)) !== -1;
            })
            .subscribe(keyCode => {
                if(keyCode >= 48 && keyCode <= 90 || keyCode === 8) {
                    this.keyup.emit(this.getCurrentText(e.target.innerText));
                }
                else if(keyCode === 27) {
                    this.resetResults();
                }
            });

    }

    /**
     * Filter alphanumeric & backspace, up, down and enter keys.
     *
     * @param e
     */
    onKeyDown(e) {
        let keyCode: any = (e.which) ? e.which : e.keyCode;

        if([40, 38].indexOf(keyCode) !== -1) {
            e.preventDefault();
            this.highlightHandler(keyCode);
        }
        else if(keyCode === 13 && this.items.length) {
            e.preventDefault();
            this.selectAnItem(this.items[this.selectedIndex]);
        }
    }

    /**
     * Select items by keyboard.
     *
     * @param keyCode
     */
    highlightHandler(keyCode) {
        let index = Number(this.selectedIndex),
            direction = (keyCode === 40) ? 'down' : (keyCode === 38) ? 'up' : null;

        if(this.items.length) {
            let incrementer = (keyCode === 38) ? -1 : (keyCode === 40) ? +1 : 0;

            if(direction === 'up') {
                if(index <= 0) {
                    index = this.items.length - 1;
                }
                else {
                    index += incrementer;
                }
                this.highlightItem(index);
            }
            else if(direction === 'down') {
                if(index >= (this.items.length - 1)) {
                    index = 0;
                }
                else {
                    index += incrementer;
                }
                this.highlightItem(index);
            }

            this.selectedIndex = index;
        }
    }

    /**
     * When user click on the list item
     * @param data
     */
    onItemClick(data) {
        this.selectAnItem(data);
    }

    /**
     * Select one item from typeahead.
     * @param item
     */
    selectAnItem(item) {
        if(item && item.name) {
            console.log(this.renderer);
            let editor = this.renderer.selectRootElement('#editor');
            let link = this.renderer.createElement(editor, 'a');

            this.renderer.setElementAttribute(link, 'href', item.link);
            this.renderer.setText(link, item.name);

            this.setCursorPosition(link);
        }

        this.resetResults();
    }

    /**
     * Highlight item.
     *
     * @param index
     */
    highlightItem(index) {
        if(this.items && this.items.length && !isNaN(index)) {
            this.items.forEach(item => item.selected = false);

            this.selectedIndex = index;
            this.items[index].selected = true;
        }
    }

    /**
     * Returns last word.
     * @param text
     * @returns {any}
     */
    getCurrentText(text) {
        return text;
    }

    /**
     * Remove all suggestions.
     */
    resetResults() {
        this.items = [];
        this.selectedIndex = 0;
    }

    setCursorPosition(node, position = 1) {
        var range = document.createRange(),
            selection = window.getSelection();

        range.selectNode(node);
        range.collapse(true);

        range.setStart(node, position);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}