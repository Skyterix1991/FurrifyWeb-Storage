import {createReducer, on} from "@ngrx/store";
import {
    addArtistToSelectedSetFail,
    addArtistToSelectedSetStart,
    addArtistToSelectedSetSuccess,
    addAttachment,
    addAttachmentSource,
    addMedia,
    addMediaSource,
    addTagToSelectedSetFail,
    addTagToSelectedSetStart,
    addTagToSelectedSetSuccess,
    clearPostData,
    clearSourceData,
    createArtistFail,
    createArtistStart,
    createAttachmentsSourcesSuccess,
    createAttachmentsSuccess,
    createMediaSetSuccess,
    createPostFail,
    createPostStart,
    createPostSuccess,
    createTagFail,
    createTagStart,
    fetchArtistAfterCreationFail,
    fetchArtistAfterCreationStart,
    fetchArtistAfterCreationSuccess,
    fetchTagAfterCreationFail,
    fetchTagAfterCreationStart,
    fetchTagAfterCreationSuccess,
    removeArtistFromSelected,
    removeAttachment,
    removeMedia,
    removeSourceFromAttachment,
    removeSourceFromMedia,
    removeTagFromSelected,
    updateMediaSet,
    updatePostSavedDescription,
    updatePostSavedTitle,
    updateSourceData
} from "./post-create.actions";
import {Tag} from "../../../shared/model/tag.model";
import {Artist} from "../../../shared/model/artist.model";
import {CreateMedia} from "../../../shared/model/request/create-media.model";
import {CreateSource} from "../../../shared/model/request/create-source.model";
import {CreateAttachment} from "../../../shared/model/request/create-attachment.model";

export class ArtistWrapper {
    constructor(public artist: Artist,
                public isExisting: boolean | null) {
    }
}

export class TagWrapper {
    constructor(public tag: Tag,
                public isExisting: boolean | null) {
    }
}

export class MediaWrapper {
    mediaId: string;

    constructor(public media: CreateMedia,
                public sources: CreateSource[],
                public mediaFile: File,
                public thumbnailFile: File | undefined) {
        this.mediaId = "";
    }
}

export class AttachmentWrapper {
    attachmentId: string;

    constructor(public attachment: CreateAttachment,
                public sources: CreateSource[],
                public file: File) {
        this.attachmentId = "";
    }
}

export interface State {
    // Create Post
    isFetching: boolean;
    selectedTags: TagWrapper[];
    selectedArtists: ArtistWrapper[];
    postSavedTitle: string;
    postSavedDescription: string;
    tagErrorMessage: string;
    artistErrorMessage: string;
    postDeleteErrorMessage: string;
    mediaSet: MediaWrapper[];
    attachments: AttachmentWrapper[];
    postCreateErrorMessage: string | null;
    createSourceData: any;
    createdPostId: string;
}

const initialState: State = {
    // Create Post
    isFetching: false,
    selectedTags: [],
    selectedArtists: [],
    postSavedTitle: "",
    postSavedDescription: "",
    tagErrorMessage: "",
    artistErrorMessage: "",
    mediaSet: [],
    attachments: [],
    postCreateErrorMessage: "",
    postDeleteErrorMessage: "",
    createSourceData: {},
    createdPostId: ""
};

export const postCreateReducer = createReducer(
    initialState,
    on(updatePostSavedTitle, (state, action) => {
            return {
                ...state,
                postSavedTitle: action.title
            }
        }
    ),
    on(updatePostSavedDescription, (state, action) => {
            return {
                ...state,
                postSavedDescription: action.description
            }
        }
    ),
    on(addTagToSelectedSetStart, (state, action) => {
            const tag: Tag = {
                title: "",
                description: "",
                ownerId: "",
                type: "",
                value: action.value,
                createDate: new Date()
            };

            return {
                ...state,
                isFetching: true,
                postCreateErrorMessage: null,
                // Set temporarily isExisting value to null to show loading spinner
                selectedTags: [...state.selectedTags, new TagWrapper(tag, null)]
            };
        }
    ),
    on(addTagToSelectedSetSuccess, (state, action) => {
            const newSelectedTags = state.selectedTags.slice();

            // Find tag with same value
            const oldSelectedTagIndex = newSelectedTags.findIndex((tagWrapper) => {
                return tagWrapper.tag.value === action.tagWrapper.tag.value;
            });

            // Replace old tag with new one
            newSelectedTags[oldSelectedTagIndex] = action.tagWrapper;

            return {
                ...state,
                isFetching: false,
                selectedTags: newSelectedTags
            };
        }
    ),
    on(addTagToSelectedSetFail, (state, action) => {
            return {
                ...state,
                isFetching: false,
                postCreateErrorMessage: action.errorMessage,
                selectedTags: state.selectedTags.slice().filter(item => item.tag.value !== action.value)
            };
        }
    ),
    on(createTagStart, (state, action) => {
            return {
                ...state,
                isFetching: true,
                tagErrorMessage: ""
            };
        }
    ),
    on(createTagFail, (state, action) => {
            return {
                ...state,
                isFetching: false,
                tagErrorMessage: action.errorMessage
            };
        }
    ),
    on(fetchTagAfterCreationStart, (state, action) => {
            return {
                ...state,
                isFetching: true,
                tagErrorMessage: ""
            };
        }
    ),
    on(fetchTagAfterCreationFail, (state, action) => {
            return {
                ...state,
                isFetching: false,
                tagErrorMessage: action.errorMessage
            };
        }
    ),
    on(fetchTagAfterCreationSuccess, (state, action) => {
            const newTags = state.selectedTags.slice();

            // Find tag with same value
            const oldTagIndex = newTags.findIndex((tagWrapper) => {
                return tagWrapper.tag.value === action.tag.value;
            });

            // Replace old tag with new one
            newTags[oldTagIndex] = new TagWrapper(action.tag, true);

            return {
                ...state,
                isFetching: false,
                selectedTags: newTags
            };
        }
    ),
    on(removeTagFromSelected, (state, action) => {
            return {
                ...state,
                selectedTags: state.selectedTags.slice().filter(item => item.tag !== action.tag)
            };
        }
    ),
    on(addArtistToSelectedSetStart, (state, action) => {
            const artist = {
                artistId: '',
                ownerId: '',
                nicknames: [],
                preferredNickname: action.preferredNickname,
                avatar: null,
                sources: [],
                createDate: new Date()
            };

            return {
                ...state,
                isFetching: true,
                postCreateErrorMessage: null,
                // Set temporarily isExisting value to null to show loading spinner
                selectedArtists: [...state.selectedArtists, new ArtistWrapper(artist, null)]
            };
        }
    ),
    on(addArtistToSelectedSetSuccess, (state, action) => {
            const newSelectedArtists = state.selectedArtists.slice();

            // Find artist with same value
            const oldSelectedArtistIndex = newSelectedArtists.findIndex((artistWrapper) => {
                return artistWrapper.artist.preferredNickname === action.artistWrapper.artist.preferredNickname;
            });

            // Replace old artist with new one
            newSelectedArtists[oldSelectedArtistIndex] = action.artistWrapper;

            return {
                ...state,
                isFetching: false,
                selectedArtists: newSelectedArtists
            };
        }
    ),
    on(addArtistToSelectedSetFail, (state, action) => {
            return {
                ...state,
                isFetching: false,
                postCreateErrorMessage: action.errorMessage,
                selectedArtists: state.selectedArtists.slice().filter(item => item.artist.preferredNickname !== action.preferredNickname)
            };
        }
    ),
    on(removeArtistFromSelected, (state, action) => {
            return {
                ...state,
                selectedArtists: state.selectedArtists.slice().filter(item => item.artist !== action.artist)
            };
        }
    ),
    on(createMediaSetSuccess, (state, action) => {
            return {
                ...state,
                mediaSet: action.mediaSet
            };
        }
    ),
    on(createTagStart, (state, action) => {
            return {
                ...state,
                isFetching: true,
                artistErrorMessage: ""
            };
        }
    ),
    on(createArtistStart, (state, action) => {
            return {
                ...state,
                isFetching: true,
                artistErrorMessage: ""
            };
        }
    ),
    on(createArtistFail, (state, action) => {
            return {
                ...state,
                isFetching: false,
                artistErrorMessage: action.errorMessage
            };
        }
    ),
    on(fetchArtistAfterCreationStart, (state, action) => {
            return {
                ...state,
                isFetching: true,
                artistErrorMessage: ""
            };
        }
    ),
    on(fetchArtistAfterCreationFail, (state, action) => {
            return {
                ...state,
                isFetching: false,
                artistErrorMessage: action.errorMessage
            };
        }
    ),
    on(fetchArtistAfterCreationSuccess, (state, action) => {
            const newArtists = state.selectedArtists.slice();

            // Find artist with same value
            const oldArtistIndex = newArtists.findIndex((artistWrapper) => {
                return artistWrapper.artist.preferredNickname === action.artist.preferredNickname;
            });

            // Replace old tag with new one
            newArtists[oldArtistIndex] = new ArtistWrapper(action.artist, true);

            return {
                ...state,
                isFetching: false,
                selectedArtists: newArtists
            };
        }
    ),
    on(addMedia, (state, action) => {
            return {
                ...state,
                mediaSet: [...state.mediaSet, action.mediaWrapper]
            };
        }
    ),
    on(removeMedia, (state, action) => {
            return {
                ...state,
                mediaSet: state.mediaSet.slice().filter((item, index) => index !== action.index)
            };
        }
    ),
    on(updateMediaSet, (state, action) => {
            return {
                ...state,
                mediaSet: [...action.mediaSet]
            };
        }
    ),
    on(addAttachment, (state, action) => {
            return {
                ...state,
                attachments: [...state.attachments, action.attachmentWrapper]
            };
        }
    ),
    on(removeAttachment, (state, action) => {
            return {
                ...state,
                attachments: state.attachments.slice().filter((item, index) => index !== action.index)
            };
        }
    ),
    on(createPostStart, (state, action) => {
            return {
                ...state,
                isFetching: true,
                postCreateErrorMessage: ""
            };
        }
    ),
    on(createPostSuccess, (state, action) => {
            return {
                ...state,
                createdPostId: action.postId
            };
        }
    ),
    on(createPostFail, (state, action) => {
            return {
                ...state,
                isFetching: false,
                postCreateErrorMessage: action.errorMessage
            };
        }
    ),
    on(createAttachmentsSuccess, (state, action) => {
            return {
                ...state
            };
        }
    ),
    on(createAttachmentsSourcesSuccess, (state, action) => {
            return {
                ...state,
                isFetching: false
            };
        }
    ),
    on(removeSourceFromMedia, (state, action) => {
            const modifiedMediaSet = state.mediaSet.slice().map((media, index) => {
                if (index !== action.mediaIndex) {
                    return media;
                }

                const newMedia = {...media};

                newMedia.sources = media.sources.filter(
                    (source, index) => index !== action.sourceIndex
                );

                return newMedia;
            });

            return {
                ...state,
                mediaSet: modifiedMediaSet
            };
        }
    ),
    on(removeSourceFromAttachment, (state, action) => {
            const modifiedAttachmentSet = state.attachments.slice().map((attachment, index) => {
                if (index !== action.attachmentIndex) {
                    return attachment;
                }

                const newAttachment = {...attachment};

                newAttachment.sources = attachment.sources.filter(
                    (source, index) => index !== action.sourceIndex
                );

                return newAttachment;
            });

            return {
                ...state,
                attachments: modifiedAttachmentSet
            };
        }
    ),
    on(clearSourceData, (state, action) => {
            return {
                ...state,
                createSourceData: null
            };
        }
    ),
    on(updateSourceData, (state, action) => {
            return {
                ...state,
                createSourceData: action.data
            };
        }
    ),
    on(addMediaSource, (state, action) => {
            let newMedia = {...state.mediaSet[action.mediaIndex]}
            newMedia.sources = [...newMedia.sources, action.source];

            let newMediaSet = [...state.mediaSet]
            newMediaSet[action.mediaIndex] = newMedia;

            return {
                ...state,
                mediaSet: newMediaSet
            };
        }
    ),
    on(addAttachmentSource, (state, action) => {
            let newAttachment = {...state.attachments[action.attachmentIndex]}
            newAttachment.sources = [...newAttachment.sources, action.source];

            let newAttachments = [...state.attachments]
            newAttachments[action.attachmentIndex] = newAttachment;

            return {
                ...state,
                attachments: newAttachments
            };
        }
    ),
    on(clearPostData, (state, action) => {
            return {
                ...state,
                selectedTags: [],
                selectedArtists: [],
                postSavedTitle: "",
                postSavedDescription: "",
                tagErrorMessage: "",
                artistErrorMessage: "",
                mediaSet: [],
                attachments: [],
                postCreateErrorMessage: "",
                createSourceData: {},
                createdPostId: ""
            };
        }
    ),
);