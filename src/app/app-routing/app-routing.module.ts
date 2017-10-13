import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from '../dashboard/dashboard.component';
import { HeroDetailComponent }   from '../hero-detail/hero-detail.component';
import { LoginComponent }   from '../login/login.component';
import { HeroesComponent }   from '../heroes/heroes.component';
import { TestPipeComponent }   from '../test-pipe/test-pipe.component';
import { TestAsyncPipeComponent }   from '../test-async-pipe/test-async-pipe.component';
import { TestAsyncSubjectPipeComponent }   from '../test-async-subject-pipe/test-async-subject-pipe.component';
import { SandboxComponent }   from '../sandbox/sandbox.component';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'detail/:id',  component: HeroDetailComponent },
    { path: 'login',  component: LoginComponent },
    { path: 'heroes',  component: HeroesComponent },    
    { path: 'testpipe',  component: TestPipeComponent },
    { path: 'testasyncpipe',  component: TestAsyncPipeComponent },
    { path: 'testasyncsubjectpipe',  component: TestAsyncSubjectPipeComponent },
    { path: 'sandbox',  component: SandboxComponent },    
    ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) 
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
