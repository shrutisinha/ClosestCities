import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PROPERTIES } from './config/properties';
import controllers from './controllers';
import { getCities1 } from './services/cities';

const server = express();

const corsOptions = {
    origin: PROPERTIES.ALLOWED_ORIGIN,
    optionsSuccessStatus: 200,
}

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(
    (err: any, req: any, res: any, next: any) => {
        console.log(req)
        console.error(err.stack)
        res.status(500).send('Something broke!');
        next(err);
    },
    controllers
)
// A sample route
server.get('/', (req, res) => res.send('Hello World!'));


// Start the Express server
server.listen(3000, async () => {
    console.log('Server running on port 3000!');
});
