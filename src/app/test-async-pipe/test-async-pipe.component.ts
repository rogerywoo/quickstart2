import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ISubscription  } from 'rxjs/Subscription';

@Component({
    selector: 'app-test-async-pipe',
    templateUrl: './test-async-pipe.component.html',
    styleUrls: ['./test-async-pipe.component.css']
})
export class TestAsyncPipeComponent implements OnInit {
    promise: Promise<string>;
    observable: Observable<number>;
    subscription: ISubscription;
    observableData: number;

    constructor() {
        this.promise = this.getPromise();
        this.observable = this.getObservable();
        this.subscribeObservable();
    
    }

    ngOnInit() {
    }

    getObservable() {
        return Observable
            .interval(1000)  //time period ms
            .take(10)       //first 10 numbers
            .map((v) => v * v); //anonymous function
    }

    // AsyncPipe subscribes to the observable automatically
    subscribeObservable() {
        this.subscription = this.getObservable()
            .subscribe((v) => this.observableData = v);
    }

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