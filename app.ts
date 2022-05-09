import dotenv from 'dotenv';
import Server from './classes/server';

// Configurations
dotenv.config();

const server = new Server();
server.listen();