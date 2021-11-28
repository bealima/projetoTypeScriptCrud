import NavBar from "../navbar/NavBar";
import logo from '../../midia/logoCogumeloShop.png'
import styles from '../../components/header/Header.module.css';

const Header = () =>{
  return(
    <div className='container'>
      <header className={styles.header}>
        <a href='/login'><img src={logo} alt="figura cogumelo"/></a>
        <NavBar/>
      </header>
    </div>
  );
}

export default Header;