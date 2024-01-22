import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor (
    private loggingService: LoggingService, 
    private store: Store<fromApp.AppState>) {

  }
  
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }
  ngOnDestroy(): void {
    
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
