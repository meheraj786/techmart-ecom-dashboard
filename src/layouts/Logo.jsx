import { Link } from "react-router";

const Logo = ({ className }) => {
  return (
    <Link to="/">
      <div
        className={` font-logo text-[28px] text-black font-bold cursor-pointer ${className}`}
      >
        TECHMART
      </div>
    </Link>
  );
};

export default Logo;
