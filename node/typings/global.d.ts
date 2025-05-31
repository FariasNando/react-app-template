interface SearchInput {
  dataEntity: string
  fields: string[]
  where?: string
  pagination: PaginationArgs
  schema?: string
  sort?: string
}

interface PostalCodeResponse {
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string
  geoCoordinates: [number, number]
}
