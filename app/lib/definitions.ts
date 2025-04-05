export type User = {
    id: string,
    username: string,
    password: string,
    name: string,
}

export type Video = {
    id: string,
    path: string,
    author: string,
    date: Date,
}

export type LikedVideos = {
    user_id: string,
    video_id: string,
}