import React, { useCallback, useEffect, useState } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";

const Navbar = () => {
  const SCROLL_OFFSET = 66;

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const { data: user } = useCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-3 flex flex-row items-center transition duration-500 bg-slate-600 ${
          showBackground ? "bg-slate-600 bg-opacity-70" : ""
        }`}
      >
        <img src="/images/logo.png" className="h-10 lg:h-14" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {/* NAVBAR_ITEM */}
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full overflow-hidden">
              <img src={user?.image} alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
