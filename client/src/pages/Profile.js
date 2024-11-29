import React from "react";

const Profile = () => {
  const userInfo = {
    name: "Tony Stark",
    email: "tony@example.com",
    tel: "555-0124",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "900px",
          width: "100%",
          minHeight: "400px",
        }}
      >
        {/* Cột bên trái: Hình ảnh */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://taoanhdep.com/wp-content/uploads/2023/09/taoanhthe-1.jpg"
            alt="Profile"
            style={{
              width: "100%",
              maxWidth: "400px", // Giới hạn tối đa để không quá lớn
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Cột bên phải: Thông tin cá nhân */}
        <div style={{ flex: 1, marginLeft: "50px", marginTop: "20px" }}>
          <h2 style={{ marginBottom: "36px", fontWeight: "bold", fontSize: "24px", marginLeft: "70px" }}>
            Thông Tin Cá Nhân
          </h2>
          <p style={{ marginBottom: "10px", marginLeft: "100px" }}>
            <strong>Họ và tên:</strong> {userInfo.name}
          </p>
          <p style={{ marginBottom: "10px", marginLeft: "100px" }}>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p style={{ marginBottom: "10px", marginLeft: "100px" }}>
            <strong>Số điện thoại:</strong>{" "}
            {userInfo.tel || "Chưa cập nhật"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
