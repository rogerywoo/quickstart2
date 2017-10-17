import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';

describe('HeroDetailComponent', () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;

    let MockHero: Hero = <Hero>{id: 2, name: 'IronMan'};


    let MockHeroesArray: Array<Hero> = [ 
        {id: 1, name: 'Superman'},
        {id: 2, name: 'IronMan'},
        {id: 3, name: 'Hulk'},
        {id: 4, name: 'Batman'},
        {id: 5, name: 'Aquaman'}
    ];
    let heroService: HeroService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[RouterTestingModule, FormsModule, HttpModule],              
            declarations: [ HeroDetailComponent ],
            providers: [
                        HeroService,
                        {
                            provide: ActivatedRoute, useValue: {                        
                                params: Observable.of({ id: 2 })
                            }
                        }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        heroService = TestBed.get(HeroService);        
    });
          
    describe('HeroDetailComponent', () => {
        it('should be created', () => {
            expect(component).toBeTruthy();
        });
    });
        
    describe('HeroDetailComponent: Init Test', () => {
        it('Heroes has value via async() and whenStable()', async(() => {            
            spyOn(heroService, 'getHero').and.returnValue(Promise.resolve(MockHeroesArray.find(h => h.id === 2)));
            
            fixture.detectChanges();
            
            fixture.whenStable().then(() => { 
                expect(component.hero).toBeTruthy();
                expect(component.hero.name).toBe('IronMan');                
            });
            
            component.ngOnInit();
        }));
    });
    
    describe('HeroDetailComponent: getHero Test Get Back Hulk', () => {   
        it('Heroes has getHero', () => { 
            expect(component.getHero).toBeTruthy();
            
        });  
    
        it('Test getHero using toHaveBeenCalledWith 2', async(() => {                
            
            let testId = 3;
            let heroServiceSpy = spyOn(heroService, 'getHero').and
                .returnValue(Promise.resolve(MockHeroesArray.find(h => h.id === testId)));
            fixture.detectChanges();
            
            fixture.whenStable().then(() => { 
                
                component.getHero(3);
                fixture.whenStable().then(() => { 
                    expect(component.hero.name).toBe('Hulk');
                    expect(heroServiceSpy).toHaveBeenCalledWith(3);
                });
            });
        })); 
    
    });    
});
