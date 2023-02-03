import { Post, Comment } from "../types";
const url = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

class Api {

    async fetchItem(id: number): Promise<Post> {
        const post = await fetch(`${url}/item/${id}${json}`)
            .then(res => res.json())

        return post as Post
    }

    async fetchMainPosts(type: string): Promise<Post[]> {
        const posts = await fetch(`${url}/${type}stories${json}`)
            .then(res => res.json())
            .then(ids => {
                if (!ids) {
                    throw new Error(`There was an erro fetching the ${type} posts.`)
                }
                return ids.slice(0, 50)
            })
            .then(ids => Promise.all(ids.map(this.fetchItem)))
            .then(results => this.removeDeleted(this.onlyPosts(this.removeDead(results))));
        console.log(posts)
        return posts as Post[]
    }

    async fetchComments(ids: number[]): Promise<Comment[]> {
        const comments = await Promise.all(ids.map(this.fetchItem))
            .then(results => this.removeDeleted(this.onlyComments(this.removeDead(results))))

        return comments as unknown as Comment[];
    }

    removeDeleted(posts: Post[]) {
        return posts.filter(post => post.deleted !== true);
    }

    onlyPosts(posts: Post[]) {
        return posts.filter(post => post.type === "story")
    }

    onlyComments(posts: Post[]) {
        return posts.filter(post => post.type === "comment")
    }

    removeDead(posts: Post[]) {
        return posts.filter(post => post.dead !== true)
    }
}

const api = new Api();

export {
    api
} 