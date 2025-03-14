import { twMerge } from "tailwind-merge";

export default function UserLogo({ className }) {
  return (
    <img
      src="/user.png"
      alt="user avatar"
      className={twMerge("size-10 object-cover", className)}
    />
  );
}
