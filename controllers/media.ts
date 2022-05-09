import { Request, Response } from "express";
import { Media } from "../models";



export const getMedia = async (req: Request, res: Response) => {
    const { from = 0, limit = 10 } = req.query;
    const query = {  state: true };

    const [ count, media ] = await Promise.all([
        Media.countDocuments(),
        Media.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({ count, media });
}

export const getMediaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const media = await Media.findById(id); 
    res.status(200).json({ media });
}

export const createMedia = async (req: Request, res: Response) => {
    const { name, description, category, type, platform, img, state } = req.body;
    const media = new Media({ name, description, category, type, platform, img, state });

    await media.save();

    res.status(201).json({ media });
}

export const updateMedia = async (req: Request, res: Response) => {
    const { type, state, ...data } = req.body;
    const { id } = req.params;

    const media = await Media.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ media })
}

export const deleteMedia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const media = await Media.findByIdAndUpdate(id, { state: false }, { new: true });
    
    res.status(200).json({ media });
}