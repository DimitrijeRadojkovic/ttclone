'use server';
import postgres from 'postgres';
import type { User, Video, Comment } from '@/app/lib/definitions';
import { auth } from '@/auth';

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

export async function getVideos(offset: number){
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
}

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
        const comments = await sql<Comment[]>`SELECT * FROM comments WHERE video_id = ${video_id}`;
        return comments;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}