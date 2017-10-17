import {  Http, Response , HttpModule, BaseRequestOptions } from '@angular/http';
import { async, ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroService: HeroService;

    let MockHeroesArray: Array<Hero> = [ 
        {id: 1, name: 'Superman'},
        {id: 2, name: 'IronMan'},
        {id: 3, name: 'Hulk'},
        {id: 4, name: 'Batman'},
        {id: 5, name: 'Aquaman'}
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[RouterTestingModule,
                FormsModule],  
            declarations: [ 
                HeroesComponent,
                HeroDetailComponent
            ],
            providers: 
                [HeroService,
                {
                    provide: Http, useFactory: (backend, options) => {
                      return new Http(backend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        heroService = TestBed.get(HeroService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
    describe('HeroesComponent: Init Test', () => {
        it('Heroes has value after ngOnInit using done method.',  (done) => {  
            let spy = spyOn(heroService, 'getHeroes').and.returnValue(Observable.of(MockHeroesArray));
            
            component.ngOnInit();
                
            spy.calls.mostRecent();
            
            fixture.detectChanges();
            expect(component.heroes).toBeTruthy();
            expect(component.heroes.length).toBe(5);
            done(); 
            
        });
        
        it('Heroes has value ngOnInit using using fakeAsync() and tick()', fakeAsync(() => { 
            spyOn(heroService, 'getHeroes').and.returnValue(Observable.of(MockHeroesArray));
            component.ngOnInit();
            
            tick();
            fixture.detectChanges();
    
            expect(component.heroes).toBeTruthy();
            expect(component.heroes.length).toBe(5);
        }));
    });

});


//
//it('should catch if an error is thrown at delete', (done) => {
//    const errorMsg = 'some error';
//    heroSearchComponent.heroes = MockHeroesArray;
//    spyOn(heroService, 'delete').and.callFake(() => {
//      return Promise.reject(errorMsg);
//    });
//
//    heroSearchComponent.deleteHero(MockHero, MockEvent).then(() => {
//      expect(heroService.delete).toHaveBeenCalled();
//      expect(heroService.delete).toHaveBeenCalledTimes(1);
//      expect(heroService.delete).toHaveBeenCalledWith(MockHero);
//      expect(heroSearchComponent.heroes).toEqual(MockHeroesArray);
//      expect(heroSearchComponent.error).toBe(errorMsg);
//      done();
//    });
//  });


//describe('HeroesComponent: getHeroes', () => {
//    it('getHeroes called.',  (done) => {  
//        let spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
//        component.ngOnInit();
//        
//        spy.calls.mostRecent().returnValue.then(() => { 
//            fixture.detectChanges();
//            expect(component.heroes).toBeTruthy();
//            expect(component.heroes.length).toBe(4);
//            done(); 
//        });
//    });
//});

