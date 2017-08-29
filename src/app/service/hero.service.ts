import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';

@Injectable()
export class HeroService {

    heroes: Hero[] = [
                          {"id" : 1, "name" : "John"},
                          {"id" : 2, "name" : "Tom"},
                          {"id" : 3, "name" : "Roger"},
                          {"id" : 4, "name" : "Bill"},
                          {"id" : 5, "name" : "Jill"},
                          {"id" : 6, "name" : "Tanya"},
                          {"id" : 7, "name" : "Robin"},
                          {"id" : 8, "name" : "Brenda"}
                          ];
    constructor() { }

    getHeroes(): Promise<Array<Hero>> {
        return Promise.resolve(this.heroes);
    }
    
    getHero(id: number ):Promise<Hero> {
        console.log('HeroService.getHero source called');
        return this.getHeroes()
            .then (heroes => 
                heroes.find(hero => hero.id === id)             
            );
    }
}

