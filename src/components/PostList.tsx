import { Post } from "../types"
import { PostMetaInfo } from "./PostMetaInfo"
import { Title } from "./Title"

export const PostList = ({ posts }: { posts: Post[] }) => {

    if (posts.length === 0) {
        return (
            <p className="center-text">
                This user hasnt post yet!!!
            </p>
        )
    }

    return (
        <ul>
            {posts.map(post => {
                return (
                    <li key={post.id} className="post">
                        <Title url={post.url} title={post.title} id={post.id} />
                        <PostMetaInfo
                            comment={false}
                            id={post.id}
                            by={post.by}
                            time={post.time}
                            descendants={post.descendants}
                        />
                    </li>
                )
            })}
        </ul>
    )
}
