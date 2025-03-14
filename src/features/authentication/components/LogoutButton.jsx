import useLogout from "../hooks/useLogout";

export default function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <button
      disabled={isPending}
      onClick={logout}
      className="bg-red-50 p-2 text-red-500"
    >
      Đăng xuất
    </button>
  );
}
