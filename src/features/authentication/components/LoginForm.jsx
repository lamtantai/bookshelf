import { useState } from "react";

import useLogin from "../hooks/useLogin";
import Input from "./Input";
import SpinnerMini from "../../../components/SpinnerMini";

export default function LoginForm() {
  const { login, isPending, isError } = useLogin();

  const [account, setAccount] = useState({
    email: "user@user.com",
    password: "user",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = account;

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setAccount({ email: "", password: "" });
        },
      },
    );
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Email"
        name="email"
        value={account.email}
        onChange={handleInputChange}
      />

      <Input
        type="password"
        label="Mật khẩu"
        name="password"
        value={account.password}
        onChange={handleInputChange}
      />

      {isError && (
        <div className="rounded-md bg-red-100 p-2 text-sm font-medium">
          Email hoặc mật khẩu không đúng!
        </div>
      )}

      <button
        disabled={isPending}
        type="submit"
        className="mt-6 rounded-md bg-accent p-2 font-semibold text-white hover:brightness-105 focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        {isPending ? <SpinnerMini /> : "Đăng nhập"}
      </button>
    </form>
  );
}
