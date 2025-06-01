import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { getAddressString, getPhonesString } from '../utils'
import { CSS_HANDLES } from '../style/theme'

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
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${handles.tech_block} pa7 mb3 shadow-1`}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {assist.nomeAssistencia && (
        <h2 className="f4 fw6 mb2 dark-blue" itemProp="name">
          {assist.nomeAssistencia}
        </h2>
      )}
      {assist.razaoSocial && (
        <p className="mb1 gray" itemProp="legalName">
          Razão Social: {assist.razaoSocial}
        </p>
      )}

      {getAddressString(assist) && (
        <p className="mb1" itemProp="address">
          {getAddressString(assist)}
        </p>
      )}

      {getPhonesString(assist) && (
        <p className="mb1" itemProp="telephone">
          {getPhonesString(assist)}
        </p>
      )}

      {assist.email && (
        <p className="mb0" itemProp="email">
          {assist.email}
        </p>
      )}
    </div>
  )
}

export default TechnicalAssistanceResult
