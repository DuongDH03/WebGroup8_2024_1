import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-row items-center justify-start py-4 px-24 gap-4 bg-white">
      <a href="/" className="flex flex-row items-center justify-start mb-2">
        <div className="w-16">
          <img src={logo} alt="Logo" className="img" />
        </div>
      </a>
      <p className="text-sm">&copy; {new Date().getFullYear()} CINEMAX. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
