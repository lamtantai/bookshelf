import { twMerge } from "tailwind-merge";
import logo from "/bookshelf-logo.png";

export default function Logo({ className }) {
  return (
    <img
      src={logo}
      alt="bookshelf logo"
      width={32}
      height={32}
      className={twMerge("size-8", className)}
    />
  );
}
