import 'angular';
import 'reflect-metadata';
import {Component, bootstrap} from 'ng-forward';

@Component({
    selector: 'app',
    template: '<h3>Hello World</h3>'
})
class AppCtrl{ }

bootstrap(AppCtrl);