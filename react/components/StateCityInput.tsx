import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import ArrowRightIcon from './ArrowRightIcon'
import DropdownArrowIcon from './DropdownArrowIcon'
import { CSS_HANDLES } from '../style/theme'

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
  disabled = false,
}) => {
  const [cityInput, setCityInput] = useState(city)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { handles } = useCssHandles(CSS_HANDLES)

  const filteredCities = cityInput
    ? cities.filter((c) => c.toLowerCase().includes(cityInput.toLowerCase()))
    : cities

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCityInput(e.target.value)
      setShowSuggestions(true)
      setCity('')
    },
    [setCity]
  )

  const handleSelectCity = useCallback(
    (selectedCity: string) => {
      setCity(selectedCity)
      setCityInput(selectedCity)
      setShowSuggestions(false)
    },
    [setCity]
  )

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowSuggestions(false), 100)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && filteredCities.length > 0) {
        handleSelectCity(filteredCities[0])
        e.preventDefault()
      }
    },
    [filteredCities, handleSelectCity]
  )

  useEffect(() => {
    setCityInput(city)
  }, [city])

  return (
    <div className="flex flex-column mt5 w-100">
      <div className="relative mb2">
        <select
          id="state"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={disabled}
          className={`input-reset ba pl4 w-100 h2 tl f7 fw3 bg-white black ${handles.stateInput}`}
        >
          <option value="">Escolha um estado</option>
          {states.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
        <span className="absolute top-0 right-1 h-100 flex items-center pointer-events-none">
          <DropdownArrowIcon />
        </span>
      </div>
      <div className="relative mt4">
        <form
          onSubmit={onSubmit}
          className="flex items-end w-100"
          autoComplete="off"
        >
          <div className="w-100 relative">
            <input
              id="city"
              name="city"
              type="text"
              value={cityInput}
              onChange={handleCityChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled={!state || disabled}
              placeholder="Escolha uma cidade"
              autoComplete="off"
              ref={inputRef}
              className={`input-reset ba pl4 w-100 h2 tl f7 fw3 bg-white black ${handles.cityInput}`}
              style={{ paddingRight: 32 }}
            />
            <span className="absolute top-0 right-0 h-100 flex items-center pointer-events-none pr2">
              <DropdownArrowIcon />
            </span>
            {showSuggestions && filteredCities.length > 0 && (
              <ul className="absolute z-999 bg-white ba b--moon-gray br2 mt1 pa0 list w-100 max-h5 overflow-auto shadow-1">
                {filteredCities.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className="pa2 pointer db w-100 tl bn bg-transparent"
                      onMouseDown={() => handleSelectCity(c)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            aria-label="Buscar por Estado e Cidade"
            disabled={
              !state ||
              !cityInput ||
              disabled ||
              !filteredCities.includes(cityInput)
            }
            className={`h2 w2 flex items-center justify-center white pointer ${handles.cityInputButton}`}
          >
            <ArrowRightIcon />
          </button>
        </form>
      </div>
    </div>
  )
}

export default React.memo(StateCityInput)
