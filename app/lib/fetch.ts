'use server';
import postgres from 'postgres';
import type { User, Video, Comment, FormatedComment } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { cache } from 'react';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function insertUser(user: Omit<Omit<User, 'id'>, 'profile_image'>){
    try{
        const { username, password, name } = user;
        await sql`INSERT INTO users (username, password, name) VALUES(${username}, ${password}, ${name})`;
    }
    catch(error){
        console.error('Error inserting user:', error);
        throw error;
    }
}

export async function getUser(username: string){
    try{
        const users: User[] = await sql`SELECT * FROM users WHERE username = ${username}`;
        if(users.length > 0){
            return users[0];
        }
        return null;
    }
    catch(error){
        console.log(error);
    }
}

export async function getCurrentUser(){
    const session = await auth();
    try{
        const user = await getUser(session?.user?.email!);
        if(user){
            return user;
        }
        return null;
    }
    catch(error){
        console.log(error);
    }
}

export async function getAuthor(video: Video){
    try{
        const user = await getUser(video.author);
        if(user){
            return user;
        }
        return null;
    }
    catch(error){
        console.log(error);
    }
}

export async function insertVideo(video: Omit<Omit<Video, 'id'>, 'date'>){
    try{
        const { path, author } = video;
        await sql`INSERT INTO videos(path, author) VALUES(${path}, ${author})`;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

let offset = 0;

export const getVideos = cache(async (offset: number) => {
    try{
        console.log("offset na ulasku u getVideos", offset);
        const data: Video[] = await sql`SELECT * FROM videos LIMIT 10 OFFSET ${offset}`;
        offset += 10;
        console.log("offset posle povecanja", offset);
        return data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
});

export async function getLikes(currentVideo: Video){
    try{
        const session = await auth();
        const likes = await sql`SELECT username FROM liked_videos WHERE video_id = ${currentVideo.id}`;
        console.log(likes);
        const usernameObj = {
            username: session?.user?.email
        };
        const liked = likes.some(like => like.username === usernameObj.username);
        return {
            likes: likes.length,
            liked
        };        
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function insertLike(video_id: string, username: string){
    try{
        await sql`INSERT INTO liked_videos(username, video_id) VALUES(${username}, ${video_id})`;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function deleteLike(video_id: string, username: string){
    try{
        await sql`DELETE FROM liked_videos WHERE username = ${username} AND video_id = ${video_id}`;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function getNumberOfComments(video_id: string){
    try{
        const number = await sql`SELECT COUNT(*) FROM comments WHERE video_id = ${video_id}`;
        return number[0].count;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function getComments(video_id: string){
    try{
        const comments = await sql<FormatedComment[]>`SELECT users.name, users.profile_image, comments.created_at, comments.text, comments.replied_to, comments.replied_to_root, comments.comment_id FROM comments INNER JOIN users ON comments.username = users.username WHERE comments.video_id = ${video_id}`;
        return comments;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function getFavorites(currentVideo: Video){
    try{
        const session = await auth();
        const favorites = await sql`SELECT username FROM favorited_videos WHERE video_id = ${currentVideo.id}`;
        console.log(favorites);
        const usernameObj = {
            username: session?.user?.email
        };
        const favorited = favorites.some(favorite => favorite.username === usernameObj.username);
        return {
            favorites: favorites.length,
            favorited
        };        
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function insertFavorite(video_id: string, username: string){
    try{
        await sql`INSERT INTO favorited_videos(username, video_id) VALUES(${username}, ${video_id})`;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function deleteFavorite(video_id: string, username: string){
    try{
        await sql`DELETE FROM favorited_videos WHERE username = ${username} AND video_id = ${video_id}`;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function insertComment(username: string, video_id: string, text: string, replied_to: string | null | undefined, replied_to_root: string | null | undefined){
    try{
        if(!replied_to)
            await sql`INSERT INTO comments(username, video_id, text, replied_to) VALUES(${username}, ${video_id}, ${text}, ${null})`;
        else{
            if(!replied_to_root)
                await sql`INSERT INTO comments(username, video_id, text, replied_to, replied_to_root) VALUES(${username}, ${video_id}, ${text}, ${replied_to}, ${null})`;
            else
            await sql`INSERT INTO comments(username, video_id, text, replied_to, replied_to_root) VALUES(${username}, ${video_id}, ${text}, ${replied_to}, ${replied_to_root})`;
            
        }  
    }
    catch(error){
        console.log(error);
        throw error;
    }
}