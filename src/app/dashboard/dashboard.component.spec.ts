import {  Http, Response , HttpModule, BaseRequestOptions } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { DashboardComponent } from './dashboard.component';
//import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { HeroSearchService } from '../service/hero-search.service';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    
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


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[RouterTestingModule],              
            declarations: [ DashboardComponent ],
            schemas:      [NO_ERRORS_SCHEMA],            //  Disregard testing HeroSearchComponent
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
        });
                
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        heroService = TestBed.get(HeroService);
        heroSearchService = TestBed.get(HeroSearchService);
        
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    describe('DashboardComponent', () => {
        it('should be created', () => {
            expect(component).toBeTruthy();
        });
    });
    
    describe('DashboardComponent: Search Test', () => {
        it('Heroes has value  using Jasmine done.',  (done) => {  
            spy = spyOn(heroSearchService, 'searchFix').and.returnValue(Observable.of(MockHeroesArray));
            
            component.testSearch("S");
            
            spy.calls.mostRecent();
  
            expect(component.heroes).toBeTruthy();
            expect(component.heroes.length).toBe(4);
            expect(component.heroes[0].name).toBe('Superman');
            done(); 
                               
        });   
  
    });
    
    describe('DashboardComponent: Init Test', () => {
        
        /// Test if returning a Promise
//        it('Heroes has value  using Jasmine done.',  (done) => {  
//            spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
//            
//            component.ngOnInit();
//            
//            spy.calls.mostRecent().returnValue.then(() => { 
//                fixture.detectChanges();
//                expect(component.heroes).toBeTruthy();
//                expect(component.heroes.length).toBe(4);
//                expect(component.heroes[0].name).toBe('Superman');
//                done(); 
//            });
//        });
    
        it('Heroes has value  using Jasmine done.',  (done) => {  
            spy = spyOn(heroService, 'getHeroes').and.returnValue(Observable.of(MockHeroesArray));
            
            component.ngOnInit();
            
            spy.calls.mostRecent();
  
            fixture.detectChanges();
            expect(component.heroes).toBeTruthy();
            expect(component.heroes.length).toBe(4);
            expect(component.heroes[0].name).toBe('Superman');
            done(); 
                               
        });       
      
      //Testing if using Promise
//        it('Heroes has value via Angular async() and whenStable()', async(() => { 
//            fixture.detectChanges();
//            spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
//            fixture.whenStable().then(() => { 
//              fixture.detectChanges();
//              expect(component.heroes).toBeTruthy();
//              expect(component.heroes.length).toBe(4);
//              expect(component.heroes[0].name).toBe('Superman');
//            });
//            component.ngOnInit();            
//        }));
        
        it('Heroes has value via  Angular async() and whenStable()', async(() => { 

            spyOn(heroService, 'getHeroes').and.returnValue(Observable.of(MockHeroesArray));
            component.ngOnInit();            
            fixture.whenStable().then(() => {             
              fixture.detectChanges();
              expect(component.heroes).toBeTruthy();
              expect(component.heroes.length).toBe(4);
              expect(component.heroes[0].name).toBe('Superman');
            });
        }));
                
                
                
                
        it('Heroes has value using fakeAsync() and tick()', fakeAsync(() => { 
            // When using promise
            //spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
            spyOn(heroService, 'getHeroes').and.returnValue(Observable.of(MockHeroesArray));
            component.ngOnInit();
            
            tick();
            fixture.detectChanges();
    
            expect(component.heroes).toBeTruthy();
            expect(component.heroes.length).toBe(4);
        }));
        
        
        //If getHeroes returns a promise
//        it('Heroes on Init Error', fakeAsync(() => { 
//            spyOn(heroService, 'getHeroes').and.returnValue(Promise.reject("Test Error"));
//            component.ngOnInit();
//            
//            tick();
//            fixture.detectChanges();
//    
//            expect(component.errMsg).toBe("Test Error");
//        }));
        
        // If getHeroes returns an observable
        
        it('Heroes on Init Error', fakeAsync(() => { 
            spyOn(heroService, 'getHeroes').and.returnValue(Observable.throw("Test Error"));
            component.ngOnInit();
            
            tick();
            fixture.detectChanges();
    
            expect(component.errMsg).toBe("Test Error");
        }));
    })
    
    describe('DashboardComponent: GotoDetail Test', () => {
        it('Heroes has gotoDetail', () => { 
            expect(component.gotoDetail).toBeTruthy();
            
        });    
        
        // (<any>component) is required because router is private.
        it('Test gotoDetail using toHaveBeenCalledWith', () => {        
            let navigateSpy = spyOn((<any>component).router, 'navigate');
            component.gotoDetail(MockHero);
            expect(navigateSpy).toHaveBeenCalledWith(['/detail', 1 ]);
            
        });    
    })
});
