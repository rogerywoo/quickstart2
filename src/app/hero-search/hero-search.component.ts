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
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
//  providers: [HeroSearchService]  Not able to get unit test to work on mocking metadata 
})
export class HeroSearchComponent implements OnInit {
    //heroes: Hero[] = [];
    public errMsg: String;
    public heroes: Observable<Hero[]>;
    testHeroes: Hero[] = [
        {"id" : 3, "name" : "Roger"},
        {"id" : 4, "name" : "Bill"}
    ];
        
    public heroSearchResults: Hero[];    
    public searchTerms = new Subject<string>();

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
     //   this.searchTerms.next(term);

//        this.heroSearchService.searchFix()
//          .subscribe(
//             /* happy path */ h => 
//                {
//                 console.log ("HeroSearchComponent - search - subscribe");
//                 this.heroes = h.slice(0,4);
//                },
//                error =>                   
//                {
//                    this.errMsg = error;
//                   console.log ("error from heroSearchServices:" + error);
//                },
//                () => console.log ("complete from heroSearchServices:")
//             );  
//         console.log('Called heroSearchService');
      this.searchTerms.next(term);                   
    }
    
//    testSearch(term: string ): void {      
//       this.heroSearchService
//      .searchFix()
//      .subscribe(
//         /* happy path */ heroes => this.heroes = heroes.slice( 0, 4 ) ,
//         /* error path */ error => this.errMsg = error);     
//  
//    }
    
    
    ngOnInit() {
        console.log(`hero-search -ngOnInit`);
        this.heroes =  this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(t => 
                    {   
                        if (t) {                     
                            console.log("hello t = " + t);
                            let heroSearchObservableResults:  Observable<Hero[]> = this.heroSearchService.search(t);
                            
                            return heroSearchObservableResults;
                        }else{
                            // or the observable of empty heroes if no search term
                            return Observable.of<Hero[]>([]);
                        };
                    })
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
