import express from "express";
import NewsModel from "../mongoDB/models/news.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// create news
router.post("/post", async (req, res) => {
  try {
    const { title, subtitle, image, article, author } = req.body;
    if (!title || !article || !subtitle || !image || !author) {
      return res.json({ success: false, message: "All fields are required!" });
    }
    const isTitleExisted = await NewsModel.findOne({ title });
    if (isTitleExisted) {
      return res.json({ success: false, message: "Title must be unique!" });
    }

    const cloud_res = await cloudinary.uploader.upload(image, {
      folder: "news/image",
    });

    const news = await NewsModel.create({
      ...req.body,
      image: { public_id: cloud_res.public_id, url: cloud_res.secure_url },
    });
    res.status(200).json({ success: true, message: "Create Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
});

//  get all news
router.get("/news-list", async (req, res) => {
  try {
    const newsList = await NewsModel.find({});
    res.status(200).json({ success: true, newsList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
});

// delete news
router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newsDetail = await NewsModel.findById(id);
    await cloudinary.uploader.destroy(newsDetail.image.public_id);
    const db_res = await NewsModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "News Removed!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
});

// get news detail
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newsDetail = await NewsModel.findById(id);
    if (!newsDetail)
      return res.json({ success: false, message: "News Not Found!" });
    res.status(200).json({ success: true, newsDetail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wronng!" });
  }
});

// edit news
router.put("/put/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, newImage, article, author } = req.body;
    const newsDetail = await NewsModel.findById(id);
    if (!newsDetail)
      return res.json({ success: false, message: "News Not Found!" });
    let image;
    if (newImage) {
      await cloudinary.uploader.destroy(newsDetail.image.public_id);
      const cloud_res = await cloudinary.uploader.upload(newImage, {
        folder: "news/image",
      });
      image = { public_id: cloud_res.public_id, url: cloud_res.secure_url };
    } else {
      image = newsDetail.image;
    }
    newsDetail.title = title;
    newsDetail.subtitle = subtitle;
    newsDetail.image = image;
    newsDetail.article = article;
    newsDetail.author = author;

    await newsDetail.save();
    res
      .status(200)
      .json({ success: true, message: "News Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Someting went wrong!" });
  }
});

export default router;
