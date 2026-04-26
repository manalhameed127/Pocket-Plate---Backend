const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const user = await User.create(req.body);

    return res.status(200).json({
      message: "User registered",
      user
    });

 } catch (error) {
  console.log("ERROR:", error);
  if (error.code === 11000) {
    return res.status(400).json({ error: "Email already registered" });
  }
  return res.status(500).json({ error: error.message });
}
});

module.exports = router;