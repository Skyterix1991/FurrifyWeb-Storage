import {createAction, props} from "@ngrx/store";
import {ArtistWrapper, AttachmentWrapper, MediaWrapper, TagWrapper} from "./post-create.reducer";
import {Tag} from "../../../shared/model/tag.model";
import {Artist} from "../../../shared/model/artist.model";
import {CreateSource} from "../../../shared/model/request/create-source.model";
import {CreatePost} from "../../../shared/model/request/create-post.model";
import {PostCreateStatusEnum} from "../../../shared/enum/post-create-status.enum";

export const updatePostSavedTitle = createAction(
    '[PostCreate] Update post saved title',
    props<{ title: string }>()
);

export const updatePostSavedDescription = createAction(
    '[PostCreate] Update post saved description',
    props<{ description: string }>()
);

export const addTagToSelectedSetStart = createAction(
    '[PostCreate] Add tag to selected set start',
    props<{ userId: string, value: string }>()
);

export const addTagToSelectedSetFail = createAction(
    '[PostCreate] Add tag to selected set fail',
    props<{ value: string, errorMessage: string }>()
);

export const addTagToSelectedSetSuccess = createAction(
    '[PostCreate] Add tag to selected set success',
    props<{ tagWrapper: TagWrapper }>()
);

export const createTagStart = createAction(
    '[PostCreate] Create tag start',
    props<{ userId: string, tag: Tag }>()
);

export const createTagFail = createAction(
    '[PostCreate] Create tag fail',
    props<{ errorMessage: string }>()
);

export const fetchTagAfterCreationStart = createAction(
    '[PostCreate] Fetch tag after creation start',
    props<{ userId: string, value: string }>()
);

export const fetchTagAfterCreationFail = createAction(
    '[PostCreate] Create tag after creation fail',
    props<{ errorMessage: string }>()
);

export const fetchTagAfterCreationSuccess = createAction(
    '[PostCreate] Fetch tag after creation success',
    props<{ tag: Tag }>()
);

export const removeTagFromSelected = createAction(
    '[PostCreate] Remove tag from selected',
    props<{ tag: Tag }>()
);

export const addArtistToSelectedSetStart = createAction(
    '[PostCreate] Add artist to selected set start',
    props<{ userId: string, preferredNickname: string }>()
);

export const addArtistToSelectedSetFail = createAction(
    '[PostCreate] Add artist to selected set fail',
    props<{ preferredNickname: string, errorMessage: string }>()
);

export const addArtistToSelectedSetSuccess = createAction(
    '[PostCreate] Add artist to selected set success',
    props<{ artistWrapper: ArtistWrapper }>()
);

export const removeArtistFromSelected = createAction(
    '[PostCreate] Remove artist from selected',
    props<{ artist: Artist }>()
);

export const createArtistStart = createAction(
    '[PostCreate] Create artist start',
    props<{ userId: string, artist: Artist, avatar: File }>()
);

export const createArtistFail = createAction(
    '[PostCreate] Create artist fail',
    props<{ errorMessage: string }>()
);

export const fetchArtistAfterCreationStart = createAction(
    '[PostCreate] Fetch artist after creation start',
    props<{ userId: string, artistId: string }>()
);

export const fetchArtistAfterCreationFail = createAction(
    '[PostCreate] Create artist after creation fail',
    props<{ errorMessage: string }>()
);

export const fetchArtistAfterCreationSuccess = createAction(
    '[PostCreate] Fetch artist after creation success',
    props<{ artist: Artist }>()
);

export const createArtistUploadAvatarStart = createAction(
    '[PostCreate] Create artist upload avatar start',
    props<{ userId: string, artistId: string, avatar: File }>()
);

export const addMedia = createAction(
    '[PostCreate] Add media',
    props<{ mediaWrapper: MediaWrapper }>()
);

export const removeMedia = createAction(
    '[PostCreate] Remove media',
    props<{ index: number }>()
);

export const addMediaSource = createAction(
    '[PostCreate] Add media source',
    props<{ mediaIndex: number, source: CreateSource }>()
);

export const addAttachmentSource = createAction(
    '[PostCreate] Add attachment source',
    props<{ attachmentIndex: number, source: CreateSource }>()
);

export const updateMediaSet = createAction(
    '[PostCreate] Update media set',
    props<{ mediaSet: MediaWrapper[] }>()
);

export const addAttachment = createAction(
    '[PostCreate] Add attachment',
    props<{ attachmentWrapper: AttachmentWrapper }>()
);

export const removeAttachment = createAction(
    '[PostCreate] Remove attachment',
    props<{ index: number }>()
);

export const removeSourceFromMedia = createAction(
    '[PostCreate] Remove source from media',
    props<{ mediaIndex: number, sourceIndex: number }>()
);

export const removeSourceFromAttachment = createAction(
    '[PostCreate] Remove source from attachment',
    props<{ attachmentIndex: number, sourceIndex: number }>()
);

export const updateSourceData = createAction(
    '[PostCreate] Update source data',
    props<{ data: any }>()
)
export const clearSourceData = createAction(
    '[PostCreate] Clear source data'
);


// Post creation

export const createPostStart = createAction(
    '[PostCreate] Create post start',
    props<{
        userId: string,
        createPost: CreatePost,
        mediaSet: MediaWrapper[],
        attachments: AttachmentWrapper[]
    }>()
);

export const createPostFail = createAction(
    '[PostCreate] Create post fail',
    props<{ errorMessage: string }>()
);

export const createPostSuccess = createAction(
    '[PostCreate] Create post success',
    props<{ postId: string }>()
);

export const createMediaSetStart = createAction(
    '[PostCreate] Create media set start',
    props<{
        userId: string,
        postId: string,
        mediaSet: MediaWrapper[],
        currentIndex: number
    }>()
);

export const createMediaSetSuccess = createAction(
    '[PostCreate] Create media set success',
    props<{
        mediaSet: MediaWrapper[]
    }>()
);

export const createAttachmentsStart = createAction(
    '[PostCreate] Create attachments start',
    props<{
        userId: string,
        postId: string,
        attachments: AttachmentWrapper[],
        currentIndex: number
    }>()
);

export const createAttachmentsSuccess = createAction(
    '[PostCreate] Create attachments success'
);

export const createMediaSetSourcesStart = createAction(
    '[PostCreate] Create media set sources start',
    props<{
        userId: string,
        postId: string,
        mediaSet: MediaWrapper[],
        currentMediaIndex: number
        currentSourceIndex: number
    }>()
);

export const createMediaSetSourcesSuccess = createAction(
    '[PostCreate] Create media set sources success'
);

export const createAttachmentsSourcesStart = createAction(
    '[PostCreate] Create attachments sources start',
    props<{
        userId: string,
        postId: string,
        attachments: AttachmentWrapper[],
        currentAttachmentIndex: number
        currentSourceIndex: number
    }>()
);

export const createAttachmentsSourcesSuccess = createAction(
    '[PostCreate] Create attachments sources success'
);


export const updatePostCreateStatus = createAction(
    '[PostCreate] Update post create status',
    props<{ status: PostCreateStatusEnum }>()
);

export const clearPostData = createAction(
    '[PostCreate] Clear post data'
);
