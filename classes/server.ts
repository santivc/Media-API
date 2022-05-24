import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dbConnection from '../db/config';
import { userRoutes, mediaRoutes, listRoutes, authRoutes, uploadRoutes } from './../routes';


class Server {
    private app: Application;
    private port: string;
    private paths = {
        auth: '/api/auth',
        users: '/api/users',
        media: '/api/media',
        list: '/api/list',
        upload: '/api/upload'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // BODY
        this.app.use(express.json());
        // PUBLIC
        this.app.use(express.static('public'));
        // File Upload
        this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/', createParentPath: true }));
    }

    routes() {
        this.app.use(this.paths.auth, authRoutes)
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.media, mediaRoutes);
        this.app.use(this.paths.list, listRoutes);
        this.app.use(this.paths.upload, uploadRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server started on port ' + this.port); 
        });
    }
}


export default Server;