import { googleVerify } from './../helpers/google-verify';
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { User } from "../models"
import Token from "../classes/token";


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ msg: 'Email / password are not correct correct' });
        }
        if (!user?.state) {
            res.status(400).json({ msg: 'User not activated'});
        }

        const isValid = bcryptjs.compareSync(password, user?.password || '');

        if (!isValid) {
            res.status(400).json({ msg: 'Email / password are not correct correct' });
        }

        const token = await Token.generateJWT(user?.id);
        res.status(200).json({ user, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Talk to the administrator' });
    }
}


export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body;
    try {
        const { name, img, email, username } = await googleVerify(id_token);
        let user = await User.findOne({ email });

        if (!user) {
            const data = { name, username, email, password: '***', img, google: true };
            user = new User(data);
            await user.save(); 
        }

        if (!user.state) {
            res.status(401).json({ msg: 'Talk to the administratos (user locked)'})
        }

        const token = await Token.generateJWT(user.id);
        res.status(200).json({ user, token });

    } catch(error) {
        res.status(400).json({ msg: 'Could not be verified'});
    }
}