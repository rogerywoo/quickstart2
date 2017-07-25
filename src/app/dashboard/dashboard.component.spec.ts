import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;


    let MockHero: Hero = <Hero>{id: 1, name: 'Superman'};
    let MockHero2: Hero = <Hero>{id: 2, name: 'IronMan'};
    let MockHeroesArray: Array<Hero> = [ MockHero, MockHero2 ];


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
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
//    it('test ngOnInit', fakeAsync){
//        
//    };

});
