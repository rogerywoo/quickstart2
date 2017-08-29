import {NgModule, Component, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
    selector: 'app-test-pipe',
    templateUrl: './test-pipe.component.html',
    styleUrls: ['./test-pipe.component.css']
})
export class TestPipeComponent implements OnInit {
    protected dateVal: Date = new Date();
    protected jsonVal: Object = {moo: 'foo', goo: {too: 'new'}};
    
    constructor() { }

    ngOnInit() {
    }

}
