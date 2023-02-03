import { Post, Comment } from "../types";

export type PostReducerState = {
    post: Post | null
    loadingPost: boolean
    comments: Comment[] | null
    loadingComments: boolean
    error: string | null
}


export type PostReducerAction =
    | {
        type: "fetch"
    }
    | {
        type: "post"
        post: Post
    }
    | {
        type: "comments"
        comments: Comment[]
    }
    | {
        type: "error"
        error: string
    }

export function PostReducer(state: PostReducerState, action: PostReducerAction): PostReducerState {
    switch (action.type) {
        case 'fetch': {
            return {
                ...state,
                loadingComments: true,
                loadingPost: true
            }
        }
        case 'comments': {
            return {
                ...state,
                loadingComments: false,
                comments: action.comments
            }
        }
        case 'post': {
            return {
                ...state,
                loadingPost: false,
                post: action.post
            }
        }
        case 'error': {
            return {
                ...state,
                loadingComments: false,
                loadingPost: false,
                error: action.error
            }
        }
        default: {
            throw new Error('Action not allowed')
        }
    }
}