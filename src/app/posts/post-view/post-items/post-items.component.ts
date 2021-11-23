import {Component, Input, OnInit} from '@angular/core';
import {Media} from "../../../shared/model/media.model";
import {MediaUtils} from "../../../shared/util/media.utils";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {CDN_ADDRESS} from "../../../shared/config/api.constants";
import {QueryPost} from "../../../shared/model/query/query-post.model";

@Component({
    selector: 'app-post-items',
    templateUrl: './post-items.component.html',
    styleUrls: ['./post-items.component.css']
})
export class PostItemsComponent implements OnInit {
    @Input() post!: QueryPost;

    sortedMedia!: Media[];

    cdnAddress = CDN_ADDRESS;
    fileUrl!: string;

    currentIndex!: number;

    constructor(private store: Store<fromApp.AppState>,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.sortedMedia = MediaUtils.sortByPriority([...this.post.mediaSet]);

        this.activatedRoute.params.subscribe(params => {
            this.currentIndex = params.index;

            this.fileUrl = CDN_ADDRESS + this.sortedMedia[params.index].fileUri;
        });
    }

    onLoadMediaRequest(index: number): void {
        if (index == this.currentIndex) {
            return;
        }

        this.router.navigate(['/posts', this.post.postId, 'media', index], {
            queryParamsHandling: "merge"
        });
    }

    // TODO Implement
    onEditPost(): void {
        alert("Not implemented yet.");
    }
}
