import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAsyncPipeComponent } from './test-async-pipe.component';

describe('TestAsyncPipeComponent', () => {
  let component: TestAsyncPipeComponent;
  let fixture: ComponentFixture<TestAsyncPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAsyncPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAsyncPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
