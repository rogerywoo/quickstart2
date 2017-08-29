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
        private heroService: HeroService) {
    }

    ngOnInit() {        
        this.getHeroes();
    }
    
    getHeroes():  Promise<any>   {
        return this.heroService
          .getHeroes()
          .then(heroes => this.heroes = heroes)
          .catch(error => this.error = error);
      }
}