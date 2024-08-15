import mongoose from "mongoose";

const NewsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    article: {
      type: [Object],
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model("News", NewsSchema);

export default NewsModel;
