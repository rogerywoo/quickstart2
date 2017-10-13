import {  Http, Response , HttpModule, BaseRequestOptions } from '@angular/http';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HeroSearchService } from '../service/hero-search.service';
import { Hero } from '../model/hero';

describe('HeroSearchComponent', () => {
    let component: HeroSearchComponent;
    let fixture: ComponentFixture<HeroSearchComponent>;

    let heroSearchService: HeroSearchService;

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
            declarations: [ HeroSearchComponent ],
            providers: [
                        {
                            provide: Http, useFactory: (backend, options) => {
                              return new Http(backend, options);
                            },
                            deps: [MockBackend, BaseRequestOptions]
                        },
                        MockBackend,
                        BaseRequestOptions,
                        HeroSearchService
                    ]            
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroSearchComponent);
        component = fixture.componentInstance;
        
        heroSearchService = TestBed.get(HeroSearchService);
    });

    it('HeroSearchComponent should be created', () => {
        expect(component).toBeTruthy();
    });
    
    describe('HeroSearchComponent: Init Test', ()  => {
        it('Heroes has value via done fakeAsync() and tick()', fakeAsync(()  => {            
            let componentHero: Hero[];
        
            spyOn(heroSearchService, 'search').and.returnValue(Promise.resolve(MockHeroesArray));
            component.ngOnInit();



            component.heroes
            .subscribe( data => {
                for (let h of data) {
                    componentHero.push(h);
                }
                expect(component.heroes).toBeTruthy();
                expect(componentHero[0].name).toBe('Superman');
                expect(componentHero.length).toBe(5);
                console.log('In subscribe');
            });
            
            component.search('St');
            
            tick(300);
            fixture.detectChanges();
            
            expect(heroSearchService.search).toHaveBeenCalled();
            
        }));
    });
    
//    describe('HeroSearchComponent: Init Test', () => {
//        it('Heroes has value via done', (done) => {            
//            spyOn(heroSearchService, 'search').and.returnValue(Promise.resolve(MockHeroesArray));
//            
//            fixture.detectChanges();
//            component.ngOnInit();
//            
//            fixture.whenStable().then(() => { 
//                component.search('St');
//            
//                expect(component.heroes).toBeTruthy();
//                setTimeout(function () {
//                    console.log('Get Count');
//                    if (component.heroes)
//                    {
//                        var testArray = component.heroes.toArray();
//                    
//                        console.log(testArray.count);
//                    }
//                    console.log('Done Count');
//
//                    expect(component.heroes[0].name).toBe('Superan');
//                    console.log(component.heroes.count());
//                    done();
//                  }, 1000);
//                               
//            });
//            
//
//        });
//    });
    
//    describe('HeroSearchComponent: Init Test', () => {
//        it('Heroes has value via async() and whenStable()', async(() => {            
//            spyOn(heroSearchService, 'search').and.returnValue(Promise.resolve(MockHeroesArray));
//            
//            fixture.detectChanges();
//            
//            fixture.whenStable().then(() => { 
//                component.search('S');
//            
//                expect(component.heroes).toBeTruthy();
//                setTimeout(function () {
//                    
//                    console.log(component.heroes[0].name);
//                    expect(component.heroes[0].name).toBe('Superan'); 
//                  }, 1000);
//                               
//            });
//            
//            component.ngOnInit();
//        }));
//    });
    
});
