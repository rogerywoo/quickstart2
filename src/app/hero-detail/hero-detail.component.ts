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
    error: any;
    
    constructor(
            private heroService: HeroService,
            private route: ActivatedRoute) {
          }

    ngOnInit(): void {
        console.log("hero-detail ngOnInit");  
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                console.log("hero-detail ngOnInit, id = " + String(params['id']));    
                this.getHero(+params['id']);
            }
            else{
                this.hero = new Hero();
            }
        });
    }
       
    goBack(): void {
        if (window.history.length > 0) { window.history.back(); }
    }
    
    save(savedHero: Hero): void{
        if (!savedHero.id) {

            this.heroService.addHero(savedHero)
                .then(h =>{
                    alert(h);
                    this.goBack();
                   
                })
            .catch(error => {
                this.error = error;
                alert (error.statusTex);
            }); // TODO: Display error message
            
        } else {
            alert('Rename Hero Id = ' + savedHero.id);     
            this.heroService.updateHero (savedHero)
                .then(h =>{
                    alert(h);
                    this.goBack();
                   
                })
            .catch(error => {
                this.error = error;
                alert (error.statusText);
            }); // TODO: Display error message
        }
    }
    
    getHero(id: number ): void{ 
        let testhero: Hero;
//        console.log ('source called');
        this.heroService.getHero(id)
            .then(hero => 
                {                    
                    //console.log('hero-detail.getHero source called');                
                    this.hero = hero;
                    testhero = this.hero;
                    
                }
            )
            .catch(error => {
                this.error = error;
                alert (error.statusTex);
            });
    }
}
