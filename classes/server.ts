import express, { Application } from 'express';
import cors from 'cors';
import dbConnection from '../db/config';
import { userRoutes, mediaRoutes, listRoutes, authRoutes } from './../routes';


class Server {
    private app: Application;
    private port: string;
    private paths = {
        auth: '/api/auth',
        users: '/api/users',
        media: '/api/media',
        list: '/api/list',
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
    }

    routes() {
        this.app.use(this.paths.auth, authRoutes)
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.media, mediaRoutes);
        this.app.use(this.paths.list, listRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server started on port ' + this.port); 
        });
    }
}


export default Server;