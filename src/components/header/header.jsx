import Logo from "../../logo_ext.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <img height={30} width="auto" src={Logo} alt="logo" />
      </div>
    </header>
  );
};
export default Header;
