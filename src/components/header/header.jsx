import Logo from "../../logo_ext.svg";

const Header = () => {
    return (
        <header className="header container">
            <img src={Logo} alt="logo" />
        </header>
    );
};
export default Header;