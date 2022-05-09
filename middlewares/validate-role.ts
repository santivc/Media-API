import { Request, Response, NextFunction } from 'express';







export const haveRole = (...roles: string []) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(500).json({ msg: 'Unvalited Token' })
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ msg: `The role does not have permissions (${roles})` })
        }
        next();
    }
}