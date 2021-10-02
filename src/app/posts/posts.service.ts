import {Injectable} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import {startSearch, updateSearchParams, updateSearchQuery} from "./store/posts.actions";
import {KeycloakProfile} from "keycloak-js";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    query!: string;
    sortBy!: string;
    size!: number;
    order!: string;
    page!: number;

    currentUser!: KeycloakProfile | null;

    constructor(private store: Store<fromApp.AppState>, private activatedRoute: ActivatedRoute) {
        this.store.select('authentication').subscribe(state => {
            this.currentUser = state.currentUser;
        });

        this.store.select('posts').subscribe(state => {
            this.query = state.query;
            this.sortBy = state.sortBy;
            this.size = state.size;
            this.order = state.order;
            this.page = state.page;
        });

        this.activatedRoute.queryParams.subscribe(params => {
            this.updateSearchQuery(params.query);
            this.updateSearchParams(params.sortBy, params.order, params.size);
        });
    }

    triggerSearch(): void {
        this.store.dispatch(startSearch(
            {
                query: this.query,
                sortBy: this.sortBy,
                order: this.order,
                size: this.size,
                page: this.page,
                userId: this.currentUser!.id!
            }
        ));
    }

    private updateSearchQuery(query: string): void {
        query = (!!query ? query : '');

        this.store.dispatch(updateSearchQuery({
            query: query
        }));
    }

    private updateSearchParams(sortBy: string,
                               order: string,
                               size: number): void {
        // Check if values are empty and if so use old values (default if never changed)
        sortBy = (!!sortBy) ? sortBy : this.sortBy;
        order = (!!order) ? order : this.order;
        size = (!!size) ? size : this.size;


        this.store.dispatch(updateSearchParams({
            sortBy: sortBy,
            order: order,
            size: size
        }));
    }
}
