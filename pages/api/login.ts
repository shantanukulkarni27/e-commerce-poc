import { setCookie } from "nookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req:NextApiRequest, res: NextApiResponse){
    
    if(req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    const { username, password } = req.body;      
    const response = await fetch('http://localhost:4000/users')
    const users = await response.json();
    const user = users.find((user: { username: string; password: string }) => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = 'secure_token_'+ username;
    // If no errors, proceed with login and navigation
    setCookie({res},'token', token,{
      maxAge: 30 * 24 * 60 * 60,
      path:'/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return res.status(200).json({ success: true })
}