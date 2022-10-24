const {
  createBook,
  updateBook,
  getBook,
  deleteBook,
} = require("../controllers/bookController");

const auth = require("../middleware/auth");
const express = require("express");
const crudRouter = express.Router();

crudRouter.get("/", auth, getBook);

crudRouter.post("/", auth, createBook);

crudRouter.put("/:id", auth, updateBook);

crudRouter.delete("/:id", auth, deleteBook);

module.exports = crudRouter;
