import { useRef, useState } from "react";

import useDebouncedValue from "../../../hooks/useDebouncedValue";

import useBooks from "../../books/hooks/useBooks";
import SearchDropdown from "./SearchDropdown";
import useClickOutsideAndEsc from "../../../hooks/useClickOutsideAndEsc";
import SearchInput from "./SearchInput";

const DELAY_TIME = 800;

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { debouncedValue } = useDebouncedValue(searchQuery, DELAY_TIME);

  const { allBooks, isLoading, totalItems, isPending } = useBooks(
    debouncedValue,
    "title",
    1,
  );

  const searchBarRef = useRef(null);

  useClickOutsideAndEsc(searchBarRef, () => setIsFocused(false));

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleClear() {
    setSearchQuery("");
  }

  return (
    <div className="relative mx-auto max-w-[450px] flex-1" ref={searchBarRef}>
      <SearchInput
        id="search"
        type="text"
        value={searchQuery}
        onChange={handleChange}
        onClear={handleClear}
        placeholder="Nhập tên sách..."
        isLoading={isLoading}
        onFocus={() => setIsFocused(true)}
      />

      {searchQuery && !isPending && isFocused && (
        <SearchDropdown
          books={allBooks?.slice(0, 4)}
          query={debouncedValue}
          onClear={handleClear}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}
