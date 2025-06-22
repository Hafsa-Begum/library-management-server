import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model"; 

export const bookBorrowRoutes = express.Router();

bookBorrowRoutes.post('/', async (req: Request, res: Response) => {

    const {book:bookId, quantity, dueDate} = req.body;
    const book = await Book.findById(bookId);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }
    if(book.copies<quantity){
        return res.status(400).json({
            success: false,
            message: "Enough Book copies not available"
        })
    }
    book.copies -= quantity;
    await book.updateAvailability();

    const newBorrow = new Borrow({
        book: bookId,
        quantity,
        dueDate
    })
    const borrow = await newBorrow.save();

    return res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    })
});

bookBorrowRoutes.get('/', async (req: Request, res: Response) => {
    
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
    console.log('first', book)
    return res.status(200).json({
        success: true,
        message: "Borrowed Book retrieved successfully",
        data: book
    })
});