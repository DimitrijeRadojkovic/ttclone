import postgres from 'postgres'
import type { User, Video } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function insertUser(user: Omit<User, 'id'>){
    try{
        const { username, password, name } = user;
        await sql`INSERT INTO users (username, password, name) VALUES(${username}, ${password}, ${name})`;
    }
    catch(error){
        console.error('Error inserting user:', error);
        throw new Error(`Error inserting user: ${error}`);
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

export async function getVideos(){
    try{
        const data: Video[] = await sql`SELECT * FROM videos`;
        return data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}