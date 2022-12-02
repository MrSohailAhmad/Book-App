const express = require("express");
const { createBooks, updateBook, deleteBook, getBookById, getAllBook } = require("../Controllers/book")
const { verifiyAdmin } = require("../utils/verifiyToken")
const router = express.Router();


router.post("/create_book", verifiyAdmin, createBooks)
    .put("/update_book/:id", verifiyAdmin, updateBook)
    .delete("/delete_book/:id", verifiyAdmin, deleteBook)
    // get Books
    .get("/get_book/:id", getBookById)
    .get("/get_book", getAllBook)


module.exports = router 
