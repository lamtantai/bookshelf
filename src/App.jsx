import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
import BookDetail from "./pages/BookDetail";
import PageNotFound from "./pages/BookDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book" element={<BookDetail />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
