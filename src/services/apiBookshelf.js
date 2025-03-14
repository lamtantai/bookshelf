import supabase from "./supabase";

import { PAGE_SIZE } from "../utils/constants";

export async function getBookshelf() {
  let { data, error } = await supabase.from("bookshelf").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBookshelfByStatus(page, status) {
  let { data, error } = await supabase
    .from("bookshelf")
    .select("*")
    .eq("status", status)
    .range((page - 1) * PAGE_SIZE, PAGE_SIZE * page - 1);

  if (error) {
    throw new Error(error.message);
  }

  let { count, error: countError } = await supabase
    .from("bookshelf")
    .select("*", { count: "exact", head: true })
    .eq("status", status);

  if (countError) {
    throw new Error(countError.message);
  }

  return { count, data };
}

export async function addBookToBookshelf(book) {
  let { data, error } = await supabase
    .from("bookshelf")
    .insert([book])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateBookshelf({ book, bookId }) {
  let { data, error } = await supabase
    .from("bookshelf")
    .update(book)
    .eq("bookId", bookId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBookFromBookShelf(bookId) {
  let { error } = await supabase
    .from("bookshelf")
    .delete()
    .eq("bookId", bookId);
}
