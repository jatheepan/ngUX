import {Routes, Route} from '@angular/router';
import {HomeComponent} from '../app/home/home.component';

let routes: Route[] = [{
    path :'',
    component: HomeComponent
}];

export const routes: Routes = [
    ...routes
];
