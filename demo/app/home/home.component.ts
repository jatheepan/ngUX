import {Component} from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';

@Component({
    selector: 'home',
    templateUrl: './app/home/home.component.html'
})

export class HomeComponent {
    private modal = new ModalComponent();

    onAlertClick() {
        this.modal.alert('The message goes here..');
    }

    onConfirmClick() {
        this.modal.confirm({message: 'You cool with that..?'}, value => {
            let message = (value === true) ? 'Thank you' : 'That\'s okay.';

            setTimeout(this.modal.alert.bind(null, message), 400);
        });
    }
}