import {Component} from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';

@Component({
    selector: 'home',
    templateUrl: './app/home/home.component.html'
})

export class HomeComponent {
    private modal = new ModalComponent();

    /**
     * Get alert modal.
     */
    onAlertClick() {
        this.modal.alert('The message goes here..');
    }

    /**
     * Get confirm modal.
     */
    onConfirmClick() {
        this.modal.confirm({message: 'You cool with that..?'}, value => console.info(value));
    }

    onPromptModalClick() {
        this.modal.prompt({message: 'The awesome question'}, value => console.info(value));
    }

    /**
     * Get custom modal.
     */
    onCustomModalClick() {
        this.modal.custom({
            message: 'This is a custom message modal',
            buttons: [
                {label: 'Apple', value: 'apple'},
                {label: 'Mango', value: 'mango'},
                {label: 'Orange', value: 'orange'}
            ]
        }, value => console.log(value));
    }
}