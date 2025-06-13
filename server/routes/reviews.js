// server/routes/reviews.js
import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// POST a new review
router.post("/", async (req, res) => {
  try {
    const { name, message, stars } = req.body; // <- include stars
    const newReview = new Review({ name, message, stars }); // <- save stars
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Error submitting review." });
  }
});


// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews." });
  }
});

export default router;
