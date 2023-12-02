import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarfacturaComponent } from './generarfactura.component';

describe('GenerarfacturaComponent', () => {
  let component: GenerarfacturaComponent;
  let fixture: ComponentFixture<GenerarfacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarfacturaComponent]
    });
    fixture = TestBed.createComponent(GenerarfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
