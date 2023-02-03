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
    descendants: number
    kids: number[]
    text: string
    deleted: boolean
    dead: boolean
}

export type Comment = {
    id: number
    by: string
    time: number
    text: string
}

export type User = {
    id: number
    created: number
    about: string
    submitted: number[]
    karma: number
}