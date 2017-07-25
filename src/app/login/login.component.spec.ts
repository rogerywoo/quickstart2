import { async, ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {DebugElement} from "@angular/core"; 
import {By} from "@angular/platform-browser"; 

import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let el: DebugElement; 

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            providers: [
                AuthService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        //
        //fixture.detectChanges();
        //
        // UserService provided to the TestBed
        authService = TestBed.get(AuthService);
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
  
    
    it('login button hidden prior to detectChanges', () => {
        el = fixture.debugElement.query(By.css('#chkLogin')); 
    
        expect(el.nativeElement.textContent.trim()).toBe('');
    });

    it('login button set to Login when isAuthenticated returns true after detectChanges', () => {
        el = fixture.debugElement.query(By.css('#chkLogin'));
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('You are logged in.');
    });
    it('login button set to Logout to be default after detectChanges', () => {
        el = fixture.debugElement.query(By.css('#chkLogin'));
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('You are not logged in.');
    });

    //This does not work
    //By the time we run the last expectation the AuthService.isAuthenticated() 
    //function hasn’t yet resolved to a value. Therefore the needsLogin property on the LoginComponent hasn’t been updated.
    
//    it('Button label via jasmine.done Does not work using the following', () => {
//        el = fixture.debugElement.query(By.css('#afterNgOnInit'));
//    
//        fixture.detectChanges(); 
//        expect(el.nativeElement.textContent.trim()).toBe('You are not logged in.'); 
//        // Not yet back from async call.
//        spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true)); 
//        component.ngOnInit(); 
//        fixture.detectChanges(); 
//        expect(el.nativeElement.textContent.trim()).toBe('You are logged in.'); 
//      });
    
    //When we are done with our asynchronous tasks we tell Jasmine via the done 
    it('Button label via jasmine.done',  (done) => {  
        el = fixture.debugElement.query(By.css('#afterNgOnInit'));
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('You are not logged in.');
        let spy = spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
        component.ngOnInit();
        
        spy.calls.mostRecent().returnValue.then(() => { 
            fixture.detectChanges();
            expect(el.nativeElement.textContent.trim()).toBe('You are logged in.');
            done(); 
        });
    });
    
    it('Button label via async() and whenStable()', async(() => { 
        el = fixture.debugElement.query(By.css('#afterNgOnInit'));
    
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('You are not logged in.');
        spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
        fixture.whenStable().then(() => { 
          fixture.detectChanges();
          expect(el.nativeElement.textContent.trim()).toBe('You are logged in.');
        });
        component.ngOnInit();
    }));
    
    
    it('Button label via fakeAsync() and tick()', fakeAsync(() => { 
        el = fixture.debugElement.query(By.css('#afterNgOnInit'));
    
        expect(el.nativeElement.textContent.trim()).toBe('');
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('You are not logged in.');
        spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
        component.ngOnInit();

        //The tick() function blocks execution and simulates the passage of time until 
        //all pending asynchronous activities complete.
        
        tick(); 
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('You are logged in.');
      }));
});
