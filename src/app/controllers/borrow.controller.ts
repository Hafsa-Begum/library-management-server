import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model"; 

export const bookBorrowRoutes = express.Router();

bookBorrowRoutes.post('/', async (req: Request, res: Response):Promise<void> => {

    const {book:bookId, quantity, dueDate} = req.body;
    const book = await Book.findById(bookId);
    if(!book){
        res.status(404).json({
            success: false,
            message: "Book not found"
        })
        return;
    }
    if(book.copies<quantity){
        res.status(400).json({
            success: false,
            message: "Enough Book copies not available"
        })
        return;
    }
    book.copies -= quantity;
    await book.updateAvailability();

    const newBorrow = new Borrow({
        book: bookId,
        quantity,
        dueDate
    })
    const borrow = await newBorrow.save();

    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    })
    return;
});

bookBorrowRoutes.get('/', async (req: Request, res: Response):Promise<void> => {
    
    const book = await Borrow.aggregate([
        {
          $group: {
            _id: '$book',
            totalQuantity: { $sum: '$quantity' },
          },
        },
        {
          $lookup: {
            from: 'books',              
            localField: '_id',          
            foreignField: '_id',        
            as: 'bookInfo',             
          },
        },
        {
          $unwind: '$bookInfo',
        },
        {
          $project: {
            _id: 0,
            book: {
              title: '$bookInfo.title',
              isbn: '$bookInfo.isbn',
            },
            totalQuantity: 1,
          },
        },
    ]);
    
    res.status(200).json({
        success: true,
        message: "Borrowed Book retrieved successfully",
        data: book
    })
    return;
});