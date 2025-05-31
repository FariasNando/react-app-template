export function getAddressString(assist: {
  endereco?: string
  bairro?: string
  cidade?: string
  uf?: string
  cep?: string
}): string {
  if (!assist) return ''
  const parts: string[] = []

  if (assist.endereco) parts.push(assist.endereco)
  if (assist.bairro) parts.push(assist.bairro)
  let cityUf = ''

  if (assist.cidade) cityUf += assist.cidade
  if (assist.cidade && assist.uf) cityUf += '/'
  if (assist.uf) cityUf += assist.uf
  if (cityUf) parts.push(cityUf)
  let address = parts.join(', ')

  if (assist.cep) address += (address ? ', CEP: ' : 'CEP: ') + assist.cep

  return address
}

export function getPhonesString(assist: {
  firstPhone?: string
  secondPhone?: string
}): string {
  if (!assist) return ''
  if (assist.firstPhone && assist.secondPhone) {
    return `${assist.firstPhone} | ${assist.secondPhone}`
  }

  return assist.firstPhone ?? assist.secondPhone ?? ''
}

// Busca estados do IBGE
export async function fetchStates(): Promise<string[]> {
  const res = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
  )

  const data = await res.json()

  return data.map((uf: { sigla: string }) => uf.sigla)
}

// Busca cidades do IBGE para um estado
export async function fetchCities(state: string): Promise<string[]> {
  const res = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
  )

  const data = await res.json()

  return data.map((c: { nome: string }) => c.nome)
}
