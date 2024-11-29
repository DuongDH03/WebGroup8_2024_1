import React, { useState } from "react";
import { toast } from "react-toastify";
import { signUp } from "../../function/auth";
import "./Auth.css";


export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = {};
        if (!formData.name) validationErrors.name = "Hãy nhập họ tên";
        if (!formData.email) validationErrors.email = "Hãy nhập email";
        if (!formData.tel) validationErrors.tel = "Hãy nhập số điện thoại";
        if (!formData.password) validationErrors.password = "Hãy nhập mật khẩu";
        if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Mật khẩu không khớp";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const result = await signUp(formData);
        if (result.success) {
            toast.success("Registration successful! Please log in.");
            window.location.href = "/auth/signin";
        } else {
            toast.error(result.error);
        }
    };

    return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Đăng ký
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ tên</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                value={formData.name}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.name && <span className="form-error">{errors.name}</span>}
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="name@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>
                        <div>
                            <label for="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                            <input
                                type="tel"
                                name="tel"
                                id="tel"
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                value={formData.tel}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.tel && <span className="form-error">{errors.tel}</span>}
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.password && <span className="form-error">{errors.password}</span>}
                        </div>
                        <div>
                            <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                        </div>
                        <button type="submit" className="w-full btn btn-md btn-primary text-white hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Đã có tài khoản? <a href="/auth/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    );
}
