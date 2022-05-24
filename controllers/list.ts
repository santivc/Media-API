import { Request, Response } from "express";
import { List } from "../models";


export const getList = async (req: Request, res: Response) => {
    const { from = 0, limit = 10} = req.params;
    const query = { state: true };

    const [ count, list ] = await Promise.all([
        List.countDocuments(query),
        List.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', 'username')
            .populate('media', '-state')
    ]);

    res.status(200).json({ count, list })
}


export const getListByIdOrUser = async (req: Request, res: Response) => {
    const { from = 0, limit = 10} = req.params;
    const { user, id } = req.params;
    
    const list = await List.find({ $or: [{ _id: id }, { user }], state: true })
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', 'username')
            .populate('media', '-state');

    res.status(200).json({ list });
}

export const createList = async (req: any, res: Response) => {
    const user = req.user._id;
    const { media, name } = req.body;

    const list = new List({ name, media, user });
    await list.save();

    res.status(201).json({ list });
}

export const updateList = async (req: any, res: Response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;
    data.user = req.user._id;


    const list = await List.findByIdAndUpdate(id, data, { new: true });
    
    res.status(200).json({ list });
}

export const deleteList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const list = await List.findByIdAndUpdate(id, { state: false }, { new: true });

    res.status(200).json({ list });
}