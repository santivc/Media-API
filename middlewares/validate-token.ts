import { User } from './../models';
import { NextFunction, Response } from 'express';
import Token from '../classes/token';


export const validateToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    if (!token) return res.status(401).json({ msg: 'There is not token in the request'});
    
    try {
        const { uid } =  await Token.verifyJWT(token);
        const user = await User.findById(uid);

        if (!user) return res.status(401).json({ msg: 'Invalid token: That user does not exist'});
        if (!user.state) return res.status(401).json({ msg: 'User with state: false' });

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    }
}
