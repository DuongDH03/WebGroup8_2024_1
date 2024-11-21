import React, { useEffect, useState } from "react";
import { isSignedIn } from "../../function/auth";
import logo from "../../assets/logo.png";

const Navbar = () => {
  // const signedIn = isSignedIn();
  const [signedIn, setSignedIn] = useState(false);
  const [top, setTop] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setSignedIn(!!token);
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
    window.location.href = "/";
  };

  return (
    <header className={`sticky top-0 z-50 ${!top && "drop-shadow-md"}`}>
      <nav className="border-2">
        <div className="container bg-base-100 px-24">
          <div className="navbar">
            <div className="navbar-start">
              <a href="/" className="flex flex-row items-center justify-start">
                <div class="w-12">
                  <img src={logo} alt="Logo" className="img" />
                </div>
                <div className="mx-1 be-vietnam-pro-black tracking-widest text-3xl">CINEMAX</div>
              </a>
            </div>
            <div className="navbar-end">
              {signedIn ? (
                <>
                  <div class="avatar">
                    <div class="w-9 rounded-full">
                      <img
                        src="https://bhdstar.vn/wp-content/assets/loodo/no-user.jpg"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <span className="mx-2">Username</span>
                  <span>|</span>
                  <a
                    href="/auth/signin"
                    className="mx-2 be-vietnam-pro-bold"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </a>
                </>
              ) : (
                <a
                  href="/auth/signin"
                  className="btn btn-sm btn-primary text-white"
                >
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
