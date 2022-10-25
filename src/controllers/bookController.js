const BookModel = require("../models/book");

const createBook = async function (req, res) {
  const { title, author } = req.body;
  console.log(req.body);

  const book = new BookModel({
    title,
    author,
    userId: req.userId,
  });

  await book.save((err) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "There was a server side error.",
      });
    } else {
      res.status(200).json({
        message: "Book was inserted successfully!",
        data: book,
      });
    }
  });
};

const updateBook = async function (req, res) {
  const { title, author, userId } = req.body;
  const { id } = req.params;

  const updatedBook = {
    title,
    author,
    userId,
  };

  try {
    await BookModel.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
    res.status(200).json({
      message: "Book was updated successfully!",
      data: updatedBook,
    });
  } catch (err) {
    // Bad request
    res.status(400).json({ error: "There was a Server Side Error!" });
  }
};

const getBook = async function (req, res) {
  try {
    const books = await BookModel.find({ userId: req.userId });
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: "There was a Server Side Error!" });
  }
};

const deleteBook = async function (req, res) {
  const { id } = req.params;

  try {
    const obj = await BookModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Book was deleted successfully!",
      obj,
    });
  } catch (err) {
    res.status(400).json({ error: "There was a Server Side Error!" });
  }
};

module.exports = { createBook, updateBook, getBook, deleteBook };
