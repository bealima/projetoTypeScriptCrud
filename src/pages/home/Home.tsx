import { Link } from "react-router-dom";
import styles from '../home/Home.module.css'

const Home = ()=> {
  return(
    <div className='containerContent'>
      <div className={styles.home}>
        <h1>Home</h1>
        <Link to= 'Login'> Logar</Link>
      </div>
    </div>
  );
}

export default Home;