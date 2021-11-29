import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { ItemPessoaDTO } from "../model/PessoaDTO";
import styles from '../pages/Pessoa.module.css';
import moment from 'moment';
import { PessoaContext } from '../context/IPessoaContext';


const Pessoa = () => {

  const{auth, setAuth} = useContext<any>(AuthContext)

  const{listPessoas, setListPessoas}= useContext(PessoaContext);
  const[isEdicao, setIsEdicao] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = token;
    }
    setAuth(true)
    getListPessoas()

  },[])

  const getListPessoas = async () => {
    const {data} = await api.get('/pessoa');
    setListPessoas(data);
  }

  const handleCreate = async (values: ItemPessoaDTO) =>{
    await api.post('/pessoa',values);
    getListPessoas();
  };
    
  const handleDelete = async (idPessoa:number | undefined) => {
    await api.delete('/pessoa/' + idPessoa)
    getListPessoas()
  }

  const updating = (pessoa: ItemPessoaDTO)=>{
    setInitialValues(pessoa)
    setIsEdicao(true)
  }

  const handleUpdate = async(values: ItemPessoaDTO)=>{
    await api.put('/pessoa/'+ values.idPessoa, values)
    getListPessoas()
    setIsEdicao(false)
  }


  const[initialValues, setInitialValues] = useState({
    nome:'',
    email:'',
    dataNascimento:'',
    cpf:'',
  })

  return (
    
    <div className='containerContent'>
      <div className={styles.pessoa}>
        <h1>Cadastrar</h1>

        <Formik 
         initialValues={initialValues}
         enableReinitialize= {true}
         onSubmit={async(
          values: ItemPessoaDTO,
          { setSubmitting }: FormikHelpers<ItemPessoaDTO>
        ) => {
          if (!isEdicao){
            await handleCreate(values)
          } else {
            await handleUpdate(values)
          }
          setInitialValues({
            nome:'',
            email:'',
            dataNascimento:'',
            cpf:'',
          })
          setSubmitting(false);
        }}
       >
         <Form>
           <div>
            <label htmlFor="nome">Nome</label>
            <Field id="nome" name="nome" />
           </div>
           <div>
            <label htmlFor="cpf">CPF</label>
            <Field id="cpf" name="cpf" />
           </div>
           <div>
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <Field id="dataNascimento" name="dataNascimento" type="date"/>
           </div>
           <div>
            <label htmlFor="email">E-mail</label>
            <Field id="email" name="email" />
           </div>
           {!isEdicao && <button type="submit">Cadastrar</button>}
           {isEdicao && <button type="submit">Salvar</button>}
           
         </Form>
       </Formik>
       
        
        {listPessoas.map(pessoa =>(
          <div  key={pessoa.idPessoa} className={styles.card}>
            <p>{pessoa.nome}</p>
            <p>{pessoa.cpf}</p>
            <p>{moment(pessoa.dataNascimento).format("DD/MM/YYYY")}</p>
            <p>{pessoa.email}</p>
            <div>
              <button onClick={() => handleDelete(pessoa.idPessoa)}>Deletar</button>
            
              <button onClick={() => updating(pessoa)}>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pessoa;