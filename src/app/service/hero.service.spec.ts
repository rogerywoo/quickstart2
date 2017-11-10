import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {HeroService} from './hero.service'
import { Hero } from '../model/hero';

const HERO_ONE = {"id":12,"name":"Narco"};
const HERO_TWO = {"id":13,"name":"Bombasto"};

describe('HeroService', () => {
    let 
        heroes: Hero[],
        error: any,
        hero:Hero;
        
    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            HeroService,
        ]);
        this.heroService = this.injector.get(HeroService);
        this.backend = this.injector.get(ConnectionBackend) as MockBackend;
        this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
    });

    it('getHeroes() should query current service url', () => {
        this.heroService.getHeroes();
        expect(this.lastConnection).toBeDefined('no http service connection at all?');
        console.log ("url = " + this.lastConnection.request.url);
        expect(this.lastConnection.request.url).toMatch(/\/heroes/, 'url invalid');
    });
    
    it('getHeroes() should return some heroes', fakeAsync(() => {
        
        this.heroService.getHeroes()  
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
    
    it('getHeroes() while server is down', fakeAsync(() => {
        this.heroes = null;
        this.heroService.getHeroes()       
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
    
    it('getHero() should return one hero', fakeAsync(() => {
        let id = 13;
        this.heroService.getHero(id)       
            .then(h => 
                {        
                    console.log ("got promise");            
                    console.log ("hero = " + h);
                    console.log ("hero json = " + JSON.stringify(h));   
                    this.hero = h;
                    console.log (this.hero.id);
                }
            );              
      
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 200,
        
            body: JSON.stringify(                
                    HERO_TWO
                )
            })));
        
        tick();
        
        expect(this.hero).toEqual(HERO_TWO, ' hero should be the second hero');
    }));
    
    it('getHero() while server is down', fakeAsync(() => {
        let id = 13;
        
        this.hero = null;
        this.heroService.getHero(id)      
            .then(h => 
                {        
                    this.hero = h;
                    console.log (this.hero.id);
                },               
            )
            .catch(err => {
                 this.error = err;
            });  
    
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 404,
            statusText: 'URL not Found',
            })));
        tick();
        
        expect(this.hero).not.toBeTruthy();
        expect(this.error).toBeDefined();
    }));
    
    it('addHero()', fakeAsync(() => {
        let hero :Hero;
        let newId : number;
        
        hero = new Hero();
        hero.name = 'Testhero';

        this.heroService.addHero(hero)
            .then(h => 
                {        
                    newId = h;
                    console.log (newId);
                },               
            )
            .catch(err => {
                 this.error = err;
            });  
    
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 200,
        
            body: JSON.stringify(                
                    30
                )
            })));
        
        tick();
        
        expect(newId).toEqual(30, ' hero should be the second hero');
    }));
    
    it('deleteHero()', fakeAsync(() => {
        let heroId :number;
        let numberdeleted : number;
        
        heroId = 10;

        this.heroService.deleteHero(heroId)
            .then(h => 
                {        
                    numberdeleted = h;
                    console.log (numberdeleted);
                },               
            )
            .catch(err => {
                 this.error = err;
            });  
    
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 200,
        
            body: JSON.stringify(                
                    1
                )
            })));
        
        tick();
        
        expect(numberdeleted).toEqual(1, 'Number of records delete should be one');
    }));
});
