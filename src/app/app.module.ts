import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { LoginComponent } from './login/login.component';

import { HeroService } from './service/hero.service';
import { AuthService } from './service/auth.service';
import { HeroSearchService } from './service/hero-search.service';

import { TestPipeComponent } from './test-pipe/test-pipe.component';
import { TestAsyncPipeComponent } from './test-async-pipe/test-async-pipe.component';
import { TestAsyncSubjectPipeComponent } from './test-async-subject-pipe/test-async-subject-pipe.component';
import { SandboxComponent } from './sandbox/sandbox.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
                 AppComponent,
                 HeroesComponent,
                 DashboardComponent,
                 HeroSearchComponent,
                 HeroDetailComponent,
                 LoginComponent,
                 TestPipeComponent,
                 TestAsyncPipeComponent,
                 TestAsyncSubjectPipeComponent,
                 SandboxComponent
    ],
    providers: [HeroService, AuthService,HeroSearchService],
    bootstrap: [AppComponent]
})
export class AppModule { }
