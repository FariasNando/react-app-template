import React, { memo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { getAddressLines } from '../utils/getAddressLines'
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

type AddressLine = { icon?: string; text: string }

const TechnicalAssistanceResult: React.FC<TechnicalAssistanceResultProps> =
  memo(({ assist }) => {
    const { handles } = useCssHandles(CSS_HANDLES)
    const lines = getAddressLines(assist) as AddressLine[]

    return (
      <div
        className={`${handles.tech_block} pa7 mb3`}
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        {assist.nomeAssistencia && (
          <h2 className={`f6 fw6 ma0 ${handles.tech_name}`} itemProp="name">
            {assist.nomeAssistencia}
          </h2>
        )}
        {assist.razaoSocial && (
          <p
            className={`ma0 f7 ${handles.tech_legalName}`}
            itemProp="legalName"
          >
            Razão Social: {assist.razaoSocial}
          </p>
        )}
        {Array.isArray(lines) &&
          lines.map((line, idx) => (
            <div
              key={`${line.text}-${idx}`}
              className={`flex items-start mb1 ${handles.tech_line}`}
            >
              {line.icon && (
                <img
                  src={line.icon}
                  alt=""
                  className={`mr2 ${handles.tech_icon}`}
                  width={16}
                  height={16}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <span className={handles.tech_lineText}>{line.text}</span>
            </div>
          ))}
      </div>
    )
  })

TechnicalAssistanceResult.displayName = 'TechnicalAssistanceResult'

export default TechnicalAssistanceResult
