import queryString from 'query-string';
import { useEffect, useReducer } from 'react';
import { api } from '../api';
import { PostReducer } from '../reducer/PostReducer';
import { Loading } from './Loading';
import { PostMetaInfo } from './PostMetaInfo';
import { Title } from './Title';
import { Comment } from './Comment'
export const Post = () => {
    const { id } = queryString.parse(window.location.search);

    const [state, dispatch] = useReducer(PostReducer, {
        post: null,
        loadingPost: true,
        comments: null,
        loadingComments: true,
        error: null
    });

    useEffect(() => {
        dispatch({ type: "fetch" })

        api.fetchItem(id as unknown as number)
            .then(post => {
                dispatch({ type: "post", post })
                return api.fetchComments(post.kids || [])
            })
            .then(comments => dispatch({ type: "comments", comments }))
            .catch(e => dispatch({ type: "error", error: e.message }))

    }, [id]);

    const { error, loadingPost, post, loadingComments, comments } = state

    if (error) return <p className='center-text error'>{error}</p>

    return (
        <>
            {
                loadingPost === true ?
                    (<Loading text='Fetching Post' />) :
                    (
                        post && <>
                            <h1 className='header'>
                                <Title url={post.url} title={post.title} id={post.id} />
                            </h1>
                            <PostMetaInfo
                                comment={false}
                                by={post.by}
                                time={post.time}
                                id={post.id}
                                descendants={post.descendants}
                            />
                            <p dangerouslySetInnerHTML={{ __html: post.text }} />
                        </>
                    )
            }
            {
                loadingComments === true ?
                    (loadingPost === false && <Loading text='Fetching comments' />) :
                    (
                        <>
                            {
                                comments && comments.map(comment => <Comment key={comment.id} comment={comment} />)
                            }
                        </>
                    )
            }
        </>
    )
}
