import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRecipesComponent } from './fav-recipes.component';

describe('FavRecipesComponent', () => {
  let component: FavRecipesComponent;
  let fixture: ComponentFixture<FavRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavRecipesComponent]
    });
    fixture = TestBed.createComponent(FavRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
