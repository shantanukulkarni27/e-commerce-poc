import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('REs in logout ', res)
    destroyCookie({res}, 'token',{path: "/"})
    res.status(200).json({message: "Logged Out"})
}