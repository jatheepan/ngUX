import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'paginator',
    templateUrl: './app/shared/paginator/paginator.component.html'
})


export class PaginatorComponent implements OnInit {
    private pages: any = [];
    private isCurrentPage: Number = 1;

    @Input() pageCount: Number;
    @Input() pageLimit: Number;
    @Output() pageClick  = new EventEmitter<boolean>();

    ngOnInit() {
        while(this.pages.length < (Number(this.pageCount) / Number(this.pageLimit))) {
            this.pages.push(this.pages.length + 1);
        }
    }
    
    onPaginateClick(page) {
        this.isCurrentPage = page;
        this.pageClick.emit(page);
    }
}