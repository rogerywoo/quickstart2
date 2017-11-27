import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    addingHero = false;
    error: any;
    showNgFor = false;
    
    constructor(
        private router: Router,            
        private heroService: HeroService) {
    }

    getHeroes():  void {
        this.heroService
          .getHeroes()
          .subscribe(
             /* happy path */ heroes => this.heroes = heroes,      
             /* error path */ error => this.error = error);            
    }
    
    ngOnInit() {        
        this.getHeroes();
        
//      this.heroService
//      .getHeroes()
//      .subscribe(
//         /* happy path */ heroes => this.heroes = heroes,      
//         /* error path */ error => this.error = error);      
      
    }
    
    addHero(): void {
        this.addingHero = true;
        this.selectedHero = null;
    }
    
    deleteHero(hero, event): void {
        let numberDeleted: number;
        alert (hero.id);
        event.stopPropagation();
        
        this.heroService.deleteHero(hero.id)
            .then (count =>
            {
                numberDeleted = count;
                this.getHeroes();
            })
            .catch(error => {
                this.error = error;
                alert (error);
            }); // TODO: Display error message);        
    }
    
    onSelect(hero): void {
        this.selectedHero = hero;
    }
    
    
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
        
//    getHeroes():  Promise<any>   {
//        return this.heroService
//          .getHeroes()
//          .then(heroes => this.heroes = heroes)
//          .catch(error => this.error = error);
//      }
    
  
}
