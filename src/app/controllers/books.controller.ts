import express, { Request, Response } from "express";
import { Book } from "../models/books.model"; 

export const booksRoutes = express.Router();

booksRoutes.post('/', async (req: Request, res: Response) => {

    try {
        const body = req.body
        const book = await Book.create(body)

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error
        })
    }
})

booksRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const filter = req.query.filter as string | undefined;
        const sortBy = req.query.sortBy as string | undefined;
        const sort = req.query.sort as string | undefined;
        const limit = Number(req.query.limit) || 10;

        const query: Record<string, any> = {};

        if (filter) {
        query.genre = filter;
        }

        const sortOption: Record<string, 1 | -1> = {};
        if (sortBy && (sort === 'asc' || sort === 'desc')) {
        sortOption[sortBy] = sort === 'desc' ? -1 : 1;
        }

        const books = await Book.find(query).sort(sortOption).limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            success: false,
            error: error
        })
    }
    
});

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const book = await Book.findById(bookId)

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            success: false,
            error: error
        })
    }
});

booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const updatedBody = req.body;
        const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true, })

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            success: false,
            error: error
        })
    }
});

booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            success: false,
            error: error
        })
    }
})