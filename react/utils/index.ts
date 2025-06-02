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

export function maskCep(value: string) {
  const v = value.replace(/\D/g, '').slice(0, 8)

  if (v.length <= 5) return v

  return `${v.slice(0, 5)}-${v.slice(5)}`
}
