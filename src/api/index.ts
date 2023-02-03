import { Post } from "../types";
const url = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

class Api {

    private async fetchItem(id: number) {
        const post = await fetch(`${url}/item/${id}${json}`)
            .then(res => res.json())

        return post
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

    removeDeleted(posts: Post[]) {
        return posts.filter(post => post.deleted !== true);
    }

    onlyPosts(posts: Post[]) {
        return posts.filter(post => post.type === "story")
    }

    removeDead(posts: Post[]) {
        return posts.filter(post => post.dead !== true)
    }
}

const api = new Api();

export {
    api
} 