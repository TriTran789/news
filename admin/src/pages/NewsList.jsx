import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  const fetchNewsList = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/article/news-list`,
      { withCredentials: true }
    );
    setNewsList(res.data.newsList);
  };

  const handleRemove = async (e, id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/article/remove/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchNewsList();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchNewsList();
  }, [newsList]);

  // return (
  //   <section className="bg-primary min-h-screen sm:pt-28 pt-20 sm:px-12 px-4 pb-12">
  //     <div className="flex flex-wrap justify-center gap-12">
  //       {newsList.map((item) => (
  //         <div className="flex flex-col w-64">
  //           <Link>
  //             <img src={item.image.url} alt="image" className="w-64 h-64 object-cover" />
  //             <div>
  //               <h1 className="font-bold capitalize text-xl line-clamp-3 text-wrap">{item.title}</h1>
  //               <h1>{item.author}</h1>
  //             </div>
  //           </Link>
  //           <button>Remove</button>
  //         </div>
  //       ))}
  //     </div>
  //   </section>
  // )

  return (
    <section className="bg-primary min-h-screen sm:pt-28 pt-20 sm:px-12 px-4 pb-12">
      <div className="flex gap-12 flex-wrap justify-center">
        {newsList.map((item) => (
          <div key={item._id} className="flex flex-col w-64 rounded-xl shadow-xl">
            <Link to={`/${item._id}`} className="flex flex-col">
              <img
                src={item.image.url}
                alt="image"
                className="w-64 h-64 object-cover rounded-t-xl"
              />
              <div className="mt-4 px-4 flex flex-col h-28 justify-between">
                <h1 className="font-bold capitalize text-xl line-clamp-3 text-wrap">
                  {item.title}
                </h1>
                <h2 className="font-bold text-lg capitalize text-slate-900/50">
                  {item.author}
                </h2>
              </div>
            </Link>
            <button
              onClick={(e) => handleRemove(e, item._id)}
              className="b-0 bg-tertiary py-2 text-primary font-semibold rounded-b-xl mt-4 hover:ring-2 hover:bg-primary hover:ring-tertiary hover:text-tertiary"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsList;
