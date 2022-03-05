import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {PostCreateService} from "../post-create.service";
import {MediaWrapper} from "../../store/posts.reducer";
import {MediaSourceStrategyConfig} from "../../../shared/config/media-source-strategy.config";
import {addMediaSource, clearSourceData} from "../../store/posts.actions";
import {CreateSource} from "../../../shared/model/request/create-source.model";
import {SourceCreateService} from "../source-create.service";

@Component({
    selector: 'app-media-source-create',
    templateUrl: './media-source-create.component.html',
    styleUrls: ['./media-source-create.component.css']
})
export class MediaSourceCreateComponent implements OnInit {

    spinnerIcon = faCircleNotch;

    @ViewChild('source', {read: ElementRef}) sourceRef!: ElementRef;
    @ViewChild('dataTemplate', {read: ViewContainerRef}) dataTemplateRef!: ViewContainerRef;

    @Input() media!: MediaWrapper;
    mediaSet!: MediaWrapper[];

    errorMessage!: string;
    isFetching!: boolean;

    data: any = null;

    sourceCreateForm!: FormGroup;

    private postsStoreSubscription!: Subscription;

    constructor(private store: Store<fromApp.AppState>,
                private postCreateService: PostCreateService,
                private renderer: Renderer2,
                private sourceCreateService: SourceCreateService) {
    }

    ngOnInit(): void {
        this.postsStoreSubscription = this.store.select('posts').subscribe(state => {
            this.isFetching = state.isFetching;
            this.errorMessage = state.artistErrorMessage;
            this.mediaSet = state.mediaSet;
            this.data = state.createSourceData;
        });

        this.sourceCreateForm = new FormGroup({
            strategy: new FormControl(
                this.sourceCreateService.lastMediaSourceStrategy,
                [Validators.required]
            )
        });

        // Clear data for strategy
        this.store.dispatch(clearSourceData());

        setTimeout(() => {
            // If strategy selected load template
            this.loadDataTemplate();
        })
    }

    ngOnDestroy(): void {
        this.postsStoreSubscription.unsubscribe();
    }

    onSubmit(): void {
        // If data is null or source is duplicate
        if (this.data === null ||
            this.sourceCreateService.isMediaSourceDuplicate(
                this.sourceCreateForm.controls.strategy.value, this.data, this.media
            )) {
            return;
        }

        const mediaIndex = this.mediaSet.indexOf(this.media);

        this.store.dispatch(addMediaSource({
            mediaIndex,
            source: new CreateSource(
                this.sourceCreateForm.controls.strategy.value,
                this.data
            )
        }));

        this.postCreateService.mediaSourceCreateCloseEvent.emit();
    }

    onClose(): void {
        this.renderer.addClass(this.sourceRef.nativeElement, "animate__fadeOut");

        // Let the animation finish
        setTimeout(() => {
            this.postCreateService.mediaSourceCreateCloseEvent.emit();
        }, 100);
    }

    loadDataTemplate(): void {
        const strategy = this.sourceCreateForm.controls.strategy.value;

        if (!strategy) {
            return;
        }

        this.sourceCreateService.lastMediaSourceStrategy = strategy;
        this.store.dispatch(clearSourceData());

        this.dataTemplateRef!.clear();
        this.dataTemplateRef!.createComponent(MediaSourceStrategyConfig.getTemplateComponent(strategy));
    }
}