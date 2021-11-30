export interface EnderecoDTO{
  cep: string,
  localidade: string,
  complemento: string,
  uf: string,
  idEndereco?: string,
  logradouro: string,
  numero: number,
  pais: string,
}