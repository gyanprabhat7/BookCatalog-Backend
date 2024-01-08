import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for saving a book

router.post('/', async (request, response) => {
    try{
        if (
            !request.body.title || !request.body.author || !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

// Route for gettign all Books from database

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).sendStatus({ message: error.message });
    }
});

// Route for gettign one Books from database by id

router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).sendStatus({ message: error.message });
    }
});

// Route to update a book

router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        // findByIdAndUpdate returns the original document, not the updated one
        const result = await Book.findByIdAndUpdate(id, request.body);

        // Check if result is null or undefined to handle invalid ID
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        // Fetch the updated document separately
        const updatedBook = await Book.findById(id);

        return response.status(200).send({ message: 'Book updated successfully', data: updatedBook });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for dlt a book

router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        } 
        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log('App connected to database');
        response.status(500).send({ message: error.message });
    }
})

export { router as bookRoute };