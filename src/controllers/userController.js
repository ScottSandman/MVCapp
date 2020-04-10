const { UserModel } = require("../models/userModel");
const path = require("path");

const postUser = async (request, response) => {
  try {
    console.log("ADD USER");
    let addUser = new UserModel(request.body);
    const createdUser = await UserModel.create(addUser);
    response.send(createdUser);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getUser = async (request, response) => {
  try {
    console.log("GET USER");
    let searchUser = await UserModel.findOne(request.query);
    response.send(searchUser);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getUsers = async (request, response) => {
  try {
    console.log("GET USERS");
    let searchUsers = await UserModel.find({});
    response.send(searchUsers);
  } catch (error) {
    response.status(500).send(error);
  }
};

const editUser = async (request, response) => {
  try {
    console.log("EDIT USER");
    let updateUser = await UserModel.findOneAndUpdate(request.query);
    response.send(updateUser);
  } catch (error) {
    response.status(500).send(error);
  }
};

const deleteUser = async (request, response) => {
  try {
    console.log("DELETE USER");
    let removeUser = await UserModel.deleteOne(request.query);
    response.send(removeUser);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  postUser,
  getUser,
  getUsers,
  editUser,
  deleteUser
};
