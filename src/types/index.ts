import { CSSProperties } from "react"

export type Theme = "light" | "dark"

export const ActiveStyle: CSSProperties = {
    color: 'rgb(187, 46, 31)'
}

export type Post = {
    id: number
    type: "story" | "comment"
    title: string
    url?: string
    by: string
    time: number
    descendents: number
    deleted: boolean
    dead: boolean
} 