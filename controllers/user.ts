import bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { User } from '../models';


export const getUsers = async (req: any, res: Response) => {
    const { from = 0, limit = 10 } = req.query;
    const query = { state: true };

    const [ count, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({ count, users });
}

export const getUserById = async (req: any, res: Response) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({ user });
}

export const createUser = async (req: any, res: Response) => {
    const { name, username, email, password, role } = req.body;
    const user = new User({ name, username, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(201).json({ user });
}

export const updateUser = async (req: any, res: Response) => {
    const { uid } = req.user;
    const { password, google, state, rol, ...data } = req.body;

    if (password) {
        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(uid, data, { new: true });
    res.status(200).json({ user });
}

export const deleteUser = async (req: any, res: Response) => {
    const { uid } = req.user;
    const user = await User.findByIdAndUpdate(uid, { state: false }, { new: true });
    
    res.status(200).json({ user })
}