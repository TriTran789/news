import { useState } from "react";

import { convertBase64 } from "../utils/converBase64";

let data = [];

const ArticleInput = ({ articleData, setArticleData }) => {
  const [aritcleInput, setAritcleInput] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  const handleChange = async (e) => {
    // if (e.target.type === "file") {
    //   const base64 = await convertBase64(e.target.files[0]);
    //   setData([...data, data[e.target.id] = {type: "image", value: base64}]);
    // } else {
    //   setData([...data, data[e.target.id] = {type: "text", value: e.target.value}]);
    // }
    // setArticleData({...articleData, article: data});
    if (e.target.type === "file") {
      const base64 = await convertBase64(e.target.files[0]);
      data[e.target.id] = { type: "image", value: base64 };
    } else {
      data[e.target.id] = { type: "text", value: e.target.value };
    }
    setArticleData({ ...articleData, article: data });
  };

  const addImage = () => {
    setAritcleInput([
      ...aritcleInput,
      <input
        onChange={handleChange}
        id={index}
        type="file"
        className="bg-primary w-full text-base py-2 px-3 rounded-lg focus:outline-none"
      />,
    ]);
    setIndex((pre) => pre + 1);
  };

  const addParagraph = () => {
    setAritcleInput([
      ...aritcleInput,
      <textarea
        onChange={handleChange}
        id={index}
        type="text"
        className="bg-primary text-base py-2 px-3 rounded-lg focus:outline-none"
      />,
    ]);
    setIndex((pre) => pre + 1);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {aritcleInput.map((item) => (
          <>{item}</>
        ))}
      </div>
      <div className="flex justify-center gap-12 mt-4">
        <button
          type="button"
          onClick={addImage}
          className="font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary"
        >
          Add Image
        </button>
        <button
          type="button"
          onClick={addParagraph}
          className="font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary"
        >
          Add Paragraph
        </button>
      </div>
    </div>
  );
};

export default ArticleInput;
