import { useContext } from "react";
import styles from '../../components/navbar/NavBar.module.css';
import { AuthContext } from "../../context/AuthContext";

const NavBar = ()=> {
  const{handleLogout, auth} = useContext<any>(AuthContext)

  return(
    <nav className={styles.navBar}>
      <ul>
        <li><a href='/login'>Login</a></li>
        <li><a href='/pessoa'>Pessoa</a></li>
        <li><a href='/endereco'>Endereço</a></li>
      </ul>
      {auth && <button type='button' onClick={handleLogout}>Sair</button>}
    </nav>
  );
}

export default NavBar;