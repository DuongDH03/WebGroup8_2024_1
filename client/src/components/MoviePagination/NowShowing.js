import React, { useState } from "react";
import MovieCard from "../Movie/MovieCard"

const nowShowingMovies = [
  {
    title: "LINH MIÊU: QUỶ NHẬP TRÀNG",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-20.jpg",
    _id: "109994",
    genre: "Horror",
    ageLimit: "T18",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "AMAZON BULLSEYE: CƯỜI XUYÊN BIÊN GIỚI",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-15.jpg",
    _id: "117224",
    genre: "Comedy",
    ageLimit: "T13",
    type: "Phụ đề/Lồng tiếng",
    format: "2D",
  },
  {
    title: "WICKED",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-11.jpg",
    _id: "115142",
    genre: "Fantasy",
    ageLimit: "K",
    type: "Phụ đề/Lồng tiếng",
    format: "2D",
  },
  {
    title: "GLADIATOR: VÕ SĨ GIÁC ĐẤU 2",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-2.jpg",
    _id: "98644",
    genre: "Action",
    ageLimit: "T18",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "GIẢI CỨU ANH \"THẦY\"",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-10.jpg",
    _id: "117491",
    genre: "Comedy",
    ageLimit: "T16",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "RED ONE: MẬT MÃ ĐỎ",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-14.jpg",
    _id: "115144",
    genre: "Action",
    ageLimit: "K",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "LOVE IN THE BIG CITY: ĐÔI BẠN HỌC YÊU",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-3.jpg",
    _id: "116504",
    genre: "Romance",
    ageLimit: "T18",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "REBELLIOUS: CÔNG CHÚA NỔI LOẠN",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-16.jpg",
    _id: "117772",
    genre: "Animation",
    ageLimit: "P",
    type: "Phụ đề/Lồng tiếng",
    format: "2D",
  },
  {
    title: "THE COLORS WITHIN: SẮC MÀU CỦA CẢM XÚC",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-13.jpg",
    _id: "117684",
    genre: "Animation",
    ageLimit: "P",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "SHUTTER: HỒN MA THEO ĐUỔI",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-12.jpg",
    _id: "117672",
    genre: "Horror",
    ageLimit: "T18",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "THE SUBSTANCE: THẦN DƯỢC",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/10/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-3.png",
    _id: "116490",
    genre: "Horror",
    ageLimit: "T18",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "NGÀY XƯA CÓ MỘT CHUYỆN TÌNH",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/10/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-13.jpg",
    _id: "41265",
    genre: "Romance",
    ageLimit: "T16",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "STUNTMAN: KẺ ĐÓNG THỂ",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-5.jpg",
    _id: "117432",
    genre: "Action",
    ageLimit: "T13",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "NEVER LET GO: ĐỪNG BUÔNG TAY",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-6.jpg",
    _id: "117434",
    genre: "Thriller",
    ageLimit: "T18",
    type: "Phụ đề",
    format: "2D",
  },
  {
    title: "MY HERO ACADEMIA: HỌC VIỆN SIÊU ANH HÙNG 2024",
    imageUrl: "https://bhdstar.vn/wp-content/uploads/2024/11/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-7.jpg",
    genre: "Animation",
    ageLimit: "K",
    type: "Phụ đề",
    format: "2D",
  },
]

const ITEMS_PER_PAGE = 10;

export const NowShowing = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(nowShowingMovies.length / ITEMS_PER_PAGE);

  const handleChangePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentMovies = nowShowingMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 py-6">
      <div className="flex w-full justify-center items-center my-4">
        <div className="badge badge-lg badge-primary h-12">
          <h1 className="text-2xl font-bold text-center uppercase px-6 py-2">
            Phim đang chiếu
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="flex items-center justify-center">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`btn btn-sm ${
            currentPage === 1 ? "btn-disabled" : "btn-outline"
          }`}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleChangePage(index + 1)}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`btn btn-sm ${
            currentPage === totalPages ? "btn-disabled" : "btn-outline"
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
};
