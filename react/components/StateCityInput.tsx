import React from 'react'

import ArrowRightIcon from './ArrowRightIcon'

interface StateCityInputProps {
  state: string
  setState: (uf: string) => void
  city: string
  setCity: (city: string) => void
  states: string[]
  cities: string[]
  onSubmit: (e: React.FormEvent) => void
  disabled?: boolean
}

const StateCityInput: React.FC<StateCityInputProps> = ({
  state,
  setState,
  city,
  setCity,
  states,
  cities,
  onSubmit,
  disabled,
}) => (
  <div className="flex items-end gap-2">
    <div>
      <label htmlFor="state" className="db mb2">
        Estado
      </label>
      <select
        id="state"
        name="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        disabled={disabled}
        className="input-reset ba b--moon-gray br2 pa2"
      >
        <option value="">Selecione</option>
        {states.map((uf) => (
          <option key={uf} value={uf}>
            {uf}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="city" className="db mb2">
        Cidade
      </label>
      <select
        id="city"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={!state || disabled}
        className="input-reset ba b--moon-gray br2 pa2"
      >
        <option value="">Selecione</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
    <button
      type="submit"
      aria-label="Buscar por Estado e Cidade"
      onClick={onSubmit}
      disabled={!state || !city || disabled}
      className="h2 w2 flex items-center justify-center bg-blue white br2 bn pointer"
    >
      <ArrowRightIcon />
    </button>
  </div>
)

export default StateCityInput
