import {Component, Input, OnInit} from '@angular/core';
import {PostUtils} from "../../../shared/util/post.utils";
import {Tag} from "../../../shared/model/tag.model";
import {TagUtils} from "../../../shared/util/tag.utils";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faImage} from "@fortawesome/free-solid-svg-icons/faImage";
import {MediaUtils} from "../../../shared/util/media.utils";
import {MediaType} from "../../../shared/enum/media-type.enum";
import {PostsService} from "../../posts.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {selectPost} from "../../store/posts.actions";
import {faFilm} from "@fortawesome/free-solid-svg-icons/faFilm";
import {QueryPost} from "../../../shared/model/query/query-post.model";
import {faHeadphones} from "@fortawesome/free-solid-svg-icons/faHeadphones";

@Component({
    selector: 'app-post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

    @Input() post!: QueryPost;

    thumbnailUri!: string;

    movieTags!: Tag[];
    characterTags!: Tag[];

    imageIcon = faImage;
    videoIcon = faVideo;
    animationIcon = faFilm;
    audioIcon = faHeadphones;

    imageType = MediaType.IMAGE;
    videoType = MediaType.VIDEO;
    animationType = MediaType.ANIMATION;
    audioType = MediaType.AUDIO;

    constructor(private postsService: PostsService, private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {
        this.thumbnailUri = PostUtils.getPostThumbnailUrlFromMediaSet(this.post.mediaSet)!;

        this.movieTags = TagUtils.filterTagsByType("MOVIE", this.post.tags);
        this.characterTags = TagUtils.filterTagsByType("CHARACTER", this.post.tags);
    }

    mediaSetContains(type: MediaType): boolean {
        return MediaUtils.containsType(type, this.post.mediaSet);
    }

    searchPosts(): void {
        // Let router link act out first
        setTimeout(() => {
            this.postsService.triggerSearch();
        });
    }

    selectPost(post: QueryPost): void {
        this.store.dispatch(
            selectPost({
                post: post
            })
        );
    }
}
