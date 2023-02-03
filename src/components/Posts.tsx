import { useEffect, useReducer } from "react"
import { postsReducer } from "../reducer/PostsReducer"
import { Loading } from "./Loading";
import { api } from '../api/index';
import { PostList } from "./PostList";

export const Posts = ({ type }: { type: string }) => {

    const [state, dispatch] = useReducer(postsReducer, {
        posts: null,
        error: null,
        loading: false
    })

    useEffect(() => {
        dispatch({ type: "fetch" });
        api.fetchMainPosts(type)
            .then(posts => dispatch({ type: "success", posts }))
            .catch(({ message }) => dispatch({ type: "error", message }))
    }, [type])

    if (state.loading === true) {
        return <Loading />
    }

    if (state.error) {
        return <p className="center-text error">{state.error}</p>
    }

    return state.posts && <PostList posts={state.posts} />

    return <h1>Something went wrong!!!</h1>
}