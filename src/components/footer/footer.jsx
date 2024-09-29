import Logo from "../../logo_ext_white.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container center">
        <img height={30} width="auto" src={Logo} alt="logo" />
        <p className="copiright">© 2024 Develhope Tutti i diritti riservati</p>
      </div>
    </footer>
  );
};
export default Footer;
