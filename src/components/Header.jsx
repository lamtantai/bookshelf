import { Link } from "react-router-dom";

import Logo from "./Logo";
import UserLogo from "./UserLogo";
import NavBar from "./NavBar";
import SearchBar from "../features/search/components/SearchBar";
import useUser from "../features/authentication/hooks/useUser";

export default function Header() {
  const { isAuthenticated } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-horizontal py-3 lg:gap-10">
        <Link to="/">
          <Logo />
        </Link>

        <NavBar className="hidden flex-1 border-0 md:flex lg:text-lg" />

        <SearchBar />

        <Link to={isAuthenticated ? "/bookshelf" : "/login"}>
          <UserLogo />
        </Link>
      </div>

      <NavBar />
    </header>
  );
}
