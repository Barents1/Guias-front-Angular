import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarpagosComponent } from './realizarpagos.component';

describe('RealizarpagosComponent', () => {
  let component: RealizarpagosComponent;
  let fixture: ComponentFixture<RealizarpagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealizarpagosComponent]
    });
    fixture = TestBed.createComponent(RealizarpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
