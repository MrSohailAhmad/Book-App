require("dotenv").config();
const authRoutes = require("./Routes/auth")
const bookRoutes = require("./Routes/book")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
const dbURL = process.env.DBURL || "mongodb://localhost:27017/";
const port = process.env.PORT || 4000;
const connect = async () => {
    try {
        await mongoose.connect(`${dbURL}`);
        console.log("Connected to the DataBase...");
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Server disconnected to the DataBase...");
});

app.get("/", (req, resp) => {
    console.log("Server");
    resp.status(200).json({
        message: "Server is Running..."
    })
})


// maddleWares 
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes maddlewares
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
// app.use("/api/client", clientRoutes);
// app.use("/api/admin", adminRoutes);


// capture error from server
app.use((err, req, resp, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "SomeThing Went Wrong";
    return resp.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


app.listen(port, () => {
    connect();
    console.log(`Server is connected ... to Port ${port}`);
})