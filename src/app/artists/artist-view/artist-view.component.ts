import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {QueryArtist} from "../../shared/model/query/query-artist.model";
import {getArtistStart} from "../store/artists.actions";
import {CDN_ADDRESS} from "../../shared/config/api.constants";
import * as PhotoSwipe from "photoswipe";
import * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import {AvatarExtensionsConfig} from "../../shared/config/avatar-extensions.config";
import {AvatarType} from "../../shared/enum/avatar-type.enum";

@Component({
    selector: 'app-artist-view',
    templateUrl: './artist-view.component.html',
    styleUrls: ['./artist-view.component.css']
})
export class ArtistViewComponent implements OnInit {

    @ViewChild('avatar', {read: ElementRef}) avatarRef!: ElementRef;

    isFetching!: boolean;
    selectedArtist!: QueryArtist | null;
    currentUser!: KeycloakProfile | null;

    galleryItems: { src: string, w: number, h: number }[] = [];

    cdnAddress = CDN_ADDRESS;

    errorMessage!: string | null;

    private storeSubscription!: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
                private renderer: Renderer2,
                private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {
        this.storeSubscription = this.store.select('artists').subscribe(state => {
            this.isFetching = state.isFetching;
            this.selectedArtist = state.selectedArtist;
            this.errorMessage = state.fetchErrorMessage;

            this.loadGalleryItems();
        });
        this.storeSubscription = this.store.select('authentication').subscribe(state => {
            this.currentUser = state.currentUser;
        });

        // Load artist from API
        setTimeout(() => this.loadArtist());
    }

    openImageGallery(): void {
        if (!this.selectedArtist?.avatar) {
            return;
        }

        const galleryElement: HTMLElement = document.querySelector('.pswp')!;

        const options = {
            history: false,
            index: 0,
            clickToCloseNonZoomable: false
        };

        const gallery = new PhotoSwipe(galleryElement, PhotoSwipeUI_Default, this.galleryItems, options);
        gallery.listen('gettingData', (index, item) => {
            if (item.w! < 1 || item.h! < 1) {
                const img = new Image();
                img.onload = function () {
                    // @ts-ignore
                    item.w = this.width;
                    // @ts-ignore
                    item.h = this.height;
                    gallery.invalidateCurrItems();
                    gallery.updateSize(true);
                };
                img.src = item.src!;
            }
        });
        gallery.init();
    }

    loadArtist(): void {
        // If artist already selected
        if (this.selectedArtist != null) {
            return;
        }

        const artistId = this.activatedRoute.snapshot.params.artistId;

        this.store.dispatch(getArtistStart({
            artistId,
            userId: this.currentUser?.id!
        }));
    }

    private loadGalleryItems() {
        if (!this.selectedArtist?.avatar) {
            return;
        }

        switch (AvatarExtensionsConfig.getTypeByExtension(this.selectedArtist!.avatar.extension)) {
            case AvatarType.IMAGE:
                this.galleryItems.push({
                    src: CDN_ADDRESS + this.selectedArtist!.avatar.fileUri,
                    w: 0,
                    h: 0
                });
                break;
        }
    }
}