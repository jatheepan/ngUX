import {Component} from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';
import {Observable} from 'rxjs/Rx';
import {HomeService} from './home.service';

@Component({
    selector: 'home',
    templateUrl: './app/home/home.component.html',
    providers: [HomeService]
})

export class HomeComponent {
    private modal = new ModalComponent();
    private suggestions: any;
    private suggestionsObserver: any;


    constructor(private _service: HomeService) {
        this.suggestions = Observable.create(observer => {
            this.suggestionsObserver = observer;
        });
    }

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

    /**
     * On tag input change.
     *
     * @param string
     */
    onTagKeyUp(string) {
        if(typeof string === 'string') {
            if(string.length) {
                this._service
                    .getDictionary()
                    .subscribe(data => {
                        let regex = new RegExp(string, 'gi');

                        data = data.filter(item => regex.test(item.name));
                        this.suggestionsObserver.next(data);
                    });
            }
            else {
                this.suggestionsObserver.next([]);
            }
        }
    }
}