import { Link } from "react-router-dom"

export const Title = ({ url, id, title }: { url?: string, id: number, title: string }) => {
    return url ?
        <a className="link" href={url}>{title}</a> :
        <Link className="link" to={`post?id=${id}`}>{title}</Link>
}
