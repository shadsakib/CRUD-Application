const express = require("express");
const authRouter = express.Router();

const { register, signIn } = require("../controllers/authController");

authRouter.post("/register", register);

authRouter.post("/signin", signIn);

module.exports = authRouter;
