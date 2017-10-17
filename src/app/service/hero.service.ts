import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Hero } from '../model/hero';

@Injectable()
export class HeroService {

  heroes: Hero[];
  
//    heroes: Hero[] = [
//                          {"id" : 1, "name" : "John"},
//                          {"id" : 2, "name" : "Tom"},
//                          {"id" : 3, "name" : "Roger"},
//                          {"id" : 4, "name" : "Bill"},
//                          {"id" : 5, "name" : "Jill"},
//                          {"id" : 6, "name" : "Tanya"},
//                          {"id" : 7, "name" : "Robin"},
//                          {"id" : 8, "name" : "Brenda"}
//                          ];
    
    constructor( private http: Http ) { }


//    getHeroes(): Promise<Array<Hero>> {
//        return Promise.resolve(this.heroes);
//    }
//    
  
    getHeroes():  Observable<Hero[]>{
        console.log("HeroService.getHeroes()");
      
//              this.http.get('http://localhost:3000/heroes')
//                      .map(response => response.json())
//                    .subscribe(
//                        function(response) { 
//                          this.heroes =  response;
//                          //console.log("Success Response" + response.json().data);},                          
//                        },
//                        function(error) { console.log("Error happened" + error)},
//                        function() 
//                          { console.log("the subscription is completed");
//                            return this.heroes;
//                          }
//                        );      
      
        return this.http
            .get(environment.serviceUrl.concat('/heroes'))
            .map(( r: Response ) => r.json())
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                return Observable.throw( error.message || error );
            });
    };
    
    getHero(id: number ): Promise<Hero> {
            return this.http.get(environment.serviceUrl.concat('/heroes/', String(id)))
            .map(( r: Response ) => r.json())
            .toPromise()
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                
            });
    }  
}
