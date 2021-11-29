import React, {createContext,useState} from "react"
import { ItemPessoaDTO } from "../model/PessoaDTO"

interface IPessoaContext{
  listPessoas:ItemPessoaDTO[];
  setListPessoas:React.Dispatch<React.SetStateAction<ItemPessoaDTO[]>>
}

const PessoaContext = createContext<IPessoaContext>({} as IPessoaContext);

const PessoaProvider : React.FC<any> = ({children}) =>{

  const [listPessoas,setListPessoas] = useState<ItemPessoaDTO[]>([])
  
  return(
    <PessoaContext.Provider value={{listPessoas,setListPessoas}}>
      {children}
    </PessoaContext.Provider>
  )
}

export {PessoaContext,PessoaProvider}
