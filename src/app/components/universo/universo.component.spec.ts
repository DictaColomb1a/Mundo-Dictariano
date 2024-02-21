import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversoComponent } from './universo.component';

describe('UniversoComponent', () => {
  let component: UniversoComponent;
  let fixture: ComponentFixture<UniversoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversoComponent]
    });
    fixture = TestBed.createComponent(UniversoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
