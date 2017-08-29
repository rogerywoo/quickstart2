import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAsyncSubjectPipeComponent } from './test-async-subject-pipe.component';

describe('TestAsyncSubjectPipeComponent', () => {
  let component: TestAsyncSubjectPipeComponent;
  let fixture: ComponentFixture<TestAsyncSubjectPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAsyncSubjectPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAsyncSubjectPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
