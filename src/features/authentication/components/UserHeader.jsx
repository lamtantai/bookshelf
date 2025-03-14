import UserLogo from "../../../components/UserLogo";
import useUser from "../hooks/useUser";
import LogoutButton from "./LogoutButton";

export default function UserHeader() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center">
      <UserLogo className="size-28" />

      <span className="mb-4 text-2xl font-semibold text-accent">
        {user.email}
      </span>

      <LogoutButton />
    </div>
  );
}
