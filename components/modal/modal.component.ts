import {Component, Input} from '@angular/core';
import {TKModal} from './tkmodal';

@Component({
    template: ''
})

export class ModalComponent {
    alert(message: String = "Hello world!") {
        var modal = new TKModal();
        modal.alert({message: message});
    }

    confirm(options, callback) {
        var modal = new TKModal();
        modal.confirm(options, callback);
    }
}