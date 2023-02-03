import queryString from "query-string"
import { useEffect, useReducer } from "react";
import { api } from "../api";
import { UserReducer } from "../reducer/UserReducer";
import { formatDate } from "../utils/helpers";
import { Loading } from "./Loading";
import { PostList } from "./PostList";

export const User = () => {

    const { id } = queryString.parse(window.location.search);

    const [state, dispatch] = useReducer(UserReducer, {
        user: null,
        loadingUser: true,
        posts: null,
        loadingPosts: true,
        error: null
    })

    useEffect(() => {
        dispatch({ type: "fetch" })
        api.fetchUser(id as string)
            .then(user => {
                dispatch({ type: "user", user })
                return api.fetchPosts(user.submitted.slice(0, 30))
            })
            .then(posts => dispatch({ type: "posts", posts }))
            .catch(e => {
                console.log(e)
                dispatch({ type: "error", message: e.message })
            })
    }, [id])

    const { error, loadingUser, user, loadingPosts, posts } = state

    if (error) return <p className="center-text error">{error}</p>

    return (
        <>
            {
                loadingUser ? (
                    <Loading text="Fecthing user data" />
                ) : (
                    user && <>
                        <h1 className="header">{user.id}</h1>
                        <div className="meta-info-light">
                            <span>
                                joined <b>{formatDate(user.created)}</b>
                            </span>
                            <span>
                                has <b>{user.karma.toLocaleString()}</b>
                            </span>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: user.about }} />
                    </>
                )
            }
            {
                loadingPosts ? <Loading text="Fetching user posts" /> :
                    (
                        posts && <>
                            <h2>Posts</h2>
                            <PostList posts={posts} />
                        </>
                    )
            }
        </>
    )
}
