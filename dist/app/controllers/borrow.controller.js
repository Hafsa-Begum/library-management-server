"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookBorrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
exports.bookBorrowRoutes = express_1.default.Router();
exports.bookBorrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = yield books_model_1.Book.findById(bookId);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    if (book.copies < quantity) {
        return res.status(400).json({
            success: false,
            message: "Enough Book copies not available"
        });
    }
    book.copies -= quantity;
    yield book.updateAvailability();
    const newBorrow = new borrow_model_1.Borrow({
        book: bookId,
        quantity,
        dueDate
    });
    const borrow = yield newBorrow.save();
    return res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    });
}));
exports.bookBorrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield borrow_model_1.Borrow.aggregate([
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
    console.log('first', book);
    return res.status(200).json({
        success: true,
        message: "Borrowed Book retrieved successfully",
        data: book
    });
}));
