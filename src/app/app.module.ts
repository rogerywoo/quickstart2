import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


import { HeroService } from './service/hero.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
    declarations: [
                 AppComponent,
                 HeroesComponent,
                 DashboardComponent,
                 HeroSearchComponent,
                 HeroDetailComponent
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule { }
