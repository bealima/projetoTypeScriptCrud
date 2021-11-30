import { Field, Form, Formik, FormikHelpers } from 'formik';
import { EnderecoDTO } from "../../model/EnderecoDTO";
import { useState } from 'react';
import axios from 'axios';
import styles from '../endereco/Endereco.module.css'



const Endereco=() => {
  const[initialValues, setInitialValues] = useState({
    cep:'',
    localidade:'',
    complemento:'',
    uf:'',
    logradouro:'',
    numero: 0,
    pais:'',
  })


  const handleClick = async(value:string)=>{
    const{data}= await axios.get(`https://viacep.com.br/ws/${value}/json/`)
    console.log(data)
    console.log(data.cep)
    console.log(data.logradouro)
    setInitialValues(data)
    
  }

  
  return(
    <div className='containerContent '>
      <div className={styles.endereco}>
      <h1>Endereço</h1>
        <Formik 
          initialValues={initialValues}
          enableReinitialize= {true}
          onSubmit={(
            values: EnderecoDTO,
            { setSubmitting }: FormikHelpers<EnderecoDTO>
          ) => {
          
              setSubmitting(false);
          
          }}
          >
            {props => (
              <Form>
              <div>
                <label htmlFor="cep">Cep: </label>
                <Field id="cep" name="cep"  />
              <button className={styles.botaoCep} onClick={()=>handleClick(props.values.cep) }>Pesquisar CEP</button>
              </div>
              <div>
                <label htmlFor="localidade">Cidade: </label>
                <Field id="localidade" name="localidade" />
              </div>
              <div>
                <label htmlFor="complemento">Complemento: </label>
                <Field id="complemento" name="complemento" />
              </div>
              <div>
                <label htmlFor="uf">Estado: </label>
                <Field id="uf" name="uf" />
              </div>
              <div>
                <label htmlFor="logradouro">Logradouro: </label>
                <Field id="logradouro" name="logradouro" />
              </div>
              <div>
                <label htmlFor="numero">Número: </label>
                <Field id="numero" name="numero" />
              </div>
              <div>
                <label htmlFor="pais">País: </label>
                <Field id="pais" name="pais" />
              </div>
              <button className={styles.botaoSalvar} type="submit">Salvar</button>
              
            </Form>
            )}
        </Formik>
      </div>
    </div>
  );
}

export default Endereco;