import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ModalModule} from '../components/modal/modal.module';
import {TagModule} from '../components/tag/tag.module';

@NgModule({
    imports: [CommonModule, ModalModule, TagModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule {

}