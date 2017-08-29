import { async, ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
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
            declarations: [ AppComponent,
                HeroesComponent,
                HeroDetailComponent],
            providers: [HeroService]
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
            let spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
            component.ngOnInit();
                
            spy.calls.mostRecent().returnValue.then(() => { 
                fixture.detectChanges();
                expect(component.heroes).toBeTruthy();
                expect(component.heroes.length).toBe(5);
                done(); 
            });
            
        });
        
        it('Heroes has value ngOnInit using using fakeAsync() and tick()', fakeAsync(() => { 
            spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
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

