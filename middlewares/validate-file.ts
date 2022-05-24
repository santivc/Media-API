import { FileUpload } from './../interfaces/file-uploads';
import { NextFunction, Request, Response } from "express";



export const validateFile = async (req: any, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        return res.status(400).json({ msg: 'File not found' });
    }
    next();
}


export const validateExtension = async (req: any, res: Response, next: NextFunction) => {
    const file: FileUpload = req.files.image;
    const { mimetype } = file;

    if (!mimetype.includes('image')) {
        return res.status(400).json({ msg: 'File not valid' });
    }

    next();
}