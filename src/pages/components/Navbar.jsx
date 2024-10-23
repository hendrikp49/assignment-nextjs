import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const Navbar = ({ children }) => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("token");
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-between w-full max-w-lg mx-auto mb-10 md:max-w-3xl lg:max-w-5xl">
      {children}
      <button
        onClick={handleLogout}
        className="px-3 rounded-lg bg-rose-500 hover:bg-rose-600 active:shadow-inner active:shadow-rose-900"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
