import { FileUpload } from './../interfaces/file-uploads';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { Media, User } from '../models';
import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
    cloud_name:  process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY,
    secure: true
});


export const uploadFile = async (req: any, res: Response) => {
    const { collection, id } = req.params;
    let model: any;
    let path = '';

    switch(collection) {
        case 'user':
            model = await User.findById(id);
            if (!model) return res.status(400).json({ msg: `The user with id does not exist (${id})` });
            path = `users/${id}`;
            break;
        case 'media':
            model = await Media.findById(id);
            if (!model) return res.status(400).json({ msg: `The film, serie or videogame with id (${id}) does not exist` });
            path = `media/${model.type}`;
            break;
        default:
            res.status(500).json({ msg: 'The collection does not exist' }); 
    }

    // IF THE IMAGE EXISTS THEN IT IS DELETED
    if (model.img) {
        const fileNameArr: string [] = model.img.split('/');
        const publicIdArr: string [] = fileNameArr.slice(-3);

        const publicId = publicIdArr.join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
    }

    const file: FileUpload = req.files.image;
    const { tempFilePath } = file;
    
    const options = { folder: path };
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, options);
    
    model.img = secure_url;
    await model.save();

    res.status(200).json({ model });
}

export const getFile = async (req: Request, res: Response) => {
    const { collection, id } = req.params;
    let model: any;

    switch (collection) {
        case 'user':
            model = await User.findById(id);
            if (!model) return res.status(400).json({ msg: `The user with id does not exist (${id})` });
            break;
        case 'media':
            model = await Media.findById(id);
            if (!model) return res.status(400).json({ msg: `The film, serie or videogame with id (${id}) does not exist` });
            break;
        default:
            break;
    }

    if (!model.img) {
        res.status(200).sendFile('https://via.placeholder.com/250');
    }

    res.status(200).sendFile(model.img);
}