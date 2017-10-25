import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {HeroSearchService} from './hero-search.service'
import { Hero } from '../model/hero';

const HERO_ONE = {"id":12,"name":"Narco"};
const HERO_TWO = {"id":13,"name":"Bombasto"};

describe('MockBackend HeroSearchService Example', () => {
    let 
        heroes: Hero[],
        error: any;
    
    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            HeroSearchService,
        ]);
        this.heroSearchService = this.injector.get(HeroSearchService);
        this.backend = this.injector.get(ConnectionBackend) as MockBackend;
        this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
    });
    
    it('search() should query current service url', () => {
        this.heroSearchService.search("a");
        expect(this.lastConnection).toBeDefined('no http service connection at all?');
        console.log ("url = " + this.lastConnection.request.url);
        expect(this.lastConnection.request.url).toMatch(/heroes\/\?name\=a/, 'url invalid');
    });
    

    it('search() should return some heroes', fakeAsync(() => {
        
        this.heroSearchService.search("a")      
            .subscribe(
         /* happy path */ heroes => {
             console.log("backfrom search");
             console.log("heroes = " + heroes);
             console.log("end step");           
             this.heroes = heroes},      
         /* error path */ error => this.error = error);      
      
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 200,
        
            body: JSON.stringify(
                [
                    HERO_ONE,
                    HERO_TWO
                ])
            })));
        
        tick();
        
        expect(this.heroes.length).toEqual(2, 'should contain given amount of heroes');
        expect(this.heroes[0]).toEqual(HERO_ONE, ' HERO_ONE should be the first hero');
        expect(this.heroes[1]).toEqual(HERO_TWO, ' HERO_TWO should be the second hero');
    }));

    it('search() while server is down', fakeAsync(() => {
        this.heroes = null;
        this.heroSearchService.search("a")      
            .subscribe(
                heroes => {
                    console.log("backfrom search");
                    console.log("heroes = " + heroes);
                    console.log("end step");           
                    this.heroes = heroes},      
                error => {
                    console.log("error");                
                    this.error = error;
                    console.log("error = " + this.error);
                },
                () => console.log("DONE"));   
    
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 404,
            statusText: 'URL not Found',
            })));
        tick();
        
        expect(this.heroes).toBeNull();
        expect(this.error).toBeDefined();
    }));

    it('searchFix() should query correct service url', () => {
        this.heroSearchService.searchFix();
        expect(this.lastConnection).toBeDefined('no http service connection at all?');
        console.log ("url = " + this.lastConnection.request.url);
        expect(this.lastConnection.request.url).toMatch(/\/heroes/, 'url invalid');
    });
    
    it('searchFix() should return some heroes', fakeAsync(() => {
        
        this.heroSearchService.searchFix()      
            .subscribe(
         /* happy path */ heroes => {
             this.heroes = heroes},      
         /* error path */ error => this.error = error);      
      
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 200,
        
            body: JSON.stringify(
                [
                    HERO_ONE,
                    HERO_TWO
                ])
            })));
        
        tick();
        
        expect(this.heroes.length).toEqual(2, 'should contain given amount of heroes');
        expect(this.heroes[0]).toEqual(HERO_ONE, ' HERO_ONE should be the first hero');
        expect(this.heroes[1]).toEqual(HERO_TWO, ' HERO_TWO should be the second hero');
    }));

    it('searchFix() while server is down', fakeAsync(() => {
        this.heroes = null;
        this.heroSearchService.search("a")      
            .subscribe(
                heroes => {     
                    this.heroes = heroes},      
                error => {
                    console.log("error");                
                    this.error = error;
                    console.log("error = " + this.error);
                },
                () => console.log("DONE"));   
              
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 404,
            statusText: 'URL not Found',
            })));
        tick();
        
        expect(this.heroes).toBeNull();
        expect(this.error).toBeDefined();
    }));
});