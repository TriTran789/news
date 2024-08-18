import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { convertBase64 } from "../utils/converBase64";

let newArticle = [];

const NewsDetail = () => {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState({});

  const handleChange = (e) => {
    setNewsDetail({ ...newsDetail, [e.target.name]: e.target.value });
  };

  const handleChangeAticle = async (e, index) => {
    // setNewsDetail({ ...newsDetail, newImage: base64 });
    if (e.target.type === "file") {
      const base64 = await convertBase64(e.target.files[0]);
      newArticle[index] = { ...newArticle[index], newValue: base64 };
    } else {
      newArticle[index] = { ...newArticle[index], value: e.target.value };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewsDetail({ ...NewsDetail, article: newArticle });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/article/put/${newsId}`,
        newsDetail,
        { withCredential: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/news-list");
        }, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchNewsDetail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/article/${newsId}`,
        { withCredentials: true }
      );
      setNewsDetail(res.data.newsDetail);
      newArticle = res.data.newsDetail.article;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchNewsDetail();
  }, []);

  return (
    <section className="bg-primary min-h-screen sm:pt-28 pt-20 sm:px-12 px-4 flex justify-center pb-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:w-[80%] w-[90%] ring-2 ring-slate-900/20 rounded-xl px-12 py-8 bg-white gap-4"
      >
        <label className="font-semibold text-lg">Title</label>
        <input
          value={newsDetail.title}
          onChange={handleChange}
          name="title"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        />
        <label className="font-semibold text-lg">Subtitle</label>
        <textarea
          value={newsDetail.subtitle}
          onChange={handleChange}
          name="subtitle"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        />
        {/* <label className="font-semibold text-lg">Replace Image (Option)</label>
        <input
          onChange={handleChangeImage}
          name="image"
          type="file"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        /> */}
        <label className="font-semibold text-lg">Article</label>
        {/* <textarea
          value={newsDetail.article}
          onChange={handleChange}
          name="article"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        /> */}
        {newsDetail.article &&
          newsDetail.article.map((item, index) => {
            if (item.type === "text") {
              return (
                <textarea
                  key={index}
                  id={index}
                  onChange={(e) => handleChangeAticle(e, index)}
                  defaultValue={item.value}
                  className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
                />
              );
            }
            if (item.type === "image") {
              return (
                <div key={index}>
                  <img src={item.value.url} alt="image" />
                  <div className="flex gap-8 py-4">
                    Replace this photo
                    <input
                      type="file"
                      id={index}
                      onChange={(e) => handleChangeAticle(e, index)}
                    />
                  </div>
                </div>
              );
            }
          })}
        <label className="font-semibold text-lg">Author</label>
        <input
          value={newsDetail.author}
          onChange={handleChange}
          name="author"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        />
        <button className="font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary">
          Change
        </button>
      </form>
    </section>
  );
};

export default NewsDetail;
