import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ScrollToTop from "./components/ScrollToTop";
import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import BookDetail from "./pages/BookDetail";
import PageNotFound from "./pages/PageNotFound";
import AllGenres from "./pages/AllGenres";
import GenreDetail from "./pages/GenreDetail";
import Author from "./pages/Author";
import SimilarBook from "./pages/SimilarBook";
import BooksByGenre from "./pages/BooksByGenre";
import BookshelfOverview from "./pages/BookshelfOverview";
import BookShelfStatus from "./pages/BookShelfStatus";
import Login from "./pages/Login";
import BookshelfLayout from "./features/bookshelf/components/BookshelfLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="genres" element={<AllGenres />} />
            <Route path="genres/:genreSlug" element={<GenreDetail />} />
            <Route path="genres/books/:genreSlug" element={<BooksByGenre />} />

            <Route path="bookshelf" element={<BookshelfLayout />}>
              <Route index element={<BookshelfOverview />} />
              <Route path=":readStatus" element={<BookShelfStatus />} />
            </Route>

            <Route path="book/similar/:bookId" element={<SimilarBook />} />
            <Route path="book/:bookId" element={<BookDetail />} />
            <Route path="author/:authorName" element={<Author />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
