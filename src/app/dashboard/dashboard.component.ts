import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';

import { HeroSearchService } from '../service/hero-search.service';


@Component( {
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    errMsg: string;

    constructor(
        private heroService: HeroService,
        private heroSearchService:  HeroSearchService,
        private router: Router ) {

    }

    ngOnInit(): void {      
       this.heroService
      .getHeroes()
      .subscribe(
         /* happy path */ heroes => this.heroes = heroes.slice( 0, 4 ) ,
         /* error path */ error => this.errMsg = error);     
  
    }

    
    testSearch(term: string ): void {      
       this.heroSearchService
      .searchFix()
      .subscribe(
         /* happy path */ heroes => this.heroes = heroes.slice( 0, 4 ) ,
         /* error path */ error => this.errMsg = error);     
  
    }
    
    
    gotoDetail( hero: Hero ): void {
        //alert(hero.name);
        const link = ['/detail', hero.id];
        this.router.navigate( link );
    }
    private handleError( error ): void {
        console.error( 'An error occurred', error );
        this.errMsg = error;
    }
}
