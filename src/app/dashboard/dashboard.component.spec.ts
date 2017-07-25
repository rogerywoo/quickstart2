import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    
    let heroService: HeroService;

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
                HeroService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        heroService = TestBed.get(HeroService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
    it('Heroes has value  using done.',  (done) => {  
        let spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
        component.ngOnInit();
        
        spy.calls.mostRecent().returnValue.then(() => { 
            fixture.detectChanges();
            expect(component.heroes).toBeTruthy();
            expect(component.heroes.length).toBe(4);
            done(); 
        });
    });

    it('Heroes has value via async() and whenStable()', async(() => { 
        spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(MockHeroesArray));
        fixture.whenStable().then(() => { 
          fixture.detectChanges();
          expect(component.heroes).toBeTruthy();
          expect(component.heroes.length).toBe(4);
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
});
