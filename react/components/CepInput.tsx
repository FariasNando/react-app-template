import React, { memo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import ArrowRightIcon from './ArrowRightIcon'
import { CSS_HANDLES } from '../style/theme'
import { maskCep } from '../utils'

interface CepInputProps {
  cep: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  disabled?: boolean
}

const CepInput: React.FC<CepInputProps> = memo(
  ({ cep, onChange, onSubmit, disabled = false }) => {
    const { handles } = useCssHandles(CSS_HANDLES)

    return (
      <form
        onSubmit={onSubmit}
        className="flex items-end w-100 justify-center mb5"
        autoComplete="off"
      >
        <div className="flex-auto w-100">
          <label
            htmlFor="cep"
            itemProp="query-input"
            className={`${handles.cep_label} db mb5 tc`}
          >
            Insira seu CEP
          </label>
          <input
            id="cep"
            name="cep"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="\d{5}-?\d{3}"
            maxLength={9}
            value={maskCep(cep)}
            onChange={onChange}
            placeholder="00000-000"
            aria-label="Digite o CEP"
            disabled={disabled}
            className={`input-reset ba pl4 w-100 h2 tl f7 fw3 bg-white black ${handles.cepInput}`}
          />
        </div>
        <button
          type="submit"
          aria-label="Buscar por CEP"
          disabled={disabled}
          className={`h2 w2 flex items-center justify-center white pointer ${handles.cepInputButton}`}
          tabIndex={disabled ? -1 : 0}
        >
          <ArrowRightIcon />
        </button>
      </form>
    )
  }
)

CepInput.displayName = 'CepInput'

export default CepInput
