import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagosComponent } from './homepagos.component';

describe('HomepagosComponent', () => {
  let component: HomepagosComponent;
  let fixture: ComponentFixture<HomepagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepagosComponent]
    });
    fixture = TestBed.createComponent(HomepagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
