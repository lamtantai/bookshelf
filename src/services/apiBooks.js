import { PAGE_SIZE } from "../utils/constants";

const API_KEY = "AIzaSyCz8qp8rc4KZ2MciY2u_zvdS-AX4uAt6Q0";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function getBookDetail(bookId) {
  const res = await fetch(`${BASE_URL}/${bookId}?key=${API_KEY}`);

  if (!res.ok) {
    throw new Error("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
  }

  const data = await res.json();

  const updatedBook = {
    ...data.volumeInfo,
    bookId: data.id,
    thumbnail: data.volumeInfo.imageLinks?.thumbnail ?? null,
  };

  return updatedBook;
}

export async function getBooks(query, searchType, page, orderByNewest) {
  const startIndex = page ? (page - 1) * PAGE_SIZE : 0;

  let queryString = "";

  if (searchType === "author") {
    queryString = `inauthor:"${query}"`; // Tìm kiếm theo tác giả
  } else if (searchType === "subject") {
    queryString = `subject:"${query}"`; // Tìm kiếm theo thể loại sách
  } else {
    queryString = `intitle:"${query}"`; // Tìm kiếm theo tiêu đề
  }

  const urlParams = new URLSearchParams({
    q: queryString,
    maxResults: PAGE_SIZE,
    startIndex: startIndex,
    key: API_KEY,
  });

  if (orderByNewest) {
    urlParams.append("orderBy", "newest");
  }

  const res = await fetch(`${BASE_URL}?${urlParams.toString()}`);

  if (!res.ok) {
    throw new Error("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
  }

  const data = await res.json();

  const totalItems = data.totalItems || 0;

  const updatedBooks = data.items
    ? data.items.map((item) => ({
        ...item,
        volumeInfo: {
          ...item.volumeInfo,
          bookId: item.id,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? null,
        },
      }))
    : [];

  const allBooks = updatedBooks.map((book) => book.volumeInfo);

  return { allBooks, totalItems };
}
