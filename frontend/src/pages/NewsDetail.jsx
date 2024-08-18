import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const NewsDetail = () => {
  const { newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState({});
  const [cookies] = useCookies();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [commentsData, setcommentsData] = useState([]);
  
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

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/comment/${newsId}`,
        { withCredentials: true }
      );
      setcommentsData(res.data.commentsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      navigate("/sign-in");
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/comment`,
        { username, newsId, comment },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchComments();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const Data = () => {
    if (newsDetail.article) {
      return newsDetail.article.map((item) => {
        if (item.type === "image") {
          return <img src={item.value.url} alt="image" />;
        } else {
          return <p>{item.value}</p>;
        }
      });
    }
  };

  useEffect(() => {
    fetchNewsDetail();
    fetchComments();
  }, []);


  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setUsername("");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/user`,
        cookies.token,
        { withCredentials: true }
      );
      setUsername(res.data.user.username);
    };
    verifyCookie();
  }, [cookies]);

  return (
    <section className="bg-primary min-h-screen sm:pt-28 pt-20 sm:px-12 px-4 flex justify-center pb-12 flex-col gap-12">
      <article className="md:px-32 flex flex-col gap-8 text-lg">
        <h1 className="font-bold text-5xl">{newsDetail.title}</h1>
        <h2 className="font-semibold">{newsDetail.subtitle}</h2>
        <Data />
        <h2 className="text-right font-semibold">{newsDetail.author}</h2>
      </article>
      <form className="md:px-32 flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="font-semibold text-lg">Comments</label>
        <textarea
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          className="py-2 px-4 rounded-xl"
        />
        <div className="w-full flex justify-end">
          <button className="flex justify-center items-center font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary">
            Comment
          </button>
        </div>
      </form>
      <div className="md:px-32">
        {commentsData.map((item) => (
          <div key={item._id} className="flex flex-col gap-2 py-4 border-t-2">
            <h2 className="font-semibold capitalize">{item.username}</h2>
            <p>{item.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsDetail;
