import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import {Post} from "../../shared/model/post.model";
import {Subscription} from "rxjs";
import {selectPost} from "../store/posts.actions";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts!: Post[];

    private storeSubscription!: Subscription;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {
        this.storeSubscription = this.store.select('posts').subscribe(state => {
            this.posts = state.posts;
        });

        this.store.dispatch(selectPost({
            post: null
        }))
    }

    ngOnDestroy(): void {
        this.storeSubscription.unsubscribe();
    }

}
