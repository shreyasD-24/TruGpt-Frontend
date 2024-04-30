import Logo from "./Logo";
import NavButton from "./NavButton";
import { userAuth } from "../store/userAuth";

const Header = () => {
  let auth = userAuth();
  return (
    <nav className="w-full bg-[#05101c] min-h-[4.5rem] flex max-xs:h-[6rem] sticky top-0">
      <Logo></Logo>
      <div className="flex xs:w-60 w-45 items-center justify-center xs:gap-x-10 gap-x-5 mt-3 xs:mr-8 mr-4">
        {!auth.isLoggedIn ? (
          <>
            <NavButton
              to="/signup"
              text="Signup"
              className="bg-indigo-600 text-white hover:bg-indigo-500 min-w-24 h-10 rounded-xl hover:scale-105  text-center pt-3 uppercase font-bold text-sm"
            />
            <NavButton
              to="/login"
              text="Login"
              className="bg-gray-600 hover:bg-gray-500 text-white min-w-24 h-10 rounded-xl hover:scale-105 text-center pt-3 uppercase font-bold text-sm"
            />
          </>
        ) : (
          <>
            <NavButton
              to="/chat"
              text="Chats"
              className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-24 h-10 rounded-xl hover:scale-105  text-center pt-3 uppercase font-bold text-sm"
            />
            <NavButton
              to="/"
              text="Logout"
              className="bg-gray-600 hover:bg-gray-500 text-white min-w-24 h-10 rounded-xl hover:scale-105 text-center pt-3 uppercase font-bold text-sm"
              onclick={auth.logout}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
