import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {TypeAheadComponent} from './typeAhead.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TypeAheadComponent],
    exports: [TypeAheadComponent]
})

export class TypeAheadModule {

}