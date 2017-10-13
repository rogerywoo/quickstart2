import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Hero } from '../model/hero';

@Injectable()
export class HeroSearchService {

    constructor( private http: Http ) { }

    search( term: string ): Observable<Hero[]> {
        return this.http
            .get(`http://localhost:3000/heroes/?name=${term}`)
            .map(( r: Response ) => r.json())
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                return Observable.throw( error.message || error );
            });
    }
}
