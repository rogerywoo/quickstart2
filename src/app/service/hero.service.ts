import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';

@Injectable()
export class HeroService {

    testHeroes: Hero[] = [
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
        return Promise.resolve(this.testHeroes);
    }
    
    getHero(hero: Hero ):Promise<Hero> {
        return Promise.resolve(this.testHeroes[0]);
    }
}
