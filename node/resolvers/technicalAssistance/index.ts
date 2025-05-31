export async function getTechnicalAssistence(
  _: unknown,
  {
    postalCode,
    product,
    city,
    uf,
  }: { postalCode?: string; product: string; city?: string; uf?: string },
  ctx: Context
) {
  const {
    clients: { masterdata, address },
  } = ctx

  try {
    let searchCity = city
    let searchUf = uf

    if (postalCode) {
      const formattedPostalCode = postalCode.toString().padStart(8, '0')
      const technicalAssistence = await address.getAddress(formattedPostalCode)

      searchCity = technicalAssistence.city
      searchUf = technicalAssistence.state
    }

    if (!searchCity || !searchUf) {
      return { status: 400 }
    }

    const data = await masterdata.searchDocuments({
      dataEntity: 'AT',
      fields: [
        'cidade',
        'uf',
        'endereco',
        'firstPhone',
        'nomeAssistencia',
        'cep',
        'secondPhone',
        'razaoSocial',
        'email',
        'bairro',
      ],
      where: `cidade="${searchCity}" AND uf="${searchUf}" AND ${product}=true`,
      pagination: {
        page: 1,
        pageSize: 100,
      },
    })

    return {
      data,
      status: 200,
    }
  } catch (error) {
    return {
      status: 500,
    }
  }
}
