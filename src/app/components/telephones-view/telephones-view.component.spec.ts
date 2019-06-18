import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephonesViewComponent } from './telephones-view.component';

describe('TelephonesViewComponent', () => {
  let component: TelephonesViewComponent;
  let fixture: ComponentFixture<TelephonesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephonesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephonesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
