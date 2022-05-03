import style from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <header>
      <nav className={style.navbar}>
        <div className={style.container}>
          <h1 className={style.siteName}>React.Music</h1>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
