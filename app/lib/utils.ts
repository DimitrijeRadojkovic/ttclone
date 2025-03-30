import bcrypt from "bcryptjs";

export async function genSalt(){
    const salt = await bcrypt.genSalt(10);
    return salt;
}

export async function hashPassword(password: string){
    const salt = await genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}