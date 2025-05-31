import React from 'react'

import { getAddressString, getPhonesString } from '../utils'

interface TechnicalAssistanceResultProps {
  assist: {
    nomeAssistencia?: string
    endereco?: string
    bairro?: string
    cidade?: string
    uf?: string
    cep?: string
    firstPhone?: string
    secondPhone?: string
    email?: string
    razaoSocial?: string
  }
}

const TechnicalAssistanceResult: React.FC<TechnicalAssistanceResultProps> = ({
  assist,
}) => (
  <div
    className="assist-data"
    itemScope
    itemType="https://schema.org/LocalBusiness"
  >
    {assist.nomeAssistencia && (
      <h2 itemProp="name">{assist.nomeAssistencia}</h2>
    )}
    {assist.razaoSocial && (
      <p itemProp="legalName">Razão Social: {assist.razaoSocial}</p>
    )}

    {getAddressString(assist) && (
      <p itemProp="address">{getAddressString(assist)}</p>
    )}

    {getPhonesString(assist) && (
      <p itemProp="telephone">{getPhonesString(assist)}</p>
    )}

    {assist.email && <p itemProp="email">{assist.email}</p>}
  </div>
)

export default TechnicalAssistanceResult
