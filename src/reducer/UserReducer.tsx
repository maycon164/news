import { Post, User } from "../types"

export type UserReducerState = {
    user: User | null
    loadingUser: boolean | null
    posts: Post[] | null
    loadingPosts: boolean | null
    error: string | null
}

export type UserReducerAction =
    | {
        type: "fetch"
    }
    | {
        type: "user"
        user: User
    }
    | {
        type: "posts"
        posts: Post[]
    } | {
        type: "error"
        message: string
    }

export function UserReducer(state: UserReducerState, action: UserReducerAction): UserReducerState {
    if (action.type === "fetch") {
        return {
            ...state,
            loadingUser: true,
            loadingPosts: true,
        };
    } else if (action.type === "user") {
        return {
            ...state,
            user: action.user,
            loadingUser: false,
        };
    } else if (action.type === "posts") {
        return {
            ...state,
            posts: action.posts,
            loadingPosts: false,
            error: null,
        };
    } else if (action.type === "error") {
        return {
            ...state,
            error: action.message,
            loadingPosts: false,
            loadingUser: false,
        };
    } else {
        throw new Error(`That action type is not supported.`);
    }
}