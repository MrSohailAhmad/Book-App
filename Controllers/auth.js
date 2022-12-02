require("dotenv").config();
const Client = require("../Models/Client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// manage error result
const createError = require("../utils/error");

// for register clients in web app
const register = async (req, resp, next) => {
    const { username, email, password, cpassword, fullName } = req.body;

    const isPassword = password === cpassword;

    console.log(isPassword);

    if (isPassword) {
        try {
            const saltRound = bcrypt.genSaltSync(12);
            const hashPassword = bcrypt.hashSync(password, saltRound);
            console.log(hashPassword);

            const newClient = await Client({
                fullName: fullName,
                username: username,
                password: hashPassword,
                email: email,
            });
            await newClient.save();
            console.log("Client Register Success Full")
            resp.json({
                message: "Client Registration Successfull"
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("Password Are not Matched");
    }
};



const login = async (req, resp, next) => {
    const { username, password } = req.body;

    try {

        const client = await Client.findOne({ username });

        if (!client) return next(createError(404, "User Not Found..."));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, client.password)

        if (!isPasswordCorrect) return next(createError(400, "UserName or Password are not correct..."));

        const token = jwt.sign({ id: client._id, isUser: client.isUser }, process.env.SECRET_KEY);

        const { password, isAdmin, ...otherDetails } = client._doc;

        resp.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({
            ...otherDetails
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { register, login };