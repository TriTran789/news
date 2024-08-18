import mongoose from "mongoose";

const CommnetSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    newsId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommnetSchema);

export default CommentModel;
