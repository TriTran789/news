import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState({});

  const fetchNewsDetail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/article/${newsId}`,
        { withCredentials: true }
      );
      setNewsDetail(res.data.newsDetail);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const Data = () => {
    if (newsDetail.article) {
      return newsDetail.article.map((item) => {
        if (item.type === "image") {
          return (
            <img src={item.value.url} alt="image" />
          )
        } else {
          return (<p>{item.value}</p>)
        }
      })
    }
  }

  useLayoutEffect(() => {
    fetchNewsDetail();
  }, [newsId]);

  return (
    <section className="bg-primary min-h-screen sm:pt-28 pt-20 sm:px-12 px-4 flex justify-center pb-12">
      <article className="md:px-32 flex flex-col gap-8 text-lg">
        <h1 className="font-bold text-5xl">{newsDetail.title}</h1>
        <h2 className="font-semibold">{newsDetail.subtitle}</h2>
        <Data />
        <h2 className="text-right font-semibold">{newsDetail.author}</h2>
      </article>
      <div>
        
      </div>
    </section>
  );
};

export default NewsDetail;
