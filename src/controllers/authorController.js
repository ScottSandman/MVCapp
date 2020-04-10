const { AuthorModel } = require("../models/authorModel");
const path = require("path");

const postAuthor = async (request, response) => {
  try {
    console.log("POST AUTHOR");
    let addAuthor = new AuthorModel(request.body);
    const createAuthor = await AuthorModel.create(addAuthor);
    console.log(createAuthor);
    response.send(createAuthor);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getAuthor = async (request, response) => {
  try {
    console.log("GET AUTHOR");
    let searchAuthor = await AuthorModel.findOne(request.query);
    response.send(searchAuthor);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getAuthors = async (request, response) => {
  try {
    console.log("GET AUTHORS");
    let searchAuthors = await AuthorModel.find({});
    response.send(searchAuthors);
  } catch (error) {
    response.status(500).send(error);
  }
};

const editAuthor = async (request, response) => {
  try {
    console.log("EDIT AUTHOR");
    let updateAuthor = await AuthorModel.findOneAndUpdate(request.query);
    response.send(updateAuthor);
  } catch (error) {
    response.status(500).send(error);
  }
};

const deleteAuthor = async (request, response) => {
  try {
    console.log("DELETE AUTHOR");
    let removeAuthor = await AuthorModel.deleteOne(request.query);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  postAuthor,
  getAuthor,
  getAuthors,
  editAuthor,
  deleteAuthor
};
