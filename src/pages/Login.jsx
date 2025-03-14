import { Link } from "react-router-dom";

import Logo from "../components/Logo";
import LoginForm from "../features/authentication/components/LoginForm";
import useUser from "../features/authentication/hooks/useUser";

export default function Login() {
  const { user, isAuthenticated, isLoading } = useUser();

  if (isLoading) return;

  return (
    <div className="mx-auto flex max-w-[400px] flex-col items-center gap-4 px-4 pt-20">
      <Link to="/">
        <Logo className="size-20" />
      </Link>

      {isAuthenticated && !isLoading ? (
        <h1 className="text-center text-lg">
          Bạn đang đăng nhập dưới tên{" "}
          <span className="font-bold">{user.email}</span>
        </h1>
      ) : (
        <>
          <h1 className="text-3xl font-semibold">Đăng nhập</h1>
          <LoginForm />
        </>
      )}
    </div>
  );
}
