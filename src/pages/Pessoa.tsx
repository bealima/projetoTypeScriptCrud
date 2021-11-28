import { useEffect } from "react";
import api from "../api";
import styles from '../pages/Pessoa.module.css'
import { PessoasDTO } from "../model/PessoaDTO";
import { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from 'formik';

const Pessoa = () => {

  const[listPessoas, setListPessoas]= useState<PessoasDTO[]>([]);
  const[isEdicao, setIsEdicao] = useState(false)

  useEffect(() => {
   getListPessoas()
  },[])

  const getListPessoas = async () => {
    const {data} = await api.get('/pessoa');
    setListPessoas(data);
  }

  const handleCreate = async (values: PessoasDTO) =>{
    await api.post('/pessoa',values);
    getListPessoas();
  };
    
  const handleDelete = async (idPessoa:number | undefined) => {
    await api.delete('/pessoa/' + idPessoa)
    getListPessoas()
  }

  const updating = (pessoa: PessoasDTO)=>{
    setInitialValues(pessoa)
    setIsEdicao(true)
  }

  const handleUpdate = async(values: PessoasDTO)=>{
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
          values: PessoasDTO,
          { setSubmitting }: FormikHelpers<PessoasDTO>
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
            <Field id="dataNascimento" name="dataNascimento" />
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
          <div  key={pessoa.idPessoa} style={{marginBottom: 20}}>
            <p>{pessoa.nome}</p>
            <p>{pessoa.cpf}</p>
            <p>{pessoa.dataNascimento}</p>
            <p>{pessoa.email}</p>
            <div>
              <button onClick={() => handleDelete(pessoa.idPessoa)}>Deletar</button>
            </div>
            <div>
              <button onClick={() => updating(pessoa)}>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pessoa;