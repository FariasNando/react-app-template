import React from 'react'

import ArrowRightIcon from './ArrowRightIcon'

interface CepInputProps {
  cep: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  disabled?: boolean
}

const maskCep = (value: string) => {
  const v = value.replace(/\D/g, '').slice(0, 8)

  if (v.length <= 5) return v

  return `${v.slice(0, 5)}-${v.slice(5)}`
}

const CepInput: React.FC<CepInputProps> = ({
  cep,
  onChange,
  onSubmit,
  disabled,
}) => (
  <form
    onSubmit={onSubmit}
    className="flex items-end gap-2 w-100 justify-center"
  >
    <div>
      <label htmlFor="cep" itemProp="query-input" className="db mb2">
        CEP
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
        className="input-reset ba b--moon-gray br2 pa2"
      />
    </div>
    <button
      type="submit"
      aria-label="Buscar por CEP"
      disabled={disabled}
      className="h2 w2 flex items-center justify-center bg-blue white br2 bn pointer"
    >
      <ArrowRightIcon />
    </button>
  </form>
)

export default CepInput
