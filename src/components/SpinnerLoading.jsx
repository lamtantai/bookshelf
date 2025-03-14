import { twMerge } from "tailwind-merge";

export default function SpinnerLoading({ className }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className={twMerge(
          "mx-auto size-20 animate-spin rounded-full border-4 border-accent/50 border-t-accent p-1",
          className,
        )}
      ></div>
    </div>
  );
}
