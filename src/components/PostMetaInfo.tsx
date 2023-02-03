import { useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../contexts/theme"
import { formatDate } from "../utils/helpers"

type PostMetaInfoType = {
    comment: boolean,
    by: string,
    time: number,
    id: number,
    descendants?: number
}

export const PostMetaInfo = ({ by, time, comment, id, descendants }: PostMetaInfoType) => {

    const theme = useContext(ThemeContext);

    return (
        <div className={`meta-info-${theme}`}>
            <span>by <Link to={`/user?id=${by}`}>{by}</Link></span>
            <span>on {formatDate(time)}</span>
            {!comment && (
                <span>
                    with <Link to={`/post?id=${id}`}>{descendants}</Link> comments
                </span>
            )}
        </div>
    )
}
