import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


import { Hero } from '../model/hero';
import { HeroSearchService } from '../service/hero-search.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    testHeroes: Hero[] = [
        {"id" : 3, "name" : "Roger"},
        {"id" : 4, "name" : "Bill"}
    ];
        
    private searchTerms = new Subject<string>();

    constructor(
            private heroSearchService: HeroSearchService,
            private router: Router) {
        
/*  For testing and learning Observables.
        this.heroes = Observable.of(this.testHeroes);
        
        console.log('Begin Constructor');

        this.heroes
        .subscribe( data => {
            for (let h of data) {
                console.log(h.name);
            }
        });
        
                
        console.log('End Constructor');
        */
    }

    search(term: string): void {
      // Push a search term into the observable stream.
        console.log('Wrote ' + term)
        this.searchTerms.next(term);
    }

    ngOnInit() {
        this.heroes =  this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(t => t ? 
//                    Promise.resolve(this.testHeroes) :
                    this.heroSearchService.search(t) :
                            // or the observable of empty heroes if no search term
                    Observable.of<Hero[]>([]))
            .catch(error => {
        // TODO: real error handling
                console.log(`Error in component ... ${error}`);
                return Observable.of<Hero[]>([])
        });                    
             
    }       
        
    gotoDetail(hero: Hero): void {
        const link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
