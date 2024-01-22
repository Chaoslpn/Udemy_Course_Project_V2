import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isLoggedIn = false;

    constructor(private store: Store<fromApp.AppState>) {}
    
    ngOnInit(): void {
        this.userSub = this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                this.isLoggedIn = !!user;
            });
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    
    onSaveData() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}