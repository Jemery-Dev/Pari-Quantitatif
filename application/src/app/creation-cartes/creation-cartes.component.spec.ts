import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCartesComponent } from './creation-cartes.component';

describe('CreationCartesComponent', () => {
  let component: CreationCartesComponent;
  let fixture: ComponentFixture<CreationCartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreationCartesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationCartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
