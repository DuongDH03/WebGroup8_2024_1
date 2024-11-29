import React, { useEffect, useState } from "react";
import { isSignedIn } from "../../function/auth";
import logo from "../../assets/logo.png";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [signedIn, setSignedIn] = useState(isSignedIn());
  const [top, setTop] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setSignedIn(!!token);
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
    window.location.href = "/";
  };

  // Menu for dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/profile">Thông tin cá nhân</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/user-tickets">Vé đã đặt</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" danger onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={`sticky top-0 z-50 ${!top && "drop-shadow-md"}`}>
      <nav className="border-2">
        <div className="container-fluid bg-base-100 px-24">
          <div className="navbar">
            <div className="navbar-start">
              <a href="/" className="flex flex-row items-center justify-start">
                <div className="w-8 md:w-12">
                  <img src={logo} alt="Logo" className="img" />
                </div>
                <div className="mx-1 be-vietnam-pro-black tracking-widest text-3xl md:text-3xl">CINEMAX</div>
              </a>
            </div>
            <div className="navbar-end">
              {signedIn ? (
                <>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Space className="cursor-pointer">
                    <div className="avatar">
                      <div className="w-9 rounded-full">
                        <img
                          src="https://bhdstar.vn/wp-content/assets/loodo/no-user.jpg"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <span>Username</span>
                    <DownOutlined />
                  </Space>
                </Dropdown>
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
