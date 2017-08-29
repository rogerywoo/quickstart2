import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
    let component: HeroSearchComponent;
    let fixture: ComponentFixture<HeroSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[RouterTestingModule],                   
            declarations: [ HeroSearchComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroSearchComponent);
        component = fixture.componentInstance;
    });

    it('HeroSearchComponent should be created', () => {
        expect(component).toBeTruthy();
    });
    
    describe('HeroSearchComponent: Init Test', () => {
        it('Heroes has value via async() and whenStable()', async(() => {            
//            spyOn(heroService, 'getHero').and.returnValue(Promise.resolve(MockHeroesArray.find(h => h.id === 2)));
//            
//            fixture.detectChanges();
//            
//            fixture.whenStable().then(() => { 
//                expect(component.hero).toBeTruthy();
//                expect(component.hero.name).toBe('IronMan');                
//            });
//            
//            component.ngOnInit();
        }));
    });
    
});
