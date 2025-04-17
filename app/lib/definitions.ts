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
    date: Date,
}

export type Comment = {
    comment_id: string,
    username: string,
    created_at: string,
    video_id: string,
    text: string,
    replied_to: string | null | undefined,
    replied_to_root: string | null | undefined,
}

export type FavoritedVideos = {
    username: string,
    video_id: string,
    date: Date,
}

export type FormatedComment = Omit<User & Comment, "video_id" | "username" | "password" | "id">;