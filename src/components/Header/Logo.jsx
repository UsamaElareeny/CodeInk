import LogoImage from "../../../public/Logo.png";
export default function Logo() {
  return (
    <div className="w-16 sm:w-20 md:w-24 lg:w-28 rounded-full overflow-hidden">
      <a href="#Home">
        <img
          src={LogoImage}
          alt="Website Logo"
          className="w-full h-auto object-contain"
        />
      </a>
    </div>
  );
}
