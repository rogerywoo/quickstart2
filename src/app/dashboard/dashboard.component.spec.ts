import {  Http, Response , HttpModule, BaseRequestOptions } from '@angular/http';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { HeroSearchService } from '../service/hero-search.service';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    
    let heroService: HeroService;
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
            declarations: [ DashboardComponent,HeroSearchComponent],
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
        fixture = TestBed.createComponent(DashboardComponent);
        heroService = TestBed.get(HeroService);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    describe('DashboardComponent', () => {
        it('should be created', () => {
            expect(component).toBeTruthy();
        });
    });
    
    describe('DashboardComponent: Init Test', () => {
        it('Heroes has value  using done.',  (done) => {  
            spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
            
            component.ngOnInit();
            
            spy.calls.mostRecent().returnValue.then(() => { 
                fixture.detectChanges();
                expect(component.heroes).toBeTruthy();
                expect(component.heroes.length).toBe(4);
                expect(component.heroes[0].name).toBe('Superman');
                done(); 
            });
        });
    
        it('Heroes has value via async() and whenStable()', async(() => { 
            fixture.detectChanges();
            spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
            fixture.whenStable().then(() => { 
              fixture.detectChanges();
              expect(component.heroes).toBeTruthy();
              expect(component.heroes.length).toBe(4);
              expect(component.heroes[0].name).toBe('Superman');
            });
            component.ngOnInit();            
        }));
        
        it('Heroes has value using fakeAsync() and tick()', fakeAsync(() => { 
            spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
            component.ngOnInit();
            
            tick();
            fixture.detectChanges();
    
            expect(component.heroes).toBeTruthy();
            expect(component.heroes.length).toBe(4);
        }));
        
        it('Heroes on Init Error', fakeAsync(() => { 
            spyOn(heroService, 'getHeroes').and.returnValue(Promise.reject("Test Error"));
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
