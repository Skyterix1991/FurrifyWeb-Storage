import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import {Post} from "../../shared/model/post.model";
import {PostsService} from "../posts.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts!: Post[];

    private storeSubscription!: Subscription;

    constructor(private store: Store<fromApp.AppState>, private postService: PostsService) {
    }

    ngOnInit(): void {
        this.storeSubscription = this.store.select('posts').subscribe(state => {
            this.posts = state.posts;
        });

        this.postService.triggerSearch();
    }

    ngOnDestroy(): void {
        this.storeSubscription.unsubscribe();
    }

}