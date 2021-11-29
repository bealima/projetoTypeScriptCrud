import { Formik, Field, Form, FormikHelpers } from 'formik';
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import { LoginDTO } from '../model/LoginDTO';
import styles from '../pages/Login.module.css'

const Login = ()=>{
  const {handleLogin} = useContext<any>(AuthContext)
  
  return(
    <div className='containerContent'>
      <div className={styles.login}>
        <h1>Logar</h1>
        <Formik
          initialValues={{
            usuario: '',
            senha: '',
          }}
          onSubmit={(
            values: LoginDTO,
            { setSubmitting }: FormikHelpers<LoginDTO>
          ) => {
            
              handleLogin(values);
              setSubmitting(false);
            
          }}
        >
          <Form>
            <div>
              <label htmlFor="usuario">Usuário </label>
              <Field id="usuario" name="usuario"  />
            </div>
            <div>
              <label htmlFor="senha">Senha </label>
              <Field id="senha" name="senha" type="password" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
       </div> 
    </div>
  );
}

export default Login;