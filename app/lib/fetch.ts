import postgres from 'postgres'
import type { User } from '@/app/lib/definitions';

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