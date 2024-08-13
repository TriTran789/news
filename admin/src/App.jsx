import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "../src/components"
import { Create, NewsList, NewsDetail } from "./pages";

const App = () => {
  return (
    <main className="bg-primary text-tertiary font-lora relative">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/news-list" element={<NewsList />} />
          <Route path={`/:newsId`} element={<NewsDetail />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
