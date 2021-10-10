import {createAction, props} from '@ngrx/store';
import {Post} from '../../shared/model/post.model';
import {PageInfo} from '../../shared/model/page-info.model';
import {TagWrapper} from "./posts.reducer";
import {Tag} from "../../shared/model/tag.model";

export const updateSearchParams = createAction(
    '[Posts] Update search params',
    props<{ sortBy: string, order: string, size: number }>()
);

export const updateSearchQuery = createAction(
    '[Posts] Update search query',
    props<{ query: string }>()
);

export const startSearch = createAction(
    '[Posts] Search start',
    props<{
        query: string,
        sortBy: string,
        order: string,
        size: number,
        page: number,
        userId: string
    }>()
);

export const getPostStart = createAction(
    '[Posts] Get post start',
    props<{
        userId: string,
        postId: string
    }>()
);

export const getPostSuccess = createAction(
    '[Posts] Get post success',
    props<{
        post: Post
    }>()
);

export const getPostFail = createAction(
    '[Posts] Get post fail',
    props<{ postFetchErrorMessage: string }>()
);

export const failSearch = createAction(
    '[Posts] Search fail',
    props<{ searchErrorMessage: string }>()
);

export const successSearch = createAction(
    '[Posts] Search success',
    props<{ posts: Post[], pageInfo: PageInfo }>()
);


export const selectPost = createAction(
    '[Posts] Select post',
    props<{ post: Post }>()
);

export const updatePostSavedTitle = createAction(
    '[Posts] Update post saved title',
    props<{ title: string }>()
);

export const updatePostSavedDescription = createAction(
    '[Posts] Update post saved description',
    props<{ description: string }>()
);

export const addTagToSelectedSetStart = createAction(
    '[Posts] Add tag to selected set start',
    props<{ userId: string, value: string }>()
);

export const addTagToSelectedSetFail = createAction(
    '[Posts] Add tag to selected set fail',
    props<{ value: string, errorMessage: string }>()
);

export const addTagToSelectedSetSuccess = createAction(
    '[Posts] Add tag to selected set success',
    props<{ tagWrapper: TagWrapper }>()
);

export const createTagStart = createAction(
    '[Posts] Create tag start',
    props<{ userId: string, tag: Tag }>()
);

export const createTagFail = createAction(
    '[Posts] Create tag fail',
    props<{ errorMessage: string }>()
);

export const fetchTagAfterCreationStart = createAction(
    '[Posts] Fetch tag after creation start',
    props<{ userId: string, value: string }>()
);

export const fetchTagAfterCreationFail = createAction(
    '[Posts] Create tag after creation fail',
    props<{ errorMessage: string }>()
);

export const fetchTagAfterCreationSuccess = createAction(
    '[Posts] Fetch tag after creation success',
    props<{ tag: Tag }>()
);

export const removeTagFromSelected = createAction(
    '[Posts] Remove tag from selected',
    props<{ tag: Tag }>()
);
