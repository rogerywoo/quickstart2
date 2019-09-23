import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription  } from 'rxjs/Subscription';
import {Subject} from "rxjs/Subject";


@Component({
    selector: 'app-test-async-subject-pipe',
    templateUrl: './test-async-subject-pipe.component.html',
    styleUrls: ['./test-async-subject-pipe.component.css']
  })
export class TestAsyncSubjectPipeComponent implements OnInit {
    promise: Promise<any>;
    observable: Observable<number>;
    subscription: Subscription;
    observableData: number;

    constructor() {
        this.promise = this.getPromise();
        this.observable = this.getObservable();
        this.subscribeObservable();
    
    }

    ngOnInit() {
    }

    //Every second run function.  // No need to subscribe.
    getObservable() {
        return Observable
            .interval(1000)
            .take(10)
            .map((v) => v * v);
    }

    //We subscribe to the output of this observable chain and store the number on the property observableData. 
    //We also store a reference to the subscription so we can unsubscribe to it later.
    subscribeObservable() {
        this.subscription = this.getObservable()
            .subscribe((v) => this.observableData = v);
    }

    // return promise with Promise complete! after 3 seconds. 
    getPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve("Promise complete!"), 3000);
            });
    }

    // AsyncPipe unsubscribes from the observable automatically
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}