import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephonePanelComponent } from './telephone-panel.component';

describe('TelephonePanelComponent', () => {
  let component: TelephonePanelComponent;
  let fixture: ComponentFixture<TelephonePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephonePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephonePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
