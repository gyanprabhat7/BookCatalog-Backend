import express, { response } from "express";
import { PORT, mondoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import { bookRoute } from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

// middleware for handeling CORS POLICY
// Option 1: Allow all origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins 
/* app.use(
    cors({
        origin: 'http://localhost:5050',
        methods: ['GET', 'POST', 'PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
    ); 
*/

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Well it works at least');
});

app.listen(PORT, () => {
    console.log(`App is listning to port: ${PORT}`);
});

app.use('/books', bookRoute);

mongoose
    .connect(mondoDBURL)
    .then(() => {
        console.log('App connected to database');
    })
    .catch((error) => {
        console.log(error);
    });

