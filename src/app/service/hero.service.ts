import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { ConstantService } from './constant.service';
import { Hero } from '../model/hero';


@Injectable()
export class HeroService {

    heroes: Hero[];
    
    constructor( private http: Http ) { }
  
    getHeroes():  Observable<Hero[]>{
        console.log("HeroService.getHeroes()");
            
        return this.http
            .get(environment.serviceUrl.concat('/heroes'))
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
    };
    
    getHero(id: number ): Promise<Hero> {
        return this.http.get(environment.serviceUrl.concat('/heroes/', String(id)))
            .map(( r: Response ) => { 
                if ((r.status < 200)  || (r.status >=300)){
                    throw  new Error(('This request has failed ' + r.status));
                }          
                else{                     
                    return r.json();
                }})
            .toPromise()
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                throw error;
                
            });
    }  
    
    addHero(hero: Hero ): Promise<number> {
        const heroJson = JSON.stringify(hero);
        
//        return new Promise(function (resolve, reject) {
//            try{
//                throw new Error("We have a problem");
//            }catch (err){
//                reject(err);
//            }
//                       
//        });
        
        return this.http.post(environment.serviceUrl.concat('/heroes/'), heroJson, ConstantService.JSON_HEADER)
            .map(( r: Response ) => { 
                if ((r.status < 200)  || (r.status >=300)){
                    throw  new Error(('This request has failed ' + r.status));
                }          
                else{                     
                    return r.json();
                }})
            .toPromise()
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                throw  error;
                
            });
    }    
      
    updateHero(hero: Hero ): Promise<number> {
        const heroJson = JSON.stringify(hero);
        
        return this.http.put(environment.serviceUrl.concat('/heroes/'), heroJson, ConstantService.JSON_HEADER)
            .map(( r: Response ) => { 
                if ((r.status < 200)  || (r.status >=300)){
                    throw  new Error(('This request has failed ' + r.status));
                }          
                else{                     
                    return r.json();
                }})
            .toPromise()
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                throw error;
                
            });
    }
        
    deleteHero(heroId: number ): Promise<number> {
        
        return this.http.delete(environment.serviceUrl.concat('/heroes/', String(heroId)))
            .map(( r: Response ) => { 
                if ((r.status < 200)  || (r.status >=300)){
                    throw  new Error(('This request has failed ' + r.status));
                }          
                else{                     
                    return r.json();
                }})
            .toPromise()
            .catch(( error: any ) => {
                console.error( 'An friendly error occurred', error );
                throw  error;
                
            });
    }   
}
