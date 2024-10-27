import { NavLink } from "react-router-dom";
import { BiUserCircle, BiSearch } from "react-icons/bi"
import { RiArrowDropDownFill } from "react-icons/ri"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <div className="logo">LOGO</div>
        <div className='searchbox'>
          <BiSearch className='searchbtn' />
          <input type="text" placeholder="Search For a Movie" />
        </div>
      </div>
      <div className="right">
        <p className='dropdown'>
          Choose Location
          <RiArrowDropDownFill className="dropicon" />
        </p>
        <NavLink to="/" className='theme_btn1 linkstylenone'>Logout</NavLink>
        <NavLink to="/" className='linkstylenone'>
          <BiUserCircle className='theme_icon1' />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
