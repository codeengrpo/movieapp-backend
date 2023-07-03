const router = require("express").Router();
const User = require("../models/User");
const verify = require("../verifyToken");


//GET ALL

router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!!!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE FAVORITES

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedMovie = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
