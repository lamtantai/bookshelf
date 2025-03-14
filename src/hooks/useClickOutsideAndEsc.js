import { useEffect } from "react";

function useClickOutsideAndEsc(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(false);
      }
    }

    function handleEscKey(event) {
      if (event.key === "Escape") {
        callback(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [ref, callback]);
}

export default useClickOutsideAndEsc;
