import express from "express";

import CommentModel from "../mongoDB/models/comment.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, newsId, comment } = req.body;
    const db_res = await CommentModel.create({
      username,
      newsId,
      comment,
    });
    res.status(200).json({ success: true, message: "Comment Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
});

router.get("/:newsId", async (req, res) => {
  try {
    const { newsId } = req.params;
    const commentsData = await CommentModel.find({ newsId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, commentsData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
});

export default router;
