import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ModalModule} from '../components/modal/modal.module';

@NgModule({
    imports: [CommonModule, ModalModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule {

}