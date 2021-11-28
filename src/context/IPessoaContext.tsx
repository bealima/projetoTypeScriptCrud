import React, {createContext,useState} from "react"
import { PessoaDTO } from "../model/PessoaDTO"

interface IPessoaContext{
  listPessoas:PessoaDTO['pessoas'];
  setListPessoas:React.Dispatch<React.SetStateAction<PessoaDTO['pessoas']>>
}

const PessoaContext = createContext<IPessoaContext>({} as IPessoaContext);

const PessoaProvider : React.FC<any> = ({children}) =>{

  const [listPessoas,setListPessoas] = useState<PessoaDTO['pessoas']>([])
  
  return(
    <PessoaContext.Provider value={{listPessoas,setListPessoas}}>
      {children}
    </PessoaContext.Provider>
  )
}

export {PessoaContext,PessoaProvider}
