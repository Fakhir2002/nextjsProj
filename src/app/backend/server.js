const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/item"); // Adjust path as per your project structure

const app = express();
const port = 4000;

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware for JSON parsing
app.use(express.json());

// POST route to update post views
app.post("/api/posts/:postId/page", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { views: 1 }, // Increment views count by 1
        $set: { lastViewedAt: new Date() }, // Set last viewed timestamp to current time
      },
      { new: true } // Return updated document
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error updating post view:", error);
    res.status(500).json({ message: "Error updating post view" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
