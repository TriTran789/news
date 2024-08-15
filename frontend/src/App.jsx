import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, SignIn, SignUp, NewsDetail } from "./pages";

const App = () => {
  return (
    <main className="bg-primary text-tertiary font-lora relative">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/:newsId" element={<NewsDetail />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
