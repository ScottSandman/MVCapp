const { BookModel } = require("../models/bookModel");
const path = require("path");

const postBook = async (request, response) => {
  try {
    console.log("ADD BOOK");
    let addBook = new BookModel(request.body);
    const createBook = await BookModel.create(addBook);
    response.send(createBook);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getBook = async (request, response) => {
  try {
    console.log("GET BOOK");
    let searchBook = await BookModel.findOne(request.query);
    response.send(searchBook);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getBooks = async (request, response) => {
  try {
    console.log("GET BOOKS");
    let searchBooks = await BookModel.find({});
    response.send(searchBooks);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getBooksByAuthor = async (request, response) => {
  try {
    console.log("BOOKS BY AUTHOR");
    let searchByAuthor = await BookModel.find(request.query);
    response.send(searchByAuthor);
  } catch (error) {
    response.status(500).send(error);
  }
};

const editBook = async (request, response) => {
  try {
    console.log("EDIT BOOK");
    let updateBook = await BookModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updateBook);
  } catch (error) {
    response.status(500).send(error);
  }
};

const deleteBook = async (request, response) => {
  try {
    console.log("DELETE BOOK");
    let removeBook = await BookModel.findOneAndDelete(request.body);
    response.send(removeBook);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  postBook,
  getBook,
  getBooks,
  editBook,
  deleteBook,
  getBooksByAuthor
};
