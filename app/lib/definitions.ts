export type User = {
    id: string,
    username: string,
    password: string,
    name: string,
    profile_image: string,
}

export type Video = {
    id: string,
    path: string,
    author: string,
    date: Date,
}

export type LikedVideos = {
    username: string,
    video_id: string,
}