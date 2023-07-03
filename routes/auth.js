const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

//REGISTER
router.post("/register", async (req, res) => {
  // Check if a user already exist
  const emailCheck = await User.findOne({ email: req.body.email })
  if (emailCheck) return res.status(400).send('Email already exist') //if emailCheck===true
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    email: req.body.email,
    password: hashedPassword,
    isAdmin: true
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log("error");
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  // Check user 
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not found') //if user===false
  //Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Password is wrong')
  // Create  and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
  res.header('auth-token', token).send(token);
})

module.exports = router;
