import express, { Request, Response } from "express";
import { Book } from "../models/books.model"; 

export const booksRoutes = express.Router();

booksRoutes.post('/', async (req: Request, res: Response) => {

    const body = req.body
    const book = await Book.create(body)

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book
    })
})

booksRoutes.get('/', async (req: Request, res: Response) => {

    const {filter, sortBy, sort, limit=10} = req.query;
    const query = {};
    if(filter){
        query.genre = filter
    }
    const sortOption = {};
    sortOption[sortBy] = sort === 'desc' ? -1 : 1;

    const books = await Book.find(query).sort(sortOption).limit(Number(limit));

    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    })
});

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    })
});

booksRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true, })

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    })
});

booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findByIdAndDelete(bookId)

    if(!book){
        res.status(404).json({
            success: false,
            message: "Book not found"
        })
        
    }
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})