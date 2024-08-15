import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { convertBase64 } from "../utils/converBase64";
import { ArticleInput } from "../components";

const Create = () => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    title: "",
    subtitle: "",
    article: "",
    author: "",
  });

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = async (e) => {
    const base64 = await convertBase64(e.target.files[0]);
    setArticleData({ ...articleData, image: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(articleData)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/article/post`,
        articleData,
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

  return (
    <section className="bg-primary min-h-screen sm:pt-28 pt-20 sm:px-12 px-4 flex justify-center pb-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:w-[80%] w-[90%] ring-2 ring-slate-900/20 rounded-xl px-12 py-8 bg-white gap-4"
      >
        <label className="font-semibold text-lg">Title</label>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        />
        <label className="font-semibold text-lg">Subtitle</label>
        <textarea
          onChange={handleChange}
          name="subtitle"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        />
        {/* <label className="font-semibold text-lg">Image</label>
        <input
          onChange={handleChangeImage}
          name="image"
          type="file"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        /> */}
        <label className="font-semibold text-lg">Article</label>
        <ArticleInput articleData={articleData} setArticleData={setArticleData} />
        {/* <textarea
          onChange={handleChange}
          name="article"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        /> */}
        <label className="font-semibold text-lg">Author</label>
        <input
          onChange={handleChange}
          name="author"
          type="text"
          className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
        />
        <button className="font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary">
          Create
        </button>
      </form>
    </section>
  );
};

export default Create;
