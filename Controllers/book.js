const Books = require("../Models/Books");

const createBooks = async (req, resp, next) => {
    const newBook = new Books(req.body);
    try {
        const savedBook = await newBook.save();
        resp.status(200).json(savedBook);
    } catch (error) {
        resp.status(500).json(error);
        console.log(error);
    }
};

const updateBook = async (req, resp, next) => {
    try {
        const updateBook = await Books.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        resp.status(200).json({
            updateBook,
        });
    } catch (error) {
        resp.status(500).json(error);
        console.log(error);
    }
};

// delete book by id
const deleteBook = async (req, resp, next) => {
    try {
        await Books.findByIdAndDelete(req.params.id);
        resp.status(200).json("Book Deleted SuccessFull...");
    } catch (error) {
        resp.status(500).json(error);
        console.log(error);
    }
};
// get books by id
const getBookById = async (req, resp, next) => {
    try {
        const getBookById = await Books.findById(req.params.id);
        // console.log(getBookById)
        if (!getBookById) {
            console.log("Book Not Found...")
            resp.status(404).json("Record Not Found...");

        } else {
            resp.status(200).json(getBookById);
        }
    } catch (error) {
        resp.status(500).json(error);
        console.log(error);
    }
};

//get all books
const getAllBook = async (req, resp, next) => {
    const { min, max, ...others } = req.params;
    try {
        const getAllBook = await Books.find({
            ...others,
            cheapestPrice: { $lt: min || 1, $gt: max || 10 }
        }).limit(req.query.limit);
        resp.status(200).json(getAllBook);
    } catch (error) {
        next(error)
    }
}




module.exports = { createBooks, updateBook, deleteBook, getBookById, getAllBook };
