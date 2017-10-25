import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Hero } from '../model/hero';

@Injectable()
export class HeroSearchService {

    constructor( private http: Http ) { }

    search( term: string ): Observable<Hero[]> {
        return this.http
            .get(environment.serviceUrl.concat(`/heroes/?name=${term}`))
            .map(( r: Response ) => { 
                if ((r.status < 200)  || (r.status >=300)){
//                    throw  Observable.throw('This request has failed ' + r.status);
                    throw  new Error(('This request has failed ' + r.status));
                }          
                else{                     
                    return r.json();
                }})
            .catch(( error: any ) => {
                console.error( 'A friendly error occurred', error );
                return Observable.throw( error.message || error );
            });
    }
    
    searchFix(): Observable<Hero[]> {
        console.log("HeroSearchService.searchFix");
        return this.http
            .get(environment.serviceUrl.concat(`/heroes`))
            .map(( r: Response ) => { 
                if ((r.status < 200)  || (r.status >=300)){
                    throw  new Error(('This request has failed ' + r.status));
                }          
                else{                     
                    return r.json();
                }})
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                return Observable.throw( error.message || error );
            });
    }
}
