import express, { Application, Request, Response } from 'express';
import { booksRoutes } from './app/controllers/books.controller';
import { bookBorrowRoutes } from './app/controllers/borrow.controller';
import { notFoundHandler } from './app/middlewares/globalErrorHandler';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", bookBorrowRoutes);


app.get('/', (req: Request, res: Response) => {
    console.log("Welcome to library management app.")
    res.send('Welcome to library management app.');
});

// 404 Not Found handler (must be after all routes)
app.use(notFoundHandler);


export default app;