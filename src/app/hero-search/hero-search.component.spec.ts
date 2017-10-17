import {  Http, Response , HttpModule, BaseRequestOptions } from '@angular/http';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { HeroSearchService } from '../service/hero-search.service';

describe('HeroSearchComponent', () => {
    let component: HeroSearchComponent;
    let fixture: ComponentFixture<HeroSearchComponent>;
    
    let heroService: HeroService;
    let heroSearchService: HeroSearchService;
    let spy: any;

    let MockHero: Hero = <Hero>{id: 1, name: 'Superman'};
    let MockHero2: Hero = <Hero>{id: 2, name: 'IronMan'};
    let MockHeroesArray: Array<Hero> = [ 
{id: 1, name: 'Superman'},
{id: 2, name: 'IronMan'},
{id: 3, name: 'Hulk'},
{id: 4, name: 'Batman'},
{id: 5, name: 'Aquaman'}
];

    let componentHero: Hero[] = [];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[RouterTestingModule],              
            declarations: [ HeroSearchComponent],
            providers: [
                HeroService,
                HeroSearchService,
                {
                    provide: Http, useFactory: (backend, options) => {
                      return new Http(backend, options);
                    },                    
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroSearchComponent);
        heroSearchService = TestBed.get(HeroSearchService);
        
        component = fixture.componentInstance;
    //    fixture.detectChanges();
    });
    
    describe('HeroSearchComponent', () => {
        it('should be created', () => {
            expect(component).toBeTruthy();
        });
    });    
    
    describe('HeroSearchComponent: Init Test', ()  => {
        it('HeroSearchComponent has value via done fakeAsync() and tick()', fakeAsync(()  => {            
            componentHero = [];
            spyOn(heroSearchService, 'search').and.returnValue(Observable.of(MockHeroesArray));
            fixture.detectChanges();
                                    
            component.heroes
                .subscribe( data => {
                    console.log('In begin subscribe');
                    for (let h of data) {
                        componentHero.push(h);
                    }
                    expect(component.heroes).toBeTruthy();
                    expect(componentHero[0].name).toBe('Superman');
                    expect(componentHero.length).toBe(5);
                    console.log('In end subscribe');
                });

            component.search('S');
            
            tick(400);
                           
            expect(heroSearchService.search).toHaveBeenCalled();
            
        }));
        
        it('Heroes has value via done', (done) => {
            componentHero = [];            
            spyOn(heroSearchService, 'search').and.returnValue(Observable.of(MockHeroesArray));
            
            fixture.detectChanges();
            
            component.heroes
                .subscribe( data => {
                    console.log('In begin subscribe');
                    for (let h of data) {
                        componentHero.push(h);
                    }
                    expect(component.heroes).toBeTruthy();
                    expect(componentHero[0].name).toBe('Superman');
                    expect(componentHero.length).toBe(5);
                    console.log('In end subscribe');
                    
                });
            
            fixture.whenStable().then(() => { 
                component.search('St');
                
                done();
                
            });
        });
        
        it('Heroes has value via async() and whenStable()', async(() => {            
            spyOn(heroSearchService, 'search').and.returnValue(Observable.of(MockHeroesArray));
            
            fixture.detectChanges();
            
            component.heroes
                .subscribe( data => {
                    console.log('In begin subscribe');
                    for (let h of data) {
                        componentHero.push(h);
                    }
                    expect(component.heroes).toBeTruthy();
                    expect(componentHero[0].name).toBe('Superman');
                    expect(componentHero.length).toBe(5);
                    console.log('In end subscribe');
                    
                });
            
            fixture.whenStable().then(() => { 
                component.search('S');
            
                expect(component.heroes).toBeTruthy();                               
            });
            
        }));
    });    
    
});
