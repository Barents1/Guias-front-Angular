import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasComponent } from './guias.component';

describe('GuiasComponent', () => {
  let component: GuiasComponent;
  let fixture: ComponentFixture<GuiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiasComponent]
    });
    fixture = TestBed.createComponent(GuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
