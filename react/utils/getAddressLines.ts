export function getAddressLines(assist: {
  endereco?: string
  bairro?: string
  cidade?: string
  uf?: string
  cep?: string
  firstPhone?: string
  secondPhone?: string
  email?: string
}) {
  if (!assist) return {}

  const lines: Array<{ icon?: string; text: string }> = []

  // Endereço
  const addressParts = [
    assist.endereco,
    assist.bairro,
    assist.cidade && assist.uf
      ? `${assist.cidade}/${assist.uf}`
      : assist.cidade ?? assist.uf,
    assist.cep ? `CEP: ${assist.cep}` : undefined,
  ].filter(Boolean)

  if (addressParts.length) {
    lines.push({
      icon: 'https://lojafranke.vteximg.com.br/arquivos/distance-icon.svg',
      text: addressParts.join(', '),
    })
  }

  // Telefones
  if (assist.firstPhone || assist.secondPhone) {
    const phone = [assist.firstPhone, assist.secondPhone]
      .filter(Boolean)
      .join(' | ')

    lines.push({
      icon: 'https://lojafranke.vteximg.com.br/arquivos/telephone-icon-stores.svg',
      text: phone,
    })
  }

  // Email
  if (assist.email) {
    lines.push({
      icon: 'https://lojafranke.vteximg.com.br/arquivos/mail-icon-stores.svg',
      text: assist.email,
    })
  }

  return lines
}
