import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class HomeService {
    constructor(private _http: Http) {
    }

    getData() {
        return this._http
            .get('../app/home/data.json');
    }

    getDictionary() {
        return this.getData().map(res => res.json().dictionary);
    }
}