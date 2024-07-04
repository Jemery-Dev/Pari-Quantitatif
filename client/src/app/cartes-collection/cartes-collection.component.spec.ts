import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartesCollectionComponent } from './cartes-collection.component';

describe('CartesCollectionComponent', () => {
  let component: CartesCollectionComponent;
  let fixture: ComponentFixture<CartesCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartesCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
