import queryString from 'query-string';

export const Post = () => {
    const { id } = queryString.parse(window.location.search);

    return (
        <div>{id}</div>
    )
}
