import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import csvParser from "csv-parser"; // Import csv-parser
// Define a Book interface
interface Book {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
}


// Temporary in-memory storage for books
export let books: Book[] = [];


export const getBooks = (req: Request, res: Response): void => {
  res.status(200).json(books);
};

export const getBookById = (req: Request, res: Response): void => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

export const createBook = (req: Request, res: Response): void => {
  const { title, author, publishedYear } = req.body;
  const newBook: Book = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response): void => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author, publishedYear } = req.body;
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = { id: bookId, title, author, publishedYear };
    res.status(200).json(books[bookIndex]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

export const deleteBook = (req: Request, res: Response): void => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

