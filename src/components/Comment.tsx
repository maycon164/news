import { Comment as CommentTypo } from "../types"
import { PostMetaInfo } from "./PostMetaInfo"

type CommentType = {
    comment: CommentTypo
}

export const Comment = ({ comment }: CommentType) => {
    const { by, time, id, text } = comment

    console.log(text)

    return (
        <div className="comment">
            <PostMetaInfo
                comment={true}
                by={by}
                time={time}
                id={id}
            />
            <p dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}
