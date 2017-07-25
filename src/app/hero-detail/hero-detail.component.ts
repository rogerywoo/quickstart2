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
        
        // Get Hero
        this.hero = {"id":1, "name": "Test"};
    
    }
    
    goBack():void{
        alert('Back');
    }
    
    save(): void{
        alert('Save');
        
    }
    
}
