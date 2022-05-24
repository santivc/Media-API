import jwt from 'jsonwebtoken';



export default class Token {
    private static privateKey: string = process.env.PRIVATEKEY || 'Est0MyPub1clK3y23@';
    private static expireIn: string = '4h';

    constructor() { }

    static generateJWT(uid: string) {
        return new Promise((resolve, reject) => {
            const payload = { uid };

            jwt.sign(payload, this.privateKey, { expiresIn: this.expireIn }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Cannot generate token');
                } else {
                    resolve(token);
                }
            });
        });
    }

    static verifyJWT(token: string) {
        return new Promise<any>((resolve, reject) => {
            jwt.verify(token, this.privateKey, (err, decoded) => {
                if (err) {
                    console.log(err);
                    reject('Invalid token')
                } else {                    
                    resolve(decoded);
                }
            });        
        });
    }
}