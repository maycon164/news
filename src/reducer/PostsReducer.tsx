import { Post } from "../types"

export type PostsReducerState = {
    posts: Post[] | null
    error: null | string
    loading: boolean
}
export type PostsReducerAction = {
    type: "fetch"
} | {
    type: "success"
    posts: Post[]
} | {
    type: "error"
    message: string
}

export function postsReducer(state: PostsReducerState, action: PostsReducerAction): PostsReducerState {
    if (action.type === 'fetch') {
        return {
            posts: null,
            error: null,
            loading: true
        }
    } else if (action.type === 'success') {
        return {
            posts: action.posts,
            error: null,
            loading: false
        }
    } else if (action.type === 'error') {
        return {
            posts: null,
            error: action.message,
            loading: false
        }
    } else {
        throw new Error(`Action is not allowed`)
    }
}