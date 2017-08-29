import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;

    
    constructor(
            private heroService: HeroService,
            private route: ActivatedRoute) {
          }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                // Get Hero
                this.getHero(+params['id']);
            }
        });
    }
       
    goBack(savedHero: Hero = null): void {
        if (window.history.length > 0) { window.history.back(); }
    }
    
    save(): void{
        alert('Save');
        
    }
    
    getHero(id: number ): void{ 
        let testhero :Hero;
//        console.log ('source called');
        this.heroService.getHero(id)
            .then(hero => 
                {                    
                    //console.log('hero-detail.getHero source called');                
                    this.hero = hero;
                    testhero = this.hero;
                    
                }
            );       
    }
}
